#!/usr/bin/env node
import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync, existsSync, rmSync, writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";

const root = resolve(process.cwd());
const slidevBin = resolve(root, "node_modules", ".bin", "slidev");
const outRoot = join(root, "dist");
const base = process.env.BASE || "/presentation/";
const only = process.argv.slice(2);

const SKIP = new Set(["docs", "dist", "packages", "node_modules", "scripts"]);

function discoverDecks() {
  const decks = [];
  for (const d of readdirSync(root)) {
    if (d.startsWith(".") || SKIP.has(d)) continue;
    const fullPath = join(root, d);
    try {
      if (!statSync(fullPath).isDirectory()) continue;
      if (!existsSync(join(fullPath, "slides.md"))) continue;
    } catch {
      continue;
    }
    let title = d;
    try {
      const content = readFileSync(join(fullPath, "slides.md"), "utf-8");
      const m = content.match(/^title:\s*(.+)$/m);
      if (m) title = m[1].trim();
    } catch {}
    decks.push({ name: d, title });
  }
  decks.sort((a, b) => a.name.localeCompare(b.name));
  return decks;
}

const allDecks = discoverDecks();

if (only.length) {
  for (const name of only) {
    if (!allDecks.some((d) => d.name === name)) {
      console.error(`❌ 找不到 deck: ${name} (請先確認 ${name}/slides.md 存在)`);
      process.exit(1);
    }
  }
}

const toBuild = only.length ? allDecks.filter((d) => only.includes(d.name)) : allDecks;

mkdirSync(outRoot, { recursive: true });

console.log(`\n🔨 將 build ${toBuild.length} 個 deck (base: ${base})\n`);

const built = [];
const failed = [];

for (const deck of toBuild) {
  const deckPath = join(root, deck.name);
  const outDir = join(outRoot, deck.name);
  const deckBase = `${base}${deck.name}/`;

  rmSync(outDir, { recursive: true, force: true });

  console.log(`── ${deck.name} → ${outDir}`);
  try {
    execSync(
      `${slidevBin} build slides.md --base ${deckBase} --out ${outDir} --router-mode hash`,
      { cwd: deckPath, stdio: "inherit", shell: "/bin/bash" },
    );
    built.push(deck);
  } catch {
    failed.push(deck.name);
  } finally {
    const nm = join(deckPath, "node_modules");
    if (existsSync(nm)) rmSync(nm, { recursive: true, force: true });
  }
}

// GH Pages 只認發佈根的 404.html:把 /<base>/<deck>/<route> 深連結轉進該 deck 的 hash 路由
const baseSeg = base.replace(/^\/+|\/+$/g, "");
const notFound = `<!doctype html>
<html lang="zh-Hant"><head><meta charset="utf-8"><title>轉送中…</title><script>
(function () {
  var m = location.pathname.match(/^\\/${baseSeg}\\/([^/]+)\\/(.+)$/);
  var target = m
    ? "/${baseSeg}/" + encodeURIComponent(m[1]) + "/#/" + m[2].replace(/\\/+$/, "").replace(/^${baseSeg}\\/[^/]+\\//, "")
    : "/${baseSeg}/";
  location.replace(location.origin + target + location.search);
})();
</script></head><body></body></html>
`;
writeFileSync(join(outRoot, "404.html"), notFound);

// 索引頁永遠列出全部 deck(包含 dist/ 裡之前已 build 過的)
function deckExists(name) {
  return existsSync(join(outRoot, name, "index.html"));
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const card = (d) => {
  const missing = !deckExists(d.name);
  const cat = d.name.startsWith("month") ? "month" : "tech";
  const search = esc(`${d.name} ${d.title}`.toLowerCase());
  return `<a class="card ${cat}${missing ? " missing" : ""}"${missing ? ' data-missing="1"' : ""} href="./${encodeURIComponent(d.name)}/" data-search="${search}"><span class="name">${esc(d.name)}</span><span class="title">${esc(d.title)}</span></a>`;
};

const section = (label, cat, decks) =>
  decks.length
    ? `<section class="section"><h2><span class="dot ${cat}"></span>${label}<span class="num">${decks.length}</span></h2><div class="grid">${decks.map((d) => card(d)).join("\n    ")}</div></section>`
    : "";

const months = allDecks.filter((d) => d.name.startsWith("month"));
const others = allDecks.filter((d) => !d.name.startsWith("month"));

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>簡報總覽</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; color: #fafafa;
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
    background:
      radial-gradient(640px 420px at 12% -8%, rgba(16,185,129,.14), transparent 60%),
      radial-gradient(760px 520px at 88% -4%, rgba(56,189,248,.13), transparent 60%),
      #09090b;
    background-attachment: fixed;
  }
  main { max-width: 1060px; margin: 0 auto; padding: 56px 24px 88px; }
  header { margin-bottom: 28px; }
  h1 {
    margin: 0 0 12px; font-size: 34px; font-weight: 800; letter-spacing: -.03em;
    background: linear-gradient(90deg, #34d399, #38bdf8);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sub { margin: 0 0 24px; }
  .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border: 1px solid #27272a; border-radius: 9999px; font-size: 12.5px; color: #a1a1aa; background: rgba(255,255,255,.03); }
  .search-wrap { position: relative; margin-bottom: 12px; }
  .search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; stroke: #52525b; pointer-events: none; }
  #q {
    width: 100%; padding: 12px 16px 12px 42px; font-size: 15px; color: #fafafa;
    background: rgba(255,255,255,.04); border: 1px solid #27272a; border-radius: 14px; outline: none;
    transition: border-color .15s, box-shadow .15s;
  }
  #q::placeholder { color: #52525b; }
  #q:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,.15); }
  .meta { margin: 0 0 36px; font-size: 12.5px; color: #71717a; }
  h2 { display: flex; align-items: center; gap: 10px; margin: 0 0 14px; font-size: 14px; font-weight: 700; letter-spacing: .06em; color: #d4d4d8; }
  .dot { width: 8px; height: 8px; border-radius: 9999px; }
  .dot.month { background: #10b981; box-shadow: 0 0 10px rgba(16,185,129,.8); }
  .dot.tech { background: #38bdf8; box-shadow: 0 0 10px rgba(56,189,248,.8); }
  .num { margin-left: auto; font-weight: 400; font-size: 12px; color: #71717a; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; margin: 0 0 44px; }
  .card { position: relative; display: flex; flex-direction: column; gap: 6px; padding: 16px 18px; border: 1px solid #27272a; border-radius: 14px; text-decoration: none; background: rgba(255,255,255,.03); backdrop-filter: blur(8px); overflow: hidden; transition: border-color .18s, transform .18s, box-shadow .18s; }
  .card::before { content: ""; position: absolute; left: 0; top: 14%; bottom: 14%; width: 3px; border-radius: 0 3px 3px 0; }
  .card.month::before { background: linear-gradient(#10b981, #34d399); }
  .card.tech::before { background: linear-gradient(#0ea5e9, #38bdf8); }
  .card:hover { transform: translateY(-3px); }
  .card.month:hover { border-color: rgba(52,211,153,.65); box-shadow: 0 14px 34px -12px rgba(16,185,129,.35); }
  .card.tech:hover { border-color: rgba(56,189,248,.65); box-shadow: 0 14px 34px -12px rgba(56,189,248,.35); }
  .card:focus-visible { outline: 2px solid #38bdf8; outline-offset: 2px; }
  .name { font-weight: 700; font-size: 15px; color: #f4f4f5; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .title { font-size: 13px; color: #a1a1aa; line-height: 1.5; }
  .missing { opacity: .35; pointer-events: none; }
  .hidden { display: none !important; }
  .empty { display: none; padding: 48px 0; text-align: center; color: #71717a; font-size: 14px; }
  footer { color: #52525b; font-size: 12px; border-top: 1px solid #18181b; padding-top: 20px; }
  @media (prefers-reduced-motion: reduce) { .card, #q { transition: none; } .card:hover { transform: none; } }
</style>
</head>
<body>
<main>
  <header>
    <h1>簡報總覽</h1>
    <p class="sub"><span class="badge">${allDecks.length} 個 deck · GitHub Actions 自動部署</span></p>
    <div class="search-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path></svg>
      <input id="q" type="search" placeholder="搜尋 deck 名稱或標題…" aria-label="搜尋 deck" autocomplete="off">
    </div>
    <p class="meta" id="count"></p>
  </header>
  ${section("月報", "month", months)}
  ${section("技術分享", "tech", others)}
  <p class="empty" id="empty">找不到符合的 deck</p>
  <footer>Slidev monorepo · generated ${new Date().toISOString()}</footer>
</main>
<script>
(function () {
  var input = document.getElementById('q');
  var count = document.getElementById('count');
  var empty = document.getElementById('empty');
  var cards = [].slice.call(document.querySelectorAll('.card'));
  var sections = [].slice.call(document.querySelectorAll('.section'));
  var searchable = 0;
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].getAttribute('data-missing') !== '1') searchable++;
  }
  function apply() {
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var miss = c.getAttribute('data-missing') === '1';
      var hit = q ? (!miss && c.getAttribute('data-search').indexOf(q) !== -1) : true;
      c.classList.toggle('hidden', !hit);
      if (hit && !miss) shown++;
    }
    count.textContent = '顯示 ' + shown + ' / 共 ' + searchable + ' 個 deck';
    empty.style.display = (q && shown === 0) ? 'block' : 'none';
    for (var j = 0; j < sections.length; j++) {
      sections[j].style.display = sections[j].querySelector('.card:not(.hidden)') ? '' : 'none';
    }
  }
  input.addEventListener('input', apply);
  apply();
})();
</script>
</body>
</html>
`;

writeFileSync(join(outRoot, "index.html"), html);

console.log(`\n✅ 成功 ${built.length} 個${failed.length ? ` · ❌ 失敗 ${failed.length} 個: ${failed.join(", ")}` : ""}`);
console.log(`📄 索引頁: dist/index.html`);
if (failed.length) process.exit(1);

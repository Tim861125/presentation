#!/usr/bin/env node
import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync, existsSync, rmSync, writeFileSync } from "fs";
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
      `${slidevBin} build slides.md --base ${deckBase} --out ${outDir}`,
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

// 索引頁永遠列出全部 deck(包含 dist/ 裡之前已 build 過的)
function deckExists(name) {
  return existsSync(join(outRoot, name, "index.html"));
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const card = (d) =>
  `<a class="card" href="./${encodeURIComponent(d.name)}/"><span class="name">${esc(d.name)}</span><span class="title">${esc(d.title)}</span></a>`;

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
  body { margin: 0; font-family: ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace; background: #0b0f19; color: #e2e8f0; }
  main { max-width: 1000px; margin: 0 auto; padding: 48px 24px 80px; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  .sub { color: #64748b; margin: 0 0 36px; }
  h2 { font-size: 16px; color: #7dd3fc; border-bottom: 1px solid #1e293b; padding-bottom: 8px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; list-style: none; padding: 0; margin: 0 0 40px; }
  .card { display: flex; flex-direction: column; gap: 6px; padding: 14px 16px; border: 1px solid #1e293b; border-radius: 10px; text-decoration: none; background: #111827; transition: border-color .15s, transform .15s; }
  .card:hover { border-color: #38bdf8; transform: translateY(-2px); }
  .name { font-weight: 700; color: #f1f5f9; }
  .title { font-size: 13px; color: #94a3b8; }
  .missing { opacity: .35; pointer-events: none; }
  footer { color: #475569; font-size: 12px; }
</style>
</head>
<body>
<main>
  <h1>📊 簡報總覽</h1>
  <p class="sub">共 ${allDecks.length} 個 deck · 由 GitHub Actions 自動部署</p>
  ${months.length ? `<h2>📅 月報</h2>\n  <div class="grid">${months.map((d) => card(d).replace('class="card"', `class="card${deckExists(d.name) ? "" : " missing"}"`)).join("\n  ")}</div>` : ""}
  ${others.length ? `<h2>💡 技術分享</h2>\n  <div class="grid">${others.map((d) => card(d).replace('class="card"', `class="card${deckExists(d.name) ? "" : " missing"}"`)).join("\n  ")}</div>` : ""}
  <footer>Slidev monorepo · generated ${new Date().toISOString()}</footer>
</main>
</body>
</html>
`;

writeFileSync(join(outRoot, "index.html"), html);

console.log(`\n✅ 成功 ${built.length} 個${failed.length ? ` · ❌ 失敗 ${failed.length} 個: ${failed.join(", ")}` : ""}`);
console.log(`📄 索引頁: dist/index.html`);
if (failed.length) process.exit(1);

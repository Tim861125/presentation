#!/usr/bin/env node
import { execSync } from "child_process";
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join, resolve } from "path";

const root = resolve(process.cwd());
const slidevBin = resolve(root, "node_modules", ".bin", "slidev");
const deck = process.argv[2];

// No argument → list all decks
if (!deck) {
  const decks = [];
  for (const d of readdirSync(root)) {
    if (d.startsWith(".") || d === "docs") continue;
    const fullPath = join(root, d);
    try {
      if (statSync(fullPath).isDirectory() === false) continue;
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

  console.log("");
  console.log(`📊 可用的 Slidev 簡報 (共 ${decks.length} 個)`);
  console.log("");

  const months = decks.filter((d) => d.name.startsWith("month"));
  const others = decks.filter((d) => !d.name.startsWith("month"));
  const pretty = (d) => `  ${d.name.padEnd(22)} ${d.title}`;

  if (months.length) {
    console.log("📅 月報:");
    console.log(months.map(pretty).join("\n"));
    console.log("");
  }

  if (others.length) {
    console.log("💡 技術分享:");
    console.log(others.map(pretty).join("\n"));
  }

  console.log("使用方式: bun run dev <deck名>  (會自動開啟瀏覽器)");
  console.log("");
  process.exit(0);
}

// Deck specified → launch slidev pointing at that deck's slides.md
const deckPath = join(root, deck);
const slidesPath = join(deckPath, "slides.md");

if (!existsSync(slidesPath)) {
  console.error(`❌ 找不到 ${deck}/slides.md`);
  console.error(`   請先用 "bun run dev" 查看可用的 deck 名稱`);
  process.exit(1);
}

console.log(`\n🚀 啟動 ${deck}\n`);
execSync(`${slidevBin} slides.md`, {
  cwd: deckPath,
  stdio: "inherit",
  shell: "/bin/bash",
});
#!/usr/bin/env node
import { readdirSync, statSync, existsSync, rmSync } from "fs";
import { join, resolve } from "path";

const root = resolve(process.cwd());
let cleanedCount = 0;

for (const d of readdirSync(root)) {
  if (d.startsWith(".") || d === "node_modules" || d === "dist" || d === "scripts" || d === "docs") continue;
  const fullPath = join(root, d);
  try {
    if (!statSync(fullPath).isDirectory()) continue;
    const nm = join(fullPath, "node_modules");
    const dist = join(fullPath, "dist");
    if (existsSync(nm)) {
      rmSync(nm, { recursive: true, force: true });
      cleanedCount++;
    }
    if (existsSync(dist)) {
      rmSync(dist, { recursive: true, force: true });
      cleanedCount++;
    }
  } catch {}
}

console.log(`✨ 清理完成！已清除 ${cleanedCount} 個子目錄快取（dist / node_modules）。\n`);

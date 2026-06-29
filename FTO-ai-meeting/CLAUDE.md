# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

用繁體中文回答使用者問題。

> 本檔案只說明 **FTO-ai-meeting 這個 deck 的專屬內容**。建置、套件管理、monorepo 整體慣例請見上一層 `../CLAUDE.md`，不在此重複。

## 這個 deck 是什麼

一份**內部 Demo 簡報**，介紹 PatentPilot 的一個加值功能 POC：在專利詳目頁加一顆「FTO 比對」按鈕，讓使用者貼上自己的產品，由 AI 即時產出初步的「侵權風險報告」。主題是 **FTO（Freedom to Operate，自由實施 / 專利侵權風險）**。

`SPEC.md` 是這份 deck 的**內容來源（source of truth）**：完整解釋了 FTO 概念、7 個常見誤解、5 個侵權判斷案例、以及 Demo 的設計意圖。**修改投影片內容前先讀 `SPEC.md`** — 投影片是它的濃縮版。

## 結構

屬於 monorepo 中的 **markdown-heavy 混合型** deck：敘事內容直接寫在 `slides.md`（約 31 張），把互動部分抽成 4 個 Vue component 內嵌使用。

- `components/FtoCompareDemo.vue` — **全場核心 Demo**（slides.md 末段 `<FtoCompareDemo />`）。三欄式：左=範例專利、中=範例產品、右=AI 報告。**這是模擬，不是真的 AI**：`report` 字串是寫死的，`start()` 用 `setTimeout` 逐字吐字模擬 token 串流。正式版才會把這段接到 PatentPilot 服務（前端不需改）。改 Demo 文案 = 改這支檔案裡的 `patent` / `product` / `report` 常數。
- `components/CaseCard.vue` — 侵權判斷案例卡。props：`n`、`title`、`combo`、`infringe`（true→❌侵權／false→✅不侵權，決定卡片配色）。slides.md 用 5 張對應「全要件原則 / 均等論」的教學案例。
- `components/MythCard.vue` — 誤解破解卡。props：`n`、`myth`。slides.md 用 7 張對應 `SPEC.md` 的 7 個常見盲點。
- `components/RiskLight.vue` — 紅綠燈風險燈號。props：`level: 'high' | 'mid' | 'low'`。也被 `FtoCompareDemo` 在報告出現「中風險」時內嵌顯示。

新增案例／誤解時：在 `slides.md` 對應區塊複製一張 `<CaseCard>` / `<MythCard>` 並更新 props 即可，通常不必動 component 本身。

## 注意事項

- **`pnpm-workspace.yaml` 與 `README.md` 是 `slidev create` 留下的鷹架殘骸**，不反映實際開發方式。本 deck 實際是根目錄 **bun workspace** 的成員（共用 `../bun.lock` 與 hoisted `node_modules`），請依 `../CLAUDE.md` 用 bun 操作，不要用 pnpm／npm。
- 樣式以 component 內 `<style scoped>` 為主（非 UnoCSS utility），版面尺寸（如報告框 `min/max-height: 248px`）是為了單張投影片不溢出而手調的，改內容長度時留意。

---
name: create-slidev
description: Use when creating or editing a Slidev deck in the presentation monorepo — a monthly work report (month<YY><M>, e.g. month266/month25a), a tech deep-dive / topic deck, or a component-heavy deck built from notes and doc links (RD 技術分享). Triggers on "做月報", "整理成簡報", "做投影片", "turn my notes into slides", `create-slidev monthly <spec-source>`, `create-slidev <topic> <spec-source>`, or providing links/notes to summarize into a deck. Routes to the hand-drawn (rough.js) sketch templates, the spec.md → slides.md distillation flow, UnoCSS pitfalls, and mandatory overflow verification.
---

# Create Slidev Deck

`presentation` monorepo（`/home/tim/githubRepo/presentation`）裡的簡報都是 **Slidev deck**，一個 deck 一個資料夾。核心流程固定：

```
來源內容 ──→ 整理 ──→ spec.md（source of truth）──→ 蒸餾 ──→ slides.md ──→ 視覺驗證
```

**slides 是提煉後的重點，不是 spec 的逐字複製。** 用**繁體中文**撰寫（技術名詞保留原文）。

所有新 deck 一律用**手寫風格**：rough.js 手繪圖隨 click 一筆筆畫出、白底配藍 `#4f61ab` + 琥珀 `#f5a700`、navy 封面與章節頁。風格範本是 `/home/tim/githubRepo/context-propagation-slides`。舊的深色 `theme: tech` 只留給既有 deck。

## 三種模式 → 各自的 playbook

| 模式 | 用途 | 照這份做 |
|---|---|---|
| `monthly` | 月度工作報告 | `/home/tim/githubRepo/presentation/.agents/skills/create-monthly/SKILL.md` |
| `topic` | 技術深剖 / 一般簡報 | `/home/tim/githubRepo/presentation/.agents/skills/create-tech/SKILL.md` |
| `component` | 互動多、每頁客製 Vue 元件的技術分享 | 先照 `create-tech` 建 deck，再依下方「Component 模式」改寫 |

```
create-slidev monthly [YYYY-MM] <spec-source>   # 月報
create-slidev <topic> <spec-source>             # 技術深剖 / 一般簡報
create-slidev <topic> --component <spec-source> # 元件化 deck
```

**先完整讀對應的 playbook 再動工**：scaffold 指令、模板檔案（`templates/sketch/`）、頁序、寫手繪 scene 的方法、Slidev parser 陷阱、驗證步驟都在裡面，這份不重複。此 skill 目錄下的 `templates/` 是舊版深色模板，新 deck 用 playbook 指定的 `templates/sketch/`。

**`<spec-source>`** 接受：檔案路徑、`spec/*.md`（解析為 `<repo>/spec/<filename>`）、URL、原始文字。

---

## Component 模式

用於每頁都需要客製排版或互動的技術分享。仍是手寫風格，只是頁面改成 Vue 元件。

1. **先 brainstorm 範圍** —— 創作性工作，用 `superpowers:brainstorming`。用 2–3 個針對性問題確認：內容深度（概念 vs 實作）、要貫穿全場的 running example、聽眾背景知識。取得同意後才動工。
2. **研究每個連結** —— 文件站多半是 SPA，`WebFetch` 只拿到導覽選單；改抓 GitHub raw markdown。JSON / config 逐字引用。
3. **寫 `spec.md`** —— 研究摘要 + 談定的 slide plan。
4. **Scaffold** —— 照 `create-tech` 的 Step 1 複製 `templates/sketch/`。
5. **建 slides** —— 封面與章節頁維持 markdown（`layout: cover` / `layout: section`）；內容頁寫成 `components/<Topic>Slide.vue`，在元件裡組 `<h1>` + rough.js scene（`useRoughScene`）+ `.callout` / `.big-quote`，`slides.md` 只放 `<TopicSlide />`。需要 click 步進時在 slide frontmatter 設 `clicks:`，元件內用 `useSlideContext().$clicks` 或 scene layer 驅動。
6. **視覺驗證** 並修完 overflow 才能宣告完成（見 playbook 的 Visual Verification）。

---

## 共通規範

### 資料夾命名

`topic` 直接用主題名。`monthly` 用 **month\<YY\>\<M\>**：`YY` = 西元年後兩碼；`M` = 月份，1–9 月用數字，10/11/12 月用 `a`/`b`/`c`（`month25a` = 2025-10，`month266` = 2026-06）。

### UnoCSS 兩個地雷

- **絕對不要加真正的 Tailwind** —— `@tailwindcss/vite` 會攔截 Slidev 的 theme CSS，build 直接死在 `Cannot apply unknown utility class`。
- **不能動態組 class 名** —— UnoCSS 是靜態掃描，`` :class="`bg-${c.color}-400`" `` 產不出任何東西；把完整字串放進資料再綁上去。手繪 scene 的顏色走 `C.*` 常數，不受此限。

### Canvas 高度陷阱

Slidev 渲染在固定的 **~980×551 單位畫布**（16:9），不是瀏覽器視窗。扣掉 padding 與頁尾，內容區約 450px：手繪 scene 的 viewBox 高度抓 ≤ 330（寬 900），一頁最多一張 scene 或 4–5 條條列。溢出就拆頁或砍內容，不要只縮字級。

### 不要用 icon

只在需要凸顯完成／未完成時用打勾或叉叉。

## 本地預覽 / 建置

```bash
cd /home/tim/githubRepo/presentation
bun run dev <deck>                          # 開發伺服器，自動開瀏覽器
bunx --bun slidev build <deck>/slides.md    # 靜態輸出
bunx --bun slidev export <deck>/slides.md   # 匯出 PDF
```

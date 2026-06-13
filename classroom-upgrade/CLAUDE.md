# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

用繁體中文回答使用者問題。

> 本檔只記錄此 deck 特有、非顯而易見的資訊。Monorepo 整體結構、`bun install`、共用相依版本等，見上層 `../CLAUDE.md`。

## 這份 deck 是什麼

`classroom-upgrade` 是一份**教室空間升級估價報告**（Slidev deck），不屬於上層 `../CLAUDE.md` 描述的兩類（技術深談 / 月報）。內容是針對實體空間分區的裝修報價與示意，章節對應實際施工區域：**天花板 ‧ 門外 ‧ 門內 ‧ 設備 ‧ 咖啡廳**。最終交付物是匯出的 `教室空間升級估價報告 - Slidev.pptx`（`bun run export` 產生）。

## 圖片工作流程（最重要、最易踩雷）

圖片有兩個目錄，**來源與實際引用不同**：

- `src/<中文區域名>/`（如 `src/天花板/`、`src/門外/`、`src/咖啡廳/`）— 原始蒐集的素材，依**實體區域**分類，含蝦皮截圖、示意圖、廠商 pptx 等。**slides.md 不直接引用這裡。**
- `public/` — 上述素材經**手動挑選並改名為英文**後的副本（如 `天花板/ceiling.jpg` → `public/ceiling.jpg`、`門外/示意圖.jpg` → `public/door-out-design1.jpg`、`咖啡廳/電視螢幕.jpg` → `public/cafe-tv.jpg`）。slides.md 一律以**根路徑絕對引用**：`<img src="/diagram.png" />`、或元件的 `image="/cafe-tv.jpg"`。

新增圖片時：把原圖放進對應的 `src/<區域>/`，再以英文命名複製到 `public/`，slides.md 引用 `/<檔名>`。`src/` 與 `public/` 並非自動同步，改名對應關係需自己維護。

## slides.md 與元件

採 markdown-heavy 模式：slide 內容直接寫在 `slides.md`，版面用內聯 UnoCSS class（深色 teal 漸層風格）。僅兩個領域元件，定義在 `components/`，於 markdown 中直接使用（Slidev 自動註冊，無需 import）：

- `QuoteItem` — 單品報價列，`price × qty` 自動算總價。props：`index name spec? image unit price qty`。
- `CostItem` — 工材費項目列（價格為字串、可無圖）。props：`index name spec? image? cost`。

兩者皆用 `toLocaleString('zh-TW')` 格式化金額、teal 強調色。新增類似列項時沿用這兩個元件，不要在 markdown 重刻卡片。

## 樣板殘留（可忽略 / 可刪）

以下為 `slidev create` 樣板遺留，目前**未被 slides.md 使用**：`components/Counter.vue`、`pages/imported-slides.md`、`snippets/external.ts`、`README.md`、`pnpm-workspace.yaml`（本 monorepo 用 bun，非 pnpm）。編輯內容時不需理會它們。

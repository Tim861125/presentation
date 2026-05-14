# shadcn/ui 簡報規格文件 (Spec)

> 本文件整理 shadcn/ui 的核心概念、特性與生態，作為 `slides.md` 簡報內容的參考依據。
> 主要資料來源：
> - 官網：https://ui.shadcn.com/
> - 文件：https://ui.shadcn.com/docs
> - GitHub：https://github.com/shadcn-ui/ui （MIT License，~114k stars）

---

## 1. 簡報主題定位

**主標題**：shadcn/ui — The Foundation for your Design System
**副標題**：「Open Source. Open Code.」
**核心訊息（必須打進觀眾腦袋的一句）**：

> **「shadcn/ui 不是一個 component library，而是教你如何打造自己的 component library。」**
>
> (This is not a component library. It is how you build your component library.)

---

## 2. 核心理念（Why shadcn/ui Exists）

### 傳統 component library 的痛點

| 痛點 | 解釋 |
|------|------|
| **黑盒子** | 元件是 npm 套件，內部實作被封裝，無法直接看到 / 修改 |
| **客製化困難** | 需要透過 props、CSS override、wrapper 元件繞路 |
| **升級代價高** | 套件升級可能 break API；版本鎖死 |
| **設計風格被綁定** | 想換主題、改一個 padding 都得跟原始作者的 API 妥協 |

### shadcn/ui 的解法

- **複製原始碼到你的專案**，不是安裝 npm 套件
- 元件程式碼就是你的程式碼，**直接改 button.tsx 即可**
- 沒有 vendor lock-in，沒有「等作者修 bug」

---

## 3. 五大核心原則（Five Core Principles）

| 原則 | 說明 | 對觀眾的價值 |
|------|------|-------------|
| **Open Code** | 元件原始碼直接寫進你的專案，最頂層可改 | 完全透明、完全掌控 |
| **Composition** | 所有元件共用一致、可預測的介面 | 易學易記，元件間能組合 |
| **Distribution** | 透過 flat-file schema + CLI 散佈元件 | 跨專案、跨團隊共用容易 |
| **Beautiful Defaults** | 開箱即用就很美，預設值用心調過 | 不用設計師也能做出像樣的 UI |
| **AI-Ready** | 原始碼公開，LLM 能讀、能理解、能改 | AI Coding 時代的最佳搭檔 |

---

## 4. 技術組成（Tech Stack）

```
┌─────────────────────────────────────┐
│        shadcn/ui Components         │  ← 你複製到專案的程式碼
├─────────────────────────────────────┤
│  Radix UI / Base UI (Headless)      │  ← 行為、無障礙、鍵盤導覽
├─────────────────────────────────────┤
│        Tailwind CSS v4              │  ← 樣式
├─────────────────────────────────────┤
│       CSS Variables (OKLCH)         │  ← 主題系統
└─────────────────────────────────────┘
```

- **Headless 基底**：Radix UI（預設）或 Base UI
- **樣式**：Tailwind CSS（v4 起為主流）
- **顏色系統**：OKLCH（感知均勻色彩空間，比 RGB/HEX 在不同亮度下更一致）
- **CLI**：`shadcn` npm 套件，搭配 `npx`/`pnpm dlx` 使用

---

## 5. 支援的框架（Supported Frameworks）

| 框架 | 支援程度 |
|------|---------|
| **Next.js** | 一等公民，App Router / Pages Router 皆支援 |
| **Vite** | ✅ |
| **TanStack Start** | ✅ |
| **React Router** | ✅ |
| **Astro** | ✅ |
| **Laravel** | ✅ |
| **React (手動)** | ✅ |

> Registry 系統本身不限於 React，**任何框架都可以建立自己的 registry**。

---

## 6. CLI 工具核心指令

### 安裝 / 初始化

```bash
# 視覺化建立 preset（最新推薦）
pnpm dlx shadcn@latest create

# 直接初始化指定框架
pnpm dlx shadcn@latest init -t next
```

### 加入元件

```bash
# 加單個
pnpm dlx shadcn@latest add button

# 一次加多個
pnpm dlx shadcn@latest add button card dialog

# 全部加進來
pnpm dlx shadcn@latest add --all
```

### 其他重要指令

| 指令 | 用途 |
|------|------|
| `view` | 先看元件原始碼再決定要不要裝 |
| `search` / `list` | 在 registry 中搜尋 / 列出元件 |
| `apply` | 套用 preset（可只套用主題或字型） |
| `build` | 從 `registry.json` 產出 registry 檔 |
| `docs` | 取得元件文件，方便給 AI 讀 |
| `migrate` | 專案級轉換（RTL 支援、Radix 套件統一） |

---

## 7. 元件清單（70+ Components）

### 表單與輸入
Button, Button Group, Checkbox, Input, Input Group, Input OTP, Label,
Native Select, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group

### 顯示與佈局
Accordion, Alert, Avatar, Badge, Breadcrumb, Card, Carousel,
Separator, Skeleton, Typography

### 覆蓋層 / 對話框
Alert Dialog, Dialog, Drawer, Hover Card, Popover, Sheet, Tooltip

### 導覽
Command, Context Menu, Dropdown Menu, Menubar, Navigation Menu, Pagination

### 資料呈現
Chart, Data Table, Progress, Scroll Area, Table, Tabs

### 特殊元件
Aspect Ratio, Calendar, Collapsible, Combobox, Date Picker, Direction,
Empty, Field, Item, Kbd, Resizable, **Sidebar**, **Sonner**, Spinner

---

## 8. Blocks — 預先組好的區塊

> 不只是元件，還有「整塊組好的 UI 區塊」可以複製。

| 類別 | 內容 |
|------|------|
| **Dashboard** | 含 sidebar、charts、data table 的完整儀表板 |
| **Sidebar** | 多種變體：可收合 icon 模式、子選單、複合佈局 |
| **Login** | 多種登入頁版型（含背景圖、純色背景） |
| **Signup** | 註冊頁 |
| **Calendar** | 行事曆區塊 |

→ https://ui.shadcn.com/blocks

---

## 9. 主題系統（Theming）

### CSS Variables + OKLCH

```css
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
}

.dark {
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
}
```

### 語義配對（Semantic Pairing）

每個表面色都搭配一個 `-foreground` 文字色，
寫 `bg-primary text-primary-foreground` 自動有正確對比。

| Token | 用途 |
|-------|------|
| `background` / `foreground` | 預設背景與文字 |
| `card` / `card-foreground` | 卡片、面板 |
| `primary` / `primary-foreground` | 主要按鈕、品牌色 |
| `secondary` / `secondary-foreground` | 次要動作 |
| `muted` / `muted-foreground` | 提示、placeholder |
| `accent` / `accent-foreground` | hover / focus 狀態 |
| `destructive` | 錯誤、刪除 |
| `border` / `input` / `ring` | 結構性元素 |

### Radius Scale

```css
--radius-sm: calc(var(--radius) * 0.6);
--radius-md: calc(var(--radius) * 0.8);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) * 1.4);
```

→ 改一個 `--radius`，**全站圓角同步調整**。

### Base Color 選項
Neutral, Stone, Zinc, Mauve, Olive, Mist, Taupe

### Dark Mode

直接覆蓋同一組 token，加 `.dark` selector 即可，**不用改元件程式碼**。

---

## 10. Registry 系統（最被低估的功能）

### 什麼是 Registry？

一個「**程式碼散佈協定**」，讓你可以：

- 建立自己公司 / 團隊的元件 registry
- 用 `shadcn` CLI 安裝你自己定義的元件
- 不限 React、不限框架

### 運作流程

```
registry.json  ──build──>  /r/<component>.json  ──CLI add──>  你的專案
```

### 應用場景

- **公司內部設計系統**：把品牌按鈕、表單元件做成 registry，新專案 `add` 就能用
- **私有元件**：透過環境變數做 auth，限定團隊使用
- **跨專案複用**：不用發 npm 套件、不用 monorepo 也能共享

---

## 11. AI 時代：MCP Server

### shadcn MCP Server

讓 AI（Claude、Cursor、Copilot、Codex）**直接從 registry 安裝元件**。

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

### 支援的 client 設定檔

| Client | 設定檔 |
|--------|--------|
| Claude Code | `.mcp.json` |
| Cursor | `.cursor/mcp.json` |
| VS Code (Copilot) | `.vscode/mcp.json` |
| Codex | `~/.codex/config.toml` |

### 能做什麼

- 用自然語言搜尋元件：「幫我加一個帶 OTP 驗證的登入表單」
- 一次串接多個 registry（官方 + 公司私有）
- AI 能讀懂元件原始碼 → 改得更準確

---

## 12. 重要元件深入：Data Table

> shadcn 的哲學在這裡最明顯：**不給你一個萬能元件，而是給你蓋積木的工具。**

- 底層：**TanStack Table（headless）**
- 你自己組：`<Table />` + 你寫的 columns 定義
- 支援：排序、篩選、欄位顯隱、列選取、分頁、自訂渲染

→ 為什麼這樣設計？
> "It doesn't make sense to combine all of these variations into a single component."

## 13. 重要元件深入：Chart

- 底層：**Recharts（v3）**
- 不做 wrapper、用 composition
- 自己用 Recharts 原生元件搭配 `<ChartTooltip>` / `<ChartLegendContent>`
- 主題透過 CSS Variables 控制

---

## 14. 最新動態（2025–2026）

| 時間 | 更新 |
|------|------|
| **2026/05** | CLI 支援 `package.json#imports`，monorepo 友善；registry 支援 target aliases |
| **2026/04** | Preset Commands（decode / resolve / share）、**Sera Style**（serif 字型風格）、Partial Preset Apply、`--pointer` 選項 |
| **2025** | RTL 支援、Radix 套件統一、**MCP Server**、CLI v3.0、Tailwind v4 相容 |

---

## 15. 簡報結構建議（slides.md 大綱）

> 以下為建議的章節順序，每節對應 1–3 張投影片。

1. **封面** — shadcn/ui: The Foundation for your Design System
2. **這不是一個 component library** — 核心衝擊性訊息
3. **傳統 library 的痛點** — 黑盒子、客製化困難
4. **shadcn 的解法** — 複製原始碼，不是裝套件
5. **五大原則** — Open Code / Composition / Distribution / Beautiful Defaults / AI-Ready
6. **技術堆疊** — Radix + Tailwind + CSS Vars (OKLCH)
7. **快速開始** — `shadcn init` Live Demo
8. **加入元件** — `shadcn add button` Live Demo
9. **元件總覽** — 70+ 元件分類展示
10. **Blocks** — 預組區塊：Dashboard / Sidebar / Login
11. **Theming 深入** — CSS Variables + 語義配對
12. **Dark Mode** — 一個 selector 搞定
13. **Data Table 案例** — Composition 哲學的最佳體現
14. **Registry 系統** — 打造你公司的元件散佈協定
15. **MCP Server** — AI 直接幫你裝元件
16. **2026 最新動態** — Sera Style、Preset、Monorepo
17. **Q & A / 連結整理**

---

## 16. 參考連結（slides 末頁附上）

- 官網：https://ui.shadcn.com/
- 文件：https://ui.shadcn.com/docs
- 元件總覽：https://ui.shadcn.com/docs/components
- Blocks：https://ui.shadcn.com/blocks
- Themes：https://ui.shadcn.com/themes
- Registry 文件：https://ui.shadcn.com/docs/registry
- MCP 文件：https://ui.shadcn.com/docs/mcp
- GitHub：https://github.com/shadcn-ui/ui
- 作者 shadcn (@shadcn) — https://x.com/shadcn

---

## 17. Demo 點子（可選擇 1–2 個現場操作）

1. **30 秒裝出一個 Login 頁** — `shadcn init` → `add` login block
2. **改主題色** — 修一行 `--primary`，整站變色
3. **MCP 對話** — 在 Claude Code 裡說「加一個帶圖表的 dashboard」
4. **建自己的 registry** — 把一個 customized button 包成 registry.json

---

## 18. 官方文件章節網址總覽（Doc URL Map）

> 來源：https://ui.shadcn.com/docs 側邊欄完整爬梳。
> 簡報撰寫時若需查證某個主題的細節，直接打開對應網址即可。

### 18.1 主要章節（Main Sections）

| 章節 | URL |
|------|-----|
| Introduction | https://ui.shadcn.com/docs |
| Installation | https://ui.shadcn.com/docs/installation |
| components.json | https://ui.shadcn.com/docs/components-json |
| Package Imports | https://ui.shadcn.com/docs/package-imports |
| Theming | https://ui.shadcn.com/docs/theming |
| Dark Mode | https://ui.shadcn.com/docs/dark-mode |
| CLI | https://ui.shadcn.com/docs/cli |
| Monorepo | https://ui.shadcn.com/docs/monorepo |
| Components | https://ui.shadcn.com/docs/components |
| Registry | https://ui.shadcn.com/docs/registry |
| MCP Server | https://ui.shadcn.com/docs/mcp |
| Skills | https://ui.shadcn.com/docs/skills |
| Forms | https://ui.shadcn.com/docs/forms |
| RTL | https://ui.shadcn.com/docs/rtl |
| JavaScript | https://ui.shadcn.com/docs/javascript |
| Figma | https://ui.shadcn.com/docs/figma |
| v0 | https://ui.shadcn.com/docs/v0 |
| Legacy | https://ui.shadcn.com/docs/legacy |
| Changelog | https://ui.shadcn.com/docs/changelog |

### 18.2 Installation（依框架）

- https://ui.shadcn.com/docs/installation/next
- https://ui.shadcn.com/docs/installation/vite
- https://ui.shadcn.com/docs/installation/tanstack
- https://ui.shadcn.com/docs/installation/laravel
- https://ui.shadcn.com/docs/installation/react-router
- https://ui.shadcn.com/docs/installation/astro
- https://ui.shadcn.com/docs/installation/manual

### 18.3 Dark Mode（依框架）

- https://ui.shadcn.com/docs/dark-mode/next
- https://ui.shadcn.com/docs/dark-mode/vite
- https://ui.shadcn.com/docs/dark-mode/astro
- https://ui.shadcn.com/docs/dark-mode/remix
- https://ui.shadcn.com/docs/dark-mode/tanstack-start

### 18.4 CLI 指令

- https://ui.shadcn.com/docs/cli/init
- https://ui.shadcn.com/docs/cli/add
- https://ui.shadcn.com/docs/cli/apply
- https://ui.shadcn.com/docs/cli/preset
- https://ui.shadcn.com/docs/cli/preset-decode
- https://ui.shadcn.com/docs/cli/preset-resolve
- https://ui.shadcn.com/docs/cli/preset-url
- https://ui.shadcn.com/docs/cli/preset-open
- https://ui.shadcn.com/docs/cli/view
- https://ui.shadcn.com/docs/cli/search
- https://ui.shadcn.com/docs/cli/build
- https://ui.shadcn.com/docs/cli/docs
- https://ui.shadcn.com/docs/cli/info
- https://ui.shadcn.com/docs/cli/migrate
- https://ui.shadcn.com/docs/cli/migrate-rtl
- https://ui.shadcn.com/docs/cli/migrate-radix

### 18.5 Forms

- https://ui.shadcn.com/docs/forms/react-hook-form
- https://ui.shadcn.com/docs/forms/tanstack-form

### 18.6 Registry

- https://ui.shadcn.com/docs/registry/getting-started
- https://ui.shadcn.com/docs/registry/namespace
- https://ui.shadcn.com/docs/registry/authentication
- https://ui.shadcn.com/docs/registry/examples
- https://ui.shadcn.com/docs/registry/mcp

### 18.7 Components（共 58 個，路徑前綴 `/docs/components/radix/`）

- https://ui.shadcn.com/docs/components/radix/accordion
- https://ui.shadcn.com/docs/components/radix/alert
- https://ui.shadcn.com/docs/components/radix/alert-dialog
- https://ui.shadcn.com/docs/components/radix/aspect-ratio
- https://ui.shadcn.com/docs/components/radix/avatar
- https://ui.shadcn.com/docs/components/radix/badge
- https://ui.shadcn.com/docs/components/radix/breadcrumb
- https://ui.shadcn.com/docs/components/radix/button
- https://ui.shadcn.com/docs/components/radix/button-group
- https://ui.shadcn.com/docs/components/radix/calendar
- https://ui.shadcn.com/docs/components/radix/card
- https://ui.shadcn.com/docs/components/radix/carousel
- https://ui.shadcn.com/docs/components/radix/chart
- https://ui.shadcn.com/docs/components/radix/checkbox
- https://ui.shadcn.com/docs/components/radix/collapsible
- https://ui.shadcn.com/docs/components/radix/combobox
- https://ui.shadcn.com/docs/components/radix/command
- https://ui.shadcn.com/docs/components/radix/context-menu
- https://ui.shadcn.com/docs/components/radix/data-table
- https://ui.shadcn.com/docs/components/radix/date-picker
- https://ui.shadcn.com/docs/components/radix/dialog
- https://ui.shadcn.com/docs/components/radix/direction
- https://ui.shadcn.com/docs/components/radix/drawer
- https://ui.shadcn.com/docs/components/radix/dropdown-menu
- https://ui.shadcn.com/docs/components/radix/empty
- https://ui.shadcn.com/docs/components/radix/field
- https://ui.shadcn.com/docs/components/radix/hover-card
- https://ui.shadcn.com/docs/components/radix/input
- https://ui.shadcn.com/docs/components/radix/input-group
- https://ui.shadcn.com/docs/components/radix/input-otp
- https://ui.shadcn.com/docs/components/radix/item
- https://ui.shadcn.com/docs/components/radix/kbd
- https://ui.shadcn.com/docs/components/radix/label
- https://ui.shadcn.com/docs/components/radix/menubar
- https://ui.shadcn.com/docs/components/radix/native-select
- https://ui.shadcn.com/docs/components/radix/navigation-menu
- https://ui.shadcn.com/docs/components/radix/pagination
- https://ui.shadcn.com/docs/components/radix/popover
- https://ui.shadcn.com/docs/components/radix/progress
- https://ui.shadcn.com/docs/components/radix/radio-group
- https://ui.shadcn.com/docs/components/radix/resizable
- https://ui.shadcn.com/docs/components/radix/scroll-area
- https://ui.shadcn.com/docs/components/radix/select
- https://ui.shadcn.com/docs/components/radix/separator
- https://ui.shadcn.com/docs/components/radix/sheet
- https://ui.shadcn.com/docs/components/radix/sidebar
- https://ui.shadcn.com/docs/components/radix/skeleton
- https://ui.shadcn.com/docs/components/radix/slider
- https://ui.shadcn.com/docs/components/radix/sonner
- https://ui.shadcn.com/docs/components/radix/spinner
- https://ui.shadcn.com/docs/components/radix/switch
- https://ui.shadcn.com/docs/components/radix/table
- https://ui.shadcn.com/docs/components/radix/tabs
- https://ui.shadcn.com/docs/components/radix/textarea
- https://ui.shadcn.com/docs/components/radix/toast
- https://ui.shadcn.com/docs/components/radix/toggle
- https://ui.shadcn.com/docs/components/radix/toggle-group
- https://ui.shadcn.com/docs/components/radix/tooltip
- https://ui.shadcn.com/docs/components/radix/typography

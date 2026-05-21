# shadcn-ui Slidev Deck — 全面重構 Design Spec

**日期：** 2026-05-21
**狀態：** Draft（待使用者 review）
**目的：** 修復 `shadcn-ui` deck 無法正常啟動的問題；同時把整份簡報重構為 dogfooding shadcn-vue 元件的展示（簡報主題就是 shadcn/ui，必須真的用到它）。

---

## 1. 動機

### 根本問題

`bun run dev` 看似「跑不起來」，實際 dev server 有成功啟動並監聽 `localhost:3030`。真正原因是 **`slides.md` 是 0 bytes 空檔案** — slidev 找不到任何 slide 可顯示。

### 衍生問題

- 17 個 `*Slide.vue` 元件已寫好但無處引用（`slides.md` 為空）。
- 自製 `ShadCard.vue` / `ShadBadge.vue` 只是 `<div>` + Tailwind 包裝，名字像 shadcn-vue 但**不是**。簡報主題是 shadcn/ui，這種「名實不符」與內容形成矛盾。
- Deck 目錄殘留 `pnpm-lock.yaml`（209 KB）、`pnpm-workspace.yaml`（`shamefullyHoist: true`）、本地 `node_modules/`（440 項目）。與 root bun workspace 規範不一致。

## 2. 目標

1. **修復啟動**：補完 `slides.md`，串接 14 張 slide，使 `bun run dev` 可實際呈現完整簡報。
2. **Dogfooding**：每張 slide 直接使用原生 shadcn-vue 元件（`Card`/`CardHeader`/`CardTitle`/`CardContent`/`Badge`/`Button`/`Separator`），讓簡報本身成為「我也在用 shadcn-vue」的活證明。
3. **清理 monorepo 殘留**：刪除 pnpm 相關檔案與本地 `node_modules`，回歸 root bun workspace hoisting。
4. **Dogfooding 「Open Code」精神**：透過修改 `components/ui/badge/index.ts` 新增 `success` variant，現場示範 spec § 2「複製到專案後直接改 badge.tsx 即可」的核心訊息。

## 3. 非目標

- **不改** `style.css`，不加 light theme dual mode（dogfooding theme switching 是另一輪工作）。
- **不重新設計**任何 slide 的視覺風格 — 保留 zinc-950 / emerald accent 配色。
- **不新增** shadcn-vue 元件套件（不裝 Tabs / Accordion / Dialog / Avatar / Skeleton 等）— 現有 5 個（`alert / badge / button / card / separator`）足夠。
- **不改** `spec.md`（內容來源不動）。
- **不動** root `package.json` / `bun.lock`。
- **不動** root `CLAUDE.md` / `README.md`。

## 4. 架構與檔案處置

### 4.1 刪除

| 路徑 | 原因 |
|------|------|
| `shadcn-ui/pnpm-lock.yaml` | 與 root bun.lock 衝突，pnpm 殘留 |
| `shadcn-ui/pnpm-workspace.yaml` | `shamefullyHoist: true` 為 pnpm-only 設定 |
| `shadcn-ui/node_modules/` | 應走 root hoisting |
| `shadcn-ui/components/ShadCard.vue` | 被原生 shadcn-vue `Card` 取代 |
| `shadcn-ui/components/ShadBadge.vue` | 被原生 shadcn-vue `Badge` 取代 |

### 4.2 保留不動

`components.json` / `style.css` / `uno.config.ts` / `vite.config.ts` / `tsconfig.json` / `lib/utils.ts` / `package.json` / `spec.md` / `netlify.toml` / `vercel.json` / `components/SlideHeader.vue` / `components/ui/*`（除了 Badge 的 variants）

### 4.3 新增 / 修改

| 路徑 | 變更類型 | 說明 |
|------|---------|------|
| `slides.md` | 重寫（0 bytes → 完整內容） | frontmatter + 14 張 slide 引用 |
| `components/ui/badge/index.ts` | 修改 | `badgeVariants.variant` 新增 `success` |
| `components/TitleSlide.vue` | 修改 | `<ShadBadge>` → `<Badge>` |
| `components/CoreMessageSlide.vue` | 不動 | 不用 ShadCard/ShadBadge |
| `components/PainPointsSlide.vue` | 修改 | `<ShadCard>` → 原生 `<Card>...`、`<ShadBadge>` → `<Badge>` |
| `components/SolutionSlide.vue` | 修改 | 已 dogfooding，僅把剩餘 `<ShadBadge>` 改成 `<Badge>` |
| `components/PrinciplesSlide.vue` | 修改 | `<ShadCard>` → 原生 `<Card>...` |
| `components/TechStackSlide.vue` | 修改 | `<ShadCard>` → 原生、`<ShadBadge>` → `<Badge>` |
| `components/CLISlide.vue` | 不動 | 不用 ShadCard/ShadBadge |
| `components/ComponentsOverviewSlide.vue` | 修改 | `<ShadCard>` → 原生 |
| `components/BlocksSlide.vue` | 修改 | `<ShadCard>` → 原生 |
| `components/ThemingSlide.vue` | 不動 | 不用 ShadCard/ShadBadge |
| `components/RegistrySlide.vue` | 修改 | `<ShadCard>` → 原生、`<ShadBadge>` → `<Badge>` |
| `components/MCPSlide.vue` | 修改 | `<ShadCard>` → 原生、`<ShadBadge>` → `<Badge>` |
| `components/LatestUpdatesSlide.vue` | 修改 | `<ShadBadge>` → `<Badge>`（含 `variant="success"`） |
| `components/SummarySlide.vue` | 修改 | `<ShadCard>` → 原生 |

## 5. Slide 流程設計

保留傳統三段式：**痛點 → 解法 → 核心訊息**。

| # | Slide | spec.md 章節 | 主要 shadcn-vue 元件 |
|---|-------|--------------|----------------------|
| 1 | TitleSlide | § 1 主題定位 | Badge |
| 2 | PainPointsSlide | § 2 傳統 component library 痛點 | Card, Badge |
| 3 | SolutionSlide | § 2 shadcn/ui 解法（含 live demo） | Card, Button, Badge |
| 4 | CoreMessageSlide | § 1 核心訊息 | — |
| 5 | PrinciplesSlide | § 3 五大核心原則 | Card |
| 6 | TechStackSlide | § 4 技術組成 | Card, Badge |
| 7 | CLISlide | § 6 CLI 工具 | Badge |
| 8 | ComponentsOverviewSlide | § 7 元件清單 | Card |
| 9 | BlocksSlide | § 8 Blocks | Card |
| 10 | ThemingSlide | § 9 主題系統 | Separator |
| 11 | RegistrySlide | § 10 Registry | Card, Badge |
| 12 | MCPSlide | § 11 MCP Server | Card, Badge |
| 13 | LatestUpdatesSlide | § 12 最新動態 | Card, Badge, Separator |
| 14 | SummarySlide | Wrap up | Card |

## 6. `slides.md` 結構

```yaml
---
theme: default
colorSchema: dark
highlighter: shiki
css: unocss
title: shadcn/ui — The Foundation for your Design System
info: |
  shadcn/ui — The Foundation for your Design System
  Open Source · Open Code
transition: fade
mdc: true
---

<TitleSlide />

---

<PainPointsSlide />

---

<SolutionSlide />

---

<CoreMessageSlide />

---

<PrinciplesSlide />

---
（依此類推至 SummarySlide）
```

每張 slide 以 `---` 分隔。`TitleSlide` / `CoreMessageSlide` 是全版面 cover 風格的 slide（元件內已自帶滿版背景），不需要 layout frontmatter。

## 7. Dogfooding 替換規則（關鍵）

### 7.1 `ShadCard` → 原生 shadcn-vue `Card`

**舊**（`ShadCard.vue` 自製 wrapper）：

```vue
<ShadCard v-click title="黑盒子（Black Box）" dot color="red" size="md">
  <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
    元件是 npm 套件，內部實作被封裝。
  </p>
  <div class="rounded bg-black/40 p-2 ...">...</div>
</ShadCard>
```

**新**（直接使用原生 shadcn-vue `Card` 組合）：

```vue
<Card v-click class="bg-white/[0.03] border-white/10 gap-2 py-2.5 rounded-lg shadow-none">
  <CardHeader class="px-3 gap-0.5">
    <CardTitle class="text-xs flex items-center gap-1.5 text-zinc-100">
      <span class="size-1.5 rounded-full bg-red-400" />
      黑盒子（Black Box）
    </CardTitle>
  </CardHeader>
  <CardContent class="px-3 text-[11px] text-zinc-300 leading-relaxed">
    <p class="mb-2">元件是 npm 套件，內部實作被封裝。</p>
    <div class="rounded bg-black/40 p-2 ...">...</div>
  </CardContent>
</Card>
```

**展開規則**：
- `title="X"` → `<CardHeader><CardTitle>X</CardTitle></CardHeader>`
- `dot color="red"` → `<span class="size-1.5 rounded-full bg-red-400" />` 寫進 `CardTitle` 內最前面
- 內部 default slot 內容 → `<CardContent>` 內
- `v-click` directive 仍綁在最外層 `<Card>`

**Padding override**（必要 — 否則視覺爆炸）：

原生 `<Card>` 的預設 class 是 `flex flex-col gap-6 rounded-xl border py-6 shadow-sm`，`<CardHeader>` / `<CardContent>` 預設 `px-6`。對 slide 內密集排版來說太大（ShadCard 原本只用 `p-2` ~ `p-4`），**每處替換時必須**用 utility 蓋掉：

| ShadCard size | `<Card>` 加 class | `<CardHeader>` / `<CardContent>` 加 class |
|---------------|-------------------|--------------------------------------------|
| `size="sm"`   | `gap-1 py-2 rounded-lg shadow-none` | `px-2` |
| `size="md"`（預設）| `gap-2 py-2.5 rounded-lg shadow-none` | `px-3` |
| `size="lg"`   | `gap-2 py-3 rounded-lg shadow-none` | `px-4` |

`shadow-none` 是因為 ShadCard 本來沒 shadow；`rounded-lg` 因 ShadCard 是 `rounded-lg` 而非 `rounded-xl`。

### 7.2 Dot color 對應表（保留 ShadCard 原有色票）

```
blue   → bg-blue-400
green  → bg-emerald-400
purple → bg-purple-400
orange → bg-orange-400
red    → bg-red-400
yellow → bg-yellow-400
cyan   → bg-cyan-400
pink   → bg-pink-400
zinc   → bg-zinc-400
```

### 7.3 `ShadBadge` → 原生 shadcn-vue `Badge`

直接把 import 換掉、tag 換掉：

```vue
<!-- 舊 -->
import ShadBadge from './ShadBadge.vue'
<ShadBadge variant="outline">React</ShadBadge>
<ShadBadge variant="success">NEW</ShadBadge>

<!-- 新 -->
import { Badge } from '@/components/ui/badge'
<Badge variant="outline">React</Badge>
<Badge variant="success">NEW</Badge>  <!-- 用到下一節新增的 variant -->
```

### 7.4 `Badge.vue` 新增 `success` variant（dogfooding 核心示範）

修改 `components/ui/badge/index.ts` 的 `badgeVariants` cva：

```ts
const badgeVariants = cva(
  // base classes 不動
  '...',
  {
    variants: {
      variant: {
        default: '...',         // 不動
        secondary: '...',       // 不動
        destructive: '...',     // 不動
        outline: '...',         // 不動
        // ↓ 新增（用 [a&]: prefix 與其他 variants 一致：當 Badge 渲染為 <a> 時才套用 hover）
        success: 'border-transparent bg-emerald-500/15 text-emerald-300 [a&]:hover:bg-emerald-500/20',
      },
    },
  },
)
```

這正是 spec.md § 2 的具體示範：「複製到專案後，元件 = 你的程式碼，直接改即可」— LatestUpdatesSlide 的 `<Badge variant="success">NEW</Badge>` 就直接展示了這件事。

## 8. 驗證

### 8.1 自動化檢查

- `bun install`（root）成功；`shadcn-ui/node_modules/` 不存在。
- `cd shadcn-ui && bun run dev` 無 ESM / 編譯 / TS error，dev server 在 `localhost:3030` 啟動。
- `cd shadcn-ui && bun run build` 成功產出 `dist/`。

### 8.2 視覺/功能檢查（手動）

- 瀏覽器 `localhost:3030` 第 1 張顯示 TitleSlide。
- 用方向鍵連按 13 次能順暢看完 14 張，每張無 layout overflow、無 console error。
- `SolutionSlide` 的 live demo 區塊：Button / Badge / Card 視覺正常（已有確認過）。
- `PainPointsSlide` 等使用原生 `Card` 的 slide：外觀與舊版相同（zinc-950 背景、emerald accent），不能視覺退化。
- `LatestUpdatesSlide` 的 `Badge variant="success"` 渲染為綠底綠字。
- 在 Vue devtools 確認頁面實際渲染的 Card / Badge 來自 `@/components/ui/*`（dogfooding 證據）。

## 9. 風險與緩解

| 風險 | 緩解 |
|------|------|
| 原生 Card 預設 `gap-6 py-6` / Header / Content 預設 `px-6`，是 ShadCard `p-2~p-4` 的 3 倍，直接用會讓 slide overflow | 嚴格遵守 § 7.1 的 padding override 表格；每張改完用瀏覽器目視對照原版 |
| 17 個 slide 內 ShadCard 數量多（~30+ 個 instance），手動替換易漏 | 用 grep 列出所有 `<ShadCard` / `<ShadBadge` 出現位置作為 checklist；改完再 grep 一次確認 0 個 |
| 改 `Badge.vue` 加 success variant，TS type 需同步 | cva 是型別推導源，新增 variant 後 `BadgeVariants['variant']` 會自動含 `'success'`，無需手動加 type |
| 刪除本地 `node_modules` 後 root bun install 沒裝齊 deck 自身 deps | install 完後 `ls shadcn-ui/node_modules` 應不存在；root `node_modules` 應有 `reka-ui` / `lucide-vue-next` 等 deck deps（bun workspace hoisting） |

## 10. 工作量估計

| 任務 | 估計行數 |
|------|---------|
| 刪除 pnpm 殘留 + 本地 node_modules | 0 |
| `slides.md` 撰寫 | ~50 行 |
| `Badge.vue` 加 success variant | ~3 行 |
| 11 個 slide 元件改寫（ShadCard/ShadBadge 替換 + 展開） | ~450 行新增、~200 行刪除 |
| 刪除 `ShadCard.vue` + `ShadBadge.vue` | -50 行 |
| **總計** | 新增 ~500 行、刪除 ~250 行 |

# Workspace Monorepo — Design Spec

**日期：** 2026-05-21
**狀態：** Approved
**目的：** 把 24 個獨立 Slidev decks 轉換為 bun workspace monorepo，消除 dependency 重複下載與磁碟浪費。

---

## 1. 動機

目前每個 deck 都是 self-contained 的 Slidev 專案，各自有 `package.json`、`bun.lock`、`node_modules`。實測現況：

- 共用核心 deps（`@slidev/cli`、`@slidev/theme-default`、`@slidev/theme-seriph`、`vue`）出現在所有 deck，僅版本散落於 17 種組合（`52.1.0` ~ `52.15.2`）
- 已安裝的 7 個 deck 的 `node_modules` 共 **3.6 GB**；若全部 install 完將破 12 GB
- 額外 deps（element-plus、reka-ui、zod 等）集中在 4 個 deck

把共用 deps 提到 root workspace，磁碟可降到 ~1 GB；任一 deck 首次 install 也從「裝 ~400 MB」變成「秒級 symlink」。

## 2. 目標

1. 共用 deps 集中到 root，所有 deck 共享 hoisted `node_modules`
2. 共用 deps 版本對齊到最新（`@slidev/cli@^52.15.2`、`vue@^3.5.33`）
3. 各 deck 仍保留獨立 `slides.md` / `components/`，開發體驗（`cd <deck> && bun run dev`）不變
4. 部署設定維持原狀（短期不部署）

## 3. 非目標

- **不動** `netlify.toml` / `vercel.json`：使用者表明短期沒有部署需求；下次實際 deploy 時再針對該 deck 處理
- **不寫** scaffold script for 新 deck：3 步驟手動已足夠（YAGNI）

## 4. 架構設計

### 4.1 Root `package.json`（新增）

```json
{
  "name": "presentation-decks",
  "private": true,
  "workspaces": ["*"],
  "dependencies": {
    "@slidev/cli": "^52.15.2",
    "@slidev/theme-default": "latest",
    "@slidev/theme-seriph": "latest",
    "vue": "^3.5.33"
  }
}
```

`workspaces: ["*"]` 把 root 所有子目錄列為候選 workspace；bun 自動跳過沒有 `package.json` 的目錄。

### 4.2 各 deck `package.json` 改造

從每個 deck 的 `dependencies` 移除以下四個共用 deps：

- `@slidev/cli`
- `@slidev/theme-default`
- `@slidev/theme-seriph`
- `vue`

deck-specific deps 保留原狀：

| Deck | 保留的 deps |
|---|---|
| `debunce`、`intersectionObserver` | `element-plus` |
| `zod` | `zod` |
| `shadcn-ui` | `@vueuse/core`、`class-variance-authority`、`clsx`、`lucide-vue-next`、`reka-ui`、`tailwind-merge`、`tw-animate-css`、`tailwindcss`、`@tailwindcss/vite` |

`scripts`（`build` / `dev` / `export`）不動。

### 4.3 修正 `name` 欄位（workspace 強制 unique）

| Deck | 改前 | 改後 |
|---|---|---|
| `csp` | `browserrendering` | `csp` |
| `rAF` | `browserrendering` | `raf` |
| `mjml` | `my-first-presentation` | `mjml` |
| `rIC` | `test` | `ric` |
| `month261` | `month251` | `month261` |

其他 deck 的 `name` 已正確，不動。

### 4.4 Lockfile

- 刪除 24 個 deck 內的 `bun.lock`
- root 跑一次 `bun install` 產生 root `bun.lock`

### 4.5 刪除空殼 deck `browserRendering/`

此目錄只殘留空 node_modules、沒有任何 source 或 `package.json`。整個目錄刪除。

## 5. 文件更新

### 5.1 root CLAUDE.md

- 把「No root `package.json`, no workspace tooling」段改為「Bun workspace root；root `package.json` 託管所有 deck 的共用 deps」
- Commands 段加註：**第一次操作要先在 root 跑 `bun install`**；之後 `cd <deck> && bun run dev` 行為不變
- 新增「Adding a new deck」段：複製 `shadcn-ui` 或 `month264` → 改 `package.json` 的 `name` → root `bun install`

### 5.2 root README.md

Quick start 改成：

```bash
bun install           # at repo root, once
cd <deck>
bun run dev
```

## 6. 邊界考量

### 6.1 共用 deps 的 hoist 範圍

Bun workspaces 預設把 hoistable deps 提到 root `node_modules`。各 deck 透過 Node module resolution 向上查找；Slidev 透過 `bun run dev` 從 deck 目錄啟動，會解析到 root 的 `@slidev/cli`。

### 6.2 deck-specific deps 的安裝位置

`element-plus` / `reka-ui` 等 deck-specific deps 仍登記在 deck 的 `package.json`，由 bun 決定 hoist 位置（root `node_modules` 或 deck-local），對開發體驗無差別。

### 6.3 升級舊 deck 的相容性風險

`@slidev/cli` 從 `52.1.0` 跨到 `52.15.2`，是 minor + patch 增量，沒跨 major。Slidev 在 52.x 內無 breaking change。風險可接受。若某舊 deck 在新版下出現 build 問題，再個案處理（pin 該 deck 版本至 root 對齊）。

### 6.4 部署仍寫 `npm run build` 的問題

目前 `netlify.toml` / `vercel.json` 的 `command` 是 `"npm run build"`。Workspace 化後本地用 `bun run build` 仍可，但部署平台跑 `npm run build` 時若依賴沒裝到位會失敗——但因短期不部署，此處不處理。

## 7. 風險與回退

- **風險：版本對齊後 1-2 個舊 deck build 失敗**
  - 回退：在該 deck 的 `package.json` 加回原本舊版本的 `@slidev/cli`；workspace 會優先用 deck-local 版，覆寫 root 的版本
- **風險：bun workspaces 對重名 / 路徑問題報錯**
  - 回退：每步改動後跑 `bun install` 驗證；錯誤訊息應該很明確

## 8. 完成驗收

1. Root `bun install` 成功，產生 root `bun.lock`
2. 進至少 3 個 deck（含 `shadcn-ui`、`month264`、`debunce`）跑 `bun run dev`，dev server 正常開啟
3. 跑 `bun run build` 在這 3 個 deck 都產生 `dist/`
4. 磁碟總量比改造前明顯下降（從 3.6 GB 量級降到 < 2 GB）

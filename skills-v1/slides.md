---
theme: sketch
title: Skills v1
footer: Skills v1 · RD 技術分享
info: |
  Skills v1：search-first、create-readme、changelog-generator
  丁吾心
layout: cover
---

# Skills v1

三個 skill：**search-first**、**create-readme**、**changelog-generator**。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
layout: section
---

<div class="eyebrow">Part 1</div>

# search-first

Research before you code：先看過再決定要不要寫

---
clicks: 4
---

# 故事：小明差點又手刻了一個輪子

<FlowScene
  :steps="['手刻輪子\n的前科', '想自己寫\n一個 skill', '等等…這不也\n是手刻輪子？', '先找現成的\nskill']"
  :notes="['套件早就有，寫完才發現', '寫程式前先叫 AI 找套件', '同一個坑又踩一次', '照自己要的流程去找']"
  result="找到 search-first"
/>

<div class="scene-caption">想解決「手刻輪子」的工具，結果自己差點也手刻，這正是 search-first 要擋的情況。</div>

<!--
我有手刻輪子的前科：功能寫完才發現 npm 上早就有現成套件。
[click] 所以想自己寫一個 skill，讓 AI 寫程式前先去找有沒有可用的套件。
[click] 但想一想，自己寫這個 skill 不也是在手刻輪子嗎？
[click] 於是先去找有沒有現成的 skill。
[click] 就找到了 search-first。接下來看它的流程。
-->

---
clicks: 4
hide: true
---

# 流程：Need → 搜尋 → 評估 → 決定

<SearchScene />

<div class="scene-caption">四個管道平行搜尋；沒跑到的管道要明講「跳過」，不能說「找不到」。</div>

<!--
需求：改版紀錄彈窗要把 CHANGELOG.md 解析成版本清單。先做 preflight，確認哪些搜尋管道能用。
[click] repo、npm、MCP / skills、GitHub 四路平行搜。gh 沒登入，就誠實標成跳過。
[click] 用功能、維護度、授權、相依幾個面向評分。
[click] 四種結局：直接裝、薄包一層、組合幾個小套件、自己寫。
[click] 這個例子選 Build：格式是自己 repo 固定的三種行，裝套件反而把整個 parser 打進前端。
-->

---
hide: true
---

# 示範：改版紀錄要不要裝 parser？

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### search-first 紀錄

```text {all|2|3-7|8-9}
Need: CHANGELOG.md → { version, date, sections }[]
Preflight: rg ✓ npm ✓ skills ✓ gh ✗（未登入）
Search:
  repo   rg "changelog"   → 沒有現成 parser
  npm    keep-a-changelog、changelog-parser
  通用   marked / markdown-it → 只給 AST
  skills changelog-generator → 產生端
Evaluate: 都能用，但整包進前端 bundle
Decide: BUILD，照 Keep a Changelog 規則寫
```

</div>
<div>

### 結果：`app/lib/changelog.ts`

```ts
const RELEASE_RE = /^##\s+\[([^\]]+)\](?:\s+-\s+(\S+))?/
const SECTION_RE = /^###\s+(.+?)\s*$/
const ITEM_RE = /^[-*]\s+(.+?)\s*$/

export function parseChangelog(md: string) {
  // 逐行比對三條 regex → ChangelogRelease[]
}
```

54 行、5 個 `bun:test`，沒有新增相依。

</div>
</div>

<div class="callout mt-4" v-click>

**重點：** search-first 不是「一定要裝套件」，是 **做決定前先看過**。Build 也要是查過之後的 Build。

</div>

---

# 決策矩陣與反模式

| 看到的訊號 | 決定 |
|---|---|
| 完全符合、維護良好、MIT / Apache | **Adopt** — 直接安裝使用 |
| 部分符合、基礎不錯 | **Extend** — 安裝＋寫一層薄 wrapper |
| 好幾個都只符合一點 | **Compose** — 組合 2–3 個小套件 |
| 沒有合適的 | **Build** — 自己寫，但參考查到的做法 |

<div class="callout mt-6" v-click>

**反模式：** 直接開寫、忘了查 MCP、**Silent skipping**（管道沒跑卻回報「找不到」）、包到失去原套件好處、為一個小功能裝一整包。

</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# create-readme

先讀完整個專案，再寫一份新人看得懂的 README

---
clicks: 3
---

# 快檢通的 README：只剩指令

<ReadmeScene />

<div class="scene-caption">現況三段都是指令；skill 先 review 整個專案，再補上介紹、功能、文件入口。</div>

<!--
左邊是 pes-ipc 目前的 README，28 行，三段全是 bun 指令。
[click] 新人 clone 下來會問：這是什麼專案、有哪些功能、規格寫在哪。
[click] create-readme 先讀整個 repo，產出有 logo、一句話介紹、Features、Getting started、Documentation 的 README。
[click] 重要警告用 GitHub admonition 標出來；License、Contributing、Changelog 有專門檔案，不寫進 README。
-->

---

# SKILL.md 的六條規則

| # | 規則 | 為什麼 |
|---|---|---|
| 1 | **先 review 整個專案與 workspace** 再動筆 | README 要寫專案「是什麼」，不只「怎麼跑」 |
| 2 | 參考四份範本 README 的結構與語氣 | Azure-Samples ×2、sinedied/smoke、run-on-output |
| 3 | 不濫用 emoji，簡潔 | 讀者要的是資訊 |
| 4 | **不寫** LICENSE / CONTRIBUTING / CHANGELOG 段落 | 已有專門檔案，避免兩邊不同步 |
| 5 | GFM ＋ admonition（`> [!NOTE]`、`> [!WARNING]`） | 警告不會埋在段落裡 |
| 6 | 找得到 logo 就放 header | `public/brand/innovue-blue.svg` |

<div class="callout mt-6" v-click>

**Gotcha：** skill 會自己挑內容。寫完要人工對過指令和連結，尤其是只在某台機器才有的步驟。

</div>

---

# Before / After：快檢通 README

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 現況（28 行）

```markdown
## 快速開始
bun install
cp .env.example .env
bun run dev

### 建置 / 預覽
bun run build
bun run preview

### 測試
bun test
bun run smoke both
```

</div>
<div>

### create-readme 的結構

```markdown {all|1-4|6-9|10-11}
<div align="center">
  <img src="public/brand/innovue-blue.svg" height="48">
  <h1>快檢通 — 台灣專利語意檢索</h1>
</div>

## Features         語意搜尋、以專利找相似、圖式…
## Getting started  Bun 1.3 → bun install → bun run dev
## Scripts          dev / build / typecheck / test / smoke
## Documentation    docs/spec.md、API.md、使用說明.md

> [!WARNING]
> 更新站台後必跑 `bun run smoke both`，失敗不得放行。
```

</div>
</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# changelog-generator

從 commit 產生 release note，順便算出下一個版號

---
clicks: 5
---

# 流程：v1.0.40 → v1.0.41

<FlowScene
  :steps="['git log\n20 commits', 'lint\n19 / 20 合格', '分類\nAdded · Fixed', 'semver\nminor', '人工\n潤稿']"
  :notes="['v1.0.40..v1.0.41', '版號 commit 不合格', 'Keep a Changelog', 'version_bumper', '刪單號、改用語']"
  result="CHANGELOG.md → 頁首 What's new"
/>

<div class="scene-caption">三支 Python 腳本負責解析，最後一步一定由人改成使用者看得懂的句子。</div>

<!--
用 git log 抓 v1.0.40 到 v1.0.41 的 20 個 commit。
[click] commit_linter 檢查 Conventional Commits，19 個合格，不合格的那個是 v1.0.41 版號 commit。
[click] generate_changelog 依 type 分到 Added、Fixed 等分類。
[click] version_bumper 看到 feat，建議 minor。
[click] 腳本草稿不能直接用，要人工潤稿。
[click] 結果寫進 CHANGELOG.md，之後還變成產品裡的改版紀錄彈窗。
-->

---

# 腳本草稿 vs 最終版

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### `generate_changelog.py` 原樣輸出

```markdown
### Added
- Show patent number and full title in the
  mobile record header from the ...
- Enlarge touch hit targets to 44px and keep
  variant toggle steady on sou...
- Validate patent number format before
  searching (#1000110)
### Fixed
- Skip rendering 0 results badge when no
  group is selected (#1000113)
```

</div>
<div>

### `CHANGELOG.md` 最終版

```markdown
### Added
- Check that a patent number is in a valid
  format before searching
- Show the patent number and full title in the
  mobile record header as soon as it opens
### Changed
- Make touch targets at least 44px, …
### Fixed
- Stop showing a "0 results" badge when no
  group is selected
```

</div>
</div>

<div class="callout mt-4" v-click>

**人工改了什麼：** 截斷的 `...` 補完、拿掉 task 單號（使用者：「don't show task number」）、只調尺寸的 `feat` 移到 Changed、排除 test / chore / 版號 commit。

</div>

---

# 版號：腳本建議，人來決定

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 指令

```bash
git log v1.0.40..v1.0.41 --oneline \
  | python3 scripts/version_bumper.py \
      --current-version 1.0.40 \
      --output-format json
```

### 輸出

```json
{
  "current_version": "1.0.40",
  "recommended_version": "1.1.0",
  "bump_type": "minor"
}
```

</div>
<div>

### SemVer 對應

| commit | bump |
|---|---|
| `type!:` 或 `BREAKING CHANGE:` | major |
| `feat` | minor |
| 其他（`fix`、`chore`…） | patch |

<div class="callout mt-4" v-click>

**實際決定：** 6 個 `feat` → 建議 v1.1.0；但專案一直只升 patch、v1.0.41 已 tag，所以 **保留**。

</div>
</div>
</div>

---

# 延伸：CHANGELOG 變成產品功能

<div class="grid grid-cols-2 gap-6">
<div>

<v-clicks>

- 再跑一次 skill，**補齊 v1.0.4 → v1.0.41 共 38 版**
- 使用者看不到改動的版本，統一寫「Maintenance and internal improvements」
- 日期用 **git tag 建立日**，不是寫檔當天
- 頁首版號可點 → 「What's new」彈窗，只展開目前版本
- 沒看過新版時版號旁亮小點（localStorage `changelog-seen`）

</v-clicks>

</div>
<div class="code-sm">

```ts
// ChangelogDialog.vue：打開彈窗才載入
const mod = await import('~~/CHANGELOG.md?raw')
releases.value = parseChangelog(mod.default)
```

<div class="callout blue mt-4">

一份 `CHANGELOG.md`，同時是 **repo 文件** 和 **使用者看到的 release note**。

</div>
</div>
</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# 把好習慣寫成 skill

查過再寫、README 寫清楚、release note 給人看

---
clicks: 3
---

# 回顧：三個卡點，三個 skill

<PainScene />

<!--
回到開發週期的三個時間點：寫新功能前、專案交接時、發版時。
[click] 寫功能前：改版紀錄彈窗差點自己刻 parser → search-first 先查過再決定。
[click] 交接時：README 只有三段指令 → create-readme 先讀完專案再寫。
[click] 發版時：20 個 commit 不等於 release note → changelog-generator 產草稿、算版號，人來潤稿。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

Skill 是一份 <em>SKILL.md</em>：把團隊的做法寫下來，agent 依 <em>description</em> 判斷何時照著做。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**觸發.** 打 `/changelog-generator`，或 agent 讀 `description` 自動載入。

</div>
<div class="callout">

**結構.** `SKILL.md` ＋ 選配的 `scripts/`、`references/`、`assets/`。

</div>
</div>

---

# 三個 skill 在開發週期的位置

| Skill | 什麼時候用 | 產出 |
|---|---|---|
| **search-first** | 動手寫程式 **之前** | 候選比較 ＋ Adopt / Extend / Compose / Build |
| **create-readme** | 專案 **交接 / 對外** 時 | 結構完整的 `README.md` |
| **changelog-generator** | **發版** 時 | `CHANGELOG.md` 段落 ＋ 下一個 semver 版號 |

<div class="callout blue mt-8" v-click>

**共同點：** skill 負責把流程跑完，最後一步都由人把關：選套件、對 README 內容、改 release note 用語。

</div>

---

# 參考資料

- search-first / create-readme / changelog-generator：`~/.claude/skills/<name>/SKILL.md`
- Keep a Changelog 1.1.0：[keepachangelog.com/en/1.1.0](https://keepachangelog.com/en/1.1.0/)
- Semantic Versioning 2.0.0：[semver.org](https://semver.org/spec/v2.0.0.html)
- Conventional Commits 1.0.0：[conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/)
- GitHub admonition 語法：[github.com/orgs/community/discussions/16925](https://github.com/orgs/community/discussions/16925)
- create-readme 範本：[Azure-Samples/serverless-chat-langchainjs](https://github.com/Azure-Samples/serverless-chat-langchainjs)、[sinedied/smoke](https://github.com/sinedied/smoke)
- 實際案例：快檢通 `pes-ipc` — `CHANGELOG.md`、`app/lib/changelog.ts`、commit `afaf3cc`

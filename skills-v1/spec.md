# Skills v1：search-first · create-readme · changelog-generator

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- skill name 一律寫原名（search-first、create-readme、changelog-generator），不要翻譯
- 實際案例：`/home/tim/repo/pes-ipc-changelog`（快檢通，台灣專利語意檢索 Nuxt POC，分支 `feat/changelog-dialog`）
- search-first 沒有實際使用紀錄，用「改版紀錄彈窗要解析 CHANGELOG.md」當示範情境（評分為示意）
- create-readme 在 pes-ipc 沒有實際執行紀錄；案例 = 現況 README（28 行，只有指令）＋依 skill 規則推導的改寫大綱

## 來源文件 / 參考連結

- search-first：`~/.claude/skills/search-first/SKILL.md`（origin: ECC）
- create-readme：`~/.claude/skills/create-readme/SKILL.md`
- changelog-generator：`~/.claude/skills/changelog-generator/`（`SKILL.md`、`scripts/generate_changelog.py`、`scripts/commit_linter.py`、`scripts/version_bumper.py`）
- Keep a Changelog 1.1.0：https://keepachangelog.com/en/1.1.0/
- Semantic Versioning 2.0.0：https://semver.org/spec/v2.0.0.html
- Conventional Commits 1.0.0：https://www.conventionalcommits.org/en/v1.0.0/
- GitHub admonition 語法：https://github.com/orgs/community/discussions/16925
- create-readme 參考 README：
  - https://github.com/Azure-Samples/serverless-chat-langchainjs
  - https://github.com/sinedied/smoke
- 實際案例 repo：`pes-ipc-changelog` — `CHANGELOG.md`（38 版，v1.0.4 → v1.0.41）、`app/lib/changelog.ts`、`app/components/ChangelogDialog.vue`、commit `afaf3cc`

## 摘要

Skill = 一份 `SKILL.md`（frontmatter 的 `name` + `description`）加上選配的 `scripts/`、`references/`、`assets/`。
Agent 依 `description` 自動判斷何時載入，或由使用者打 `/<name>` 觸發。三個 skill 剛好落在開發週期三個點：

| Skill | 時機 | 產出 |
| --- | --- | --- |
| search-first | 動手寫程式**之前** | 套件 / MCP / skill 候選比較 + Adopt / Extend / Compose / Build 決策 |
| create-readme | 專案**交接 / 對外**時 | 結構完整的 `README.md` |
| changelog-generator | **發版**時 | `CHANGELOG.md` 段落 + 下一個 semver 版號 |

### 1. search-first — Research Before You Code

**緣起（講者自己的故事）**：有手刻輪子的前科（寫完才發現早有套件）→ 原本想自己寫一個 skill，讓 AI 寫程式前先去找可用的套件 → 想想「自己寫 skill」不也是手刻輪子？→ 先找有沒有現成的 skill → 找到 search-first。這個過程本身就是 search-first 的示範。

流程：

0. Tool availability preflight — 先確認搜尋管道（`rg`、npm/pip、`gh auth status`、MCP、`~/.claude/skills`）在不在；缺的要**誠實說跳過**
1. Need analysis — 定義需要的功能、語言 / 框架限制
2. Parallel search（researcher agent）— npm/PyPI、MCP/Skills、GitHub/Web
3. Evaluate — 功能、維護度、社群、文件、授權、相依
4. Decide — Adopt / Extend / Compose / Build
5. Implement — 安裝套件 / 設定 MCP / 寫最少量的自訂程式

Quick mode（inline，腦中跑一遍）：

0. repo 內已經有嗎？→ `rg`
1. 常見問題？→ npm / PyPI
2. 有 MCP 嗎？→ `~/.claude/settings.json`
3. 有 skill 嗎？→ `~/.claude/skills/`
4. GitHub 有實作 / template 嗎？

Full mode：非簡單功能就開 `Agent(subagent_type="general-purpose", prompt="Research existing tools for: …")`

Decision matrix（原文）：

| Signal | Action |
|--------|--------|
| Exact match, well-maintained, MIT/Apache | **Adopt** — install and use directly |
| Partial match, good foundation | **Extend** — install + write thin wrapper |
| Multiple weak matches | **Compose** — combine 2-3 small packages |
| Nothing suitable found | **Build** — write custom, but informed by research |

Anti-patterns：Jumping to code、Ignoring MCP、Silent skipping（某管道沒跑卻說「找不到」）、Over-customizing、Dependency bloat。

Skill 內建範例：dead link checking → `textlint-rule-no-dead-link`（ADOPT）；config linter → `ajv-cli` + schema（ADOPT + EXTEND）。

**示範情境（running example）**：快檢通要做「點版號看改版紀錄」，前端得把 `CHANGELOG.md` 解析成 `{ version, date, sections }[]`。

```
Need: 把 Keep a Changelog 格式的 CHANGELOG.md 解析成版本清單（前端、打開彈窗才載入）
Preflight: rg ✓  npm ✓  gh ✗（未登入 → 只看公開 web）  skills ✓
Search:
  repo   rg "changelog"           → 沒有現成 parser
  npm    "keep a changelog parser" → keep-a-changelog、changelog-parser
  通用   marked / markdown-it      → 只給 AST，還要自己走訪
  skills ~/.claude/skills          → changelog-generator（產生端，不是解析端）
Evaluate: 套件功能都夠，但會把整個 parser 打進前端；格式是自己 repo 固定的三種行
Decide: BUILD — 約 50 行 regex parser + bun:test，寫法參考 keep-a-changelog 的格式規則
```

實際結果：`app/lib/changelog.ts`（54 行，三條 regex：`## [版本] - 日期`、`### 分類`、`- 條目`）+ 5 個測試。重點：search-first 不等於一定要裝套件，是「做決定前先看過」。

### 2. create-readme

SKILL.md 全文重點：

- Role：資深 open source 工程師，README 要「appealing, informative, easy to read」
- Task：
  1. 先 review 整個專案與 workspace，再寫 README.md
  2. 參考四份 README 的結構、語氣：Azure-Samples/serverless-chat-langchainjs、Azure-Samples/serverless-recipes-javascript、sinedied/run-on-output、sinedied/smoke
  3. 不要濫用 emoji，簡潔
  4. 不寫 LICENSE / CONTRIBUTING / CHANGELOG 段落（有專門檔案）
  5. 用 GFM，適當使用 GitHub admonition（`> [!NOTE]`、`> [!WARNING]`）
  6. 找得到 logo / icon 就放在 header

**實際案例：快檢通 README 現況**（28 行，三段全是指令）：

```markdown
## 快速開始
bun install / cp .env.example .env / bun run dev
### 建置 / 預覽
bun run build / bun run preview
### 測試
bun test / bun run smoke both / bun run smoke:pick
```

缺什麼：沒有專案名稱與一句話介紹、沒有功能說明、沒有架構、沒連到 `docs/spec.md`、`docs/API.md`、`docs/使用說明.md`；「每次更新站台後必跑 smoke」這種警告埋在段落文字裡。

**create-readme 會產出的結構**（依 skill 規則 + 專案內容推導）：

```markdown
<div align="center">
  <img src="public/brand/innovue-blue.svg" height="48" />
  # 快檢通 — 台灣專利語意檢索
  用一句話找出意思相近的專利，不只是字面比對。
</div>

## Features        語意搜尋 / 以專利找相似 / 圖式瀏覽 / 分享連結
## Getting started 需求（Bun 1.3）→ bun install → .env → bun run dev
## Scripts         dev / build / preview / typecheck / test / smoke
## Documentation   docs/spec.md、docs/API.md、docs/使用說明.md
> [!WARNING]
> 每次更新正式 / 測試站台後必跑 `bun run smoke both`，任一筆失敗即不得放行。
```

不會出現的：License、Contributing、Changelog 段落。

### 3. changelog-generator

能力：Conventional Commits 解析 → semver bump 判斷 → Keep a Changelog 段落渲染；三支腳本：

```bash
# 1. 先 lint commit
python3 scripts/commit_linter.py --from-ref origin/main --to-ref HEAD --strict --format text
# 2. 產生段落
python3 scripts/generate_changelog.py --from-tag v1.3.0 --to-tag HEAD --next-version v1.4.0 --write CHANGELOG.md
# 3. 算下一版
git log v1.3.0..HEAD --oneline | python3 scripts/version_bumper.py --current-version 1.3.0 --output-format json
```

SemVer 對應：breaking（`type!:` 或 `BREAKING CHANGE:`）→ major；`feat` → minor；其他 → patch。

Release governance：lint → 產生草稿 → **人工調整用語** → 驗證 bump → changelog 核可後才 tag。
Output quality：每條對使用者有意義、breaking 附遷移說明、Security 獨立、空分類省略、去重。

**實際案例：快檢通 v1.0.40 → v1.0.41**

- `git log v1.0.40..v1.0.41` 共 20 commits；linter：19 合格、1 不合格（`v1.0.41` 版號 commit）
- `version_bumper.py` 輸出：

```json
{
  "current_version": "1.0.40",
  "recommended_version": "1.1.0",
  "bump_type": "minor"
}
```

- 6 個 `feat` → 建議 minor（v1.1.0）；但專案一直只 bump patch，已 tag v1.0.41 → **保留**，由人決定
- 腳本草稿（原樣輸出）：

```markdown
### Added
- Show patent number and full title in the mobile record header from the ...
- Enlarge touch hit targets to 44px and keep variant toggle steady on sou...
- Validate patent number format before searching (#1000110)
### Fixed
- Skip rendering 0 results badge when no group is selected (#1000113)
```

- 問題：句子被截斷（`...`）、帶 task 單號、工程語氣、「放大觸控範圍」標 `feat` 但其實是調整
- 使用者回饋：「don't show task number」
- 最終版本（CHANGELOG.md）：

```markdown
### Added
- Check that a patent number is in a valid format before searching
- Show the patent number and full title in the mobile record header as soon as the record opens
### Changed
- Make touch targets at least 44px, including the group remove button, and stop the variant toggle on source cards from shifting
### Fixed
- Stop showing a "0 results" badge when no group is selected
```

- 排除：test commit、e2e skill 的 chore commit、版號 commit（使用者看不到）
- 3 個只改觸控尺寸 / 排版的 `feat` → 移到 Changed
- 日期用 git tag 建立日（11-12，不是寫檔當天 11-13）
- 延伸：再跑一次 skill 補齊 v1.0.4 → v1.0.41 共 38 版；沒有使用者可見改動的版本寫 `Maintenance and internal improvements`
- 延伸：CHANGELOG.md 變成產品功能 — 頁首版號可點，開「What's new」彈窗；`parseChangelog()` 解析、動態 `import('~~/CHANGELOG.md?raw')`、未讀小點（localStorage `changelog-seen`）、以環境變數控制顯示版數（預設 10）

## 大綱 (Slide Plan)

Running example：**快檢通 v1.0.41 發版**（做「What's new」彈窗前先 search-first、README 現況、CHANGELOG 實際產生）

1. Cover — Skills v1，三個 skill name；`TitleSketch`：需求 → search-first → code → create-readme / changelog-generator
2. Part 1 search-first — section
3. 故事 — `FlowScene`：手刻前科 → 想自己寫 skill → 這也是手刻？→ 先找現成 skill → search-first（clicks 4）
4. `SearchScene`：Need → 4 個平行搜尋管道 → Evaluate → 4 種決策（clicks 4）
5. 示範：CHANGELOG parser 的 search-first 紀錄 + 結果
6. Decision matrix + anti-pattern gotcha
7. Part 2 create-readme — section
8. `ReadmeScene`：before（28 行指令）→ after（clicks 3）
9. 六條規則（表格）+ gotcha
10. 改寫大綱程式碼頁（before / after 兩欄）
11. Part 3 changelog-generator — section
12. `FlowScene` pipeline（clicks 5）
13. 腳本草稿 vs 最終版 + gotcha
14. semver：指令 + JSON + 決策
15. 延伸：CHANGELOG 變成 What's new 彈窗
16. Takeaways — section「把好習慣寫成 skill」
17. 回顧 — `PainScene`：三個卡點各對應一個 skill（clicks 3）
18. 定義 — Skill = SKILL.md + description 觸發；兩張 callout
19. 三個 skill 在開發週期的位置（表格）+ 共同點：最後一步由人把關
20. 參考資料

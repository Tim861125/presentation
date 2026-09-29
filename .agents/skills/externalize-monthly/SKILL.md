---
name: externalize-monthly
description: ALWAYS use for making an existing month* deck (month25a、month264… 目錄名以 month 開頭) 看得懂／易懂／看不懂可理解 — 本 repo 所有月報 deck 都是內部視角，使用者對 monthXXX 說任何「看得懂」「看不懂」「改成看得懂的版本」「容易理解」都屬於本 skill，不論有沒有提到外部／面試。其他觸發：「把 monthXXX 改成外部看得懂」「月報去內部化」「面試用月報」「portfolio／履歷用月報」. Verifies each claimed work item against git commits under /home/tim/repo, strips internal identifiers, glosses company jargon, edits the deck in place. NEVER for 非 month* 的技術 deck 教學化改寫（那用 teach-slidev）；Not for creating decks (create-monthly).
---

# Externalize Monthly Deck

## Overview

Month decks assume the audience knows internal context (task IDs, system codenames, client names, server numbers). The rewrite contract: **every bullet must be backed by real commits, then re-expressed so a technically-literate reader from another company understands it.** Never invent facts; only re-express and explain.

Deck author 丁吾心 has multiple commit identities — seen as `wuxin.ding <wuxin.ding@innovue.ltd>` and as `tim`/`Tim`, mixed across months and repos. Filter with `--author='tim\|wuxin\.ding'`. If a month returns 0 commits, list identities with `git log --all --since=... --until=... --format='%an' | sort -u` before concluding — never guess a single author string.

## Step 1: Decode deck name → date range

`month<YY><slot>`: slot `1–9` = Jan–Sep, letters `a/b/c` = Oct/Nov/Dec. `month268` = 2026-08, `month26a` = 2026-10, `month25c` = 2025-12.

Commit range: `--since=YYYY-MM-01 --until=<next month>-07` (a few days padding for month-end merges).

## Step 2: Read the deck

`slides.md` + `components/*.vue` (month decks are component-heavy; each slide is a SFC). `spec.md` is the internal record — **leave spec.md untouched**.

Before editing in place, run `git status` at repo root; require the deck's files to be clean so the rewrite is revertible.

## Step 2.5: 取得工作項目清單

先向使用者要該月的 Azure DevOps work item 匯出（ID/Title/State）。逐筆落地：

- 能對應 commit → 以實作細節補進 deck
- 對應不到 commit 的 Done 項（排查、會議、維運、測試站、學習）→ 歸入一張「修正、排查與維運」補充頁，措辭軟化
- 使用者說不寫 → 跳過

清單只用於對照，task ID 一律不得進 deck（由 Step 5 洩漏掃描把關）。

## Step 3: Verify against commits

Scan every git repo under `/home/tim/repo`:

```bash
for d in /home/tim/repo/*/; do [ -d "$d/.git" ] || continue
  c=$(git -C "$d" log --all --author='tim\|wuxin\.ding' --since=<start> --until=<end> --oneline | wc -l)
  [ "$c" -gt 0 ] && echo "$d: $c"; done
```

Then read commit subjects in the active repos and map them onto the deck's slides:

- Deck claim contradicts commits → fix the deck (e.g., version numbers attributed to the wrong system)
- Notable commit missing from the deck → add it
- Deck claim has no commits at all (meetings, docs, client support) → keep it, soften wording; never fabricate specifics
- Term meaning unclear → read that repo's README / spec.md / ADR first; never gloss a term by guessing (SEP = ETSI 標準必要專利, not "separation")

## Step 4: Rewrite contract

Per slide, the output IS:

1. Same SFC files with same filenames. 一律不插術語/背景專頁（如 `Slide1BContext.vue`）；名詞解釋只做各頁首現處一句括注。
2. 封面後一律插入 agenda 頁（語意命名如 `AgendaSlide.vue`）：大標＝本月異動項目，每項一行 mono 小標＝一句話關鍵技術。
3. Bullets in 繁體中文, company context explained, technical terms kept. 文體一律精簡「技術手段 → 成果」式（如：單次 SQL ORDER BY 完成排序扣減、cron 排程執行扣點）；不寫「問題→做法→影響」長句。
4. Internal system names (WEBPAT, IPTECH, UPat, 快檢通, 速讀通, L1/L2/L3, 案別…) KEPT, each glossed with one clause at first appearance across the deck（不另做全表專頁）.
5. Removed entirely: Azure DevOps task numbers `(169359)`, client names (中鋼), machine/server identifiers (50.92), repo paths, branch names.
6. Kept: scale/outcome numbers (5,230 萬筆、99.4%、182ms、v8.0.218) and stack names (Elasticsearch、Citus、kNN、Dify) — interviewers are technical; numbers are the selling point. 但禁止「某專案（某框架）」式標註——框架／技術名只有在它是達成手段本身時才寫（cron、CSS 變數、Math.ceil、單次 SQL 排序扣減），逐專案掛框架標籤顯刻意，非技術讀者也讀不懂。

## Step 5: Verify (mandatory)

1. Leak scan, must return empty (broad 6-digit task numbers — IDs grow over time, do not pin a 15x/16x/17x prefix):

   ```bash
   grep -rEno "1[0-9]{5}|#[0-9]{5,}|中鋼|50\.92" <deck>/slides.md <deck>/components/
   ```

   Review every match: a genuine number (year 2026, port, count like 52,300,000) may stay; a work-item/PBI/issue ID must go.

2. Overflow check exactly per create-monthly skill: `bun run dev <deck>` → `/export/` → overflowPx script (empty array = pass).
3. Report to user: which repos/commits backed which slides.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Guessing one author string for `--author` | Use `--author='tim\|wuxin\.ding'`; 0 hits → check `git log --format='%an' \| sort -u` |
| Editing/rewriting spec.md | spec.md stays as the internal record, untouched |
| Renaming Slide*.vue files | Edit in place; keep filenames so slides.md refs stay valid |
| Loading teach-slidev / create-monthly for this task | This skill is the one for externalizing an existing month deck |
| Glossing every repeated term | Gloss once, at first appearance; no glossary page |
| Adding achievements not found in commits/spec | Only re-express what commits prove |
| Claiming done without overflow check + leak scan | Both are mandatory gates |

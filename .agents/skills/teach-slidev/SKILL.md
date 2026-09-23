---
name: teach-slidev
description: Use when an existing tech Slidev deck in this monorepo reads as an expert-level overview and non-experts can't follow it — "讓非專家看完也能理解", "教學化改寫", "this deck is too shallow / jumps too fast", teach-slidev <deck>. Rewrites the deck in place into tutorial form (more pages allowed). Not for monthly report decks.
---

# Teach-Slidev：概略_deck 教學化改寫

## Overview

技術 deck 常做成專家式概覽：名詞＋條列，假設讀者已具備背景。本 skill 將它原地改寫成給**不會這個主題的人**看的教學：先具體再抽象、一頁只引入一個新概念、術語首現即解釋、預測揭曉。頁數可增加。

預設讀者：會 deck 程式語言、但完全沒碰過該主題的 junior。判斷讀者其實是純非工程師時，先問使用者再動手。

內容用**繁體中文**（技術名詞保留原文）。僅適用技術 deck，月報 deck 不適用。

## Step 0: 讀 deck

1. `<deck>/spec.md` — **沒有就先補寫**：讀 slides、components、`ref.md` 及其來源，把事實整理成 spec.md，作為後續改寫與事實查核的 source of truth
2. `slides.md` — 判斷結構：markdown-heavy 或 component-heavy（`layout: full` + `components/`）
3. component-heavy：讀完所有 slide 元件，內容都在 SFC 裡

## Step 1: 診斷（逐頁、全量，不允许抽查）

對**每一頁**問完這五題，列出缺口表（頁 | 缺口）：

| # | 檢查 | 問什麼 |
|---|---|---|
| 1 | 術語首現 | 用了從未先解釋的術語？（閉包、reflow、race condition…） |
| 2 | 前置鏈 | 本页程式碼用到的 API/概念，前面有頁教過嗎？ |
| 3 | 動機 | 直接講「它是什麼」而沒講「為什麼需要」？ |
| 4 | 錨點 | 只有抽象描述，缺具體例子或類比？ |
| 5 | 事實 | 宣稱與 deck 自己的 code/demo 行為一致嗎？數字/版本有來源嗎？事實過時嗎？— 任何宣稱拿不準就查 ref 來源 |

違反**外部權威事實**（API 行為、瀏覽器支援度）→ 查證後就地修正；違反**來源規格要求**（spec.md/ref.md 的規格與 deck 現實打架）→ 先問使用者再選邊。

## Step 2: 依教學契約改寫

改後的 deck 依序含這些元素，缺一個就不算完成：

| 元素 | 規則 |
|---|---|
| 學習目標 | 開場「學完你會…」2–4 條可驗證行為 |
| 前置知識工具箱 | 一頁集中補齊 junior 缺的基礎概念：每個給類比＋一行程式碼。補哪些以 Step 1 缺口表（檢查 2）為準，非憑感覺列 |
| 先具體後抽象 | 每個概念：具體痛點（可感的數字/場景）→ 類比 → 定義 → 程式碼 |
| 一頁一概念 | 逐步建構：每步只加一個零件，並標出「還缺什麼」製造下一步動機 |
| 預測→揭曉 | 關鍵概念後問「猜猜會執行幾次/幾次？」，`v-click` 揭曉答案 |
| Checkpoint | 每個以 `layout: tech-section` 劃分的章節結尾放 2–3 題理解檢查（是非/選擇，點擊揭曉）；deck 若無 section 頁則自行劃分章節 |
| 總結速查 | End 前放 cheat sheet 與概念對照表 |

**頁數膨脹前先確認時間**：原 deck 若含報告時間規格（看 spec.md/ref.md），2 倍頁數＝2 倍時長，先問使用者可否拉長時段或刪減哪些章節，再決定大綱。

**來源規格過時/矛盾時先問**：spec.md、ref.md 的要求若與 deck 實際內容或本 skill 衝突（如來源要求全英文但 deck 是中文），以使用者確認為準，不自作主張選邊。

進階內容（邊緣參數、極端案例）降級為「進階註解（可跳過）」Callout 或附錄頁，別擋主線。

Component-heavy deck：新元件用**語意命名**（如 `PrerequisiteSlide.vue`）插入引用位置，避免整批重編號 `SlideN`。調動頁面順序只改 `slides.md` 的引用順序，接受元件檔名與頁序脫鉤，不批量 rename 檔案。

## Step 3: 同步 spec.md

把教學大綱與改寫時查證過的事實寫回 spec.md。

## Step 4: 驗證（強制，全部跑完才能宣稱完成）

1. **Overflow**：`bun run dev <deck>` → 開 `http://localhost:<port>/export/` 跑 overflow 檢查腳本（見 create-slidev；比對的是 980×551 canvas，不是瀏覽器視窗）。有 `v-click` 的頁面以**全部片段展開**為最壞情況，溢出就砍內容。無瀏覽器自動化工具時的 fallback：`bunx --bun slidev export <deck>/slides.md` 輸出 PDF 逐頁目視（PDF 依 canvas 渲染）
2. `bunx --bun slidev build <deck>/slides.md` 通過
3. 術語掃描：缺口表每個術語，在其首現頁已有白話解釋
4. 一致性掃描：Step 1 修過的矛盾用 grep 確認措辭已消失
5. `v-click` 揭曉順序在 dev server 實際點過；無瀏覽器工具時用 `slidev export -c`（`--with-clicks`，每個 fragment 輸出獨立頁）目視順序，並請使用者人工點過確認

## Common Mistakes

- 只加「順手的類比」，沒補前置概念 — 斷鏈仍在，非專家依舊卡在同一頁
- 一頁塞三個新概念湊頁數 — 等於沒教
- 預測練習沒有揭曉答案 — 無回饋迴圈
- 用瀏覽器視窗而非 canvas 查 overflow — 誤判沒溢出
- 給 theme 元件傳不存在的 props — 寫前查 `packages/slidev-theme-tech/components/` 的 `defineProps`：`TechCard` 是 `variant` 不是 `accent`；`JsonCard` 沒有 `filename`（用 `title`）；`TechBadge` 文字走 `label` prop、沒有 slot，子節點內容不會渲染
- 改了 slides 沒同步 spec.md — 違反 repo「spec 是 source of truth」慣例
- 把月報 deck 也教學化 — 不適用

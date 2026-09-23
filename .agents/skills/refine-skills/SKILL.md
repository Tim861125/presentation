---
name: refine-skills
description: Use when a skill under this project's .agents/skills/ was just used in the conversation and the user needed multiple rounds of correction, re-direction, or requirement supplementation to reach the result; or when the user says 「優化這個 skill」「skill 複盤」「這個 skill 是不是寫得不好」「確認 skill 有沒有直接達成需求」. Reviews the conversation to attribute each friction point and proposes improvements to that skill's SKILL.md.
---

# Refine Skills（Skill 複盤優化）

## Overview

使用 skill A 完成任務後，複盤確認：**A 是否能直接達成使用者需求？** 若是使用者必須多次修正、調整方向或補充需求才完成，逐點歸因並提出對 A 的 SKILL.md 修改建議。

核心原則：**先歸因、再提案；同意才改檔。**

## 觸發

出現以下任一情況，主動向使用者提出：「這次使用 <A skill> 後有 N 次修正，要不要做 skill 複盤？」

- 執行 `.agents/skills/` 下某 skill 後，使用者對同一任務修正 ≥2 次（修正、調整方向、補充需求）
- 使用者明確要求優化／複盤某個 skill

**不觸發：** 對話沒用過 skill；僅 1 次小修正；修正是使用者改偏好（與 skill 寫法無關）。

**零摩擦：** 複盤發現摩擦點為 0 → 回報「A 直接達成需求，本次無需優化」，結束，不硬找問題。

## Step 1：盤點摩擦點

回顧整個對話，列出每次使用者修正／補充。每個摩擦點必須附：

1. 使用者原話（引用）
2. A 的 SKILL.md 對應段落（引用），或標註「A 未提及此點」

找不到原話或對應段落，就不能宣稱歸因。

## Step 2：歸因（三類）

| 類別 | 判定 | 處置 |
|---|---|---|
| skill 缺陷 | A 的指令缺漏／模糊／錯誤——照 A 原文執行必然產生使用者指出的錯誤 | 列入修改提案 |
| 執行紀律 | A 已明確寫出，但當時沒照做 | 不加提醒文字；可建議強化為硬性驗證步驟，由使用者裁決 |
| 一般需求調整 | 使用者改變想法或偏好，A 原寫法合理 | 不改，於報告中說明 |

判準：想像另一個 agent 逐字照 A 執行，同樣錯誤會不會必然重演？會＝skill 缺陷；不會、只是當時沒做＝執行紀律。

## Step 3：提出修改建議（提案格式，必经，等同意）

每個採納的摩擦點輸出一條：

```
[摩擦點] <使用者原話引用>
[歸因] skill 缺陷 | 執行紀律 | 一般需求調整
[修改位置] <A 的 SKILL.md 章節>
[修改內容] <擬新增或修改的文字，逐字呈現>
```

接著詢問使用者採納哪幾條。**使用者同意前，不得修改任何檔案。**

## Step 4：套用修改

- 僅修改本專案 `.agents/skills/` 下的 skill
- A 是全域（`~/.agents/skills/`）或其他 runtime 的 skill → 僅輸出提案報告為最終產出，不改檔並明確告知
- 修改後維持 A 的既有格式慣例（frontmatter、語言、標題層級）；若動到 description，確認它仍只描述觸發條件、不摘要流程
- 完成後顯示修改差異摘要

## Red Flags — 停下來

- 還沒輸出提案格式就動手改檔 → 回去提案
- 把「沒照做」的摩擦點用「再加一句提醒」修掉 → 那是執行紀律，先歸因再說
- 把使用者一次性偏好寫進共享 skill
- 順手重寫與摩擦點無關的 A 章節
- 沒有原話引用就歸因

## Common Mistakes

- 全部摩擦點都歸因 skill 缺陷 → 一般需求調整必須排除在外
- 修改內容寫含糊（「應加強說明」）→ 必須逐字呈現擬改文字
- 摩擦點為 0 仍硬找問題改 skill → 直接回報無需優化

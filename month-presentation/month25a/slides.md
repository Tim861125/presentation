---
transition: slide-up
---

# 2025-10 月報告
丁吾心

---
transition: slide-up
---

## IPTECH、WEBPAT一致性問題

- **點數顯示:**
  - AI 未開通時， IPTECH 與 WEBPAT 右上角均統一顯示「0 點」。
  - 點數旁的星星統一為黃色。
- **點數不足提示:**
  - 若點數不足，即便使用者點擊「關閉且不再通知」，手動觸發功能時，仍需顯示「點數不足」的訊息。
- **使用者名稱顯示:**
  - IPTECH 與 WEBPAT 右上角，將統一顯示使用者名稱。

---
transition: slide-left
---

## AI 功能

- **閱讀通:**
- **速讀通:**
  - 進入頁面時，預設使用「速讀通」「閱讀通」。
  - 使用者可於個人設定中，選擇「開啟」或「關閉」預設。
  - `func-point-service` 已新增 API，用於記錄使用者的「閱讀通」自動開啟設定。
  - WEBPAT 與 IPTECH 的「速讀通」功能規格將保持一致。


---
transition: slide-up
---

## AI 點數功能

- **點數系統:**
  - 新增點數使用期限。
  - 調整點數使用順序，將優先使用「活動」點數，再使用「付費」點數。
  - 新增白名單功能。
  - 點數值改為整數型態。

---
transition: slide-left
---

## AI 功能

- **多語系支援:**
  - 針對 WEBPAT 與 IPTECH 的「閱讀通」及「速讀通」功能，新增了多語系 prompt key，以支援不同語系顯示。包含：
    - `WebpatListSummary_zh-hant`
    - `WebpatListSummary_zh-hans`
    - `WebpatListSummary_en`
    - `WebpatListSummary_ja`
    - `WebpatDescriptionSummary_zh-hant`
    - `WebpatDescriptionSummary_zh-hans`
    - `WebpatDescriptionSummary_en`
    - `WebpatDescriptionSummary_ja`

---
transition: slide-up
---

## 小穎客服顯示調整

- **IPTECH:** 除了登入頁與首頁外，其他頁面將不顯示小穎客服。
- **WEBPAT:** 除了登入頁與檢索頁外，其他頁面將不顯示小穎客服。

---
transition: slide-left
---

# TIPOMUSIC

- **規格異動:** 依規格調整音樂查詢欄位內容。

---
transition: slide-down
---

# IPTECH

- **所屬國合併:** 新增了合併項目。
- **[檢視頁]新帳號再檢索失效:** 新帳號將預設使用「申請案合併」進行檢索。

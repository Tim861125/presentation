## IPTECH、WEBPAT 一致問題
- AI 未開通時， IPTECH 、 WEBPAT 的右上角均顯示 「0 點」
- IPTECH 、 WEBPAT 的右上角顯示的點數星星顏色為一律黃色
- WEBPAT 如果點數不足時，如果按「關閉且不再通知」，如果使用者手動去按時，也要顯示「點數不足」之訊息
- IPTECH、WEBPAT 右上角，一律顯示「使用者名稱」

## 閱讀通
- 當進入到專利詳細頁面時，自動開啟
- 提供 profile 設定，「自動開啟」、「停止自動開啟」
- func-point-service 要提供一個針對使用者「閱讀通」是否自動開啟

## 速讀通
- WEBPAT、IPTECH 一致
- 提供 profile 設定，「自動開啟」、「停止自動開啟」
- func-point-service 要提供一個針對使用者「速讀通」是否自動開啟

## 語系
- WEBPAT、IPTECH 一致
- 針對 WEBPAT、IPTECH 所顯示的語系，將「閱讀通」，「速讀通」的 prompt key 加上語系，新增多語系
  - WebpatListSummary_zh-hant
  - WebpatListSummary_zh-hans
  - WebpatListSummary_en
  - WebpatListSummary_ja
  - WebpatDescriptionSummary_zh-hant
  - WebpatDescriptionSummary_zh-hans
  - WebpatDescriptionSummary_en
  - WebpatDescriptionSummary_ja

## AI 功能
- 新增點數有使用期限
- 先使用「活動」點數再使用「付費」點數
- 新增白名單
- 點數值改為整數

## 小穎客服
- IPTECH
    - 除了登入頁、首頁外，其他不要顯示小穎客服
- WEBPAT
    - 除了登入頁、檢索頁外，其他不要顯示小穎客服



# TIPOMUSIC
- 規格異動

# IPTECH
- 所屬國合併: 新增合併項目
- [檢視頁]新帳號再檢索失效: 修正為預設使用申請案合併
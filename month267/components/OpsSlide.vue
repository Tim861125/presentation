<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS & INVESTIGATION"
      title="修正、排查與維運"
      subtitle="資料轉置支援、資轉問題協助與開發工具改善"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">資轉問題協助</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>下載工具抓到錯誤格式資料（ST.36 → ST.96 標準），移除髒資料後重新下載重轉</li>
          <li>日本案壓縮檔損毀資轉問題：移除已轉資料重轉</li>
          <li>排程腳本傳送訊息到群組的格式缺引號問題修正後重跑，並協助移除重複資轉資料</li>
          <li>KR 資料轉置與其他多起資轉問題協助處理</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">程式碼審查與工具</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>專利資料匯入專案 code review 與 Citus 分散式表機制理解</li>
          <li>專案下載異常排查：專利號欄位長度不足修正與異常資料防呆</li>
          <li>魚骨分類 prompt 調整與 AI 會議準備</li>
          <li>AI 輔助工作流改善：安裝團隊做的 skill plugin、練習以 AI 工作流產出 commit 摘要</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

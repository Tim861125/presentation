<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BUGFIX · INVESTIGATION · OPS"
      title="修正、排查與維運"
      subtitle="功能開發以外的除錯、問題排查與站台維護工作"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">修正與排查</TechBadge>
          <span class="text-xs font-mono text-zinc-400">BUGFIX & DEBUGGING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">線上問題修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>WEBPAT 首頁廣告 DB 狀態讀取修正；廣告錯誤導致郵件服務不寄信一併修復</li>
          <li>專案管理 API：error log 改送 Hangfire 集中管理，專利編號過長異常修正</li>
          <li>檢索通測試區問題修復；資料庫連線字串、專利下載、專案還原上傳等問題排查</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">維運與學習</TechBadge>
          <span class="text-xs font-mono text-zinc-400">OPS & LEARNING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">站台維護與技術研究</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>測試與正式站台多次更新發布；MCP 服務 endpoint 更新上線</li>
          <li>年度轉檔文件與處理紀錄維護，異常資料留存比對</li>
          <li>研究了 Kubernetes、Dify agent 與 MCP 應用，參與產品 AI 提案會議</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

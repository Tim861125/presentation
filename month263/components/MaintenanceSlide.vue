<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FIXES · TROUBLESHOOTING · OPERATIONS"
      title="修正、排查與維運"
      subtitle="功能修復、正式機部署與跨系統問題支援"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">系統修正</TechBadge>
          <span class="text-xs font-mono text-zinc-400">BUG FIXES</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">圖表與介面修復</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>魚骨通表格切換時消失：修復 D3.js SVG 渲染防呆</li>
          <li>時序表分析圖表在特定條件下無法開啟：修正開啟條件</li>
          <li>檢索結果頁：家族合併欄位無法顯示、關閉設定欄位的狀態還原</li>
          <li>個人化設定面板與修改密碼 UI 多項修正</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">維運部署</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DEPLOYMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">正式機與開發環境</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>兩平台正式機版本更新，釋出 v8.0.131–136 / v8.0.180–184</li>
          <li>Dify 服務與檢索通環境變數、正式機設定</li>
          <li>Dockerfile 補齊 wget 等工具、devcontainer 開發環境更新</li>
          <li>SSO token 驗證整合多個搜尋環境</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">排查支援</TechBadge>
          <span class="text-xs font-mono text-zinc-400">TROUBLESHOOTING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">跨系統問題處理</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>資料轉置問題排查：CN FTP 傳輸、JPG/WO 書目資料異常</li>
          <li>PatentPilot 日誌保留六個月：maxArchiveFiles 調整為 180</li>
          <li>CRM 開通與點數管理後台整合：點數調整機制修正</li>
          <li>AI 通規格討論、流程調查與問題協助</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

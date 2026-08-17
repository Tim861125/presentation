<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICES"
      title="CSP 實作最佳實踐指南"
      subtitle="Report-Only 灰度觀察與生產環境最小權限原則"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">開發與測試階段</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>先使用 <span class="text-cyan-300 font-mono">Content-Security-Policy-Report-Only</span> 監控違規不阻擋</li>
          <li>配置 `report-uri` 或 `report-to` 收集真實用戶端報告</li>
          <li>漸進式收緊政策：先排查錯誤 ➔ 再正式切換為強制阻擋模式</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">生產與維運階段</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>定期盤點白名單域名，移除已停用服務</li>
          <li>嚴格落實最小授權原則 (Least Privilege)</li>
          <li>將 CSP 規範納入 CI/CD 靜態檢核，防範工程師誤開 unsafe 漏洞</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

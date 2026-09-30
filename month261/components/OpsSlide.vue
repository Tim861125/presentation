<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS · TROUBLESHOOTING"
      title="修正、排查與維運"
      subtitle="本月發佈：WEBPAT v8.0.158–162 · IPTECH v8.0.125–127 · PatentPilotService v1.0.30–32 · Upat MCP v1.0.10 · 點數服務 v1.0.21"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="emerald" class="p-4">
        <div class="mb-2">
          <TechBadge color="emerald">問題修正</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">WEBPAT / IPTECH 修正</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          修復點數不足提示訊息、IPTECH 分類頁項目顯示，並更新全站版權年份為 2026。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="mb-2">
          <TechBadge color="amber">點數服務</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">點數服務 API 修復</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          點數管理服務（Bun + Elysia）交易明細改為依建立時間倒序回傳，修復 API 回傳內容異常後發版。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <div class="mb-2">
          <TechBadge color="sky">維運設定</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">設定與發版維護</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          TipoMusic 服務Email 設定更新；各系統以小版本高頻發版，經測試站驗證後部署上線。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

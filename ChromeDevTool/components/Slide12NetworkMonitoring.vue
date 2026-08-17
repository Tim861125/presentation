<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="NETWORK ANALYSIS"
      title="監控 HTTP 與 WebSocket 請求"
      subtitle="Headers · Payload · Preview · Response · Timing 深入剖析"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="cyan">API 除錯</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">Status & Payload</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          檢查 Headers 認證 Token、Request Payload 格式與伺服器回傳的 JSON 回應內容與狀態碼。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">資源過濾</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">Filter Types</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          依 Fetch/XHR、JS、CSS、Img、WS 分類篩選，或直接以 URL / domain 關鍵字精確搜尋。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">Timing 分析</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">Waterfalls & TTFB</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          檢視 DNS Lookup、Initial Connection、TTFB (Time to First Byte) 與 Content Download 耗時。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

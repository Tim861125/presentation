<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC · MAINTENANCE"
      title="TIPOMusic 欄位擴充與維運"
      subtitle="錄音著作新增欄位比對、效能排查與正式機更新"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">欄位擴充</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUDIO COMPARISON</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">錄音著作比對擴充</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          【音樂/錄音著作查詢】功能中，錄音著作新增「製作公司」與「發行公司」欄位比對機制，並同步更新清單比對規格。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">效能維護</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PERFORMANCE & OPS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">正式站台排查與更新</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>深入排查並解決正式站台查詢速度過慢問題</li>
          <li>完成正式機版本發布更新與健康度檢查</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

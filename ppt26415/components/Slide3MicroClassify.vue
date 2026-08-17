<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · QUALITY TUNING"
      title="微分通"
      subtitle="用來調整分類品質，移除節點中相似度過低的專利"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">品質微調</TechBadge>
          <span class="text-xs font-mono text-zinc-400">QUALITY CONTROL</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">清除雜訊專利</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          針對各節點專利計算語意相似度，精準識別離群與關聯度偏低之專利，維持分類純淨度。
        </p>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">篩選機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SIMILARITY FILTER</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">相似度門檻與批次作業</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>支援動態相似度滑桿，即時預覽過濾分布</li>
          <li>支援批次將低於門檻之專利移回「未分類」狀態</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

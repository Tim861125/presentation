<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT / IPTECH · FEATURE"
      title="快檢通功能上線"
      subtitle="快速檢索分析介面與點數扣減機制上線"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">功能上線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">QUICK SEARCH</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">WEBPAT 快檢通</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>WEBPAT 新增「快檢通」快速檢索模式，入口經 SSO token 驗證進入</li>
          <li>檢索結果改由 OpenSearch kNN 相似度排序，國家選項可勾選</li>
          <li>快速模式下停用一級篩選、離開時自動還原原設定</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">點數設定</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POINTS BILLING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">點數機制更新</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>快檢通扣點機制更新與異常修正</li>
          <li>IPTECH 點數標準設定：單次查詢扣抵 10 點</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

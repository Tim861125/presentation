<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH · CLASSIFICATION"
      title="分類頁多分類樹與跨樹操作"
      subtitle="分類頁從單一樹升級為多樹同時顯示，並讓跨樹操作在多樹模式下全部正確"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">多樹顯示</TechBadge>
          <span class="text-xs font-mono text-zinc-400">MULTI-TREE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">多分類樹同時顯示</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>分類頁升級為多棵分類樹同時渲染，樹／圖表以 tab 切換</li>
          <li>多樹未分類節點一鍵顯示／隱藏；切換樹時清選取、重設專利清單</li>
          <li>相似度分數按（專利, 節點）粒度接通後端，標章移至分類標籤旁</li>
          <li>專利清單標題顯示含根節點的分類樹路徑</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">跨樹操作</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CROSS-TREE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">跨樹移動、合併與除錯</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利跨樹拖曳改解析「放下的目標樹」再作用，根治拖落後掉進未分類的 bug</li>
          <li>跨樹節點合併：來源節點限定來源樹、防自併</li>
          <li>合併模式自動分類：主件分類複製給子件、DISTINCT 去重、finally 兜底保證子件對齊</li>
          <li>修正家族合併下分類通未分類筆數計算、合併類型專利數統計</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

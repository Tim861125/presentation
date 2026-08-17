<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TAKEAWAYS"
      title="formatted_pn 作為 Distribution Key 效益"
      subtitle="專利系統分散式資料庫最佳實踐架構"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-cyan-400 font-bold">▸</span>
          <span class="font-semibold text-white">資料共置</span>
        </div>
        <p class="text-xs text-zinc-300">同一篇專利的所有欄位與關聯資料天然放在同一個 Worker。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-cyan-400 font-bold">▸</span>
          <span class="font-semibold text-white">本地 JOIN</span>
        </div>
        <p class="text-xs text-zinc-300">關聯查詢不需要跨 Node 網路傳輸，維持單機極致效能。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-cyan-400 font-bold">▸</span>
          <span class="font-semibold text-white">精準路由</span>
        </div>
        <p class="text-xs text-zinc-300">點查詢 (Point Query) 直接定位特定 Worker，不浪費全節點算力。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-cyan-400 font-bold">▸</span>
          <span class="font-semibold text-white">水平擴充</span>
        </div>
        <p class="text-xs text-zinc-300">完美適配數千萬筆海量專利資料與日誌的高吞吐水平擴展。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

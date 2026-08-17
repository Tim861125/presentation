<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結與選型時機"
      subtitle="善用事件冒泡，讓父元素統一託管子節點互動"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">何時使用 Event Delegation</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>列表 (List)、表格 (Table) 含有大量相似的重複元素</li>
          <li>清單內容會透過 Ajax / WebSocket 動態新增、刪除或置換</li>
          <li>大型 SPA 應用中欲極致壓低事件監聽器數量與記憶體消耗</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">實作黃金法則</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>優先採用 <code class="text-emerald-300 font-mono">event.target.closest(selector)</code> 處理巢狀圖示</li>
          <li>留意不支援冒泡的事件 (focus, scroll, mouseenter)</li>
          <li>適度分層委託，避免將所有事件無腦掛在 document 根節點</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

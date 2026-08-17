<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONCEPT"
      title="什麼是 Event Delegation (事件委託)？"
      subtitle="基於 DOM 事件冒泡 (Event Bubbling) 機制的高效設計模式"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <TechCard accent="cyan" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">核心思維</TechBadge>
        </div>
        <p class="text-base text-zinc-200 leading-relaxed">
          在<span class="text-cyan-400 font-semibold">父容器元素</span>上設置單一事件監聽器，統一捕獲與分派所有子元素的互動事件，而非在每個子節點上重複綁定獨立監聽器。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">底層機制</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          當子元素觸發事件時，事件會沿著 DOM 樹向上「冒泡」至父層。透過檢查 <code class="text-purple-300 font-mono">event.target</code>，父層可以精確判斷觸發源並執行對應邏輯。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

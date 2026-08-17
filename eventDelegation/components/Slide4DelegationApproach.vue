<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SOLUTION"
      title="Event Delegation 模式：僅需一個監聽器"
      subtitle="在父容器捕捉事件並透過 event.target 判別元素"
    />

    <div class="mt-4">
      <JsonCard
        filename="delegation.js"
        :code="`const container = document.querySelector('#button-container');

container.addEventListener('click', (event) => {
  // 檢查是否為目標子元素
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.innerText);
  }
});`"
      />
    </div>

    <div class="mt-4 flex items-center gap-3">
      <TechBadge color="emerald">關鍵優勢</TechBadge>
      <span class="text-xs text-zinc-300">無論容器內有 3 個還是 3,000 個按鈕，瀏覽器記憶體中永遠只有 1 個事件監聽器！</span>
    </div>
  </SlideShell>
</template>

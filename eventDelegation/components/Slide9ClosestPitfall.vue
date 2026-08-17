<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PITFALL & BEST PRACTICE"
      title="陷阱提示：子元素巢狀與 closest() 的妙用"
      subtitle="點擊按鈕內部的 <span> 或圖示時，event.target 會指向內部子節點"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">巢狀 HTML 結構</div>
        <JsonCard
          filename="nested.html"
          :code="`<div id='wrapper'>
  <button>
    <span class='icon'>🔥</span>
    Click Me!
  </button>
</div>`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">正確做法：使用 Element.closest()</div>
        <JsonCard
          filename="closest_solution.js"
          :code="`wrapper.addEventListener('click', (event) => {
  // ❌ 錯誤：點到 span 時 tagName 為 SPAN
  // if (event.target.tagName === 'BUTTON') ...

  // ✅ 正確：沿著 DOM 向上尋找最近的 button
  const button = event.target.closest('button');
  if (!button || !wrapper.contains(button)) return;

  console.log('Button clicked:', button.textContent);
});`"
        />
      </div>
    </div>
  </SlideShell>
</template>

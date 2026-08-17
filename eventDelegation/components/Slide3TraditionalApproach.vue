<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PROBLEM"
      title="傳統作法：為每個子元素個別綁定"
      subtitle="元素數量膨脹導致的記憶體耗損與動態節點失效問題"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">HTML 結構</div>
        <JsonCard
          filename="buttons.html"
          :code="`<div id='button-container'>
  <button>按鈕 1</button>
  <button>按鈕 2</button>
  <button>按鈕 3</button>
</div>`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ 傳統 forEach 逐一綁定</div>
        <JsonCard
          filename="traditional.js"
          :code="`const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText);
  });
});

// N 個按鈕 = N 個獨立監聽器函式！`"
        />
      </div>
    </div>
  </SlideShell>
</template>

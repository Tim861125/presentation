<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPARISON"
      title="代碼直覺對比"
      subtitle="分散綁定 vs 集中委託管理"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ 傳統方式 (N 個監聽器)</div>
        <JsonCard
          filename="traditional.js"
          :code="`const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    console.log(event.target.innerText);
  });
});`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ Event Delegation (1 個監聽器)</div>
        <JsonCard
          filename="delegated.js"
          :code="`const container = document.querySelector('#button-container');
container.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.innerText);
  }
});`"
        />
      </div>
    </div>
  </SlideShell>
</template>

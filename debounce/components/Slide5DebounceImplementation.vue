<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IMPLEMENTATION"
      title="Debounce 程式碼實作與用法"
      subtitle="閉包保存 timerID 與 clearTimeout 重置計時器"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">手寫 Debounce 核心邏輯</div>
        <JsonCard
          filename="debounce.js"
          :code="`function debounce(callback, delay) {
  let timerID;

  return function debouncedCallback(...args) {
    // 清除上一次的計時器
    clearTimeout(timerID);
    // 重新設定計時器
    timerID = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">調用範例</div>
        <JsonCard
          filename="usage.js"
          :code="`const searchAPI = (keyword) => {
  console.log('Search:', keyword);
};

const debouncedSearch = debounce(searchAPI, 300);

// 使用者急速連續鍵入
debouncedSearch('h');    // 取消
debouncedSearch('he');   // 取消
debouncedSearch('hell'); // 300ms 後執行 ➔ Search: hell`"
        />
      </div>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="RECIPE 1"
      title="實戰範例一：大量計算任務分批處理"
      subtitle="將 1,000 筆資料切割為時間切片，完全不阻塞畫面點擊與滾動"
    />

    <div class="mt-4">
      <JsonCard
        filename="batch_tasks.js"
        :code="`const tasks = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  execute: () => processHeavyItem(i)
}));

function processTasks(deadline) {
  // 只要這一幀還有可用時間且有任務就持續消化
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    tasks.shift().execute();
  }

  if (tasks.length > 0) {
    // 沒時間了，讓出主執行緒給渲染，下一幀閒置時再繼續
    requestIdleCallback(processTasks, { timeout: 2000 });
  } else {
    console.log('✅ 所有任務平滑執行完畢，0 掉幀！');
  }
}

requestIdleCallback(processTasks, { timeout: 2000 });`"
      />
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIME BUDGET"
      title="IdleDeadline 物件與時間預算掌控"
      subtitle="timeRemaining() 與 didTimeout 的關鍵判斷"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">兩大核心屬性</TechBadge>
        </div>
        <div class="space-y-3 text-xs text-zinc-300">
          <div>
            <span class="text-cyan-300 font-bold font-mono">1. deadline.timeRemaining()</span>
            <p>返回浮點數（毫秒）。代表當前幀還剩多少時間可用（上限通常為 50ms）。</p>
          </div>
          <div>
            <span class="text-purple-300 font-bold font-mono">2. deadline.didTimeout</span>
            <p>布林值。若因為超過 options.timeout 而被強制喚起執行時，此值為 `true`。</p>
          </div>
        </div>
      </TechCard>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">標準協同迴圈範例</div>
        <JsonCard
          filename="scheduler.js"
          :code="`function processTask(deadline) {
  // 當還有剩餘時間且還有任務時持續執行
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && tasks.length > 0) {
    const task = tasks.shift();
    task.execute();
  }

  // 若預算耗盡但任務未完，排入下一個閒置週期
  if (tasks.length > 0) {
    requestIdleCallback(processTask);
  }
}`"
        />
      </div>
    </div>
  </SlideShell>
</template>

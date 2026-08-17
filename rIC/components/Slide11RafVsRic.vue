<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COOPERATION"
      title="rAF vs rIC：全方位對比與協同作戰"
      subtitle="一個主攻即時渲染，一個負責背景消化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">特性</th>
              <th class="pb-2">rAF</th>
              <th class="pb-2">rIC</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr><td class="py-2 font-bold text-white">執行時機</td><td>每幀繪製前 (Paint 前)</td><td>幀結束後的閒置期</td></tr>
            <tr><td class="py-2 font-bold text-white">執行頻率</td><td>固定 60 / 120 FPS</td><td>依系統負載動態決定</td></tr>
            <tr><td class="py-2 font-bold text-white">任務優先級</td><td class="text-cyan-300 font-bold">高 (High)</td><td class="text-amber-300 font-bold">低 (Idle / Background)</td></tr>
            <tr><td class="py-2 font-bold text-white">適用範疇</td><td>動畫、視覺更新</td><td>日誌、預載、整理快取</td></tr>
          </tbody>
        </table>
      </TechCard>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">完美的協同模式</div>
        <JsonCard
          filename="cooperation.js"
          :code="`// 1. rAF 專注於保證 60 FPS 動畫流暢
function animate() {
  updateBallPhysics();
  requestAnimationFrame(animate);
}

// 2. rIC 負責背景低調傳輸統計資料
function backgroundSync(deadline) {
  if (deadline.timeRemaining() > 0) flushLogs();
  requestIdleCallback(backgroundSync);
}`"
        />
      </div>
    </div>
  </SlideShell>
</template>

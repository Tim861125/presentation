<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPARISON"
      title="為什麼需要 rAF？傳統 setTimeout 的致命傷"
      subtitle="定時器盲目觸發引發的畫面撕裂、掉幀與無效運算"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">❌ 傳統 setInterval (16.67ms)</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>完全與硬體 V-Sync 刷新時脈脫鉤</li>
          <li>極易落入重繪中段，導致 Frame Drop 或畫面撕裂 (Tearing)</li>
          <li>分頁切到背景時依然狂跑，浪費電量與效能</li>
          <li>受 Event Loop 阻塞影響，時間精度極不可靠</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">✅ requestAnimationFrame</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>永遠在瀏覽器準備渲染新幀的前一刻準時執行</li>
          <li>所有 DOM 樣式修改將合併在同一幀完成渲染</li>
          <li>分頁隱藏自動暫停，螢幕休眠自動降為 0 消耗</li>
          <li>保證幀間距均勻，視覺體驗無比絲滑</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

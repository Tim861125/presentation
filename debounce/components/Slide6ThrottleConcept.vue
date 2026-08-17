<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="THROTTLE"
      title="Throttle (節流) 核心原理"
      subtitle="確保函式以固定頻率 (Fixed Rate) 執行，在指定週期內最多觸發一次"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">時間軸示意 (Timeline)</div>
        <div class="p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-zinc-300 leading-loose">
          Trigger: ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼<br/>
          Time: &nbsp; ━━━━━━━━━━━━━━━━━━━━<br/>
          Execute: ✓ &nbsp; ✓ &nbsp; ✓ &nbsp; ✓ &nbsp; ✓<br/>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;└─interval─┘
        </div>
      </div>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">水龍頭節流閥比喻</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>不管上方水流有多急，水滴都以固定節奏滴下</li>
          <li>第一次觸發立即響應 (Immediate Response)</li>
          <li>冷卻週期內的所有多餘觸發一概忽略</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

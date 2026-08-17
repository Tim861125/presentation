<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEBOUNCE"
      title="Debounce (防抖) 核心原理"
      subtitle="將多次連續調用合併為最後一次，在停止觸發一段延遲後才執行"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">時間軸示意 (Timeline)</div>
        <div class="p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-zinc-300 leading-loose">
          Trigger: ▼ ▼ ▼ ▼ ▼ &nbsp; &nbsp; ▼<br/>
          Time: &nbsp; ━━━━━━━━━━━━━━━━━━━━<br/>
          Execute: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;✓ &nbsp; &nbsp; ✓<br/>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;└─delay─┘ &nbsp; &nbsp; &nbsp;└─delay─┘
        </div>
      </div>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">關鍵特徵</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>只要在 delay 內再次觸發，計時器立即重置</li>
          <li>永遠只執行最後一次有效動作</li>
          <li>天然具備延遲性，最適合「等待使用者動作完成」場景</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

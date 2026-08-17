<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SCORECARD"
      title="📊 Zod v4 核心升級數據總結"
      subtitle="速度、編譯、體積與穩定性四大面向突破"
    />

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
      <TechCard accent="cyan" class="p-6">
        <div class="text-5xl font-bold font-mono text-cyan-400 mb-2">14×</div>
        <div class="text-xs text-zinc-300 font-semibold uppercase">String Parsing Speed</div>
      </TechCard>

      <TechCard accent="purple" class="p-6">
        <div class="text-5xl font-bold font-mono text-purple-400 mb-2">10×</div>
        <div class="text-xs text-zinc-300 font-semibold uppercase">TS Compilation</div>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="text-5xl font-bold font-mono text-emerald-400 mb-2">-85%</div>
        <div class="text-xs text-zinc-300 font-semibold uppercase">Bundle Size (Mini)</div>
      </TechCard>

      <TechCard accent="amber" class="p-6">
        <div class="text-5xl font-bold font-mono text-amber-400 mb-2">9/10</div>
        <div class="text-xs text-zinc-300 font-semibold uppercase">Top Issues Resolved</div>
      </TechCard>
    </div>
  </SlideShell>
</template>

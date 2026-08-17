<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BENCHMARKS"
      title="解析速度與 TypeScript 編譯效能"
      subtitle="字串解析 14x、鏈式運算編譯快 10x"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">RUNTIME SPEED</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-3 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">String parsing</span> 14x faster</li>
          <li><span class="text-white font-semibold">Array parsing</span> 7x faster</li>
          <li><span class="text-white font-semibold">Object parsing</span> 6.5x faster</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">TS COMPILATION</TechBadge>
        </div>
        <div class="text-sm text-zinc-300 mb-2 font-semibold">Chaining .extend() & .omit() 編譯時間：</div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed font-mono">
          <li>v3: 4000ms</li>
          <li class="text-emerald-400 font-bold">v4: 400ms (10x faster)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

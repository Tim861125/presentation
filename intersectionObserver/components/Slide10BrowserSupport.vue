<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPATIBILITY"
      title="瀏覽器相容性支援 (Browser Support)"
      subtitle="主流現代瀏覽器皆已原生支援 (全球覆蓋率 > 97%)"
    />

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
      <TechCard accent="emerald" class="p-6">
        <div class="text-3xl font-bold font-mono text-white mb-2">Chrome 51+</div>
        <div class="text-xs text-zinc-400 font-mono">Since 2016</div>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="text-3xl font-bold font-mono text-white mb-2">Firefox 55+</div>
        <div class="text-xs text-zinc-400 font-mono">Since 2017</div>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="text-3xl font-bold font-mono text-white mb-2">Safari 12.1+</div>
        <div class="text-xs text-zinc-400 font-mono">Since 2019</div>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="text-3xl font-bold font-mono text-white mb-2">Edge 15+</div>
        <div class="text-xs text-zinc-400 font-mono">Since 2017</div>
      </TechCard>
    </div>
  </SlideShell>
</template>

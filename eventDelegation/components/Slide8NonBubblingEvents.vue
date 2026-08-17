<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="LIMITATIONS"
      title="注意事項：不支援冒泡的事件型別"
      subtitle="這些事件預設不進行冒泡傳播，無法直接使用傳統事件委託"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">不冒泡事件列表</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed font-mono">
          <li><span class="text-white font-semibold">focus / blur</span> (焦點事件)</li>
          <li><span class="text-white font-semibold">scroll</span> (滾動事件)</li>
          <li><span class="text-white font-semibold">mouseenter / mouseleave</span> (滑鼠移入/移出)</li>
          <li><span class="text-white font-semibold">resize</span> (視窗縮放)</li>
        </ul>
      </TechCard>

      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">替代解法</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>焦點事件可改用會冒泡的 <code class="text-cyan-300 font-mono">focusin / focusout</code></li>
          <li>滑鼠移動可改用會冒泡的 <code class="text-cyan-300 font-mono">mouseover / mouseout</code></li>
          <li>或在 addEventListener 時啟用 <span class="text-purple-300 font-semibold">捕獲階段 (Capture: true)</span></li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

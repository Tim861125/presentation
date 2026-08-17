<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="GETTING STARTED"
      title="如何開啟 Chrome DevTools"
      subtitle="內建於所有 Chrome 瀏覽器中的全功能開發者套件"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="emerald">開啟方式</TechBadge>
          </div>
          <ul class="space-y-3 text-xs text-zinc-200 list-disc list-inside">
            <li><strong class="text-white">選單開啟</strong>：Chrome 主選單 → 更多工具 → 開發人員工具</li>
            <li><strong class="text-white">滑鼠操作</strong>：頁面任意處點選右鍵 → <strong class="text-emerald-300">檢查 (Inspect)</strong></li>
          </ul>
        </div>
        <div class="text-xs text-zinc-500 font-mono mt-4">
          💡 建議養成直接用快捷鍵呼叫 DevTools 的習慣。
        </div>
      </TechCard>

      <TechCard accent="cyan" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="cyan">必背快捷鍵</TechBadge>
          </div>
          <div class="space-y-3 text-xs">
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
              <span class="text-zinc-300">macOS</span>
              <code class="text-emerald-300 font-mono font-bold">Cmd + Option + I</code>
            </div>
            <div class="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-white/5">
              <span class="text-zinc-300">Windows / Linux</span>
              <code class="text-emerald-300 font-mono font-bold">F12 或 Ctrl + Shift + I</code>
            </div>
          </div>
        </div>
        <div class="text-xs text-zinc-500 font-mono mt-4">
          快速抽屜切換 Console：<code class="text-zinc-300">Esc</code>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="INTERACTION & SUMMARY"
      title="頁面互動與核心工具分類彙整"
      subtitle="click · fill · evaluate_script 搭配 27+ 核心能力"
    />

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <TechCard accent="blue" class="p-4 flex flex-col">
        <div class="font-bold text-blue-400 mb-2 text-xs font-mono uppercase">開啟 + 截圖</div>
        <div class="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
          <span>• navigate_page</span>
          <span>• take_screenshot</span>
        </div>
      </TechCard>

      <TechCard accent="amber" class="p-4 flex flex-col">
        <div class="font-bold text-amber-400 mb-2 text-xs font-mono uppercase">Console + Network</div>
        <div class="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
          <span>• list_console_messages</span>
          <span>• list_network_requests</span>
        </div>
      </TechCard>

      <TechCard accent="emerald" class="p-4 flex flex-col">
        <div class="font-bold text-emerald-400 mb-2 text-xs font-mono uppercase">頁面互動</div>
        <div class="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
          <span>• click (點擊元素)</span>
          <span>• fill (填入文字)</span>
          <span>• evaluate_script (執行 JS)</span>
        </div>
      </TechCard>

      <TechCard accent="purple" class="p-4 flex flex-col">
        <div class="font-bold text-purple-400 mb-2 text-xs font-mono uppercase">🆕 新功能特性</div>
        <div class="flex flex-col gap-1.5 text-xs font-mono text-zinc-300">
          <span>• --auto-connect</span>
          <span>• emulate (節流模擬)</span>
          <span>• Preserve Logs (跨頁保留)</span>
        </div>
      </TechCard>
    </div>

    <div class="mt-4 text-center text-zinc-500 text-xs font-mono">
      Google Chrome DevTools MCP · 27+ 個進階工具 · RD Team · 2026
    </div>
  </SlideShell>
</template>

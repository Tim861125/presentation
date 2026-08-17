<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="UPDATES"
      title="最新功能更新 (Latest Features)"
      subtitle="更加自動化、整合模擬器與跨頁面日誌保留機制"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <TechCard accent="emerald" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="size-2 rounded-full bg-emerald-400" />
            <code class="text-emerald-300 font-bold text-sm">--auto-connect</code>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed mb-3">
            自動探索並附加到運行中的 Chrome 實例，不再需要手動複製 WebSocket URL。
          </p>
        </div>
        <div class="rounded-lg bg-black/40 border border-white/5 p-2.5 font-mono text-emerald-200/90 text-xs">
          使用 auto-connect 連接本機 Chrome
        </div>
      </TechCard>

      <TechCard accent="blue" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="size-2 rounded-full bg-blue-400" />
            <code class="text-blue-300 font-bold text-sm">emulate</code>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed mb-3">
            整合地理位置、網路節流 (3G/Offline)、CPU 節流、User Agent 覆寫為單一工具。
          </p>
        </div>
        <div class="rounded-lg bg-black/40 border border-white/5 p-2.5 font-mono text-blue-200/90 text-xs">
          模擬 3G 網路 + 4x CPU 節流
        </div>
      </TechCard>

      <TechCard accent="amber" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="size-2 rounded-full bg-amber-400" />
            <code class="text-amber-300 font-bold text-sm">Preserve Logs</code>
          </div>
          <p class="text-xs text-zinc-400 leading-relaxed mb-3">
            跨頁面跳轉保留 console messages 和 network requests，避免重定向日誌洗掉。
          </p>
        </div>
        <div class="rounded-lg bg-black/40 border border-white/5 p-2.5 font-mono text-amber-200/90 text-xs">
          保留 logs 後到下一頁檢查請求
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

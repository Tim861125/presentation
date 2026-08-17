<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DIAGNOSTICS"
      title="核心工具：控制台診斷 (Console) + 網路請求分析 (Network)"
      subtitle="提取控制台錯誤日誌與即時分析 API 傳輸狀態"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <TechCard accent="amber" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <code class="text-amber-300 font-bold text-xs">list_console_messages</code>
            <TechBadge color="amber">Console</TechBadge>
          </div>
          <p class="text-xs text-zinc-400 mb-2">取得瀏覽器 Console 所有訊息，支援 error / warning / log 級別過濾。</p>
          <div class="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-amber-200/90 text-[11px] mb-2">
            列出頁面所有 console error 與 warning
          </div>
        </div>
        <div class="rounded-lg bg-black/50 p-2.5 font-mono text-xs border border-white/5 space-y-0.5">
          <div class="text-[10px] text-zinc-500 mb-0.5">輸出示意</div>
          <div class="text-rose-400 text-[11px]">❌ TypeError: Cannot read 'id' of undefined</div>
          <div class="text-amber-400 text-[11px]">⚠ [Deprecation] getDisplayMedia requires...</div>
        </div>
      </TechCard>

      <TechCard accent="blue" class="p-4 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <code class="text-blue-300 font-bold text-xs">list_network_requests</code>
            <TechBadge color="blue">Network</TechBadge>
          </div>
          <p class="text-xs text-zinc-400 mb-2">列出所有網路請求，包含狀態碼、耗時與傳輸大小，快速鎖定異常 API。</p>
          <div class="rounded-lg bg-black/40 border border-white/5 p-2 font-mono text-blue-200/90 text-[11px] mb-2">
            列出非 200 狀態碼請求，以表格呈現 URL / 狀態 / 耗時
          </div>
        </div>
        <div class="rounded-lg bg-black/50 p-2.5 font-mono text-xs border border-white/5 space-y-0.5">
          <div class="text-[10px] text-zinc-500 mb-0.5">輸出示意</div>
          <div class="text-rose-400 text-[11px]">❌ /api/user 500 · 1.2s</div>
          <div class="text-emerald-400 text-[11px]">✓ /api/products 200 · 230ms</div>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

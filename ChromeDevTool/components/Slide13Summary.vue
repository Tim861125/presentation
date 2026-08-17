<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="掌握現代前端除錯核心思維"
      subtitle="從現象盲猜到精準定位問題根因"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="emerald">四大面板除錯心法</TechBadge>
          </div>
          <ul class="space-y-2.5 text-xs text-zinc-200 list-disc list-inside">
            <li>✅ <strong class="text-white">Elements</strong>：先看 DOM 結構與 CSS 計算樣式 (Computed)</li>
            <li>✅ <strong class="text-white">Console</strong>：看清楚完整的 Error Stack Trace</li>
            <li>✅ <strong class="text-white">Source</strong>：打 Breakpoint 追蹤邏輯走向</li>
            <li>✅ <strong class="text-white">Network</strong>：比對 API 參數與後端狀態碼</li>
          </ul>
        </div>
      </TechCard>

      <TechCard accent="cyan" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="cyan">專業開發者準則</TechBadge>
          </div>
          <p class="text-xs text-zinc-300 leading-relaxed">
            避免只靠 <code class="text-emerald-400 bg-white/5 px-1 rounded">console.log</code> 猜測變數狀態。善用條件斷點 (Conditional Breakpoints) 與 Network Timing 分析，大幅縮短排查時間。
          </p>
        </div>
        <div class="text-[11px] text-zinc-500 font-mono mt-4">
          Google Chrome DevTools · RD Team · 2026
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

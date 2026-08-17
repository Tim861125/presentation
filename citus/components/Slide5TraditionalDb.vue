<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="LEGACY APPROACH"
      title="傳統做法：每租戶獨立 Database"
      subtitle="實體隔離帶來的維運噩夢與資源浪費"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">痛點分析</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-3 list-disc list-inside leading-relaxed">
          <li class="text-rose-400 font-semibold">客戶增加後 Schema Migration 困難</li>
          <li class="text-rose-400 font-semibold">Database 數量與連線池爆炸</li>
          <li>各 DB 資源使用不均，無法彈性共享算力</li>
        </ul>
      </TechCard>

      <div class="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5 font-mono text-xs text-zinc-300 space-y-2">
        <div class="p-2 rounded bg-black/40 border border-white/5 text-rose-300">Google DB (獨立連線與配置)</div>
        <div class="p-2 rounded bg-black/40 border border-white/5 text-rose-300">Microsoft DB (獨立連線與配置)</div>
        <div class="p-2 rounded bg-black/40 border border-white/5 text-rose-300">Apple DB (獨立連線與配置)</div>
      </div>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI BILLING · SYSTEM UPGRADE"
      title="AI 點數系統架構升級"
      subtitle="點數使用期限、優先級扣減與白名單機制"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">扣減機制</TechBadge>
          <span class="text-xs font-mono text-zinc-400">EXPIRATION & ORDER</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">點數期限與扣抵順序</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增點數到期使用期限欄位與定時排程過期機制</li>
          <li>調整點數扣抵順序：優先扣除「活動贈送」點數，再扣「付費購買」點數</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">系統型態</TechBadge>
          <span class="text-xs font-mono text-zinc-400">INTEGER & WHITELIST</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">白名單與整數型態</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增管理員與內部測試「白名單」功能</li>
          <li>全站點數計算統一改為整數（Integer）型態，杜絕浮點運算誤差</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

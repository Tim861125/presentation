<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SYSTEM MAINTENANCE & OPERATIONS"
      title="公告功能與維運處理"
      subtitle="CRM / TipoMusic 系統公告與資料轉置處理"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">公告系統</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ANNOUNCEMENT MODULE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">CRM 與 TipoMusic 公告</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>CRM 系統公告發布與渲染異常修復</li>
          <li>TipoMusic 一般使用者查詢頁面公告橫幅上線</li>
        </ul>
      </TechCard>

      <TechCard accent="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="blue">維運與排障</TechBadge>
          <span class="text-xs font-mono text-zinc-400">OPS & ISSUE TRACKING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料轉置與 AI 疑難排解</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利資料轉置排程例外監控與修復</li>
          <li>AI 模組調用超時與回應格式疑難排解</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MANAGEMENT & AUTO-RUN"
      title="管理白名單與自動執行設定"
      subtitle="管理者權限控制、速讀通進入自動觸發與全域 Auto Run"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">權限管控</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ADMIN WHITELIST</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">AI 管理者白名單</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          建立內部管理員白名單機制，免除測試與展示時的點數扣減，方便即時排障。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">自動執行</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUTO-RUN PIPELINE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">速讀通與閱讀通 Auto Run</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利速讀通支援切換至詳細頁時自動觸發生成</li>
          <li>使用者可於個人偏好中彈性開啟或關閉 Auto Run</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

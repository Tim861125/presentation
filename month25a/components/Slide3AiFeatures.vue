<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI FEATURES · SPEED & DETAIL READ"
      title="閱讀通與速讀通功能規格"
      subtitle="預設啟動行為、個人化開關與後端設定 API"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">預設啟動</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DEFAULT SETTINGS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">速讀通 ＆ 閱讀通自動化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          進入頁面時預設自動啟動速讀通與閱讀通，使用者可自由於「個人設定」中選擇預設開啟或關閉。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">後端支援</TechBadge>
          <span class="text-xs font-mono text-zinc-400">POINT SERVICE API</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">服務端設定同步</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          `func-point-service` 新增 API 記錄使用者個人偏好，確保 WEBPAT 與 IPTECH 之速讀通與閱讀通規格 100% 保持一致。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

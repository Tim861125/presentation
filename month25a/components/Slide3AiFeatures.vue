<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI FEATURES · 閱讀通 & 速讀通"
      title="AI 摘要功能：閱讀通與速讀通"
      subtitle="閱讀通＝專利詳細頁摘要、速讀通＝檢索清單摘要，按次扣 AI 點數——本期完成前後端串接與個人化開關"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="WEBPAT 前端" color="emerald" />
          <span class="text-xs font-mono text-zinc-400">FRONTEND</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">API 串接＋即改即存的設定對話框</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>串接閱讀通、速讀通 API 到清單與詳細頁</li>
          <li>個人設定「自動開啟／停止自動開啟」即改即存，不需按儲存</li>
          <li>進入頁面預設自動啟動</li>
        </ul>
      </TechCard>

      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="後端與 IPTECH" color="blue" />
          <span class="text-xs font-mono text-zinc-400">PROFILE-SETTING API</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">個人偏好存進計費微服務</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>func-point-service 新增 profile-setting API 與資料表，記錄每位使用者的自動開啟偏好</li>
          <li>IPTECH 以相同 API 規格完成速讀通串接；個人開關本期先以平台預設行為上線</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MULTI-PLATFORM · I18N & PIPELINE"
      title="跨平台翻譯、維護與資料管線"
      subtitle="WEBPAT（專利檢索）· IPTECH（專利分析）· TIPO MUSIC（音樂著作資訊查詢）"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="blue" class="p-4">
        <div class="mb-2">
          <TechBadge label="WEBPAT / IPTECH" color="sky" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">介面翻譯與 UI 修訂</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          英文／簡體介面補齊翻譯：登入頁、語系設定、placeholder、系統提示與 AI 功能名稱；同步修正 header、按鈕排版與速讀通錯誤訊息重複問題。
        </p>
      </TechCard>

      <TechCard variant="rose" class="p-4">
        <div class="mb-2">
          <TechBadge label="TIPO MUSIC" color="rose" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">弱掃排查與部署</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          弱點掃描問題排查：補上 Security Policy 設定、修正 Google Analytics 統計 URL；經測試區驗證後部署至正式機。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="mb-2">
          <TechBadge label="專利英譯資料 TWIP" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">英譯轉置管線</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          新增公開／公告英譯資料管線：XML 資料經 RAW → L1 攤平 → L2 待更新清單逐層轉置，英譯更新可連動專利搜尋文件重建。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

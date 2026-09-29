<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI PROMPTS · I18N"
      title="AI 摘要支援四種語系"
      subtitle="原本 prompt 固定中文版——改由呼叫端帶語系標識，prompt 服務按語系取模板"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="前端語系分流" color="blue" />
          <span class="text-xs font-mono text-zinc-400">WEBPAT + IPTECH</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">依介面語言傳對應 prompt</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          兩站呼叫 AI 摘要時依使用者介面語言（繁中、簡中、英文、日文）帶語系標識，兩種摘要各建四種語系的 prompt key：
        </p>
        <ul class="mt-2 text-xs text-zinc-400 font-mono space-y-1 list-disc list-inside leading-relaxed">
          <li>清單摘要：WebpatListSummary_{zh-hant | zh-hans | en | ja}</li>
          <li>全文摘要：WebpatDescriptionSummary_{zh-hant | zh-hans | en | ja}</li>
        </ul>
        <p class="mt-2 text-xs text-zinc-400 leading-relaxed">
          一併修正登入後 header 選單、檢索頁切換語言無效的問題。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="Prompt 管理後台" color="emerald" />
          <span class="text-xs font-mono text-zinc-400">SERVICE + EDITOR</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">讓 AI 團隊自己管理提示詞</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>prompt 資料表與 API 新增功能代碼（featureCode → featureId）欄位與查詢</li>
          <li>prompt 快取檢查加入 crmId 判斷；編輯器支援依功能篩選與命名，提示詞改由 AI 團隊自行維護</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

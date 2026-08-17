<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI PROMPTS · I18N SUPPORT"
      title="AI 多語系 Prompt Key 支援"
      subtitle="清單摘要與詳細描述之多國語系 Prompt 鍵值定義"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">清單摘要</TechBadge>
          <span class="text-xs font-mono text-zinc-400">LIST SUMMARY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">WebpatListSummary 系列</h3>
        <ul class="text-xs text-zinc-300 font-mono space-y-1.5 list-disc list-inside leading-relaxed">
          <li>`WebpatListSummary_zh-hant` (繁中)</li>
          <li>`WebpatListSummary_zh-hans` (簡中)</li>
          <li>`WebpatListSummary_en` (英文)</li>
          <li>`WebpatListSummary_ja` (日文)</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">全文描述</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DESCRIPTION SUMMARY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">WebpatDescriptionSummary 系列</h3>
        <ul class="text-xs text-zinc-300 font-mono space-y-1.5 list-disc list-inside leading-relaxed">
          <li>`WebpatDescriptionSummary_zh-hant` (繁中)</li>
          <li>`WebpatDescriptionSummary_zh-hans` (簡中)</li>
          <li>`WebpatDescriptionSummary_en` (英文)</li>
          <li>`WebpatDescriptionSummary_ja` (日文)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

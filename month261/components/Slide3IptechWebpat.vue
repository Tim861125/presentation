<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · UI & SEARCH"
      title="IPTECH & WEBPAT 介面與檢索通"
      subtitle="速讀通/閱讀通 UI 更新、Prompt 調整與 MCP 串接"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">UI 優化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">INTERFACE UPDATE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">介面與文字修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>速讀通及閱讀通介面佈局全面更新</li>
          <li>全站專利術語與提示訊息文字修訂</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">檢索通</TechBadge>
          <span class="text-xs font-mono text-zinc-400">UPAT MCP INTEGRATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">檢索通流程與 MCP 整合</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>重新定義檢索通對話與檢索流程</li>
          <li>微調檢索 Prompt 提升專利匹配率</li>
          <li>PatentPilotService 正式串接 Upat MCP 協定</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

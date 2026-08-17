<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SELECTION MATRIX"
      title="三大 Transport 應用情境選型指南"
      subtitle="根據部屬環境與架構需求精準挑選最適傳輸層"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="cyan">Stdio</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">桌面應用與本機工具</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
          <li>Claude Desktop / Cursor IDE</li>
          <li>本地檔案、Git、SQLite</li>
          <li>極度要求零延遲與本機安全性</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">SSE (舊版)</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">僅限舊專案向後相容</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
          <li>維護既有已上線的舊版 MCP Server</li>
          <li>暫時無法重構的過渡期</li>
          <li class="text-rose-400 font-semibold">❌ 新專案嚴禁選用</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">Streamable HTTP</TechBadge>
        </div>
        <h4 class="text-sm font-bold text-white mb-1">所有新專案的第一首選 ⭐</h4>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
          <li>雲端微服務、Web AI 助理</li>
          <li>需要進度追蹤 (Progress) 的長任務</li>
          <li>企業級微服務與跨網域部署</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

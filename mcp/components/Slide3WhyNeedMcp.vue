<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPARISON"
      title="為什麼需要 MCP？M × N 連接爆炸 vs 統一協定"
      subtitle="從自定義外掛碎片化走向標準化生態系"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">傳統私有連接 (M × N 複雜度)</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-2 bg-black/40 p-3 rounded">
          <div>Claude Desktop ➔ 專屬 Plugin ➔ DB</div>
          <div>Cursor IDE &nbsp; &nbsp; ➔ 專屬 Plugin ➔ API</div>
          <div>Custom Agent &nbsp; ➔ 自製 Script &nbsp;➔ Files</div>
        </div>
        <p class="text-xs text-rose-300 mt-2">每個 AI 工具都要為不同資料來源重寫一整套連接器，維護極為痛苦。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">MCP 標準架構 (M + N 複雜度)</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-2 bg-black/40 p-3 rounded">
          <div>AI Apps (Claude, Cursor, Agents)</div>
          <div class="text-cyan-400">&nbsp; &nbsp; ⬇ (MCP Open Protocol)</div>
          <div>MCP Servers (Filesystem, Postgres, GitHub API)</div>
        </div>
        <p class="text-xs text-emerald-300 mt-2">Server 寫一次，任何支援 MCP 的 Client 皆可立即插拔使用！</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

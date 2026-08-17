<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TOPOLOGY"
      title="連線拓撲：一對一專線模型"
      subtitle="一個 Client 連一個 Server；一個 Host 內可聚合多個 Client"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">連線原則</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">1 Client ➔ 1 Server</span>：每次連線皆為點對點獨立通訊</li>
          <li><span class="text-white font-semibold">1 Host ➔ 多個 Client</span>：Claude Desktop 可同時連線 Filesystem, GitHub, Postgres</li>
          <li><span class="text-white font-semibold">1 Server ➔ 多個 Client</span>：同一本機 Server 可同時被 VS Code 與 CLI 連接</li>
        </ul>
      </TechCard>

      <div class="p-4 rounded-xl border border-white/10 bg-white/5 font-mono text-[11px] text-zinc-300">
        <div class="text-cyan-400 font-bold mb-2">Claude Desktop (Host)</div>
        <div>&nbsp;├── Client A ═══════▶ [ Filesystem Server ]</div>
        <div>&nbsp;├── Client B ═══════▶ [ Database Server ]</div>
        <div>&nbsp;└── Client C ═══════▶ [ Web Search Server ]</div>
      </div>
    </div>
  </SlideShell>
</template>

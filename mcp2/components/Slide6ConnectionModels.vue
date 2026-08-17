<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE COMPARISON"
      title="連線模型本質對比：雙連線 vs 單連線串流"
      subtitle="SSE 雙通道異步拼湊 vs Streamable HTTP 單一請求管線"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">SSEClientTransport (雙連線模型)</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1.5 bg-black/40 p-3 rounded">
          <div>Client ─── POST /message ───▶ Server</div>
          <div>Client ◀═══ GET /events (SSE) ══ Server</div>
        </div>
        <p class="text-xs text-zinc-400 mt-2">一條送請求、一條收推播，兩條連線生命週期完全獨立，狀態極易脫節。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">StreamableHTTP (單連線全雙工串流)</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1.5 bg-black/40 p-3 rounded">
          <div>Client ═══ POST /rpc (Stream) ═══▶ Server</div>
          <div>Client ◀══ Resp / Progress (Chunk) ═ Server</div>
        </div>
        <p class="text-xs text-zinc-400 mt-2">一條連線完成完整交握與串流分塊傳輸，語意統一、乾淨無懸掛。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

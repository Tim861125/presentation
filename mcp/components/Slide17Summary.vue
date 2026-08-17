<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SUMMARY"
      title="核心總結"
      subtitle="AI 時代的通訊中樞 — 讓大模型真正具備行動力"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 統一開放協定</h4>
        <p class="text-xs text-zinc-300">消除私有外掛破碎化，建構如同 USB-C 的通用 AI 生態介面。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 職責精確分工</h4>
        <p class="text-xs text-zinc-300">Host (AI 推理)、Client (通訊轉換)、Server (外部能力封裝)。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 三大核心原語</h4>
        <p class="text-xs text-zinc-300">Resources (讀取)、Tools (執行操作)、Prompts (對話樣板)。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">✅ 雙向傳輸彈性</h4>
        <p class="text-xs text-zinc-300">本機 Stdio 高效安全，雲端 HTTP/SSE 支援分散式多租戶擴展。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

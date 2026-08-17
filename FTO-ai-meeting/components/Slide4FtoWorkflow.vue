<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WORKFLOW"
      title="FTO 專利分析五大完整步驟"
      subtitle="從特徵拆解、檢索範圍到最核心的「權利要求書比對」"
    />

    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
      <TechCard accent="slate" class="p-3">
        <div class="text-xs font-mono text-teal-400 font-bold mb-1">01. 特徵拆解</div>
        <h4 class="text-xs font-semibold text-white mb-1">Feature List</h4>
        <p class="text-[11px] text-zinc-300">列出結構、材料、製程與演算法清單</p>
      </TechCard>

      <TechCard accent="slate" class="p-3">
        <div class="text-xs font-mono text-teal-400 font-bold mb-1">02. 確立範圍</div>
        <h4 class="text-xs font-semibold text-white mb-1">Scope</h4>
        <p class="text-[11px] text-zinc-300">鎖定目標國家市場、有效專利與主要競爭對手</p>
      </TechCard>

      <TechCard accent="slate" class="p-3">
        <div class="text-xs font-mono text-teal-400 font-bold mb-1">03. 執行檢索</div>
        <h4 class="text-xs font-semibold text-white mb-1">Search</h4>
        <p class="text-[11px] text-zinc-300">關鍵字＋IPC 分類號交叉篩選出高威脅清單</p>
      </TechCard>

      <TechCard accent="teal" class="p-3 border-teal-400/50">
        <div class="text-xs font-mono text-amber-300 font-bold mb-1">04. 請求項比對 ⭐</div>
        <h4 class="text-xs font-semibold text-white mb-1">Claim Mapping</h4>
        <p class="text-[11px] text-teal-200 font-medium">逐項比對做 Claim Chart ➔ <span class="text-amber-300 font-bold">AI 切入點！</span></p>
      </TechCard>

      <TechCard accent="slate" class="p-3">
        <div class="text-xs font-mono text-teal-400 font-bold mb-1">05. 策略控管</div>
        <h4 class="text-xs font-semibold text-white mb-1">Risk Strategy</h4>
        <p class="text-[11px] text-zinc-300">風險分級、迴避設計或出具律師法律意見書</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

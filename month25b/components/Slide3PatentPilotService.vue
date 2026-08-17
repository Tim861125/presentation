<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT PILOT SERVICE · BACKEND"
      title="Patent Pilot Service 核心能力"
      subtitle="請求攔截中介層與多語系 Prompt 引擎"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">點數 Middleware</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PRE-FLIGHT VALIDATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">請求前扣點驗證</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          於 API Gateway 與 Controller 層前置點數檢查 Middleware，在調用昂貴 LLM 前精準校驗用戶額度。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">多語系支援</TechBadge>
          <span class="text-xs font-mono text-zinc-400">MULTILINGUAL PROMPT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Prompt 多語系化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          全面支援繁體中文、簡體中文、英文與日文之 Prompt 模板動態切換與在地化回應。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

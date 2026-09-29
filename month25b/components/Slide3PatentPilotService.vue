<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT PILOT SERVICE · BACKEND"
      title="PatentPilot Service 後端強化"
      subtitle="AI 專利助理服務（Bun + Hono）— 餘額防護、多語系 Prompt、問答 API 重構"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="blue" class="p-5">
        <div class="mb-3">
          <TechBadge label="點數 Middleware" color="sky" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">請求前餘額攔截</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          API 進入點新增 middleware，呼叫 LLM 前先向點數服務校驗剩餘點數，不足即擋下回錯，避免白花推理成本。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="mb-3">
          <TechBadge label="多語系 Prompt" color="emerald" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Prompt 語言動態切換</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          Prompt 依使用者語系設定動態選擇模板，回覆以對應語系輸出，繁中、簡體中文、英文等多語系共用同一服務。
        </p>
      </TechCard>

      <TechCard variant="rose" class="p-5">
        <div class="mb-3">
          <TechBadge label="API 重構" color="rose" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">問答 API 模組化</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          ask question 邏輯抽離為獨立 prompt-service；JWT payload 補齊請求 context，並為 fromCache、stream 欄位補上值域規格。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

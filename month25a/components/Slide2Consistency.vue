<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · CONSISTENCY"
      title="雙平台介面與體驗一致性"
      subtitle="點數顯示標準化、餘額不足提醒與使用者名稱展示"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">點數顯示</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">預設 0 點與圖示</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          AI 未開通時，雙站右上角統一顯示「0 點」，點數星星圖示統一為亮黃色。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">餘額不足</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">點數不足提示防呆</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          點數不足時，即使點選「不再通知」，手動觸發功能時仍強制提示補點。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">使用者資訊</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">名稱統一呈現</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          IPTECH 與 WEBPAT 頂部導航列右上角，全面統一清晰顯示登入者名稱。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEEP DIVE"
      title="動態內容增刪對比"
      subtitle="動態節點自動承接事件 vs 繁瑣的手動重綁"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">無 Event Delegation</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增按鈕後，新按鈕無法點擊</li>
          <li>必須在新增代碼後手動呼叫 `newBtn.addEventListener()`</li>
          <li>刪除節點時若未妥善 `removeEventListener` 可能引發記憶體洩漏</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">使用 Event Delegation</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>新增按鈕後立即自動享有所有點擊邏輯</li>
          <li>父層監聽器維持不變，0 額外負擔</li>
          <li>DOM 隨意替換、重排或清空，絕不遺留懸掛監聽器</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

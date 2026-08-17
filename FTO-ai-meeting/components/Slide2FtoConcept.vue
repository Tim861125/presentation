<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PROBLEM & DEFINITION"
      title="什麼是 FTO (Freedom to Operate)？"
      subtitle="自由實施：我的產品製造與銷售，會不會踩到別人的專利地界？"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="teal" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="teal">🏠 投產前做 FTO</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">確認專利地界</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          就像蓋房子前必須先測量確認地界 —— 若未經 FTO 檢核就盲目開模投產，等同閉眼蓋屋，隨時面臨整批貨物遭扣押下架與高額賠償。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">😵 現有平台的痛點</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">查得到 vs 踩得到？</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          使用者在檢索平台查到一篇高度相關專利後，往往卡在關鍵一步 ——「那我到底有沒有侵權？」。本功能直接透過 AI 輔助回答此決策難題。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

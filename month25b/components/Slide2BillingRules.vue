<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI BILLING ENGINE · RULES"
      title="AI 功能開發 — 扣點機制修正"
      subtitle="到期日優先級、同日期贈點優先與負點數機制完善"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">規則 01</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">到期日優先扣點</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          先依照點數有效到期日由近至遠順序進行扣減，保障用戶權益。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">規則 02</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">同日期扣點順序</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          若到期日相同，系統優先扣除贈送點數，其次才扣除付費購買之點數。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">規則 03</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-2">負點數防斷機制</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          參考悠遊卡扣款模式，允許點數短期負值執行完畢，儲值時優先回補欠額。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

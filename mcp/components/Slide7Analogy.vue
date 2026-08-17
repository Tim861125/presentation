<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ANALOGY"
      title="形象比喻：企業專案分工模型"
      subtitle="PM (Host) ➔ 外務窗口 (Client) ➔ 專業外包廠商 (Server)"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">HOST</TechBadge>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">專案經理 (PM + 腦袋)</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          公司決策中心。聽懂老闆（使用者）的需求，制定解決方案，並決定要找哪幾家廠商支援。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">CLIENT</TechBadge>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">專線窗口 / 商務翻譯</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          負責與特定外包商打電話或發簽呈，把 PM 的口頭指示翻譯成規範合約格式並取回成果。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">SERVER</TechBadge>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">專業外包廠商</h3>
        <p class="text-xs text-zinc-300 leading-relaxed">
          專業製造廠或外包技師（資料庫維運、檔案倉儲、物流 API），接收標準訂單後直接執行實作。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

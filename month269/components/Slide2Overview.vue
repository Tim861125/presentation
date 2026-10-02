<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2026-09 · OVERVIEW"
      title="本月概覽"
      subtitle="四大主線：POC 上線、逐年轉置、系統維護、產品修正"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky" label="主線 01" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">域見通</h4>
        <p class="text-xs text-zinc-300">
          語意搜尋 POC 從核心整合到測試／正式站台上線，含多圖檢視與 UX 優化。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald" label="主線 02" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">資料轉置</h4>
        <p class="text-xs text-zinc-300">
          ES to Citus 支援逐年轉置與續跑；DOCDB 及世界各國 schema 與 mapping
          整合、即期與 L3 處理。
        </p>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose" label="主線 03" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">IPTECH</h4>
        <p class="text-xs text-zinc-300">
          v8.0.159 上線、多分類樹顯示修正、各頁面快檢通入口、AI 通模型更新。
          快檢通英文版 i18n、簡體語系修正。
        </p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber" label="主線 04" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">TipoMusic</h4>
        <p class="text-xs text-zinc-300">曲目語言分析欄位修正、排程更新</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

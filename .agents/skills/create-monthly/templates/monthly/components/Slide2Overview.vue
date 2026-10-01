<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="YYYY-MM · OVERVIEW"
      title="本月概覽"
      subtitle="工作項目約 N 筆 · 四大主線"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky" label="主線 01" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">主線一標題</h4>
        <p class="text-xs text-zinc-300">一到兩句說明主線一的範圍與成果。</p>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald" label="主線 02" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">主線二標題</h4>
        <p class="text-xs text-zinc-300">一到兩句說明主線二的範圍與成果。</p>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose" label="主線 03" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">主線三標題</h4>
        <p class="text-xs text-zinc-300">一到兩句說明主線三的範圍與成果。</p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber" label="主線 04" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">主線四標題</h4>
        <p class="text-xs text-zinc-300">一到兩句說明主線四的範圍與成果。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

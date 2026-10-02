<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC / 快檢通 · SUPPORT"
      title="產品維護與支援"
      subtitle="欄位修正、多語系與新產品前期討論"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="TIPOMUSIC" />
        </div>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>曲目語言分析修正改用明細表</li>
          <li>信箱收件者調整</li>
          <li>排程更新最新版本</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="快檢通 / 其他" />
        </div>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>快檢通英文版 i18n 新增；簡體語系結果頁顯示修正</li>
          <li>修正來源 index 並重新轉置</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">
        小穎客服異常排查 · 協助業務推廣域見通錄影 · 每週晨會／週會進度同步
      </p>
    </div>
  </SlideShell>
</template>

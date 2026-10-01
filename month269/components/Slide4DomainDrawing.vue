<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="域見通 / IPC 快檢通 · GALLERY"
      title="多圖檢視與圖式瀏覽"
      subtitle="高密度比對圖面，縮圖與大圖共用旋轉狀態"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="MULTI-VIEW" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">多圖模式與延遲載入</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>結果列表切「多圖」：保留專利號、名稱、相似度與圖面縮圖</li>
          <li>偏好存 localStorage；圖面依 docId 接近可視區才請求</li>
          <li>TiffImage 處理 TIFF／JPEG／PNG：快取、並行限制、骨架與重試</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="DRAWING" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">旋轉與閱讀體驗</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>清單縮圖與大圖同步旋轉，角度依專利＋圖號保存還原</li>
          <li>大圖前後切換、縮放、平移、全螢幕；切換版面 FLIP 動畫</li>
          <li>固定殼層滾輪處理：游標在清單外也可捲動結果</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

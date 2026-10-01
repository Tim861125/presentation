<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="產品線 · 主題英文代號"
      title="主題頁標題"
      subtitle="一句副標，說明本頁主軸"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="面向 A" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">卡片標題一</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>重點一，關鍵實作以 <code>code</code> 標註</li>
          <li>重點二</li>
          <li>重點三</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="面向 B" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">卡片標題二</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>重點一</li>
          <li>重點二</li>
        </ul>
      </TechCard>
    </div>

    <!-- 可選 footer bar：次要工作橫跨整列，降低欄高 -->
    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">次要工作 · 排查項目 · 其他維護事項（以「·」分隔）</p>
    </div>
  </SlideShell>
</template>

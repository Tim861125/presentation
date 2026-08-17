<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OUTLOOK PITFALLS 1"
      title="Outlook 踩坑要點 (一)：行高、圓角與背景圖"
      subtitle="Word Engine 特殊行為與規避原則"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 行高設定 (line-height)</h4>
        <p class="text-xs text-zinc-300">Outlook 的 `normal` 行高與 Gmail/Apple Mail 存在巨大視覺落差，<span class="text-amber-300 font-semibold">一律使用明確的 px 值</span> (如 `24px`)。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 容器圓角 (border-radius)</h4>
        <p class="text-xs text-zinc-300">Section 與 Column 上的 `border-radius` 在 Outlook 桌機版會被直接忽略，退化為直角卡片。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. CSS 背景圖 (background-image)</h4>
        <p class="text-xs text-zinc-300">Outlook 桌機版完全不支援 CSS `background-image`，需透過 VML 標籤複雜修補或直接放棄。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 現代佈局 (flex / grid / position)</h4>
        <p class="text-xs text-zinc-300">全部不支援！Email 排版唯一的生路就是回歸 Table 與 MJML Column。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

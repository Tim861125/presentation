<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="域見通 · POC"
      title="域見通"
      subtitle="Nuxt + OpenSearch h01l kNN + Dify workflow"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="檢索" />
        </div>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>qwen3-embedding-8b 取 512 維向量</li>
          <li>依各國公開、公告資料集，h01l index kNN search</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="品質與容錯" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">
          去重、重排序與降級
        </h3>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>kNN 候選倍率提高；同國別以 apnRaw 合併</li>
          <li>魚骨分群：階層式 k-means，Dify 失敗使用標題當 label</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

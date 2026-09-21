<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT / IPTECH · QUICK SEARCH"
      title="快檢通：跨國範圍與語意排序"
      subtitle="檢索範圍可選、結果排序與身分驗證接軌"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="169409" />
          <span class="text-xs font-mono text-zinc-400">US SCOPE</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">新增美國檢索範圍</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><code>CountryIndices</code> 展開國家碼為上游 index，未支援國家回 400</li>
          <li>前端 TW / US checkbox，勾選同步 <code>countryFilter</code>，範圍與語意檢索一致</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="170054" />
          <span class="text-xs font-mono text-zinc-400">KNN SCORE</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">語意相似度排序</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>回傳 OpenSearch KNN scores，前端串接相似度排序</li>
          <li>改走 <code>GetPatentByTextUpat</code>，預設國家 TW</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">登入流程與 WEBPAT 呼叫修正（173256、173258、173269）· 新增 better-auth（173333）· 問題排查（173335）</p>
    </div>
  </SlideShell>
</template>

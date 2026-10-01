<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="域見通 / IPC 快檢通 · POC"
      title="語意搜尋 POC 核心整合"
      subtitle="Nuxt 純 client-side SPA + OpenSearch h01l kNN + Dify workflow"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="架構" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">檢索鏈路與契約</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>API 呼叫集中 <code>api-client.ts</code>，契約集中 <code>shared/types.ts</code></li>
          <li>依邏輯索引選台／美公開、公告資料集，h01l 索引 kNN 近鄰搜尋</li>
          <li>patentpilot-service 取向量，<code>_source</code> 同存向量與顯示欄位</li>
          <li>完成 webpat SSO POST handoff 接續專利作業</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="品質與容錯" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">去重、重排序與降級</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>kNN 候選倍率提高；同國別以 apnRaw 合併、<code>_id</code> 排除來源專利</li>
          <li>Dify 重排序與魚骨分群：階層式 k-means，AI 標籤失敗降級標題標籤</li>
          <li>上游失敗統一 AppError 與規格錯誤碼；lazy per-tab 載入快取</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

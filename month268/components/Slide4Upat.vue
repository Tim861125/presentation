<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT EMBEDDING SEARCH · UPAT"
      title="全面改接 UPat 資料來源"
      subtitle="純向量索引 pat_vec_* 只有 embedding 欄位，所有 _source 依賴改道 UPat"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">新增 <code>GetPatentByTextUpat</code>（169665）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>kNN <code>_source: false</code> → UPat 以 <code>ID:(…)</code> 批次補內容</li>
          <li>一批 200 筆上限（實測 182ms），<code>upatDatabase</code> 一次請求可跨國</li>
          <li>kNN k 一律取 size 兩倍，避免 HNSW 提早收斂漏掉最近鄰</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">魚骨 / rerank 修復（169655）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>向量補撈由 <code>terms: docId</code> 改 <code>ids</code> 查 _id，魚骨圖不再爆 <code>EMBEDDING_EMPTY</code></li>
          <li><code>fetchDocTac</code> / <code>hydrateTac</code> 改由 UPat 取 abstract / claims</li>
        </ul>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">詳情與相似專利（169732）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li><code>GetPatentDetail</code> 增加選填 docId，UPat 查無回退 OpenSearch</li>
          <li>前端一律送 docId，保存 pnRaw → { docId, sourceIndex }</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">專案儲存與發版（170316）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>IPTech 專案儲存改用 UPat 直連 Elasticsearch</li>
          <li>搜尋、詳情、重排、分群全改 UPat 取資料 → <span class="text-cyan-400">v1.0.20</span></li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

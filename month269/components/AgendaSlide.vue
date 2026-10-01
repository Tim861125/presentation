<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2026-09 · AGENDA"
      title="本月異動項目"
      subtitle="域見通主線上線與資料轉置、系統維護工作"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-5">
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">01</span>
        <div>
          <p class="text-sm font-semibold text-white">域見通語意搜尋 POC 整合</p>
          <p class="text-xs font-mono text-zinc-400">Nuxt SPA + OpenSearch kNN + Dify 重排序／魚骨分群</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">02</span>
        <div>
          <p class="text-sm font-semibold text-white">多圖檢視與圖式瀏覽</p>
          <p class="text-xs font-mono text-zinc-400">延遲載入圖面、縮圖／大圖旋轉、搜尋框收合展開</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">03</span>
        <div>
          <p class="text-sm font-semibold text-white">域見通 UI／UX 與站台維運</p>
          <p class="text-xs font-mono text-zinc-400">CI/CD、OpenSearch alias、PostHog、code coverage</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">04</span>
        <div>
          <p class="text-sm font-semibold text-white">ES to Citus 逐年轉置</p>
          <p class="text-xs font-mono text-zinc-400">PD_YEARS 由新到舊逐年執行，SKIP 續跑、冪等重灌</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">05</span>
        <div>
          <p class="text-sm font-semibold text-white">DOCDB 世界各國拓展</p>
          <p class="text-xs font-mono text-zinc-400">schema 盤點、合併欄位與 OS mapping 修正、測試資料</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">06</span>
        <div>
          <p class="text-sm font-semibold text-white">IPTECH 系統維護</p>
          <p class="text-xs font-mono text-zinc-400">多分類樹修正、快檢通入口、v8.0.159 上線</p>
        </div>
      </div>
      <div class="flex items-baseline gap-3 border-b border-white/5 pb-2 md:col-span-2">
        <span class="text-[10px] font-mono text-cyan-400 shrink-0">07</span>
        <div>
          <p class="text-sm font-semibold text-white">TipoMusic、快檢通與支援</p>
          <p class="text-xs font-mono text-zinc-400">曲目語言分析欄位修正、MÜST 補值排程、PQAI 規格討論</p>
        </div>
      </div>
    </div>
  </SlideShell>
</template>

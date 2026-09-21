<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT EMBEDDING POC"
      title="CN 專利向量轉置"
      subtitle="5,230 萬筆中國專利進入純向量索引"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">tac-cn 變體（169430）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>公開/授權共用來源索引，以 <code>SOURCE_FILTER</code> 在來源端分流</li>
          <li>非法 JSON 直接報錯，不安靜跑全量</li>
          <li>cna 18.4M + cnb 33.9M，分桶 + checkpoint 分批</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">目的索引瘦身（169574）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li><code>vectorOnlyLayout</code>：僅存 _id + embedding，書目由 UPat 回查</li>
          <li><code>dynamic: strict</code>：髒文件逐筆 400、不中斷整批</li>
        </ul>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">壓測與報表（170666、171004）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>backfill 產生 Markdown 報告：設定、統計、每 10 萬筆進度、終態</li>
          <li>分段耗時與 embedding / token 吞吐量觀測</li>
        </ul>
      </TechCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs text-zinc-400">修正 <code>patentDisplayId()</code>：不再把 CN 號碼誤補成 <code>TWCN…</code> 假號碼</p>
      </div>
      <div class="rounded-lg border border-amber-400/30 bg-amber-400/5 px-4 py-3">
        <p class="text-xs text-amber-300">已知限制：來源同案兩筆約 64% 近重複，第一版不去重，方案待決；CN 超出 embedding 輸入長度問題排查中（173032）</p>
      </div>
    </div>
  </SlideShell>
</template>

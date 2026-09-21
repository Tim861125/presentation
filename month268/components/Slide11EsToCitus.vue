<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ES-TO-CITUS"
      title="Legacy ES 回填 Citus"
      subtitle="先溯源分析、再六國 + WOA 回填全數上線"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">Mapping 溯源（171714 / 171843–171845）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>app 交集 136 / 並集 141 欄；grant 僅 2 個差異欄</li>
          <li>比 L1 json_raw 多的 29 欄逐一溯源：RAW 原始值 / 合併快照 / 外部 join</li>
          <li>產出欄位策略三選一，與資深工程師、主管確認規格</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">回填 job（171853 起）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>共用 Scroll Input：Basic Auth、_doc 排序、SKIP 續跑</li>
          <li>US / CN / EP / KR / JP / WOA 全案別，身份三元組 upsert</li>
          <li>完整 _source 原樣保存至 <code>json_raw</code></li>
        </ul>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">批次標記與放寬（172746–172749）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>vol / period / trigger_tag 改寫 SOURCE_INDEX，消除與即期值語義衝突</li>
          <li>L2 / OS job 觸發變數改選用，省略時掃全表</li>
          <li>WA mapping 多語 suffix 對齊 ISO 639-1 + strict</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">驗證 Skills：<code>check-es-to-l1-format</code>（PG 結構欄位格式）與 <code>check-mapping</code>（json_raw 對 OS mapping）邊界釐清，標準化為可重複流程（172511、172747）</p>
    </div>
  </SlideShell>
</template>

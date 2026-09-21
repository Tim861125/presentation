<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT EMBEDDING SEARCH · REFACTOR"
      title="API 架構改造與前端體驗"
      subtitle="收斂成「動詞前置 + 群組名」的固定形狀"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">兩段式路由（169733）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li><code>server/api/{Group}/{Action}.{method}.ts</code>，取消路徑參數</li>
          <li>allowlist 為 exact pathname 比對，大小寫錯即默默要求登入</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">動詞收斂（169734）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>11 支端點只用 <span class="text-cyan-400">Get / Add / Set / Delete</span> 四個動詞</li>
          <li>讀取一律歸 Get（含 POST 大 body），建立資料才用 Add</li>
        </ul>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">語意與設定清理（169735–169737）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>k → size：回傳筆數與 kNN 候選數語意分離</li>
          <li>移除直連 vLLM 死路；合併過撈倍數改環境變數可調</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">詳情換場動畫重寫（169383）</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>快照交棒消除「新號碼 + 舊標題」錯配空窗</li>
          <li>高度以 Web Animations API 補間；支援 reduced-motion</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

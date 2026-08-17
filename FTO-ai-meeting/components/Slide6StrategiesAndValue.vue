<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="STRATEGY & VALUE"
      title="踩到高風險專利？五大應對策略與核心商業價值"
      subtitle="將高額侵權訴訟轉化為設計階段即可完成的即時體檢"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
      <TechCard accent="emerald" class="p-3">
        <h4 class="text-xs font-bold text-emerald-300 mb-1">① 迴避設計 (Design Around)</h4>
        <p class="text-[11px] text-zinc-300">修改結構或材料繞開特徵，成本最低、最推薦。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-3">
        <h4 class="text-xs font-bold text-cyan-300 mb-1">② 提出舉發 (Invalidation)</h4>
        <p class="text-[11px] text-zinc-300">尋找先前技術以缺乏新穎性/進步性撤銷對方專利。</p>
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <h4 class="text-xs font-bold text-purple-300 mb-1">③ 洽談授權 (Licensing)</h4>
        <p class="text-[11px] text-zinc-300">支付授權金，將法律風險轉為可控商業成本。</p>
      </TechCard>

      <TechCard accent="sky" class="p-3">
        <h4 class="text-xs font-bold text-sky-300 mb-1">④ 交叉授權 (Cross-Licensing)</h4>
        <p class="text-[11px] text-zinc-300">以自身專利與對手互換授權，達成恐怖平衡。</p>
      </TechCard>

      <TechCard accent="amber" class="p-3 md:col-span-2">
        <h4 class="text-xs font-bold text-amber-300 mb-1">⑤ 調整上市市場</h4>
        <p class="text-[11px] text-zinc-300">專利具地域性，避開壁壘過高的國家或延後上市直至專利過期。</p>
      </TechCard>
    </div>

    <div class="mt-4 p-3 rounded-lg border border-teal-500/30 bg-teal-500/10 text-xs text-zinc-200">
      <span class="text-teal-300 font-bold">💡 核心價值：</span>
      把最耗時耗力的人工 Claim Chart 比對交給 AI 幾秒完成，讓 FTO 成為每位工程師在研發階段就能隨手執行的即時體檢！
    </div>
  </SlideShell>
</template>

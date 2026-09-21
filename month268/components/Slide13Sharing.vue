<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="KNOWLEDGE SHARING · RESEARCH"
      title="技術分享與研究"
      subtitle="週會專題、工具評測與新資料源評估"
    />

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-5">
      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">BM25 vs TF-IDF</h3>
        <p class="text-xs text-zinc-300">詞頻飽和防關鍵字堆疊、長度正規化防長文佔便宜（170980）</p>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">Hybrid Search 深潛</h3>
        <p class="text-xs text-zinc-300">k1 / b 參數、phase_results_processor、正規化製成完整規格（171846）</p>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">Caddy 入門</h3>
        <p class="text-xs text-zinc-300">Reverse proxy 與 Automatic HTTPS，自動申請與續期憑證（172743）</p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">Citus 研究</h3>
        <p class="text-xs text-zinc-300">分片鍵選 formatted_pn 達成共置，避免 cross-node JOIN（170691）</p>
      </TechCard>

      <TechCard variant="rose" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">qwen3.8 Code Review</h3>
        <p class="text-xs text-zinc-300">以本地模型評測能否替代訂閱 AI 模型（171362）</p>
      </TechCard>

      <TechCard variant="blue" class="p-4">
        <h3 class="text-sm font-semibold text-white mb-2">DOCDB 拓展</h3>
        <p class="text-xs text-zinc-300">原始資料與程式碼檢視、實做及規格討論（173261 / 173337）</p>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">其他：50.92 機器機房排查（171364）· mount-init log 掛載調整（172574）· 資轉失敗檔案移除協助（173025）· code review KR / EP / CN / JP（170046–170049）</p>
    </div>
  </SlideShell>
</template>

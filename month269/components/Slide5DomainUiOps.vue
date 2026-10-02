<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="域見通 · UX & OPS"
      title="UI／UX 修正與站台維運"
      subtitle="顯示一致性、部署管線與可觀測性"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky" label="UI / UX" />
        </div>
        <ul
          class="text-sm text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed"
        >
          <li>專利號統一顯示「國別碼 + 專利號 + kindcode」</li>
          <li>搜尋框依實際高度收合，頁首膠囊接手展開</li>
          <li>claim 原文已帶項次標號時隱藏清單自動編號</li>
          <li>修結果卡點擊死區；日期篩選加年／月下拉</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald" label="DEPLOY / OPS" />
        </div>
        <ul
          class="text-sm text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed"
        >
          <li>Rancher 建站台、CI/CD 更新至測試及正式站</li>
          <li>索引切換尾綴 _all alias</li>
          <li>導入 PostHog 行為分析，不蒐集敏感資訊</li>
          <li>Code coverage 盤點（Bun test）：k-means 確定性、API 契約邊界</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-3">
      <p class="text-xs text-zinc-400">
        Demo 展示與規格討論 · 業務推廣錄影協助 · 簡體語系結果頁修正與 Dify
        prompt 更新 · 工程模式改為點擊版本資訊啟用
      </p>
    </div>
  </SlideShell>
</template>

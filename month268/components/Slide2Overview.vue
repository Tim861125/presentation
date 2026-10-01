<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="2026-08 · OVERVIEW"
      title="本月概覽"
      subtitle="工作項目約 129 筆 · 四大主線"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <TechCard variant="blue" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky" label="主線 01" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">Patent Embedding Search</h4>
        <p class="text-xs text-zinc-300">多國家註冊表、檢索全面改接 UPat（內部專利資料 Middleware）、API 命名改造。</p>
      </TechCard>

      <TechCard variant="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald" label="主線 02" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">CN 向量轉置</h4>
        <p class="text-xs text-zinc-300">5,230 萬筆中國專利進入純向量索引，完成分段壓測。</p>
      </TechCard>

      <TechCard variant="default" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose" label="主線 03" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">即期資轉管線</h4>
        <p class="text-xs text-zinc-300">新公告專利逐期轉檔的管線，依 ADR（架構決策紀錄）0008/0009/0010 重整 14 國案別更新鏈。</p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber" label="主線 04" />
        </div>
        <h4 class="text-base font-semibold text-white mb-1">es-to-citus 回填</h4>
        <p class="text-xs text-zinc-300">legacy ES mapping 溯源，六國 + WOA 歷史資料全數回填至 Citus（PostgreSQL 分散式擴充）。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

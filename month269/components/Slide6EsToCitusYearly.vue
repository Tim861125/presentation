<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="資料轉置 · ES TO CITUS"
      title="ES to Citus 逐年轉置"
      subtitle="中斷可續跑、可單年重灌補洞的批次工具"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="PD_YEARS" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">逐年執行</h3>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li><code>PD_YEARS</code>（zod 驗證四位年清單）由新到舊逐年跑</li>
          <li>SKIP 只套第一年，續跑從中斷年接續；冪等 upsert 單年重灌</li>
          <li>每年獨立 getCount、log 與進度事件，錯誤附 pdYear 定位</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="YEAR FILTER" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">來源過濾與測試</h3>
        <ul
          class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed"
        >
          <li>
            ES input 新增 <code>pubDateYears</code> range，套用到分頁、SKIP
            邊界與計數
          </li>
          <li>
            無年份過濾維持原 match_all 形狀相容；補 bool／range 可求值測試
          </li>
          <li>各國 ES to Citus job 亦支援按年篩選</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">
        完成美國 2025／2030、2020 index 與各國 ES→L1 轉置及規格文件 · embedding
        工具補批次筆數、成敗、重試與摘要 log
      </p>
    </div>
  </SlideShell>
</template>

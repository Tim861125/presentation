<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="AI BILLING ENGINE · RULES"
      title="AI 扣點機制修正"
      subtitle="AI 功能以點數計費 — 本月重整扣點順序、透支機制與排程執行"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="emerald" class="p-4">
        <div class="mb-2">
          <TechBadge label="規則 01 · 扣點順序" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">到期日優先扣點</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          依點數有效到期日由近至遠排序扣減；到期日相同時先扣贈送點、後扣付費點，使用者付費點不被無謂消耗。
        </p>
      </TechCard>

      <TechCard variant="sky" class="p-4">
        <div class="mb-2">
          <TechBadge label="規則 02 · 負點數透支" color="blue" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">允許短期負值</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          參考悠遊卡模式：點數不足時先扣盡餘額讓任務跑完，以 overdraft 紀錄承載欠款；儲值後優先回補欠額再續扣。
        </p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="mb-2">
          <TechBadge label="規則 03 · 排程 daemon" color="amber" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">cron 改常駐迴圈</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          扣點 daemon 由 cron 改為常駐迴圈執行，中斷後自最後一筆 replay_record_id 續跑；FIFO 每批 1,000 筆，DB 交易內同步寫交易紀錄與扣點來源明細。
        </p>
      </TechCard>
    </div>

    <div class="mt-5">
      <Callout type="tip" title="收攏扣點權限">
        <p class="text-xs text-zinc-300 leading-relaxed">
          移除各前端站台的 fetch 扣點 API，加點／扣點 API 統一集中至點數服務；餘額查詢 API 回傳點數更新時間，前端得以顯示最新餘額。
        </p>
      </Callout>
    </div>
  </SlideShell>
</template>

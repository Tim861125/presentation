<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="API SYNTAX"
      title="基本語法與參數配置"
      subtitle="callback 與 timeout 逾時保底選項"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">API 宣告與基本使用</div>
        <JsonCard
          filename="ric_syntax.js"
          :code="`// 簽名：
const handle = requestIdleCallback(callback, options);

// 基本範例：
function doWork(deadline) {
  console.log('當前幀剩餘時間 (ms):', deadline.timeRemaining());
  // 執行工作...
}

// 註冊閒置回調（可選傳入 timeout 毫秒保底）
const id = requestIdleCallback(doWork, { timeout: 2000 });`"
        />
      </div>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">參數說明</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">callback</span>：接收 `IdleDeadline` 物件做時間預算檢查</li>
          <li><span class="text-white font-semibold">options.timeout</span>：若系統一直處於高負載，超過此毫秒數將強制把任務插隊送入微任務佇列執行，避免任務永遠餓死 (Starvation)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BEST PRACTICES"
      title="rIC 開發四大黃金準則"
      subtitle="預算檢查、超時保底、切片拆分與 Polyfill 降級"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 嚴格檢查 timeRemaining()</h4>
        <p class="text-xs text-zinc-300">執行下一個任務前，務必檢查剩餘時間是否足夠，切勿超時佔用。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 設定合理的 timeout 保底</h4>
        <p class="text-xs text-zinc-300">對於關鍵業務日誌，設置 `{ timeout: 3000 }` 防止長時間未閒置導致資料遺失。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 將巨型任務分解為原子塊</h4>
        <p class="text-xs text-zinc-300">支援隨時暫停與中斷，讓出主執行緒給隨機發生的使用者交互。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. Safari 瀏覽器降級 (Polyfill)</h4>
        <p class="text-xs text-zinc-300">Safari 歷史版本可能未支援，需回退至 `setTimeout(..., 1)` 降級執行。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

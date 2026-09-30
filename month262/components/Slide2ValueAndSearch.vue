<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="IPTECH / WEBPAT · AI MODULES"
      title="新增價值通 ＆ 修正檢索通"
      subtitle="價值通＝評估專利技術價值的 AI 模組；檢索通＝對話式專利檢索模組"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">新功能上線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI PATENT TECH VALUE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">新增價值通</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>後端評估 API＋專利詳情頁整合，輸出專利的 AI 技術價值評估</li>
          <li>支援語系與 APD 參數，可提供英文版評估結果</li>
          <li>開放閱讀通／價值通切換，修正切換失效與顯示條件問題</li>
          <li>送件納入 isSep 欄位（標準必要專利聲明），依專利文字長度控管 token 上限</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">檢索通優化</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AI SEARCH TUNING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">檢索通流程修正與 Prompt 調校</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>修正檢索流程與 MCP（模型呼叫外部工具查詢專利的協定）查詢鏈路，LLM 換型為 Gemini</li>
          <li>對話與查詢記錄寫入 DB，修正寫入格式</li>
          <li>新增 Prompt tuning 小工具（管理頁＋API），快速調整並比對提示詞後上線</li>
          <li>輸入框支援 Shift + Enter 換行；錯誤時顯示思考狀態、修正雙回應問題</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

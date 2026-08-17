<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SELECTION"
      title="rIC 適用與不適用場景判定"
      subtitle="明確界定任務優先級，避免將關鍵路徑誤放至閒置調度"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">✅ 極度適合 rIC</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>非同步埋點上傳與分析日誌批次聚合</li>
          <li>下一個路由頁面的圖片與組件預載入</li>
          <li>客戶端 LocalStorage / IndexedDB 索引重建</li>
          <li>龐大陣列的非同步過濾與統計運算</li>
        </ul>
      </TechCard>

      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">❌ 絕對禁止使用 rIC</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>首屏關鍵 DOM 渲染與版面配置</li>
          <li>按鈕點擊等即時使用者反饋（導致卡頓感）</li>
          <li>連續動畫繪製（應使用 rAF）</li>
          <li>Promise 關鍵網路請求發起與解析</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

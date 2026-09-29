<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DATA PIPELINE · DATA-IMPORTER"
      title="專利資料管線擴充"
      subtitle="data-importer（自研專利資料匯入管線）：新增公告資料源抓取、逐層加工後同步至 OpenSearch 分散式搜尋引擎"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">新增資料管線</TechBadge>
          <span class="text-xs font-mono text-zinc-400">NEW JOBS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">積體電路佈局與公報影像匯入</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>積體電路佈局公告資料：由原始抓數、翻譯對映到 L1/L2/L3 逐層加工管線（資料分層處理）</li>
          <li>公告案專利公報：影像檔與書目文字資料新增加工任務，並撰寫製作規格</li>
          <li>上層資料同步至 OpenSearch，供搜尋與分析使用</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">環境與研調</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DOCKER · OPENSEARCH</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">容器編排與搜尋引擎整合</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>Docker Compose 多服務容器編排：本地開發與匯入管線環境標準化</li>
          <li>OpenSearch 分散式全文檢索與索引機制研習，投入資料同步鏈路</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

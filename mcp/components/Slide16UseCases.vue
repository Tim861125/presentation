<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="APPLICATIONS"
      title="MCP 四大核心應用落地情境"
      subtitle="從 IDE 輔助開發到企業級多系統自動化整合"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 開發工具整合 (IDE Integration)</h4>
        <p class="text-xs text-zinc-300">IDE 讓 AI 助手直接讀取本地代碼、查詢資料庫 Schema、執行測試與 Git Commit。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 企業數據分析與報表</h4>
        <p class="text-xs text-zinc-300">連接公司內部 BI、Snowflake 與 Elasticsearch，AI 自然語言直接產出視覺化圖表。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 企業知識庫檢索 (RAG)</h4>
        <p class="text-xs text-zinc-300">將 Confluence、Notion、專利庫封裝為 Resources，供大模型即時查閱最新準確資料。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 自動化跨系統工作流</h4>
        <p class="text-xs text-zinc-300">透過 Tools 串接 Jira、Slack、GitHub 與 Azure DevOps，實現自主 Agent 協同排程。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

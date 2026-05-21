<template>
  <div class="h-full flex flex-col justify-center px-2">
    <h2 class="text-2xl font-bold text-white mb-4">Chunking 策略 & Embedding 選擇</h2>
    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-3">
        <InfoCard title="三種切割方式" color="blue">
          <div class="text-xs space-y-2">
            <div><span class="text-gray-300 font-bold">Fixed-size</span><span class="text-gray-500">　固定字元數，簡單但可能切斷語意</span></div>
            <div><span class="text-gray-300 font-bold">Paragraph-based</span><span class="text-gray-500">　按段落切，保留語意完整</span></div>
            <div><span class="text-green-300 font-bold">Hierarchical</span><span class="text-gray-500">　大段落 + 細分 chunk，長文件首選</span></div>
          </div>
        </InfoCard>
        <InfoCard title="調參建議" color="purple">
          <div class="text-xs space-y-1">
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">短問答</span><span class="text-gray-200">Chunk 256–512 / Overlap 50–100</span></div>
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">長文件</span><span class="text-gray-200">Chunk 512–1024 / Overlap 100–200</span></div>
            <div class="flex gap-3"><span class="text-gray-500 w-20 shrink-0">代碼文件</span><span class="text-gray-200">Chunk 512 / Overlap 0</span></div>
          </div>
        </InfoCard>
      </div>
      <div class="space-y-3">
        <InfoCard title="Embedding 模型選擇" color="orange">
          <div class="text-xs space-y-1.5">
            <div class="flex justify-between"><span class="text-gray-300">text-embedding-3-small</span><span class="text-gray-500">便宜快速</span></div>
            <div class="flex justify-between"><span class="text-gray-300">text-embedding-3-large</span><span class="text-gray-500">生產環境</span></div>
            <div class="flex justify-between"><span class="text-green-300">bge-m3（本地）</span><span class="text-gray-500">中文場景首選</span></div>
            <div class="flex justify-between"><span class="text-gray-300">nomic-embed</span><span class="text-gray-500">完全離線</span></div>
          </div>
          <Callout type="danger" class="mt-2">⚠️ 一旦建立不能換！換模型需重新 embed 全部文件</Callout>
        </InfoCard>
        <InfoCard title="Reranker 二次排序" color="green">
          <div class="text-xs text-gray-300">向量搜尋 Top 20 → Reranker → 取最高分 Top 3–5 給 LLM</div>
          <div class="text-xs text-gray-500 mt-1">明顯提升準確度，但增加延遲與成本</div>
        </InfoCard>
        <Callout type="warning">⚠️ 社群高票（32票）：目前無知識庫匯出功能，跨環境遷移只能重傳</Callout>
      </div>
    </div>
  </div>
</template>

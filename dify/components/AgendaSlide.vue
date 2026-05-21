<template>
  <div class="h-full flex flex-col justify-center px-2">
    <div class="text-xs tracking-widest text-blue-400 uppercase font-mono mb-4">Agenda</div>
    <h2 class="text-3xl font-bold text-white mb-8">今天的議程</h2>
    <div class="grid grid-cols-3 gap-4">
      <div v-click class="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
        <div class="text-2xl font-bold text-blue-400 mb-1">01</div>
        <div class="font-semibold text-white text-sm">Dify 是什麼 & 架構概覽</div>
        <div class="text-xs text-gray-400 mt-1">定位 · App 類型 · 技術堆疊</div>
      </div>
      <div v-click class="rounded-xl border border-green-500/30 bg-green-500/10 p-4">
        <div class="text-2xl font-bold text-green-400 mb-1">02</div>
        <div class="font-semibold text-white text-sm">核心節點深度剖析</div>
        <div class="text-xs text-gray-400 mt-1">LLM · Agent · Code · HTTP · Iteration</div>
      </div>
      <div v-click class="rounded-xl border border-purple-500/30 bg-purple-500/10 p-4">
        <div class="text-2xl font-bold text-purple-400 mb-1">03</div>
        <div class="font-semibold text-white text-sm">RAG 知識庫技術細節</div>
        <div class="text-xs text-gray-400 mt-1">Chunking · Embedding · Retrieval</div>
      </div>
      <div v-click class="rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
        <div class="text-2xl font-bold text-orange-400 mb-1">04</div>
        <div class="font-semibold text-white text-sm">社群踩坑案例</div>
        <div class="text-xs text-gray-400 mt-1">GitHub Issues & Discussions 精選</div>
      </div>
      <div v-click class="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
        <div class="text-2xl font-bold text-red-400 mb-1">05</div>
        <div class="font-semibold text-white text-sm">自架部署注意事項</div>
        <div class="text-xs text-gray-400 mt-1">Docker Compose · 升版風險 · 設定坑</div>
      </div>
      <div v-click class="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
        <div class="text-2xl font-bold text-cyan-400 mb-1">06</div>
        <div class="font-semibold text-white text-sm">最佳實踐建議</div>
        <div class="text-xs text-gray-400 mt-1">Debug · 成本控制 · 架構選型</div>
      </div>
    </div>
  </div>
</template>

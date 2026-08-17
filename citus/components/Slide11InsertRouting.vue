<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROUTING ENGINE"
      title="INSERT Routing 寫入流程"
      subtitle="透明化自動導向目標 Worker 節點"
    />

    <div class="mt-6 p-6 rounded-xl border border-white/10 bg-white/5 font-mono text-sm text-zinc-300">
      <div class="text-cyan-400 font-bold mb-3">寫入數據鏈路</div>
      <div class="space-y-2">
        <div>1. Client 發送 INSERT 請求至 Coordinator</div>
        <div>2. Coordinator 計算 <span class="text-cyan-300">Hash(formatted_pn)</span></div>
        <div>3. 根據 Hash 查找對應 Shard 及所在的 <span class="text-cyan-300">Worker 2</span></div>
        <div>4. Coordinator 轉發 SQL 並於 Worker 2 完成寫入</div>
      </div>
    </div>

    <div class="mt-4 text-xs text-zinc-400">
      應用端完全不需要管理底層資料實際落在何處。
    </div>
  </SlideShell>
</template>

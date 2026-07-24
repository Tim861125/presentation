<script setup>
// Static mapping demo: which key hashes to which worker
const rows = [
  { key: "US10000001", worker: "Worker2" },
  { key: "US10000002", worker: "Worker1" },
  { key: "US10000003", worker: "Worker3" },
];
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-for="(r, i) in rows"
      :key="i"
      class="flex items-center gap-3 font-mono text-sm"
    >
      <span
        class="text-slate-200 bg-white/5 rounded px-2 py-1 w-36 text-center"
        >{{ r.key }}</span
      >
      <span class="text-cyan-400/70 flex items-center gap-1">
        <span class="text-xs">Hash</span>
        <span>→</span>
      </span>
      <span
        class="text-cyan-300 border border-cyan-400/40 bg-cyan-400/5 rounded px-3 py-1"
      >
        {{ r.worker }}
      </span>
    </div>
    <div class="text-xs text-cyan-400/80 mt-2">
      同一個值永遠 hash 到同一個 Shard（該 Shard 落在某 Worker）
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  method?: string
  path?: string
  code: string
}>(), { method: '', path: '' })

const methodColor: Record<string, string> = {
  GET: 'text-sky-400',
  POST: 'text-emerald-400',
  PUT: 'text-amber-400',
  DELETE: 'text-rose-400',
}
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-black/50 overflow-hidden shadow-lg">
    <div v-if="method || path"
         class="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3.5 py-1.5">
      <span v-if="method" class="text-[11px] font-mono font-bold" :class="methodColor[method] || 'text-zinc-300'">
        {{ method }}
      </span>
      <span class="text-[11px] font-mono text-zinc-300 truncate">{{ path }}</span>
    </div>
    <pre class="p-3 text-[10.5px] leading-snug font-mono text-zinc-300 whitespace-pre-wrap break-words overflow-x-auto"><code>{{ code }}</code></pre>
  </div>
</template>

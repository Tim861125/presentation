<script setup lang="ts">
// Lightweight request/JSON card: a method+path header bar over a mono code block.
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
  <div class="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
    <div v-if="method || path"
         class="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2">
      <span v-if="method" class="text-xs font-mono font-bold" :class="methodColor[method] || 'text-zinc-300'">
        {{ method }}
      </span>
      <span class="text-xs font-mono text-zinc-300 truncate">{{ path }}</span>
    </div>
    <pre class="px-4 py-3 text-[11px] leading-relaxed font-mono text-zinc-300 whitespace-pre-wrap break-words"><code>{{ code }}</code></pre>
  </div>
</template>

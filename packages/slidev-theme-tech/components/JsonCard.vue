<script setup lang="ts">
/**
 * JsonCard - Request / JSON / Code Card
 * Displays a styled code snippet with optional HTTP method, route path, or custom title tab.
 */
withDefaults(
  defineProps<{
    method?: string
    path?: string
    title?: string
    code: string
  }>(),
  {
    method: '',
    path: '',
    title: '',
  }
)

const methodColor: Record<string, string> = {
  GET: 'text-sky-400',
  POST: 'text-emerald-400',
  PUT: 'text-amber-400',
  DELETE: 'text-rose-400',
  PATCH: 'text-purple-400',
}
</script>

<template>
  <div class="rounded-xl border border-white/10 bg-black/50 overflow-hidden shadow-lg">
    <div
      v-if="method || path || title"
      class="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-3.5 py-1.5"
    >
      <span
        v-if="method"
        class="text-[11px] font-mono font-bold"
        :class="methodColor[method.toUpperCase()] || 'text-zinc-300'"
      >
        {{ method.toUpperCase() }}
      </span>
      <span v-if="path" class="text-[11px] font-mono text-zinc-300 truncate">
        {{ path }}
      </span>
      <span v-if="title" class="text-[11px] font-mono text-zinc-300 truncate font-semibold">
        {{ title }}
      </span>
    </div>
    <pre class="p-3 text-[10.5px] leading-relaxed font-mono text-zinc-300 whitespace-pre-wrap break-words overflow-x-auto"><code>{{ code }}</code></pre>
  </div>
</template>

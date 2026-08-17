<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BUNDLE SIZE"
      title="📦 Bundle Size 極致瘦身"
      subtitle="Zod v4 Standard (-57%) 與 Zod Mini (-85%)"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">Version</th>
              <th class="pb-2">Gzip Size</th>
              <th class="pb-2">vs v3</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr><td class="py-2">Zod v3</td><td>12.47 kb</td><td>-</td></tr>
            <tr><td class="py-2 font-bold text-white">Zod v4 (Regular)</td><td>5.36 kb</td><td class="text-emerald-400 font-bold">-57%</td></tr>
            <tr><td class="py-2 font-bold text-white">Zod v4 (Mini)</td><td>1.88 kb</td><td class="text-cyan-400 font-bold">-85%</td></tr>
          </tbody>
        </table>
      </TechCard>

      <div>
        <JsonCard
          filename="zod_mini.ts"
          :code="`// Regular Zod (Method Chaining)
z.string().email().optional()

// Zod Mini (Functional API - 極致 Tree-shaking)
optional(email(string()))`"
        />
      </div>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EXAMPLE"
      title="Patent 專利系統實務範例"
      subtitle="專利相關表全部以 formatted_pn 分片，同一篇專利資料共置"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-4">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">Table</th>
              <th class="pb-2">Distribution Key</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr><td class="py-1.5">l1_kda_biblio</td><td class="text-cyan-300">formatted_pn</td></tr>
            <tr><td class="py-1.5">l1_kda_assignee</td><td class="text-cyan-300">formatted_pn</td></tr>
            <tr><td class="py-1.5">l1_kda_inventor</td><td class="text-cyan-300">formatted_pn</td></tr>
            <tr><td class="py-1.5">l1_kda_citation</td><td class="text-cyan-300">formatted_pn</td></tr>
          </tbody>
        </table>
      </TechCard>

      <div>
        <JsonCard
          filename="join_query.sql"
          :code="`SELECT *
FROM l1_kda_biblio b
JOIN l1_kda_assignee a
  ON b.formatted_pn = a.formatted_pn;`"
        />
        <div class="mt-2 text-xs text-cyan-300 font-mono">✓ 100% 在同一個 Worker 本地完成 JOIN</div>
      </div>
    </div>
  </SlideShell>
</template>

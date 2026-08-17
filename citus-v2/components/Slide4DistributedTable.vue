<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DDL"
      title="Distributed Table 分散式資料表"
      subtitle="將單機普通資料表轉換為分散式資料表"
    />

    <div class="mt-4">
      <JsonCard
        filename="distributed_table.sql"
        :code="`CREATE TABLE l1_kda_biblio (
    pn VARCHAR, formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL, kindcode VARCHAR NOT NULL,
    json_raw TEXT
);

SELECT create_distributed_table('l1_kda_biblio', 'formatted_pn');`"
      />
    </div>

    <div class="mt-4 text-sm text-zinc-300">
      執行後，資料開始依 <span class="text-cyan-300 font-mono">formatted_pn</span> 分布到各 Worker 節點。
    </div>
  </SlideShell>
</template>

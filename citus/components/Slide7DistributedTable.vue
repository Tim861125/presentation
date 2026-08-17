<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DISTRIBUTED TABLE"
      title="Distributed Table 分散式資料表"
      subtitle="將專利表無縫升級為分散式資料表"
    />

    <div class="mt-4">
      <JsonCard
        filename="distributed_patent.sql"
        :code="`CREATE TABLE l1_kda_biblio (
    pn VARCHAR,
    formatted_pn VARCHAR NOT NULL,
    formatted_apn VARCHAR NOT NULL,
    kindcode VARCHAR NOT NULL,
    json_raw TEXT
);

SELECT create_distributed_table('l1_kda_biblio', 'formatted_pn');`"
      />
    </div>

    <div class="mt-4 text-xs text-cyan-300 font-mono">
      資料開始依照 formatted_pn 的 Hash 分布到各 Worker 節點。
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DOCUMENTATION"
      title="參考文獻"
      subtitle="官方文件與延伸閱讀資源"
    />

    <div class="grid grid-cols-1 gap-3 mt-2">
      <ReferenceCard
        index="1"
        title="Citus 官方文件：DDL 參考"
        href="https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html"
      />
      <ReferenceCard
        index="2"
        title="Citus 官方文件：核心概念"
        href="https://docs.citusdata.com/en/stable/get_started/concepts.html"
      />
      <ReferenceCard
        index="3"
        title="Citus 中文文件（Read the Docs）"
        href="https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html"
      />
    </div>
  </SlideShell>
</template>

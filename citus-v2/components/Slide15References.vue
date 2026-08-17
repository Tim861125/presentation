<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DOCUMENTATION"
      title="參考文獻"
      subtitle="官方文件與延伸閱讀資源"
    />

    <div class="flex flex-col gap-3 mt-6">
      <TechCard accent="cyan" class="p-4">
        <a href="https://docs.citusdata.com/en/v13.0/develop/reference_ddl.html" target="_blank" class="text-xs font-mono text-cyan-300 hover:underline">
          docs.citusdata.com/en/v13.0/develop/reference_ddl.html
        </a>
      </TechCard>
      <TechCard accent="blue" class="p-4">
        <a href="https://docs.citusdata.com/en/stable/get_started/concepts.html" target="_blank" class="text-xs font-mono text-blue-300 hover:underline">
          docs.citusdata.com/en/stable/get_started/concepts.html
        </a>
      </TechCard>
      <TechCard accent="purple" class="p-4">
        <a href="https://citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html" target="_blank" class="text-xs font-mono text-purple-300 hover:underline">
          citus-doc.readthedocs.io/en/latest/develop/reference_ddl.html
        </a>
      </TechCard>
    </div>
  </SlideShell>
</template>

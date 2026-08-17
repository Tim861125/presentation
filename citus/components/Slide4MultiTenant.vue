<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MULTI-TENANT CONCEPT"
      title="Multi-tenant 多租戶概念"
      subtitle="Tenant = 一位客戶、一家公司或一個組織"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-center">
      <TechCard accent="sky" class="p-5">
        <h3 class="text-lg font-semibold text-white mb-2">SaaS 多租戶場景</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          在現代 SaaS 系統中，每家客戶使用同一套軟體系統，但業務資料必須嚴格隔離。
        </p>
      </TechCard>

      <div class="p-5 rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-zinc-300 leading-relaxed">
        <div class="text-cyan-400 font-bold mb-2">系統組織結構</div>
        <div>├── Google</div>
        <div>├── Microsoft</div>
        <div>├── Apple</div>
        <div>└── Amazon</div>
      </div>
    </div>
  </SlideShell>
</template>

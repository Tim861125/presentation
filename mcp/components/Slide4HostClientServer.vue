<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ARCHITECTURE"
      title="Host、Client 與 Server 三層架構"
      subtitle="職責清晰分離：Host 管 AI、Client 管通訊、Server 管工具"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <TechCard accent="cyan" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">HOST</TechBadge>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Host 管 AI</h3>
        <p class="text-sm text-zinc-300">執行 LLM 推理、發起對話並決定何時調用何種工具。</p>
      </TechCard>

      <TechCard accent="purple" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">CLIENT</TechBadge>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Client 管通訊</h3>
        <p class="text-sm text-zinc-300">封裝在 Host 內部，負責管理與 Server 之間的傳輸、協議轉換與連線保活。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-6">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">SERVER</TechBadge>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Server 管工具</h3>
        <p class="text-sm text-zinc-300">包裝底層資料庫、檔案系統與外部 API，靜候 Client 呼叫執行。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

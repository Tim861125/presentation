<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="MACHINE-TO-MACHINE"
      title="Client Credentials Flow"
      subtitle="服務對服務 (M2M) 與後端 Daemon 授權模式"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">適用情境</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          適用於沒有終端使用者 (User) 介入的系統間通訊、微服務呼叫、排程批次作業或內部監控 Daemon。
        </p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">認證步驟</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed font-mono text-xs">
          <li>1. Client 發送 client_id + client_secret 至 /token</li>
          <li>2. Auth Server 驗證憑證後直接簽發 Access Token</li>
          <li>3. Client 攜帶 Token 存取受保護 API</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

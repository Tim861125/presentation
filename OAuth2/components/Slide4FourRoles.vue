<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ACTORS"
      title="OAuth 2.0 的四個核心角色"
      subtitle="職責分離的標準化角色模型"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
      <TechCard accent="sky" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="sky">RESOURCE OWNER</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">資源擁有者 (User)</h4>
        <p class="text-xs text-zinc-300">能夠授權第三方存取受保護資源的實體，通常為終端使用者。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">CLIENT</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">客戶端 (Client App)</h4>
        <p class="text-xs text-zinc-300">代表使用者請求受保護資源的第三方應用程式 (Web, SPA, Mobile, Server)。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">AUTH SERVER</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">授權伺服器 (Authorization Server)</h4>
        <p class="text-xs text-zinc-300">負責驗證使用者身分，並在使用者同意後核發 Access Token。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="emerald">RESOURCE SERVER</TechBadge>
        </div>
        <h4 class="text-base font-semibold text-white mb-1">資源伺服器 (Resource Server / API)</h4>
        <p class="text-xs text-zinc-300">託管受保護的使用者資源，接收並驗證 Access Token 後回應請求。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

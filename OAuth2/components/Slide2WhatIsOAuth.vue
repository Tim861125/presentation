<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONCEPT"
      title="什麼是 OAuth 2.0？"
      subtitle="專為第三方應用程式設計的委託授權開放標準"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">01</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUTHORIZATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">授權標準</h3>
        <p class="text-sm text-zinc-300">OAuth 2.0 是授權 (Authorization) 框架，而非身分認證 (Authentication) 協議。</p>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">02</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DELEGATION</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">委託授權機制</h3>
        <p class="text-sm text-zinc-300">使用者授權第三方存取有限資源，完全無需共享個人密碼。</p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">03</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ECOSYSTEM</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">產業廣泛採用</h3>
        <p class="text-sm text-zinc-300">Google, GitHub, Microsoft, Apple 等現代 API 服務的共通授權標準。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

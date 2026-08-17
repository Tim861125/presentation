<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SECURITY ENHANCEMENT"
      title="Authorization Code Flow with PKCE"
      subtitle="適用於 SPA 與 Mobile Apps 的動態密碼證明機制 (RFC 7636)"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">PKCE 核心概念</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">code_verifier</span>：隨機生成的加密高熵字串</li>
          <li><span class="text-white font-semibold">code_challenge</span>：`BASE64URL(SHA256(code_verifier))`</li>
          <li>授權請求時帶上 `code_challenge`</li>
          <li>換取 Token 時帶上原始 `code_verifier`，Auth Server 驗證 Hash 是否相符</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">防禦攻擊</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          杜絕 Authorization Code 遭惡意 App 或中間人竊取並冒領 Token 的重大漏洞。即便 Code 被攔截，攻擊者缺少動態生成的 `code_verifier` 依然無法換取 Token。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

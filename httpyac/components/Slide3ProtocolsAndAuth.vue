<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CAPABILITIES"
      title="通訊協定與驗證機制支援"
      subtitle="多元 Protocol 支援與企業級身分驗證體系"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">PROTOCOLS</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">支援通訊協定</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><span class="text-white font-semibold">REST</span> (HTTP/1.1, HTTP/2)</li>
          <li><span class="text-white font-semibold">GraphQL</span> (Query & Mutation)</li>
          <li><span class="text-white font-semibold">gRPC</span> (Protobuf 支援)</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">AUTHENTICATION</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">身分認證方式</h3>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>OAuth 2.0 (Code, Client Credentials, Implicit, PKCE)</li>
          <li>OpenID Connect (OIDC)</li>
          <li>AWS Signature v4</li>
          <li>Digest Auth & Basic Auth</li>
          <li>SSL Client Certificates (mTLS)</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

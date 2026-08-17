<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OAUTH2 RECIPES"
      title="OAuth2 範例：Client Credentials"
      subtitle="宣告式環境變數與自動帶入 Bearer Token"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">1. 變數與憑證宣告</div>
        <JsonCard
          filename="auth_vars.http"
          :code="`@api_clientId=your-client-id
@api_clientSecret=your-secret
@api_tokenEndpoint=https://auth.example.com/token
@api_useAuthorizationHeader=false`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">2. 發送帶有 OAuth2 的請求</div>
        <JsonCard
          filename="request.http"
          :code="`###
GET https://api.example.com/v1/users
Authorization: oauth2 client_credentials api`"
        />
        <div class="mt-2 text-xs text-zinc-400">
          httpYac 會自動請求 token、快取並自動在後續 API 帶入 Authorization 標頭。
        </div>
      </div>
    </div>
  </SlideShell>
</template>

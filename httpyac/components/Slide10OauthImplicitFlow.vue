<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OAUTH2 RECIPES"
      title="OAuth2 範例：Implicit Flow (瀏覽器互動)"
      subtitle="自動開啟瀏覽器進行身分驗證並攔截重導向 Token"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
      <div>
        <JsonCard
          filename="implicit.http"
          :code="`# Implicit Flow (Browser-based Authentication)
@oauth2_clientId=your-app-id
@oauth2_authorizationEndpoint=https://auth.example.com/oauth2/authorize
@oauth2_tokenEndpoint=https://auth.example.com/oauth2/token
@oauth2_redirectUri=http://localhost:3000

###
GET https://api.example.com/v1/me
Authorization: openid implicit`"
        />
      </div>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">自動化機制</TechBadge>
        </div>
        <p class="text-sm text-zinc-300 leading-relaxed">
          httpYac 執行時會在本地啟動臨時 HTTP 伺服器，自動彈出瀏覽器視窗引導使用者登入，並在重導向時自動捕獲 Token，完全無需手動複製貼上！
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

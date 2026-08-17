<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OAUTH2 RECIPES"
      title="OAuth2 範例：OpenID Connect"
      subtitle="Keycloak / Auth0 等 Identity Provider 整合"
    />

    <div class="mt-4">
      <JsonCard
        filename="openid_connect.http"
        :code="`# OpenID Connect Configuration
@keycloakHost = https://auth.example.com
@local_tokenEndpoint = {{keycloakHost}}/realms/demo/protocol/openid-connect/token
@local_clientId = my-app
@local_clientSecret = 936DA01F-9ABD-4D9D-80C7-02AF85C822A8
@local_scope = openid profile email

###
# Request with OpenID Connect
GET https://api.example.com/secured_service
Authorization: openid client_credentials local`"
      />
    </div>
  </SlideShell>
</template>

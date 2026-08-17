<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SPECIFICATION"
      title="主要授權類型 (Grant Types)"
      subtitle="根據應用架構與安全環境選擇適當的授權流"
    />

    <div class="mt-6">
      <TechCard accent="cyan" class="p-4">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">授權類型</th>
              <th class="pb-2">使用場景</th>
              <th class="pb-2">推薦度</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr>
              <td class="py-2.5 font-bold text-white">Authorization Code</td>
              <td>傳統 Web 應用 (有後端 Server 可妥善保管 Client Secret)</td>
              <td class="text-emerald-400 font-bold">⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-white">Authorization Code + PKCE</td>
              <td>SPA 單頁應用 / 行動原生 App (無安全 Client Secret)</td>
              <td class="text-emerald-400 font-bold">⭐⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-white">Client Credentials</td>
              <td>服務對服務 (Machine-to-Machine / Daemon API)</td>
              <td class="text-cyan-400 font-bold">⭐⭐⭐⭐</td>
            </tr>
            <tr>
              <td class="py-2.5 line-through text-zinc-500">Resource Owner Password</td>
              <td class="text-zinc-500">直接傳遞帳號密碼（已被 OAuth 2.1 廢棄）</td>
              <td class="text-rose-400 font-bold">❌ 禁用</td>
            </tr>
          </tbody>
        </table>
      </TechCard>
    </div>
  </SlideShell>
</template>

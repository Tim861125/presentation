<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMPARISON"
      title="為什麼需要 OAuth 2.0？"
      subtitle="傳統密碼共享的巨大風險 vs Token 權限隔離"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="rose" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="rose">傳統方式痛點</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li class="text-rose-400 font-semibold">第三方應用必須明文儲存使用者帳號密碼</li>
          <li class="text-rose-400 font-semibold">無法針對單一 App 撤銷特定權限</li>
          <li>第三方獲得使用者帳號的完整最高權限</li>
          <li>單點洩漏造成災難性全站安全漏洞</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">OAuth 2.0 優勢</TechBadge>
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li class="text-emerald-400 font-semibold">不需共享使用者個人密碼</li>
          <li class="text-emerald-400 font-semibold">精細粒度權限控制 (Scope 範圍)</li>
          <li>使用者可隨時單獨撤銷授權 (Revocation)</li>
          <li>Access Token 具備短期時效性與 Refresh 機制</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

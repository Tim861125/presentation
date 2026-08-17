<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="STANDARD FLOW"
      title="Authorization Code Flow"
      subtitle="Web 後端應用標準授權序列"
    />

    <div class="grid grid-cols-1 md:grid-cols-5 gap-3 mt-6">
      <TechCard accent="cyan" class="p-3">
        <div class="text-xs font-mono text-cyan-400 mb-1">01. 導向授權</div>
        <p class="text-xs text-zinc-300">Client 重導向至 Auth Server 授權頁面</p>
      </TechCard>

      <TechCard accent="sky" class="p-3">
        <div class="text-xs font-mono text-sky-400 mb-1">02. 用戶同意</div>
        <p class="text-xs text-zinc-300">User 登入身分並確認授權 Scope 範圍</p>
      </TechCard>

      <TechCard accent="purple" class="p-3">
        <div class="text-xs font-mono text-purple-400 mb-1">03. 核發 Code</div>
        <p class="text-xs text-zinc-300">Auth Server 重導向回 Client 並帶上一次性 Code</p>
      </TechCard>

      <TechCard accent="emerald" class="p-3">
        <div class="text-xs font-mono text-emerald-400 mb-1">04. 交換 Token</div>
        <p class="text-xs text-zinc-300">Client Server 端以 Code + Secret 向 Auth Server 換取 Token</p>
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 mb-1">05. API 存取</div>
        <p class="text-xs text-zinc-300">Client 攜帶 Bearer Access Token 調用 Resource API</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DEVOPS & INTEGRATION"
      title="站台建置、串接與點數機制"
      subtitle="CI/CD 部署、Dify 正式更新與跨站點數機制全域同步"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">站台建置 & CI/CD</TechBadge>
          <span class="text-xs font-mono text-zinc-400">INFRA & DEPLOYMENT</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">站台建置與資料搬移</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>完成獨立站台建置，順利對接 WEBPAT 檢索結果</li>
          <li>IPTECH 首頁新增 Patent Embedding Search 入口</li>
          <li>Embedding 向量資料安全搬移至 Server 並建置 CI/CD</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">權限與點數</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUTH & BILLING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">登入與點數全站更新</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>登入保護：無登入不可使用，限定由 IPTECH 授權登入</li>
          <li>點數機制：WEBPAT / IPTECH / PatentPilot-service / Dify 全站同步更新</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

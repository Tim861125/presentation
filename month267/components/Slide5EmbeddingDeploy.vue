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
          <li>完成獨立站台並對接 WEBPAT 檢索結果，IPTECH（專利分析與專案管理平台）首頁新增功能入口</li>
          <li>Embedding 向量資料搬至正式伺服器，Dockerfile 部署上線</li>
          <li>新增 health check 端點與 CI／CD 管線</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">權限與點數</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUTH & BILLING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">登入與點數全站更新</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>登入門禁三件套：Middleware 攔截受保護 API、未登入阻擋畫面、全站登入狀態機</li>
          <li>Dify 呼叫改經 PatentPilot-service（公司 AI 服務閘道）統一管理金鑰與呼叫權限</li>
          <li>點數機制於 WEBPAT／IPTECH／PatentPilot-service／Embedding Search／Dify 五站同步更新</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

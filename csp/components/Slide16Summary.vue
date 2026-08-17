<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONCLUSION"
      title="核心總結"
      subtitle="鞏固網頁防線，實現真正的內容安全政策"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 移除 'unsafe-inline'</h4>
        <p class="text-xs text-zinc-300">保留 unsafe-inline 將使 CSP 失去絕大多數防禦 XSS 的價值，務必徹底移除。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 優先外部 Script</h4>
        <p class="text-xs text-zinc-300">將代碼模組化、外部化是最佳工程實踐；動態頁面則輔以 Nonce 機制。</p>
      </TechCard>

      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 漸進式平滑遷移</h4>
        <p class="text-xs text-zinc-300">盤點 ➔ 改造 ➔ Report-Only 觀察 ➔ 正式啟用，確保業務 0 阻斷。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 自動化長效治理</h4>
        <p class="text-xs text-zinc-300">將 CSP 檢核整合至 CI/CD Pipeline，防止不安全程式碼重新注入。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

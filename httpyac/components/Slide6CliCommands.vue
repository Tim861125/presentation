<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COMMAND LINE"
      title="核心 CLI 指令"
      subtitle="OAuth2 Token 產生與批次發送執行"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">01. OAUTH2 TOKEN</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">OAuth2 Token 產生</h3>
        <p class="text-xs text-zinc-400 mb-3">獨立產生並快取 OAuth2 認證權杖：</p>
        <code class="text-xs font-mono text-sky-300 bg-black/40 p-2.5 rounded block">
          httpyac oauth2 [options]
        </code>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">02. SEND / EXECUTE</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">發送執行 HTTP 檔案</h3>
        <p class="text-xs text-zinc-400 mb-3">執行指定檔案中的單一或所有請求：</p>
        <code class="text-xs font-mono text-emerald-300 bg-black/40 p-2.5 rounded block">
          httpyac send [options] &lt;fileName...&gt;
        </code>
      </TechCard>
    </div>
  </SlideShell>
</template>

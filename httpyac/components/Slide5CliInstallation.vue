<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="GETTING STARTED"
      title="CLI 安裝與更新"
      subtitle="透過 npm 或 yarn 快速安裝全域命令列工具"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">INSTALL</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">安裝全域套件</h3>
        <div class="space-y-3 font-mono text-xs text-zinc-300">
          <div class="p-3 rounded bg-black/40 border border-white/5">
            <span class="text-zinc-500"># npm</span><br/>
            npm install -g httpyac
          </div>
          <div class="p-3 rounded bg-black/40 border border-white/5">
            <span class="text-zinc-500"># yarn</span><br/>
            yarn global add httpyac
          </div>
        </div>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">UPGRADE</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">版本升級</h3>
        <div class="space-y-3 font-mono text-xs text-zinc-300">
          <div class="p-3 rounded bg-black/40 border border-white/5">
            <span class="text-zinc-500"># npm</span><br/>
            npm update -g httpyac
          </div>
          <div class="p-3 rounded bg-black/40 border border-white/5">
            <span class="text-zinc-500"># yarn</span><br/>
            yarn global upgrade --latest httpyac
          </div>
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

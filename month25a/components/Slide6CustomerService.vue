<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WIDGET VISIBILITY · 小穎客服"
      title="小穎客服懸浮按鈕縮小顯示範圍"
      subtitle="小穎客服＝右下角的客服聊天機器人懸浮元件，原本每頁都掛載，會擋到工作頁面的表格與操作"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="IPTECH" color="blue" />
          <span class="text-xs font-mono text-zinc-400">LOGIN & HOME ONLY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">只留在登入頁與首頁</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          於頁面層級控制掛載：客服元件只保留在登入頁與首頁，其餘功能頁不載入。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge label="WEBPAT" color="emerald" />
          <span class="text-xs font-mono text-zinc-400">LOGIN & SEARCH ONLY</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">只留在登入頁與檢索頁</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          檢索結果列表與專利詳細頁移除客服元件掛載，把螢幕空間還給檢索結果本身。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PHILOSOPHY"
      title="設計哲學 (Design Philosophy)"
      subtitle="基於 RFC 7230 標準的純文字宣告語法"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <TechCard accent="cyan" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="cyan">STANDARDS</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">標準優先</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          緊跟 HTTP 與 RFC 規範，避免私有私有格式綁定，確保長效相容性。
        </p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">RFC 7230</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">RFC 7230 語法擴充</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          以標準 HTTP 報文格式為基礎，額外擴充變數注入、環境管理與斷言語法。
        </p>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">FILE FORMAT</TechBadge>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">.http 與 .rest 格式</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          完全支援純文字 `*.http` 與 `*.rest` 文件，可直接納入 Git 做版本控制。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

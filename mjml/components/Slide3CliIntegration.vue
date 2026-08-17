<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CLI & TOOLING"
      title="開發環境整合與編譯指令"
      subtitle="透過 MJML CLI 快速進行熱重載預覽與生產建置"
    />

    <div class="mt-4">
      <JsonCard
        filename="terminal_commands.sh"
        :code="`# 1. 單一檔案編譯
mjml template.mjml -o output.html

# 2. 開發熱監聽模式 (Watch Mode)
mjml --watch src/ -o dist/

# 3. 生產環境壓縮最佳化
mjml --config.minify true --config.beautify false template.mjml -o dist/index.html`"
      />
    </div>
  </SlideShell>
</template>

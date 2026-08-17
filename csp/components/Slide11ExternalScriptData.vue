<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATTERN"
      title="外部腳本如何安全傳遞動態變數？"
      subtitle="透過 HTML5 data-* 屬性或 JSON Script 傳遞資料"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">HTML 容器附帶 data 屬性</div>
        <JsonCard
          filename="index.html"
          :code="`<div id='app'
     data-user-id='<%= user.id %>'
     data-user-name='<%= user.name %>'>
</div>
<script src='/js/app.js'></script>`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">外部 JS 讀取 dataset</div>
        <JsonCard
          filename="app.js"
          :code="`const app = document.getElementById('app');
const userId = app.dataset.userId;
const userName = app.dataset.userName;

initUserProfile(userId, userName);`"
        />
      </div>
    </div>
  </SlideShell>
</template>

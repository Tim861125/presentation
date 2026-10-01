<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TIPOMUSIC · MAINTENANCE"
      title="TIPOMusic 欄位擴充與維運"
      subtitle="錄音著作新增欄位比對、效能排查與正式機更新"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">欄位擴充</TechBadge>
          <span class="text-xs font-mono text-zinc-400">AUDIO COMPARISON</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">錄音著作比對擴充</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>比對新增「歌名＋製作公司」途徑，製作公司為純函式比對器便于單測</li>
          <li>智慧局格式讀取製作公司欄（第 19 欄），介面補充提示文字</li>
          <li>清單比對規格同步更新</li>
        </ul>
      </TechCard>

      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">效能維護</TechBadge>
          <span class="text-xs font-mono text-zinc-400">PERFORMANCE & OPS</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">正式站台排查與更新</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>正式站台查詢速度慢問題排查</li>
          <li>正式機版本發布更新</li>
          <li>系統網址變更公告配合處理</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

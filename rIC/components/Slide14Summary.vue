<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CONCLUSION"
      title="核心總結"
      subtitle="善用瀏覽器空檔，打造極致絲滑的 Web 體驗"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="cyan" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 善用閒置空檔</h4>
        <p class="text-xs text-zinc-300">將日誌上傳、資源預載等雜務延後至閒置期處理，釋放關鍵渲染路徑。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 時間預算動態調控</h4>
        <p class="text-xs text-zinc-300">依靠 `deadline.timeRemaining()` 做到毫秒級自我節流與隨機中斷。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. rAF + rIC 雙劍合璧</h4>
        <p class="text-xs text-zinc-300">高頻視覺更新交由 rAF，背景消化交由 rIC，職責分明。</p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 漸進式切片架構</h4>
        <p class="text-xs text-zinc-300">現代複雜前端應採用時間切片 (Time Slicing) 思考模式重構長任務。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

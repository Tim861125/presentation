<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="APPLICATIONS"
      title="Debounce 典型應用場景"
      subtitle="搜尋自動補齊、表單校驗與草稿自動保存"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">搜尋關鍵字自動補齊</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1 bg-black/40 p-3 rounded mb-3">
          <div>// 使用者快速輸入 "hello"</div>
          <div>h ➔ 取消</div>
          <div>he ➔ 取消</div>
          <div>hel ➔ 取消</div>
          <div>hello ➔ 等待 300ms ➔ 發送請求 ✓</div>
        </div>
        <p class="text-xs text-zinc-400">避免使用者每打一個字就發出一個請求造成 race condition 與浪費。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">表單非同步校驗</TechBadge>
        </div>
        <div class="font-mono text-xs text-zinc-300 space-y-1 bg-black/40 p-3 rounded mb-3">
          <div>// Email 輸入欄位</div>
          <div>user@ ➔ 不校驗</div>
          <div>user@gmail ➔ 不校驗</div>
          <div>user@gmail.com ➔ 等待 500ms ➔ 校驗 ✓</div>
        </div>
        <p class="text-xs text-zinc-400">等待使用者停止輸入後才執行 Email / 帳號唯一性檢查，極致提升體驗。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

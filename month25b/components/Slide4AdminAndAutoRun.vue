<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WHITELIST & AUTO-RUN"
      title="管理白名單與速讀通 Auto Run"
      subtitle="速讀通＝AI 專利快速摘要，閱讀通＝AI 深度解讀"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="amber" class="p-5">
        <div class="mb-3">
          <TechBadge label="權限管控" color="amber" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">AI 管理者白名單</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          AI 功能管理新增白名單與後端驗證：白名單帳號前端顯示免扣點、後端同步雙重校驗，測試與展示不消耗使用者點數。
        </p>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="mb-3">
          <TechBadge label="AUTO RUN" color="emerald" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">Auto Run 開關</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          進入對應專利頁面依設定自動觸發生成；使用者偏好新增開關按鈕，關閉時按鈕灰化，並修正 off→on 切換後不執行的問題。
        </p>
      </TechCard>

      <TechCard variant="blue" class="p-5">
        <div class="mb-3">
          <TechBadge label="邊滾邊產" color="blue" />
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">IntersectionObserver 觸發</h3>
        <p class="text-sm text-zinc-300 leading-relaxed">
          專利清單與同族清單改以 IntersectionObserver，項目捲入視窗才觸發摘要生成，避免整批燒點數；同步移除重複呼叫的檢查 API。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

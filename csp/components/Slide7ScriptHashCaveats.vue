<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SOLUTION 1 LIMITATIONS"
      title="Script Hash 的注意事項與限制"
      subtitle="字元敏感、多腳本膨脹與動態變數不適用"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">內容變動即失效</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          程式碼中哪怕只多了一個空格或換行符號，SHA-256 都會完全改變，必須重新更新 CSP。
        </p>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">Header 長度膨脹</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          若頁面有多個 inline script，每個都需計算一組 Hash，導致 HTTP Header 變得極為冗長。
        </p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="rose">動態腳本完全無法使用</TechBadge>
        </div>
        <p class="text-xs text-zinc-300 leading-relaxed">
          若腳本內包含伺服器注入的使用者 ID、時間戳或變數，Hash 無法預先計算。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

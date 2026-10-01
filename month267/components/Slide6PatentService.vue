<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="BACKEND · API & DOCS"
      title="patent-service API 修正與文件"
      subtitle="v1.0.33 → v1.0.38 · 查詢筆數參數化、索引指向修正與文件標準化"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="sky" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky">API 調整</TechBadge>
          <span class="text-xs font-mono text-zinc-400">DIFY API REFACTOR</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">查詢筆數參數化與索引修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>語意搜尋回傳筆數由環境變數改為單次請求參數 k，未帶時回退預設值、舊呼叫端不受影響</li>
          <li>台灣公開案查詢誤查核准公告索引，改為正確的申請案索引後發版 v1.0.36</li>
        </ul>
      </TechCard>

      <TechCard accent="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald">文件維護</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SWAGGER & KM</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">更新 Swagger 與 KM 文件</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>四支單筆查詢 API 的 schema 改工廠函式產生，各自標明查詢索引與專利號範例</li>
          <li>補上 token 可放 header 或 query 的說明，修正欄位說明在 Swagger UI 不顯示的問題</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="WEBPAT / IPTECH · MAINTENANCE"
      title="WEBPAT 修正與發版"
      subtitle="v8.0.159 · v8.0.218"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="171505" />
          <span class="text-xs font-mono text-zinc-400">v8.0.159</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">PatentListForHierarchy 初始化修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>KO handlers 與 observable 改於 await 前同步建立，初始化期間清單功能不中斷</li>
          <li>AI 點數 / 速讀通 API 失敗時維持關閉，不影響一般分類與圖片</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="172573" />
          <span class="text-xs font-mono text-zinc-400">v8.0.218</span>
        </div>
        <h3 class="text-base font-semibold text-white mb-2">查詢歷程新增 / 刪除修正</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>批次 <code>SNs.Contains</code> 改為依 SN 逐筆查找後再寫入 / 刪除</li>
          <li>例外日誌記錄完整 e，保留 stack trace 利於診斷</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">協助：IPTECH 匯出空檔排查（170317，server 端檔案即空，請客戶重匯）· patentpilot 串接協助（170607）· 帳號權限（172596）</p>
    </div>
  </SlideShell>
</template>

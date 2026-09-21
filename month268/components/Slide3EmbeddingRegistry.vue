<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PATENT EMBEDDING SEARCH · ARCHITECTURE"
      title="多國家檢索註冊表"
      subtitle="by-text 同案合併由寫死 twa/twb 改為可擴充設計（169359）"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="問題" />
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>合併以全域 <code>apnRaw</code> 分組、代表偏好寫死 <code>"twb"</code></li>
          <li>跨國 apnRaw 字面相同會誤併成一筆</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="作法" />
        </div>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li><code>INDEXES</code> 註冊表宣告 <code>country / kind</code> 決定分組與代表偏好</li>
          <li>合併鍵改為 country + apnRaw，合併僅限國家內</li>
          <li>前端來源改為「國家多選 × 種類」，標籤由註冊表提供</li>
        </ul>
      </TechCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs text-zinc-400">中國完整實作、資料未就緒暫以註解停用；誤用 <code>cnb</code> 編譯期即報錯</p>
      </div>
      <div class="rounded-lg border border-cyan-400/30 bg-cyan-400/5 px-4 py-3">
        <p class="text-xs text-cyan-300">bun test 121 pass / 0 fail · 新增一國僅需註冊表兩筆 + config 兩個 key，檢索 / UI 邏輯零改動</p>
      </div>
    </div>
  </SlideShell>
</template>

<template>
  <div class="h-full w-full bg-zinc-950 text-zinc-100 px-12 py-7 overflow-hidden flex flex-col">
    <SlideHeader
      eyebrow="Problem · Why shadcn/ui exists"
      title="傳統 Component Library 的痛點"
      subtitle="當元件被封裝在 npm 套件裡，你失去了什麼？"
    />

    <div class="grid grid-cols-2 gap-3 flex-1 min-h-0">
      <ShadCard v-click title="黑盒子（Black Box）" dot color="red" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
          元件是 npm 套件，內部實作被封裝。
        </p>
        <div class="rounded bg-black/40 p-2 font-mono text-[10px] leading-relaxed">
          <div class="text-zinc-500">// node_modules/some-lib/dist/Button.js</div>
          <div class="text-red-300">// minified · unreadable · untouchable</div>
          <div class="text-zinc-600 truncate">!function(e,t){...}</div>
        </div>
      </ShadCard>

      <ShadCard v-click title="客製化困難" dot color="orange" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
          要繞路：props → CSS override → wrapper 元件。
        </p>
        <div class="space-y-0.5 text-[10px] font-mono text-zinc-400">
          <div>→ 透過 <span class="text-zinc-200">prop</span> 開放有限選項</div>
          <div>→ 用 <span class="text-zinc-200">!important</span> 強蓋樣式</div>
          <div>→ 包一層 <span class="text-zinc-200">&lt;MyButton&gt;</span> 繞過去</div>
        </div>
      </ShadCard>

      <ShadCard v-click title="升級代價高" dot color="yellow" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
          套件升級可能 break API，於是版本鎖死。
        </p>
        <div class="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
          <ShadBadge variant="secondary">v1.2.3</ShadBadge>
          <span class="text-zinc-600">→</span>
          <ShadBadge variant="destructive">v2 breaking</ShadBadge>
          <span class="text-zinc-600">→</span>
          <ShadBadge variant="outline">停留 v1</ShadBadge>
        </div>
      </ShadCard>

      <ShadCard v-click title="設計風格被綁定" dot color="purple" size="md">
        <p class="text-[11px] text-zinc-300 leading-relaxed mb-2">
          想換主題、改個 padding，都得跟原始作者妥協。
        </p>
        <div class="text-[10px] text-zinc-400 italic">
          "我只想把按鈕圓角改成 4px 而已..."
        </div>
        <div class="text-[10px] text-zinc-500 mt-0.5">
          → 發 PR、等 review、等 release，或自己 fork。
        </div>
      </ShadCard>
    </div>
  </div>
</template>

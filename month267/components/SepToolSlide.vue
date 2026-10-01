<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="TOOLING · CLI"
      title="SEP 差速工具"
      subtitle="SEP（標準必要專利）清單逐日比對：publunique 子指令與 PUBL 清單快取"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="amber" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="amber">publunique 子指令</TechBadge>
          <span class="text-xs font-mono text-zinc-400">SET DIFF</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">免建快照的號碼差速</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>原流程需建兩份約 160MB hash 快照再 merge scan，只拿號碼清單成本不成比例</li>
          <li>新增 publunique：直接從兩份 CSV／zip 抽公開號欄去重做 set diff，跳过快照與掃描</li>
          <li>比較單位定為「號碼」而非整格字串，以 | 拆 token 進集合，多值欄位順序變動不致誤報</li>
        </ul>
      </TechCard>

      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">PUBL 清單快取</TechBadge>
          <span class="text-xs font-mono text-zinc-400">CACHE · BUN TEST</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">重複掃描減半</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>每日比對會重複掃同一份 2.3GB CSV，把新側算好的唯一號碼清單寫檔、下次直接讀取</li>
          <li>命中判定只比檔案大小與 mtime 不比路徑；tmp＋rename 原子寫入，任何失敗退回全掃</li>
          <li>實測全掃 52.5 秒 → 快取命中 26.5 秒，輸出與基準逐字相同；34 個單元測試覆蓋失效路徑</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

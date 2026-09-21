<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SEP TOOL / TIPO MUSIC"
      title="SEP 差速工具收斂與 TipoMusic 排查"
      subtitle="工具職責回歸規格產出；使用者問題追到根因"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="sky" label="169454 / 169460" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">sep-tool</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>實測 diff 對快取取樣覆蓋率 99.4%，整理成 ES 對照規格</li>
          <li>三層 ES 查詢結論不採用 → 移除 673 行，改為產出「查什麼、去哪查、怎麼驗證」三檔輸出</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="emerald" label="169657 / 172979" />
        </div>
        <h3 class="text-base font-semibold text-white mb-2">TipoMusic</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>語言分析未顯示 ACMA / TMCA：歌曲數量為 0 依規則不顯示欄位，非 bug</li>
          <li>確認通知失敗：Owner 錯誤信箱 + 正式機 SMTP DNS 解析到錯誤 IP，皆已修正</li>
          <li>站點網址變更 → 恢復原網址，同步 KM 文件</li>
        </ul>
      </TechCard>
    </div>

    <div class="rounded-lg border border-white/10 bg-white/5 px-4 py-3 mt-4">
      <p class="text-xs text-zinc-400">後續建議：確認寫入與寄信分階段處理、通知失敗不誤報「儲存失敗」；NLog 記錄完整例外與 stack trace</p>
    </div>
  </SlideShell>
</template>

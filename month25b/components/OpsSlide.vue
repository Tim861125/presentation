<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS · TROUBLESHOOTING"
      title="修正、排查與維運"
      subtitle="本月發佈：IPTECH v8.0.110–118 · WEBPAT v8.0.144–150 · 點數服務與 PatentPilot 另各發 2–3 版"
    />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      <TechCard variant="emerald" class="p-4">
        <div class="mb-2">
          <TechBadge label="發佈與回修" color="emerald" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">測試站驗證 × 正式機部署</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          小版本高頻上線，回修首筆專利無法執行、錯誤訊息重複跳出、扣點交易逾時等回歸問題。
        </p>
      </TechCard>

      <TechCard variant="amber" class="p-4">
        <div class="mb-2">
          <TechBadge label="問題排查" color="amber" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">跨案協助</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          專利資料轉置個案排查與修正、TIPO MUSIC 清單匯入失敗與統計異常確認、PDF 匯出信件支援多個下載連結、網路磁碟連線排查。
        </p>
      </TechCard>

      <TechCard variant="blue" class="p-4">
        <div class="mb-2">
          <TechBadge label="規格與研究" color="blue" />
        </div>
        <h4 class="text-base font-semibold text-white mb-2">規格與技術研究</h4>
        <p class="text-xs text-zinc-300 leading-relaxed">
          撰寫扣點、加點與速讀通規格並與團隊開會審查；研究 Hono middleware 與 Knockout 用法並整理成文件。
        </p>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS & INVESTIGATION"
      title="修正、排查與維運"
      subtitle="TipoMusic（音樂公開授權平台，介接著作權集管團體）維運與各站台部署排查"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="purple">TipoMusic 功能與維運</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>逾三年歌曲以批次 SQL 封存，先上測試站台再推正式站台</li>
          <li>新增 AuditLogFormatter：認證後記錄登入者帳號，日誌格式統一</li>
          <li>登入 Cookies 問題修復與弱掃問題排查</li>
          <li>音樂利用人確認後的使用清單產生 Excel，自動夾帶郵件寄送集管團體</li>
        </ul>
      </TechCard>

      <TechCard accent="amber" class="p-4">
        <div class="flex items-center gap-2 mb-2">
          <TechBadge color="amber">部署與排查</TechBadge>
        </div>
        <ul class="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>洞察通下架：點數服務 get user features API 新增 AI 功能啟用檢查</li>
          <li>IPTECH v8.0.148～155、WEBPAT v8.0.194～202 測試／正式站台部署</li>
          <li>專案下載問題排查：專利資料表 PNO／FPNO 欄位長度修正與異常資料防呆</li>
          <li>Prompt injection 攻擊手法 survey</li>
          <li>k8s、git worktree、docker compose、vaultwarden 導入與練習</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SYSTEM MAINTENANCE & OPERATIONS"
      title="公告功能與維運處理"
      subtitle="CRM / TipoMusic（音樂查詢公開站）公告系統與資料轉置、環境維運"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <TechCard accent="purple" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="purple">公告系統</TechBadge>
          <span class="text-xs font-mono text-zinc-400">ANNOUNCEMENT MODULE</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">CRM 與 TipoMusic 公告</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>CRM 公告編輯器換型：Tiny Cloud 改要求 API key 後，以自行架服的 Quill 取代 TinyMCE，移除外部金鑰相依</li>
          <li>公告彈窗已讀狀態由 cookie 遷移至 localStorage</li>
          <li>TipoMusic 首頁公告橫幅：sysconfig 端點發布配置，前端據配置渲染橫幅元件</li>
        </ul>
      </TechCard>

      <TechCard accent="blue" class="p-5">
        <div class="flex items-center gap-2 mb-3">
          <TechBadge color="blue">維運與排障</TechBadge>
          <span class="text-xs font-mono text-zinc-400">OPS & ISSUE TRACKING</span>
        </div>
        <h3 class="text-lg font-semibold text-white mb-2">資料轉置與環境維運</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>專利資料轉置作業修正：轉置前加資料完整性前置檢查，不完整即中止，避免不完整資料寫入</li>
          <li>TipoMusic 檢索修復：歌名特殊符號可比對、一般民眾檢索結果不一致、資料更新日期；並修 CSRF 弱掃缺失</li>
          <li>正式站台帳號與資料庫連線設定排查；本月完成 10 次測試／正式站台更新</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

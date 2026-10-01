<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OPS · SUPPORT"
      title="修正、排查與維運"
      subtitle="無程式碼產出但占用工時協作與維運事項"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      <TechCard variant="blue" class="p-5">
        <h3 class="text-sm font-semibold text-white mb-2">會議與規格對齊</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>晨會 / 週會 / 月會共 22 場，同步即期資轉與回填進度</li>
          <li>Patent Embedding 檢索規格討論、IPC 語意檢索需求整理</li>
          <li>跨國 schema 差異規格與資深工程師、主管確認</li>
        </ul>
      </TechCard>

      <TechCard variant="emerald" class="p-5">
        <h3 class="text-sm font-semibold text-white mb-2">Review 與協作</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>code review：KR / EP / CN / JP 資料管線與檢索 server API</li>
          <li>理解團隊成員新增的資料規則文件</li>
          <li>魚骨圖功能語系修正：調整 AI 工作流程 prompt</li>
        </ul>
      </TechCard>

      <TechCard variant="default" class="p-5">
        <h3 class="text-sm font-semibold text-white mb-2">環境維運</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>伺服器機房硬體問題排查：重開機與環境檢查</li>
          <li>掛載初始化腳本調整：log NFS 掛載暫時停用、保留註解可還原</li>
          <li>資轉失敗檔案排查：進資料庫與伺服器移除失敗檔案</li>
        </ul>
      </TechCard>

      <TechCard variant="amber" class="p-5">
        <h3 class="text-sm font-semibold text-white mb-2">工作流工具維護</h3>
        <ul class="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>任務描述產出 skill 補充細節與字數，讓 AI 更易理解</li>
          <li>Azure DevOps 工作項目分流 skill 設計文件</li>
        </ul>
      </TechCard>
    </div>
  </SlideShell>
</template>

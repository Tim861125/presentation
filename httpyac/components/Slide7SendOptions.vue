<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CLI FLAGS"
      title="CLI Send 常用參數選項"
      subtitle="環境設定、篩選行數與自動化輸出"
    />

    <div class="mt-4">
      <JsonCard
        filename="httpyac_send_flags.sh"
        :code="`-a, --all          # 批次執行檔案內所有請求
-e, --env          # 指定環境設定檔 (.env / httpyac.config.js)
-l, --line         # 指定特定行數目標請求
-n, --name         # 依請求名稱 (### @name) 篩選執行
--json             # 輸出結構化 JSON 結果供 CI 解析
--timeout          # 設定網路連線與回應逾時時間`"
      />
    </div>
  </SlideShell>
</template>

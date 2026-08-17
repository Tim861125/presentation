<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CODE COMPARISON"
      title="代碼對比：錯誤處理與例外捕捉"
      subtitle="多連線點模糊錯誤 vs 標準 HTTP 狀態碼與單點清晰例外"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-amber-400 mb-2">❌ SSE 多連線點模糊錯誤</div>
        <JsonCard
          filename="sse_error.ts"
          :code="`try {
  await client.connect(transport);
} catch (error) {
  // 難以判別：是 POST 404？還是 SSE 連線拒絕？
  // 重連機制需要對兩條通道分別寫重試
}`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ Streamable HTTP 統一錯誤處理</div>
        <JsonCard
          filename="streamable_error.ts"
          :code="`try {
  await client.connect(transport);
} catch (error) {
  // 單一連線通道，直接依據標準 HTTP 4xx/5xx
  // 與 JSON-RPC 錯誤碼進行精準重試
}`"
        />
      </div>
    </div>
  </SlideShell>
</template>

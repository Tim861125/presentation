<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ERROR HANDLING"
      title="🎨 統一錯誤自訂參數"
      subtitle="擺脫繁複的 required_error 與 invalid_type_error"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ v3：需配置多個分散參數</div>
        <JsonCard
          filename="v3_errors.ts"
          :code="`z.string({
  required_error: '此欄位必填',
  invalid_type_error: '型別不符合字串'
})`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ v4：統一單一 error 物件／字串</div>
        <JsonCard
          filename="v4_errors.ts"
          :code="`z.string({
  error: '請輸入有效的字串內容'
})`"
        />
      </div>
    </div>
  </SlideShell>
</template>

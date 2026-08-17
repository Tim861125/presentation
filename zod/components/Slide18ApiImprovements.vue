<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="API MODERNIZATION"
      title="🔧 頂層 API 簡化與 Literal 增強"
      subtitle="z.email() 升格為一級 API 與多值 Literal 語法"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">常用字串格式一級化</div>
        <JsonCard
          filename="top_level.ts"
          :code="`// ❌ v3 (舊寫法)
z.string().email()

// ✅ v4 (頂層一級 API)
z.email()

// 支援自訂 Regex 規則
z.email({
  regex: z.emailRegex.rfc5322
})`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">z.literal 支援多參數</div>
        <JsonCard
          filename="literal_multi.ts"
          :code="`// ✅ v4 簡潔多值 literal
z.literal('a', 'b', 'c')

// 完全等同於以下 union 寫法：
z.union([
  z.literal('a'),
  z.literal('b'),
  z.literal('c')
])`"
        />
      </div>
    </div>
  </SlideShell>
</template>

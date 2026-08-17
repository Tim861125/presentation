<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EXECUTION API"
      title="驗證執行方式 (Validation Methods)"
      subtitle="parse vs safeParse 以及非同步 parseAsync 處理"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">parse vs safeParse</div>
        <JsonCard
          filename="parse_methods.ts"
          :code="`const schema = z.string();

// parse - 失敗時拋出 ZodError 例外
try {
  const result = schema.parse('hello');
} catch (error) { /* ZodError */ }

// safeParse - 回傳 Result 物件不拋錯
const result = schema.safeParse('hello');
if (result.success) {
  console.log(result.data);
} else {
  console.log(result.error);
}`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">非同步驗證 (Async)</div>
        <JsonCard
          filename="async_validation.ts"
          :code="`// 使用 parseAsync
const username = await asyncSchema
  .parseAsync('john');

// 或使用 safeParseAsync
const result = await asyncSchema
  .safeParseAsync('john');`"
        />
      </div>
    </div>
  </SlideShell>
</template>

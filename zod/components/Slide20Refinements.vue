<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="REFINEMENTS"
      title="🔄 任意交錯 Refinement 與 .overwrite()"
      subtitle="更加靈活的鏈式呼叫與不改變型別的值轉換"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">可任意交錯 .refine()</div>
        <JsonCard
          filename="interleave_refine.ts"
          :code="`// ✅ v4 允許任意位置插入自訂驗證
z.string()
  .min(5)
  .refine(val => val.includes('@'))
  .max(50)`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">全新 .overwrite() 方法</div>
        <JsonCard
          filename="overwrite.ts"
          :code="`// 在保持原型別的前提下安全轉換數值
z.number()
  .overwrite(val => val ** 2)
  .max(100)`"
        />
      </div>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="DISCRIMINATED UNIONS"
      title="🎯 判別式聯集 (Discriminated Unions)"
      subtitle="多態型別安全判別與巢狀錯誤碼拓展"
    />

    <div class="mt-4">
      <JsonCard
        filename="discriminated_union.ts"
        :code="`const shapeSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('circle'), radius: z.number() }),
  z.object({ type: z.literal('square'), size: z.number() }),
  z.object({ type: z.literal('rectangle'), width: z.number(), height: z.number() })
]);

shapeSchema.parse({ type: 'circle', radius: 10 }); // ✅ 通過
shapeSchema.parse({ type: 'triangle', base: 5 });   // ❌ 報錯 (不匹配 type 欄位)`"
      />
    </div>
  </SlideShell>
</template>

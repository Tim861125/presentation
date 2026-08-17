<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="RECURSION"
      title="遞迴物件原生支援 (Recursive Objects)"
      subtitle="擺脫 v3 複雜的 z.lazy 手動型別定義"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ v3：需繁瑣定義 Type 與 z.lazy</div>
        <JsonCard
          filename="v3_recursive.ts"
          :code="`type Category = z.infer<typeof categorySchema>;

const categorySchema: z.ZodType<Category> =
  z.lazy(() =>
    z.object({
      name: z.string(),
      subcategories: z.array(categorySchema)
    })
  );`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ v4：原生精簡寫法</div>
        <JsonCard
          filename="v4_recursive.ts"
          :code="`const category = z.object({
  name: z.string(),
  subcategories: z.lazy(() => z.array(category))
});`"
        />
      </div>
    </div>
  </SlideShell>
</template>

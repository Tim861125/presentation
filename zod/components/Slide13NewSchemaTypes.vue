<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="NEW PRIMITIVES"
      title="新 Schema 型別：z.file() 與 Template Literals"
      subtitle="原生支援檔案上傳限制與樣板字面值約束"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">z.file() 檔案型別驗證</div>
        <JsonCard
          filename="file_schema.ts"
          :code="`const avatarSchema = z.file({
  type: ['image/jpeg', 'image/png', 'image/webp'],
  maxSize: 2 * 1024 * 1024,  // 最大 2MB
  minSize: 1024              // 至少 1KB
});`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">z.templateLiteral 樣板字面值</div>
        <JsonCard
          filename="template_literal.ts"
          :code="`const userIdSchema = z.templateLiteral\`user_\${z.string()}\`;

userIdSchema.parse('user_123');   // ✅ 通過
userIdSchema.parse('admin_123');  // ❌ 報錯`"
        />
      </div>
    </div>
  </SlideShell>
</template>

<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EXTENSIBILITY"
      title="🏷️ 強型別 Metadata 系統"
      subtitle="z.registry() 讓 Schema 攜帶 UI 欄位設定與 OpenAPI 說明"
    />

    <div class="mt-4">
      <JsonCard
        filename="registry.ts"
        :code="`const uiRegistry = z.registry<{ label: string; placeholder: string; inputType?: string }>();

const loginSchema = z.object({
  email: z.email().register(uiRegistry, {
    label: 'Email',
    placeholder: 'example@email.com',
    inputType: 'email',
  }),

  password: z.string().min(8).register(uiRegistry, {
    label: 'Password',
    placeholder: '至少 8 個字元',
    inputType: 'password',
  }),
});`"
      />
    </div>
  </SlideShell>
</template>

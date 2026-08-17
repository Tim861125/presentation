<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SCHEMA COMPOSITION"
      title="物件驗證 (Object Validation)"
      subtitle="巢狀物件、部分可選 (partial)、欄位挑選 (pick) 與排除 (omit)"
    />

    <div class="mt-4">
      <JsonCard
        filename="objects.ts"
        :code="`const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const ProfileSchema = z.object({
  user: UserSchema,
  settings: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }),
});

UserSchema.partial()              // All fields optional (string | undefined)
UserSchema.pick({ name: true })   // Only keep name
UserSchema.omit({ id: true })     // Exclude id`"
      />
    </div>
  </SlideShell>
</template>

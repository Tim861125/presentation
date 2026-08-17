<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="PROBLEM VS SOLUTION"
      title="為什麼我們需要 Zod？"
      subtitle="TypeScript 編譯期檢查 vs Zod 執行時期強型別保證"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-rose-400 mb-2">❌ TypeScript 僅在編譯期生效</div>
        <JsonCard
          filename="compile_time_only.ts"
          :code="`interface User {
  name: string;
  age: number;
}

// Runtime 型別完全無法保證！
const data = await fetch('/api/user')
  .then(r => r.json()) as User;`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">✅ Zod 提供 Runtime 驗證與型別推導</div>
        <JsonCard
          filename="runtime_guarantee.ts"
          :code="`import { z } from 'zod';

const UserSchema = z.object({
  name: z.string(),
  age: z.number()
});

// Runtime 驗證，型別百分之百安全
const user = UserSchema.parse(data);`"
        />
      </div>
    </div>
  </SlideShell>
</template>

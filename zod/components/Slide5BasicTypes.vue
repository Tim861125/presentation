<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="FUNDAMENTALS"
      title="基本型別驗證 (Basic Types)"
      subtitle="String, Number, Boolean, Date, Enum, Literals 與 Defaults"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <JsonCard
          filename="strings_and_numbers.ts"
          :code="`// String
z.string().min(3).max(100)
z.string().email()
z.string().url()
z.string().uuid()
z.string().regex(/^\\d{4}$/)

// Number & Boolean
z.number().int().positive()
z.number().min(0).max(100)
z.boolean()`"
        />
      </div>

      <div>
        <JsonCard
          filename="enums_and_options.ts"
          :code="`// Date & Enum
z.date().min(new Date('2020-01-01'))
z.enum(['admin', 'user', 'guest'])
z.literal('hello')

// Optional, Nullable & Defaults
z.string().optional()  // string | undefined
z.string().nullable()  // string | null
z.string().nullish()   // string | null | undefined
z.string().default('guest')`"
        />
      </div>
    </div>
  </SlideShell>
</template>

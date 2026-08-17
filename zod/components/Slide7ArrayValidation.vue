<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="COLLECTIONS"
      title="陣列與多元組 (Array & Tuple)"
      subtitle="元素型別約束、長度限制、非空 (nonempty) 與 Tuple 定義"
    />

    <div class="mt-4">
      <JsonCard
        filename="arrays_and_tuples.ts"
        :code="`// Basic array
z.array(z.string())           // string[]
z.string().array()            // 等同於上方

// Array length constraints
z.array(z.number()).min(1).max(10)
z.array(z.string()).nonempty()   // 至少包含一個元素

// Tuple (定長與固定順序之多型別陣列)
z.tuple([z.string(), z.number(), z.boolean()])
// [string, number, boolean]`"
      />
    </div>
  </SlideShell>
</template>

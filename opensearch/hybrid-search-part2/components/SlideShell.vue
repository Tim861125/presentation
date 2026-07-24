<script setup lang="ts">
// Standard content-slide chrome: dark bg, faint grid, corner glows, padded column.
withDefaults(defineProps<{ center?: boolean }>(), { center: false })
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
    <!-- Grid background -->
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
    <div class="absolute inset-0 opacity-[0.04]"
         style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 40px 40px;" />
    <!-- Ambient glows -->
    <div class="absolute -top-40 -right-40 size-[420px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

    <div class="relative h-full flex flex-col px-12 py-5" :class="center ? 'justify-center' : ''">
      <slot />
    </div>
  </div>
</template>

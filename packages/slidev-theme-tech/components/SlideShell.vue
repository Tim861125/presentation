<script setup lang="ts">
/**
 * SlideShell - Universal Dark Tech slide container
 * Provides subtle grid background, ambient corner glows, and unified padding.
 */
withDefaults(
  defineProps<{
    center?: boolean
    px?: string
    py?: string
    glow?: boolean
  }>(),
  {
    center: false,
    px: 'px-12',
    py: 'py-5',
    glow: true,
  }
)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100 font-sans select-none">
    <!-- Dark gradient base -->
    <div class="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pointer-events-none" />

    <!-- 40px grid overlay -->
    <div
      class="absolute inset-0 opacity-[0.04] pointer-events-none"
      style="background-image: linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px); background-size: 40px 40px;"
    />

    <!-- Ambient corner glows -->
    <template v-if="glow">
      <div class="absolute -top-40 -right-40 size-[420px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div class="absolute -bottom-40 -left-40 size-[420px] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
    </template>

    <!-- Main slide content area -->
    <div
      class="relative h-full flex flex-col"
      :class="[px, py, center ? 'justify-center' : '']"
    >
      <slot />
    </div>
  </div>
</template>

<template>
  <div class="slidev-layout sk-dark vcover">
    <div class="vcover__brand">
      <slot name="brand">RD Tech Talk</slot>
    </div>
    <div class="vcover__text">
      <slot />
    </div>
    <div v-if="$slots.art" class="vcover__art">
      <slot name="art" />
    </div>
  </div>
</template>

<template>
  <div class="slidev-layout sk-cover sk-dark">
    <div class="sk-cover__brand">
      <slot name="brand">Monthly Report</slot>
    </div>
    <div class="sk-cover__grid">
      <div class="sk-cover__text">
        <slot />
      </div>
      <div class="sk-cover__art">
        <slot name="art" />
      </div>
    </div>
  </div>
</template>

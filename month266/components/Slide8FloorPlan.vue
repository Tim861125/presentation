<script setup lang="ts">
import HomeFloorPlan from './HomeFloorPlan.vue'
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SIDE PROJECT"
      title="家裡平面示意圖"
      subtitle="空間格局規劃與動線示意"
    />

    <div class="h-[380px] w-full flex flex-col items-center justify-center mt-2">
      <HomeFloorPlan />
    </div>
  </SlideShell>
</template>

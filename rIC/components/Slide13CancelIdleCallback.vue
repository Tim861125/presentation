<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CLEANUP"
      title="取消閒置排程 (cancelIdleCallback)"
      subtitle="在組件銷毀或使用者中斷操作時釋放排程任務"
    />

    <div class="mt-4">
      <JsonCard
        filename="cancel_idle.ts"
        :code="`let idleHandle: number | null = null;

function startBackgroundSync() {
  idleHandle = requestIdleCallback(syncLogs);
}

function stopBackgroundSync() {
  if (idleHandle !== null) {
    cancelIdleCallback(idleHandle);
    idleHandle = null;
  }
}

// Vue / React 組件銷毀時清理
onUnmounted(() => stopBackgroundSync());`"
      />
    </div>
  </SlideShell>
</template>

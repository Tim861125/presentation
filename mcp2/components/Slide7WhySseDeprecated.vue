<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="LIMITATIONS OF SSE"
      title="為什麼 SSE 方案逐漸被官方淘汰/降級？"
      subtitle="四個致命的架構結構性缺陷"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">1. 不是為 RPC 協議所設計</h4>
        <p class="text-xs text-zinc-300">MCP 是雙向請求-回應的 JSON-RPC，而 SSE 天生是單向廣播事件，兩者語意天生不合。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">2. 雙連線狀態管理極端繁瑣</h4>
        <p class="text-xs text-zinc-300">需維護 Session ID 與長連線 Keep-alive，反向代理容易發生一條連通另一條逾時斷線。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">3. 錯誤處理與重連機制複雜</h4>
        <p class="text-xs text-zinc-300">當發生網路抖動，難以判定是 POST 失敗還是 SSE 斷線，重試時可能造成重複 Tool Call。</p>
      </TechCard>

      <TechCard accent="rose" class="p-4">
        <h4 class="text-sm font-bold text-white mb-1">4. 進度追蹤與取消擴展困難</h4>
        <p class="text-xs text-zinc-300">長時間執行的 Tool Call、Progress Notification 與任務中斷 (Cancellation) 難以優雅實現。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

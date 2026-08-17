<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="ROLES & RESPONSIBILITIES"
      title="三個角色的具體職責定義"
      subtitle="Host (主機應用) · Client (通訊客戶端) · Server (功能服務端)"
    />

    <div class="space-y-3 mt-4">
      <TechCard accent="cyan" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="cyan">MCP HOST</TechBadge>
          <span class="text-sm font-bold text-white">AI 應用本體 (Claude Desktop / Cursor / IDE)</span>
        </div>
        <p class="text-xs text-zinc-300">負責加載大模型 (LLM)，接收使用者 Prompt，理解意圖並決定是否委託工具執行特定動作。</p>
      </TechCard>

      <TechCard accent="purple" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="purple">MCP CLIENT</TechBadge>
          <span class="text-sm font-bold text-white">通訊傳輸模組 (Host 內部)</span>
        </div>
        <p class="text-xs text-zinc-300">維持與特定 MCP Server 的 Stdio / SSE 連線通道，將 LLM 的 Tool Call 轉為標準 JSON-RPC 請求。</p>
      </TechCard>

      <TechCard accent="emerald" class="p-4">
        <div class="flex items-center gap-2 mb-1">
          <TechBadge color="emerald">MCP SERVER</TechBadge>
          <span class="text-sm font-bold text-white">工具與資源提供者 (Filesystem / Postgres / Git Server)</span>
        </div>
        <p class="text-xs text-zinc-300">宣告自身提供的 Resources、Tools 與 Prompts 清單，接收參數執行具體 I/O 後回傳結構化資料。</p>
      </TechCard>
    </div>
  </SlideShell>
</template>

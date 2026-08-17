<script setup lang="ts">
const configCode = `{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["@chrome-devtools/mcp"]
    }
  }
}`;
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="OVERVIEW"
      title="什麼是 Chrome DevTools MCP？"
      subtitle="大語言模型 (LLM) 與瀏覽器引擎之間的標準化雙向橋樑"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <TechCard accent="blue" class="p-5 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <TechBadge color="blue">Core Benefits</TechBadge>
          </div>
          <ul class="space-y-3 text-xs text-zinc-200">
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">✓</span>
              <span><strong class="text-white">Google 官方維護</strong>：基於 MCP 開放標準原生打造</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">✓</span>
              <span><strong class="text-white">深度存取</strong>：直接調用 27+ 個 CDP 核心除錯工具</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">✓</span>
              <span><strong class="text-white">保留 Session</strong>：可無縫連接現有登入狀態的 Chrome 實例</span>
            </li>
          </ul>
        </div>
        <div class="text-[11px] text-zinc-500 font-mono mt-4">
          💡 啟動時加上 <code class="text-emerald-400 bg-white/5 px-1.5 py-0.5 rounded">--remote-debugging-port=9222</code>
        </div>
      </TechCard>

      <div>
        <div class="text-xs font-mono text-emerald-400 mb-2">claude_desktop_config.json</div>
        <JsonCard
          filename="mcp_config.json"
          :code="configCode"
        />
      </div>
    </div>
  </SlideShell>
</template>

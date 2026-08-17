<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SDK CODE"
      title="Server 工具註冊：server.registerTool()"
      subtitle="結合 Zod Schema 強型別校驗與非同步業務邏輯"
    />

    <div class="mt-4">
      <JsonCard
        filename="register_tool.ts"
        :code="`import { z } from 'zod';

server.registerTool(
  'search-patent-query',
  {
    title: 'Patent Query Search',
    description: '使用結構化語法檢索專利資料庫',
    inputSchema: {
      query: z.string().describe('專利檢索語法，如 TAC:(LED) AND IPC:(H01L*)')
    }
  },
  async ({ query }) => {
    const results = await db.patents.findMany({ where: { query } });
    return {
      content: [{ type: 'text', text: JSON.stringify(results, null, 2) }]
    };
  }
);`"
      />
    </div>
  </SlideShell>
</template>

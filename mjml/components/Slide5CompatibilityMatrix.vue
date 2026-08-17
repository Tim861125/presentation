<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="CLIENT ENGINES"
      title="主流郵件客戶端渲染引擎與相容性矩陣"
      subtitle="Word Engine (Outlook) 是現代 HTML Email 開發的最大魔王"
    />

    <div class="mt-4">
      <TechCard accent="cyan" class="p-5">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/10 text-zinc-400">
              <th class="pb-2">郵件客戶端</th>
              <th class="pb-2">底層渲染引擎</th>
              <th class="pb-2">現代 CSS 支援度</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5 text-zinc-300">
            <tr>
              <td class="py-2.5 font-bold text-rose-400">Outlook 2016+ (Desktop)</td>
              <td>Microsoft Word Engine</td>
              <td class="text-rose-400 font-bold">極度有限 (不支援 Flex / Grid)</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-amber-300">Gmail (Web / App)</td>
              <td>Google 自訂過濾引擎</td>
              <td class="text-amber-300 font-bold">支援大部分 CSS (會過濾特定屬性)</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-emerald-400">Apple Mail (iOS / macOS)</td>
              <td>WebKit (Safari 核心)</td>
              <td class="text-emerald-400 font-bold">支援度最完整 (近乎現代瀏覽器)</td>
            </tr>
            <tr>
              <td class="py-2.5 font-bold text-sky-400">Outlook.com (Web)</td>
              <td>Web 標準引擎</td>
              <td class="text-sky-400">部分支援 (優於桌機版)</td>
            </tr>
          </tbody>
        </table>
      </TechCard>
    </div>
  </SlideShell>
</template>

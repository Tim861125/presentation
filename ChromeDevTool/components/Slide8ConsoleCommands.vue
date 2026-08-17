<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="LOGGING API"
      title="常用 Console 指令與格式化輸出"
      subtitle="善用 table, group 與 time 提升除錯效率與日誌可讀性"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <TechCard accent="slate" class="p-3">
        <div class="text-xs font-mono text-zinc-400 font-bold mb-1">console.log / warn / error</div>
        <div class="rounded-lg bg-black/50 p-2 font-mono text-[11px] text-zinc-300 space-y-1">
          <div class="text-zinc-400">console.log("一般訊息");</div>
          <div class="text-amber-300">console.warn("警告訊息");</div>
          <div class="text-rose-400">console.error("嚴重錯誤");</div>
        </div>
      </TechCard>

      <TechCard accent="emerald" class="p-3">
        <div class="text-xs font-mono text-emerald-400 font-bold mb-1">console.table(data)</div>
        <div class="rounded-lg bg-black/50 p-2 font-mono text-[11px] text-emerald-300">
          console.table([<br/>
          &nbsp;&nbsp;{ name: "Alice", role: "Dev" },<br/>
          &nbsp;&nbsp;{ name: "Bob", role: "QA" }<br/>
          ]);
        </div>
      </TechCard>

      <TechCard accent="blue" class="p-3">
        <div class="text-xs font-mono text-blue-400 font-bold mb-1">console.group / groupEnd</div>
        <div class="rounded-lg bg-black/50 p-2 font-mono text-[11px] text-blue-300">
          console.group("Auth Flow");<br/>
          console.log("Token verified");<br/>
          console.groupEnd();
        </div>
      </TechCard>

      <TechCard accent="amber" class="p-3">
        <div class="text-xs font-mono text-amber-400 font-bold mb-1">console.time / timeEnd</div>
        <div class="rounded-lg bg-black/50 p-2 font-mono text-[11px] text-amber-300">
          console.time("loop");<br/>
          for(let i=0; i&lt;1e5; i++){}<br/>
          console.timeEnd("loop"); // loop: 1.8ms
        </div>
      </TechCard>
    </div>
  </SlideShell>
</template>

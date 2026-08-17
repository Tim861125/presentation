<script setup lang="ts">
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="EXTENDED TYPES"
      title="環境布林與精確數值型別"
      subtitle="z.stringbool() 與 int8 / uint32 / float32 / float64"
    />

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div>
        <div class="text-xs font-mono text-cyan-400 mb-2">z.stringbool() 環境布林</div>
        <JsonCard
          filename="stringbool.ts"
          :code="`const strbool = z.stringbool();

// 真值 ('true', '1', 'yes', 'on', 'enabled')
strbool.parse('yes')       // => true
strbool.parse('1')         // => true

// 假值 ('false', '0', 'no', 'off', 'disabled')
strbool.parse('no')        // => false`"
        />
      </div>

      <div>
        <div class="text-xs font-mono text-purple-400 mb-2">精確數值型別 (Exact Number Formats)</div>
        <JsonCard
          filename="numbers.ts"
          :code="`z.int8()    // -128 到 127
z.uint32()  // 0 到 4,294,967,295
z.float32() // 32-bit 單精度浮點數
z.float64() // 64-bit 雙精度浮點數`"
        />
      </div>
    </div>
  </SlideShell>
</template>

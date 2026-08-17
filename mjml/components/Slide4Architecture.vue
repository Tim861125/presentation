<script setup lang="ts">
const mjmlCode = `<mjml>
  <mj-head>
    <mj-title>{{title}}</mj-title>
    <mj-preview>{{abstract}}</mj-preview>
    <mj-attributes>
      <mj-all font-family="Microsoft JhengHei, Arial, sans-serif" />
    </mj-attributes>
  </mj-head>

  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="120px" src="https://example.com/logo.png" />
        <mj-text font-size="20px" color="#F45E43">專利檢索分析報告已就緒</mj-text>
        <mj-button background-color="#F63A4D" href="#">立即前往查看</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;
</script>

<template>
  <SlideShell px="px-14">
    <SlideHeader
      eyebrow="SYNTAX"
      title="MJML 語法結構標準架構"
      subtitle="<mj-head> 全域屬性宣告與 <mj-body> 格線版面編排"
    />

    <div class="mt-4">
      <JsonCard
        filename="template.mjml"
        :code="mjmlCode"
      />
    </div>
  </SlideShell>
</template>

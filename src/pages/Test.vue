<script setup lang="ts">
import Layout from "@/layouts/default.vue";
import ComponentA from "@/components/Mitt/ComponentA.vue";
import ComponentB from "@/components/Mitt/ComponentB.vue";
</script>
<template>
  <Layout>
    <div class="test-page">
      <ComponentA />
      <ComponentB />
    </div>
  </Layout>
</template>

<style lang="scss">
div.test-page {
  > * {
    grid-column-start: span 6;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 10%);
    min-height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

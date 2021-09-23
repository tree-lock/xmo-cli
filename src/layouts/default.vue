<script setup>
import PageHeader from "@/components/Page/Header.vue";
import PageSider from "@/components/Page/Sider.vue";
</script>
<template>
  <div class="default-layout">
    <PageSider></PageSider>
    <section>
      <PageHeader></PageHeader>
      <div class="content">
        <slot></slot>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
div.default-layout {
  display: flex;
  height: 100%;
  > *:first-child {
    flex-shrink: 0;
  }
  > section {
    position: relative;
    flex: auto;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>

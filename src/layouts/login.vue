<script setup lang="ts">
import LoginFooter from "@/components/Login/Footer.vue";
</script>
<template>
  <div class="login-layout">
    <div class="content">
      <slot></slot>
    </div>
  </div>
  <LoginFooter />
</template>

<style lang="scss">
div.login-layout {
  height: calc(100vh - 40px);
  // background: url("/background.jpeg") no-repeat 50% 50%;
  background-size: cover;
  justify-content: center;
  display: flex;
  justify-content: center;

  > div.content {
    width: 1000px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-bottom: 10vh;
    > *:first-child {
      flex: 1;
    }
  }
}
</style>

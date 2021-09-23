<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goLogin = () => {
  router.push("Login");
};
</script>
<template>
  <header class="page-header">
    <div class="avatar">
      <img
        src="/avatar.png"
        alt="头像"
        title="点击回到登录界面"
        height="36"
        width="36"
        @click="goLogin"
      />
    </div>
  </header>
</template>

<style lang="scss">
header.page-header {
  background-color: #ffffff;
  height: 48px;
  line-height: 48px;
  width: 100%;
  z-index: 9;
  box-shadow: 0 8px 20px 0 rgb(0 0 0 / 10%);
  padding: 0 48px;
  > div {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    > img {
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>

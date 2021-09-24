<script setup>
import { throttle } from "@/services/utils";
import { onBeforeMount, onMounted, ref, watchEffect } from "vue-demi";
const ifNarrow = ref(false);
const siderWidth = ref("208px");
const changeWidth = () => {
  ifNarrow.value = !ifNarrow.value;
  siderWidth.value = ifNarrow.value ? "48px" : "208px";
};

onMounted(() => {
  window.addEventListener(
    "resize",
    throttle(() => {
      const clientWidth = document.body.clientWidth;
      if (clientWidth < 750) {
        ifNarrow.value = true;
        siderWidth.value = "48px";
      }
      if (clientWidth > 750) {
        ifNarrow.value = false;
        siderWidth.value = "208px";
      }
    }, 300),
    false
  );
});
const navList = [{ name: "Home", alias: "H" }];
</script>
<template>
  <aside class="page-sider">
    <h2>{{ ifNarrow ? "导" : "导航栏" }}</h2>
    <ul>
      <li v-for="item in navList">{{ ifNarrow ? item.alias : item.name }}</li>
    </ul>
    <button @click="changeWidth">{{ ifNarrow ? "→" : "←" }}</button>
  </aside>
</template>

<style lang="scss">
aside.page-sider {
  position: relative;
  width: v-bind(siderWidth);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #001529;
  color: #ffffff;
  transition: all 0.25s ease-in;
  white-space: nowrap;
  > h2 {
    padding: 16px;
  }

  > ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      background-color: #1890ff;
      padding: 12px;
      text-align: center;
    }
  }
  > button {
    position: absolute;
    bottom: 10px;
  }
}
</style>

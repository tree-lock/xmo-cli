<script setup lang="ts">
import { throttle } from "@/services/utils";
import { onMounted, ref } from "vue-demi";
import { useRoute, useRouter } from "vue-router";

interface NavItem {
  name: string;
  alias: string;
  to: string;
}
const ifNarrow = ref(false);
/**
 * 利用 Vue3.2 的特性来让 scss 利用 v-bind 获取 js 变量
 */
const siderWidth = ref("208px");
/**
 * 修改侧边导航栏的宽窄
 */
const changeWidth = () => {
  ifNarrow.value = !ifNarrow.value;
  siderWidth.value = ifNarrow.value ? "48px" : "208px";
};
const router = useRouter();
const route = useRoute();

onMounted(() => {
  /**
   * 用js实现自适应
   */
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
/**
 * 导航栏列表，又导航项全称、简称和跳转构成。
 */
const navList: NavItem[] = [
  { name: "Home", alias: "H", to: "Home" },
  { name: "About", alias: "A", to: "About" },
];
/**
 * 判断是否为当前导航栏
 */
const ifActiveNav = (item: NavItem) =>
  item.to === route.name ? "active-nav" : "";
/**
 * 导航栏跳转
 */
const goNav = (item) => {
  if (route.name !== item.to) {
    router.push({
      name: item.to,
    });
  }
};
</script>
<template>
  <aside class="page-sider">
    <h2>{{ ifNarrow ? "导" : "导航栏" }}</h2>
    <ul>
      <li
        v-for="item in navList"
        @click="goNav(item)"
        :class="ifActiveNav(item)"
      >
        {{ ifNarrow ? item.alias : item.name }}
      </li>
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
      background-color: #001529;
      cursor: pointer;
      padding: 12px;
      color: #a6aaae;
      text-align: center;
      transition: all 0.25s ease-in;
      &:hover {
        color: #ffffff;
      }
      &.active-nav {
        background-color: #1890ff;
        color: #ffffff;
      }
    }
  }
  > button {
    position: absolute;
    bottom: 10px;
  }
}
</style>

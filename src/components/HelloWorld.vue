<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

defineProps({
  msg: String,
});
const router = useRouter();
const goLogin = () => {
  router.push("Login");
};
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <h2>
    This project is initialized by
    <a href="https://gitee.com/dXmo/xmo-cli" target="_blank">Xmo-cli</a>
  </h2>
  <button type="button" @click="goLogin">To Login</button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <br />

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped lang="scss">
a {
  color: #42b983;
}
button {
  background-color: lightblue;
  border-radius: 5px;
}
</style>

<script setup>
import { testMitt } from "@/emitter/index";
import { ref } from "vue-demi";
const num = ref(0);
testMitt.on("increase", () => {
  num.value++;
});
testMitt.on("decrease", () => {
  num.value--;
});
</script>
<template>
  <div class="component-b">
    <h3>ComponentB</h3>
    <h4>Value: {{ num }}</h4>
  </div>
</template>

<style lang="scss">
div.component-b {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

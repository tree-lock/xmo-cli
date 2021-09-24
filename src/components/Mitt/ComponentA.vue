<script setup>
import { testMitt } from "@/emitter/index";
const increase = () => {
  testMitt.emit("increase");
};
const decrease = () => {
  testMitt.emit("decrease");
};
</script>
<template>
  <div class="component-a">
    <button class="my-button" @click="increase">+ Increase ComponentB +</button>
    <h3>ComponentA</h3>
    <button class="my-button" @click="decrease">- Decrease ComponentB -</button>
  </div>
</template>

<style lang="scss">
div.component-a {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

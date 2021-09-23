<script setup>
import Layout from "@/layouts/default.vue";
import { getRankingList } from "@/services/home";
import { onBeforeMount, ref } from "vue-demi";

const list = ref([]);
onBeforeMount(async () => {
  const ans = (await getRankingList())[0];
  list.value = ans;
});
</script>
<template>
  <Layout>
    <ul>
      <li v-for="item in list">
        <img :src="item.image_url" />
        <div class="info">
          <a :href="item.url">
            <span>{{ item.title }}</span>
          </a>
          <p>
            {{ item.synopsis }}
          </p>
          <p>
            score: <strong>{{ item.score }}</strong>
          </p>
        </div>
      </li>
    </ul>
  </Layout>
</template>

<style lang="scss" scoped>
ul {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 24px;
  gap: 16px;
  > li {
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 10%);
    @media screen and (min-width: 1440px) {
      grid-column-start: span 4;
    }
    @media screen and (min-width: 960px) and (max-width: 1440px) {
      grid-column-start: span 6;
    }
    @media screen and (max-width: 960px) {
      grid-column-start: span 12;
    }
    display: flex;
    align-items: center;
    gap: 10px;
    > div.info {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
}
</style>

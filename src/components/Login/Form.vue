<script setup>
import { reactive } from "vue-demi";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store";

const form = reactive({
  username: "",
  password: "",
});

const router = useRouter();
const store = useUserStore();

const submitForm = (e) => {
  e.preventDefault();
  if (form.username && form.password) {
    router.push({
      name: "Home",
    });
    store.login();
  } else {
    alert("请输入账号密码");
  }
};
</script>
<template>
  <div class="login-form">
    <h2>账号密码登录</h2>
    <form>
      <label for="username"
        >账号
        <input
          id="username"
          type="text"
          v-model="form.username"
          autocomplete="username"
        />
      </label>
      <label for="password"
        >密码
        <input
          id="password"
          type="password"
          v-model="form.password"
          autocomplete="current-password"
        />
      </label>
      <button @click="submitForm">登录</button>
    </form>
  </div>
</template>

<style lang="scss">
div.login-form {
  box-sizing: border-box;
  width: 340px;
  padding: 24px 32px;
  border-radius: 4px;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 10%);
  > h2 {
    padding: 30px 28px 43px 28px;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
  }
  > form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > label {
      display: flex;
      align-items: center;
      gap: 20px;
      > input {
        flex: 1;
        height: 32px;
        padding: 0 10px;
      }
    }
    > button {
      margin-top: 20px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      background: #2984ef;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
      padding: 8px;
      border-radius: 2px;
    }
  }
}
</style>

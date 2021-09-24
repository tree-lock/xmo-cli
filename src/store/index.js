import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    ifLogin: false,
  }),
  actions: {
    login() {
      this.ifLogin = true;
    },
    logout() {
      this.ifLogin = false;
    },
  },
});

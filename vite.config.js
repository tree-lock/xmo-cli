import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { apiBaseUrl } from "./src/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target: apiBaseUrl, // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

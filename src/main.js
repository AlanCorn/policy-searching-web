import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // vuex
import axios from "axios";
import "./style/tailwind/index.css"; // tailwind 全局样式表
import * as ElIconModules from "@element-plus/icons-vue";
import "@/assets/font.css";

import "./assets/main.css";

axios.defaults.baseURL = "/api";

const app = createApp(App)

for(let iconName in ElIconModules) {
  app.component(iconName,ElIconModules[iconName])
}

// eslint-disable-next-line prettier/prettier
app
  .use(router)
  .use(store)
  .mount("#app");

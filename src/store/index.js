import { createStore } from "vuex";

import user from "./modules/user";
import history from "./modules/history";
import favourite from "./modules/favourite";
import homePage from "./modules/homePage";
import dataManage from "./modules/dataManage";
import indexNav from "./modules/indexNav";
import search from "./modules/search";

const store = createStore({
  modules: {
    user,
    history,
    favourite,
    homePage,
    dataManage,
    indexNav,
    search,
  },
});

//将store store 导出去
// export function myStore() {
//   return store;
// }
export default store;

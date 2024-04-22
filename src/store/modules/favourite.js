import favouriteApi from "@/api/favouriteApi";
import dataManageApi from "@/api/dataManageApi";

const favourite = {
  namespaced: true,
  state: () => ({
    favouriteList: [],
  }),
  getters: {},
  mutations: {
    getFavouriteTitle(state, favouriteResult) {
      state.favouriteList = favouriteResult;
    },
    createFavourite(state, favouriteResult) {
      state.favouriteList.push(favouriteResult);
    },
    changeFavouriteName(state, newName) {
      for (let i = 0; i < state.favouriteList.length; i++) {
        if (state.favouriteList[i].cid == newName.cid) {
          state.favouriteList[i].name = newName.name;
          break;
        }
      }
    },
    deleteFavourite(state, cid) {
      state.favouriteList = state.favouriteList.filter((item) => {
        return item.cid != cid;
      });
    },
    cancelFavourite(state, { uid, pid }) {
      for (let i = 0; i < state.favouriteList.length; i++) {
        for (
          let j = 0;
          j < state.favouriteList[i].collectionPolicies.length;
          j++
        ) {
          if (state.favouriteList[i].collectionPolicies[j].policy_id == pid) {
            state.favouriteList[i].collectionPolicies.splice(j, 1);
            break;
          }
        }
      }
    },
    // 退出登录刷新favouriteList
    clearFavouriteList(state) {
      state.favouriteList = [];
    },
    // 把政策添加到收藏夹
    /* async addFavouritePolicy(state, {pid,cid}) {
            let result = await dataManageApi.getPolicyDataById(pid)
            state.favouriteList.forEach(item => {
                if (item.cid == cid) {
                    item.collectionPolicies.push(result.data);
                }
            });
        } */
  },
  actions: {
    async getFavouriteTitle({ commit }, uid) {
      let result = await favouriteApi.getFavouriteTitle(uid);
      if (result.code === 200) {
        commit("getFavouriteTitle", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async createFavourite({ commit }, newFavouriteName) {
      let result = await favouriteApi.createFavourite(
        newFavouriteName.uid,
        newFavouriteName.name
      );
      if (result.code === 200) {
        commit("createFavourite", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async changeFavouriteName({ commit }, newName) {
      let result = await favouriteApi.changeFavouriteName(newName);
      if (result.code === 200) {
        commit("changeFavouriteName", newName);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async deleteFavourite({ commit }, cid) {
      let result = await favouriteApi.deleteFavourite(cid);
      if (result.code === 200) {
        commit("deleteFavourite", cid);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async cancelFavourite({ commit }, form) {
      let result = await favouriteApi.cancelFavourite(
        parseInt(form.uid),
        form.pid
      );
      if (result.code === 200) {
        commit("cancelFavourite", { uid: form.uid, pid: form.pid });
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async addFavouritePolicy({ commit }, { uid, pid, cid }) {
      let result = await favouriteApi.saveFavourite(uid, pid, cid);
      if (result.code === 200) {
        // commit("addFavouritePolicy", {pid,cid});
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
  },
};

export default favourite;

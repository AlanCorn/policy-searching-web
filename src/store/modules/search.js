import searchApi from "@/api/searchApi";

const search = {
  namespaced: true,
  state: () => ({
    searchPolicyList: {},
    searchData: "",
    page_size: 20,
    page: 1,
    page_count: 0,
  }),
  getters: {},
  mutations: {
    setSearchPolicyResults(state, { policyResult, total }) {
      console.log("setSearchPolicyResults", policyResult);
      state.searchPolicyList.data = policyResult;
      state.searchPolicyList.total = parseInt(total);
    },
    setPageInfo(state, { page_size, page, page_count }) {
      state.page_size = page_size;
      state.page = page;
      state.page_count = page_count;
    },
    saveSearch(state, data) {
      state.searchData = data;
    },
  },
  actions: {
    // 普通搜索政策
    async searchPolicy({ commit }, params) {
      let result = await searchApi.searchPolicy(params);
      console.log("searchPolicy", result);
      if (result.status == 200) {
        commit("setSearchPolicyResults", {
          policyResult: result.data.results,
          total: result.data.total,
        });
        commit("setPageInfo", {
          page_size: result.data.page_size,
          page: result.data.page,
          page_count: result.data.page_count,
        });
      } else if (result.status == 500) {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 精确匹配搜索政策
    async accurateSearchPolicy({ commit }, params) {
      let result = await searchApi.accurateSearch(params);
      console.log("accurateSearch", result);
      if (result.status == 200) {
        commit("setSearchPolicyResults", {
          policyResult: result.data.results,
          total: result.data.total,
        });
        commit("setPageInfo", {
          page_size: result.data.page_size,
          page: result.data.page,
          page_count: result.data.page_count,
        });
      } else if (result.status == 500) {
        return Promise.reject(new Error(result.data.message));
      }
    },
    // 保存搜索词条
    saveSearch({ commit }, data) {
      commit("saveSearch", data);
    },
  },
};

export default search;

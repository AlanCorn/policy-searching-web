import dataManageApi from "@/api/dataManageApi";

const dataManage = {
  namespaced: true,
  state: () => ({
    policyList: [],
    recycleData: {},
    total: 0,
    // 页面展示
    policyData: JSON.parse(localStorage.getItem("policyData")) || {},
    recommendPolicies: [],
    hotPolicies: [],
    newPolicies: [],
    locationPolicies: [],
  }),
  getters: {},
  mutations: {
    getTotal(state, total) {
      state.total = total;
    },
    getRecycleData(state, recycleResult) {
      state.recycleData = recycleResult;
      for (let i = 0; i < recycleResult.policies.length; i++) {
        state.recycleData.policies[i].PUB_TIME = new Date(
          recycleResult.policies[i].PUB_TIME
        ).toLocaleDateString();
      }
    },
    addPolicy(state, params) {
      state.policyList.push(params);
    },
    updatePolicy(state, form) {
      for (let i = 0; i < state.policyList.length; i++) {
        if (state.policyList[i].policy_id == form.policy_id) {
          state.policyList.splice(i, 1, form);
          break;
        }
      }
      state.policyList.splice();
    },
    deletePolicy(state, id) {
      state.policyList.filter((policy) => policy.policy_id != id);
    },
    getPolicyData(state, policy) {
      state.policyData = policy;
    },
    changeFavourite(state) {
      state.policyData.collection = !state.policyData.collection;
      localStorage.setItem("policyData", JSON.stringify(state.policyData));
    },
    setLocalPolicyData(state, data) {
      state.locationPolicies = data || [];
    },
    setRecommendPolicyData(state, data) {
      state.recommendPolicies = data || [];
    },
    setlatestPolicyData(state, data) {
      state.newPolicies = data || [];
    },
    setHotPolicyData(state, data) {
      state.hotPolicies = data || [];
    },
  },
  actions: {
    async getAllPolicies({ commit }, uid) {
      let recommend_promise = dataManageApi.getRecommendPolicy(uid);
      let local_promise = dataManageApi.getLocalPolicy();
      let result_recommend = await recommend_promise;
      let result_local = await local_promise;
      console.log("setRecommendPolicyData", result_recommend);
      if (result_recommend.status === 200) {
        commit("setRecommendPolicyData", result_recommend.data.data);
      }

      if (result_local.code === 200) {
        commit("setLocalPolicyData", result_local.data);
      }

      // 预加载 热门政策  最新政策
      let hot_promise = dataManageApi.getHotPolicy();
      let latest_promise = dataManageApi.getLatestPolicy();
      let hot_recommend = await hot_promise;
      let latest_local = await latest_promise;

      if (hot_recommend.code === 200) {
        commit(
          "setHotPolicyData",
          hot_recommend.data.map((each) => each.pdata)
        );
      }

      if (latest_local.code === 200) {
        commit("setlatestPolicyData", latest_local.data);
      }
    },
    // 获取政策总数
    async getTotal({ commit }) {
      let result = await dataManageApi.getTotal();
      if (result.code === 200) {
        commit("getTotal", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    // 获取回收站数据
    async getRecycleData({ commit }, current) {
      let result = await dataManageApi.getRecycleData(current);
      if (result.code === 200) {
        commit("getRecycleData", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    // 添加一条政策
    async addPolicy({ commit }, params) {
      let result = await dataManageApi.addPolicy(params);
      if (result.code === 200) {
        commit("addPolicy", params);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async updatePolicy({ commit }, form) {
      let result = await dataManageApi.updatePolicy(form);
      if (result.code === 200) {
        commit("addPolicy", form);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    // 删除一条政策
    async deletePolicy({ commit }, id) {
      let result = await dataManageApi.deletePolicy(id);
      if (result.code === 200) {
        commit("deletePolicy", id);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    // 获取一条政策，用于页面跳转（数据管理）
    getPolicyData({ commit }, policy) {
      const policyData = policy;
      policyData.policy_body = policy.policy_body.replace(
        new RegExp(" ", "gm"),
        "\n"
      );
      localStorage.setItem("policyData", JSON.stringify(policy));
      commit("getPolicyData", policyData);
    },
    // 获取一条政策，用于页面跳转（非数据管理）
    async getPolicyDataById({ commit }, { policyId, uid }) {
      let result = await dataManageApi.getPolicyDataById(policyId, uid);
      console.log("result", result);
      if (result.code === 200) {
        const policyData = result.data;
        policyData.policy_body = result.data.policy_body.replace(
          new RegExp(" ", "gm"),
          "\n"
        );
        policyData.pub_time = new Date(
          result.data.pub_time
        ).toLocaleDateString();
        localStorage.setItem("policyData", JSON.stringify(policyData));
        commit("getPolicyData", policyData);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    // 改变收藏状态
    changeFavourite({ commit }) {
      commit("changeFavourite");
    },
  },
};

export default dataManage;

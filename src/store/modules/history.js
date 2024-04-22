import historyApi from "@/api/historyApi";
import { sortDates } from "@/utils/sortDate.js";

const history = {
  namespaced: true,
  state: () => ({
    historyList: [],
  }),
  getters: {
    getHistoryWithShanghaiTime(state) {
      return state.historyList.map((item) => {});
    },
  },
  mutations: {
    getHistory(state, historyResult) {
      state.historyList = [];
      // 数据排序
      const newResult = sortDates(historyResult);
      const historyList = [{}];
      // 收集年月日
      const dateList = [];
      // 提取年月日
      for (let i = 0; i < newResult.length; i++) {
        dateList.push(new Date(newResult[i].time).toLocaleDateString());
      }
      const newDateList = Array.from(new Set(dateList));
      for (let i = 0; i < newDateList.length; i++) {
        const temp = {
          time: "",
          content: [],
          pids: [],
        };
        temp.time = newDateList[i];
        for (let j = 0; j < historyResult.length; j++) {
          if (
            new Date(historyResult[j].time).toLocaleDateString() == temp.time
          ) {
            temp.content.push(historyResult[j].policy_title);
            temp.pids.push(historyResult[j].pid);
          }
        }
        state.historyList.push(temp);
      }
    },
    deleteSingleHistory(state, pid) {
      for (let i = 0; i < state.historyList.length; i++) {
        for (let j = 0; j < state.historyList[i].pids.length; j++) {
          if (
            state.historyList[i].pids[j] == pid &&
            state.historyList[i].pids.length != 1
          ) {
            state.historyList[i].pids.splice(j, 1);
            state.historyList[i].content.splice(j, 1);
            break;
          } else if (
            state.historyList[i].pids[j] == pid &&
            state.historyList[i].pids.length == 1
          ) {
            state.historyList.splice(i, 1);
            break;
          }
        }
      }
    },
    // 退出登录刷新historyList
    clearHistoryList(state) {
      state.historyList = [];
    },
  },
  actions: {
    async getHistory({ commit }, id) {
      let result = await historyApi.getHistory(id);
      if (result.code === 200) {
        commit("getHistory", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async deleteSingleHistory({ commit }, params) {
      const uid = params.uid;
      const pid = params.pid;

      // let result = await historyApi.getHistory(uid);
      let result = await historyApi.deleteSingleHistory(uid, pid);
      if (result.code === 200) {
        commit("deleteSingleHistory", pid);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
      // commit("deleteSingleHistory",pid)
    },
  },
};

export default history;

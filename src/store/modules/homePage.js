import { getCurrentCityName } from "../../utils/getLocation";
import { reactive } from "vue";

const homePage = {
  namespaced: true,
  state: () => ({
    location: reactive({
      province: "",
      city: "",
    }),
  }),
  getters: {
    getFormattedLocation(state) {
      if (state.location.province === state.location.city)
        return state.location.province;
      else return state.location.province + "哈哈哈" + state.location.city;
    },
  },
  mutations: {
    // 获取定位
    setLocation(state, locationResult) {
      state.location.province = locationResult.province;
      state.location.city = locationResult.city;
    },
  },
  actions: {
    async getLocation({ commit }, geolocation) {
      let result = await getCurrentCityName(geolocation);
      commit("setLocation", result);
    },
  },
};

export default homePage;

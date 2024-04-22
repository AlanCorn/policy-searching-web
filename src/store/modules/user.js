import userApi from "@/api/userApi";
import { ElMessage } from "element-plus";

const user = {
  namespaced: true,
  state: () => ({
    // 登录及状态显示
    isLogin: JSON.parse(localStorage.getItem("isLogin")) || false,
    role: localStorage.getItem("role") || "user", //  user:普通用户   admin:管理员
    profile: {
      // 信息
      id: localStorage.getItem("id"), //用户id
      path: localStorage.getItem("path"),
    },
    state: localStorage.getItem("state"),
    name: localStorage.getItem("name"),
    // 个人中心
    userInfo: {
      name: "",
      sex: "",
      password: "",
      address: [],
      education: "",
      graduation: "",
      occupation: "",
      company: "",
      telephone: "",
      birthday: "",
    },
    // 管理员管理信息
    userList: [],
    // 检索记录
    searchRecord: [],
  }),
  getters: {
    getUserInfo(state) {
      return {
        profile: state.profile,
      };
    },
    getUserAvatar(state) {
      return "http://localhost:8080" + state.profile.path;
    },
    getUserRole(state) {
      return {
        role: state.role,
      };
    },
    getUserState(state) {
      return {
        state: state.state,
      };
    },
  },
  mutations: {
    // 登录
    login(state, loginResult) {
      state.isLogin = true;
      localStorage.setItem("isLogin", true);
      state.role = loginResult.role;
      state.profile.id = loginResult.id;
      state.state = loginResult.state;
      state.name = loginResult.name;
    },
    // 退出登录
    logout(state) {
      localStorage.clear();
      localStorage.setItem("isLogin", false);
      state.isLogin = false;
      state.role = "user";
      state.name = "";
      state.profile.path = "";
      state.profile.id = "";
    },
    // 获取用户个人信息
    getUserInfo(state, userInfo) {
      state.userInfo.name = userInfo.name;
      state.userInfo.sex = userInfo.sex;
      // let address = userInfo.address.split("省");
      // address[0] += "省";
      state.userInfo.address = (userInfo.address || "").split(",");
      state.userInfo.education = userInfo.education;
      state.userInfo.graduation = userInfo.graduation;
      state.userInfo.occupation = userInfo.occupation;
      state.userInfo.company = userInfo.company;
      state.userInfo.telephone = userInfo.telephone;
      state.userInfo.birthday = userInfo.birthday;
      state.userInfo.password = userInfo.password;
      state.profile.path = userInfo.photoload;
    },
    // 注册
    register(state, registerResult) {
      state.state = registerResult.state;
    },
    // 修改密码
    updatePwd(state, newPwd) {
      state.userInfo.password = newPwd;
    },
    // 管理员获取全部用户信息
    getUserList(state, getAllResult) {
      state.userList = getAllResult;
      for (let i = 0; i < getAllResult.users.length; i++) {
        state.userList.users[i].birthday = new Date(
          getAllResult.users[i].birthday
        ).toLocaleDateString();
      }
    },
    // 管理员删除用户
    /* deleteTheUser(state, id) {
      for (let i = 0; i < state.userList.users.length; i++) {
        if (state.userList.users[i].id == id) {
          state.userList.users.splice(i, 1);
        }
      }
    }, */
    // 管理员重置密码
    resetUserPwd(state, id) {
      for (let i = 0; i < state.userList.users.length; i++) {
        if (state.userList.users[i].id == id) {
          state.userList.users[i].password = 123456;
        }
      }
    },
    // 获取检索记录
    getSearchRecord(state, recordResult) {
      state.searchRecord = recordResult;
      for (let i = 0; i < recordResult.length; i++) {
        state.searchRecord[i].value = recordResult[i].searchword;
      }
    },
  },
  actions: {
    async login({ commit }, loginForm) {
      let result = await userApi.userLoginByPwd(loginForm);
      if (result.code === 200) {
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("id", result.data.id);
        localStorage.setItem("state", result.data.state);
        localStorage.setItem("name", result.data.name);
        commit("login", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    logout({ commit }) {
      commit("logout");
      commit("history/clearHistoryList", {}, { root: true });
      commit("favourite/clearFavouriteList", {}, { root: true });
    },
    async getUserInfo({ commit }, id) {
      let result = await userApi.getUserInfo(id);
      if (result.code === 200) {
        commit("getUserInfo", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    updateState(content) {
      content.commit("login");
      // @todo 登录过期异常处理
      if (content.state.sessionId !== "") {
        return new Promise((resolve, reject) => {
          userApi
            .queryUser()
            .then((res) => {
              if (res.data.code === 0) {
                content.state.user_name = res.data.user_info.user_name;
                content.state.user_id = res.data.user_info.user_id;
              } else if (res.data.code === 4) {
                content.commit("logout");
              } else if (res.data.code === 8) {
                content.commit("logout");
              }
              resolve(res);
            })
            .catch((err) => {
              console.log(err);
              reject(err);
            });
        });
      }
    },
    async register({ commit }, form) {
      let result = await userApi.userRegister(form);
      if (result.code === 200) {
        localStorage.setItem("state", result.data.state);
        commit("register", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async updatePwd({ commit }, { id, pwdForm }) {
      let result = await userApi.updatePwd(id, pwdForm.newPwd, pwdForm.oldPwd);
      if (result.code === 200) {
        commit("updatePwd", pwdForm.newPwd);
      } else if (result.code === 500) {
        return ElMessage.error(result.message);
      }
    },
    async getUserList({ commit }, form) {
      let result = await userApi.getUserList(form);
      if (result.code === 200) {
        console.log(result);
        commit("getUserList", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async deleteTheUser({ commit }, { id, current }) {
      let result = await userApi.deleteTheUser(id);
      let result2 = await userApi.getUserList(current);
      if (result.code === 200 && result2.code === 200) {
        commit("getUserList", result2.data);
        return ElMessage.success("用户删除成功");
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async resetUserPwd({ commit }, id) {
      let result = await userApi.resetUserPwd(id);
      if (result.code === 200) {
        commit("resetUserPwd", id);
        return ElMessage.success("密码重置成功");
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
    async getSearchRecord({ commit }, id) {
      let result = await userApi.getSearchRecord(id);
      if (result.code === 200) {
        commit("getSearchRecord", result.data);
      } else if (result.code === 500) {
        return Promise.reject(new Error(result.message));
      }
    },
  },
};

export default user;

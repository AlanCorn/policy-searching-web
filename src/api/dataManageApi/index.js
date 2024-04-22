import request from "@/api/request";
import baseURL from "@/api/urls.js";
import axios from "axios";
// 请求头
const headers = {
  "Content-Type": "application/json",
};

const dataManage = {
  // 获取全部政策数据
  getAllPolicies(current) {
    return request.get(
      "admin/getPolicy" +
        "?page=" +
        current.page +
        "&pagesize=" +
        current.pageSize,
      {
        headers,
      }
    );
  },
  // 获取政策总数
  getTotal() {
    return request.get("admin/getNumber", {
      headers,
    });
  },
  // 获取回收站数据
  getRecycleData(current) {
    return request.get(
      "admin/getRecycle" +
        "?page=" +
        current.page +
        "&pagesize=" +
        current.pageSize,
      {
        headers,
      }
    );
  },
  // 添加一条政策
  addPolicy(params) {
    return request.post("admin/addPolicy", params, {
      headers,
    });
  },
  // 删除一条政策
  deletePolicy(id) {
    const form = new FormData();
    form.append("policy_id", id);
    return request.post("admin/deletePolicy", form, {
      headers,
    });
  },
  // 恢复一条政策
  recoverPolicy(id) {
    const form = new FormData();
    form.append("pid", id);
    return request.post("admin/recoverPolicy", form, {
      headers,
    });
  },
  // 编辑一条政策
  updatePolicy(form) {
    return request.post("admin/editPolicy", form, {
      headers,
    });
  },
  // 通过id获取一条数据
  getPolicyDataById(policyId, uid) {
    return request.get("usr/getAPolicy" + "?pid=" + policyId + "&uid=" + uid, {
      headers,
    });
  },
  // 获取用户推荐
  getRecommendPolicy(uid) {
    return axios({
      method: "post",
      url: `${baseURL.flaskUrl}recommend/recommend_policy`,
      data: {
        user_id: uid,
      },
      headers,
    });
  },
  // 获取本地推荐
  getLocalPolicy(province, city) {
    return request.get(
      "/policy/local" + "?province=" + "浙江省" + "&city=" + "杭州市",
      {
        headers,
      }
    );
  },
  // 获取热门推荐
  getHotPolicy() {
    return request.get("/policy/rank", {
      headers,
    });
  },
  // 获取最新推荐
  getLatestPolicy() {
    return request.get("/policy/latest", {
      headers,
    });
  },
  // 猜你想搜
  queryGuessKeyword(keyword) {
    return axios({
      method: "post",
      url: `${baseURL.flaskUrl}tools/word_optimization`,
      data: {
        search_words: keyword,
      },
      headers,
    });
  },
  // 相关推荐
  queryRelatedPolicies(title) {
    return axios({
      method: "post",
      url: `${baseURL.flaskUrl}recommend/related_policy`,
      data: {
        policy_title: title,
      },
      headers,
    });
  },
};

export default dataManage;

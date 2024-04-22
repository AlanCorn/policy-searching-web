import request from "@/api/request";
import axios from "axios";
import baseURL from "@/api/urls.js";

// 请求头
const headers = {
  "Content-Type": "application/json",
};

const search = {
  // 政策
  searchPolicy(params) {
    return axios({
      method: "get",
      url: `${baseURL.flaskUrl}es/fuzzy_search`,
      params: params,
      headers,
    });
  },
  // 精确搜索政策
  accurateSearch(params) {
    return axios({
      method: "get",
      url: `${baseURL.flaskUrl}es/search`,
      params: params,
      headers,
    });
  },
  // 搜索建议
  searchSuggest(q) {
    return axios({
      method: "get",
      url: `${baseURL.flaskUrl}es/suggestions`,
      params: {
        q: q,
      },
      headers,
    });
  },
  // 保存搜索词（检索记录）
  saveSearchWord(uid, searchWord) {
    const form = new FormData();
    form.append("uid", parseInt(uid));
    form.append("searchWord", searchWord);
    return request.post("usr/addSearchWord", form, {
      headers,
    });
  },
  // 保存浏览记录
  saveSearchRecord(searchword, pid, uid, sid) {
    const form = new FormData();
    form.append("searchword", searchword);
    form.append("pid", pid);
    form.append("uid", uid);
    form.append("sid", sid);
    return request.post("usr/addScanWithSearchWord", form, {
      headers,
    });
  },
};

export default search;

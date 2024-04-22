import request from "@/api/request";

// 请求头
const headers = {
  "Content-Type": "application/json",
};

const history = {
  // 获取浏览记录
  getHistory(id) {
    const form = new FormData();
    form.append("id", id);
    return request.post("/usr/getBrsHistory", form, {
      headers,
    });
  },
  addHistory(id, pid) {
    const form = new FormData();
    form.append("uid", id);
    form.append("pid", pid);
    return request.post("/usr/addBrsHistory", form, {
      headers,
    });
  },
  // 删除单条记录
  deleteSingleHistory(uid, pid) {
    const form = { uid: uid, deletePid: [pid] };
    return request.post("/usr/deleteBrsHistory", JSON.stringify(form), {
      headers,
    });
  },
};

export default history;

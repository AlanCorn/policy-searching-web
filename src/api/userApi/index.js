import request from "@/api/request";
import { arrayToString } from "@/utils/updateType";

// 请求头
const headers = {
  "Content-Type": "application/json",
};

const user = {
  // 密码登录
  async userLoginByPwd(params) {
    const form = new FormData();
    form.append("telephone", params.telephone);
    form.append("password", params.password);
    return request.post("/login", form, {
      headers,
    });
  },
  // 验证码登录
  async userLoginByCode(params) {
    const form = new FormData();
    form.append("user_id", params.name);
    form.append("code", params.code);
    return request.post("/login", form, {
      headers,
    });
  },
  // 用户注册
  userRegister(params) {
    const form = new FormData();
    console.log("params", params);
    function formatDate(date) {
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份从0开始，所以需要加1，并确保两位数显示
      var day = ("0" + date.getDate()).slice(-2); // 同样确保日期两位数显示

      return year + "-" + month + "-" + day;
    }

    if (params.state == 1) {
      form.append("password", params.setPwd);
      form.append("name", params.username);
      form.append("birthday", formatDate(params.birth));
      form.append("address", params.location.join(""));
    } else if (params.state == 2) {
      form.append("sex", params.sex);
      form.append("education", params.education);
      form.append("graduation", params.graduation);
      form.append("occupation", params.occupation);
      form.append("company", params.company);
    } else if (params.state == 3) {
      form.append("hobby", arrayToString([...params.checked, ...params.createList]));
    } else if (params.state == 4) {
      form.append("phobby", arrayToString([...params.checked, ...params.createList]));
    }
    form.append("id", parseInt(params.id));
    form.append("state", parseInt(params.state));
    console.log(params);
    return request.post("/usr/register", form, {
      headers,
    });
  },
  // 获取用户信息
  getUserInfo(id) {
    const form = new FormData();
    form.append("id", id);
    return request.post("/usr/getInfo", form, { headers, });
  },
  // 用户更新信息
  userUpdateInfo(params, id) {
    const form = params;
    form.address = arrayToString(form.address);
    form.id = id;
    return request.post("/usr/updateInfo", form, {
      headers,
    });
  },
  // 用户修改密码
  userResetPwd(params) {
    const form = new FormData();
    form.append("user_id", params.user_id);
    // form.append("pwd_md5", md5(params.password).toUpperCase());
    return request.post("/update_user", form, {
      headers,
    });
  },
  // 获取兴趣爱好
  getUserHobby(id) {
    return request.get("/usr/getHobby" + "?id=" + id, {
      headers,
    });
  },
  // 修改兴趣爱好
  updateHobby(id, hobby, phobby) {
    const form = new FormData();
    form.append("id", id);
    form.append("hobby", arrayToString(hobby));
    form.append("phobby", arrayToString(phobby));
    return request.post("usr/updateHobby", form, {
      headers,
    });
  },
  // 修改密码
  updatePwd(id, newPwd, oldPwd) {
    const form = new FormData();
    form.append("id", id);
    form.append("password", newPwd);
    form.append("oldpswd", oldPwd);
    return request.post("usr/resetpswd", form, {
      headers,
    });
  },
  // 管理员获取用户信息
  getUserList(params) {
    const form = new FormData();
    form.append("page", params.page);
    form.append("pagesize", params.pageSize);
    return request.post("admin/getAll", form, {
      headers,
    });
  },
  // 管理员删除用户
  deleteTheUser(id) {
    const form = new FormData();
    form.append("id", id);
    return request.post("admin/deleteUser", form, {
      headers,
    });
  },
  // 管理员重置密码
  resetUserPwd(id) {
    const form = new FormData();
    form.append("id", id);
    return request.post("/admin/resetpswd", form, {
      headers,
    });
  },
  // 获取个人检索记录
  getSearchRecord(id) {
    const form = new FormData();
    form.append("uid", id);
    return request.post("/usr/getSchHistory", form, {
      headers,
    });
  }
};

export default user;

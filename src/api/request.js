import axios from "axios";
import baseUrl from "./urls";
// import { ElNotification } from "element-plus";

// 创建一个axios实例
const instance = axios.create({
  baseURL: baseUrl.testUrl,
  // baseURL: '/api',
  timeout: 60 * 1000,
  responseType: "json",
});

// 请求拦截器
/* instance.interceptors.request.use(
  (config) => {
    // 进行token验证
    let token = localStorage.getItem("token");
    // 如果在localStorage中没找到就去sessionStorage找
    if (!token) token = sessionStorage.getItem("token");
    if (token) {
      // console.log(token)
        config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    ElNotification({
      title: "Error",
      message: "This is an error message",
      type: "error",
    });
    return Promise.reject(error);
  }
); */

/* instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    // 后端返回的错误码 参见apifox文档 “返回code码”
    switch (response.data.code) {
      case 1:
        ElNotification({
          title: "用户不存在",
          type: "error",
        });
        break;
      case 2:
        ElNotification({
          title: "密码错误",
          type: "error",
        });
        break;
    }
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}); */
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log(err);
  }
);
// 2.2.响应拦截
instance.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);

// 导出
export default instance;

/**
 * axios二次封装
 1. 配置统一的请求基础路径: 开发环境与生产环境不同
 2. 配置请求超时时间
 3. 请求时, 通过请求头携带登陆用户的token
 4. 请求成功得到的不是response, 而是请求体response.data
 5. 对请求出错进行统一的提示处理, 具体请求可以选择处理或不处理
 6. 对请求操作失败进行统一提示处理, 具体请求可以选择处理或不处理
 */
import axios from "axios";
import md5 from "js-md5";
import sha1 from "js-sha1";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // 请求超时时间
  transformRequest: [
    function(data) {
      let ret = "";
      const ordered = {};
      data.timestamp = Date.parse(new Date()) / 1000;
      Object.keys(data)
        .sort()
        .forEach(function(key) {
          ordered[key] = data[key];
        });
      const res = urlEncode(ordered).substr(1);
      data.sign = md5(sha1(res) + "bxtech");
      for (let it in data) {
        ret +=
          encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      ret = ret.substring(0, ret.lastIndexOf("&"));
      return ret;
    },
  ],
});

var urlEncode = function(param, key, encode) {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += urlEncode(param[i], k, encode);
    }
  }
  return paramStr;
};

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers["Access-Token"] = getToken();
      // 让每个请求携带token--['X-Token']为自定义key
      config.headers["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log(response)
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 1001) {
        // to re-login
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message({
      message: error,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;

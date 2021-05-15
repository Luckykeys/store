import request from "@utils/request.js";

//封装一个发送登录请求的功能函数
export const login = (data) => {
  return request({
    method: "post",
    url: "/auth/login",
    data
  });
};
// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     data: { token }
//   })
// }
export const logout = (token) => {
  return request({
    url: "/auth/logout",
    method: "post",
    data: { token },
  });
}

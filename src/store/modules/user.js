import { login, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
  };
};
export default {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
  },
  mutations: {
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState());
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
  },
  actions: {
    async login(store, userInfo) {
      const { username, password } = userInfo;
      const result = await login({
        username: username.trim(),
        password: password,
      });
      const { data } = result;
      setToken(data.access_token); // 将token保存到cookie中
      store.commit("SET_TOKEN", data.access_token); // 将token保存到state中
    },
    // get user info
    // getInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     // getInfo(state.access_token).then(response => {
    //
    //         const { data } = response;
    //
    //         if (!data) {
    //           return reject("Verification failed, please Login again.");
    //         }
    //         const { name, avatar } = data;
    //         commit("SET_NAME", name);
    //         commit("SET_AVATAR", avatar);
    //         resolve(data);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   // });
    // },
    async logout({ commit, state }) {
      const result = await logout(state.token);
      if (result.code === 0) {
        removeToken(); // must remove  token  first
        resetRouter();
        commit("RESET_STATE");
      } else {
        console.log("登出失败");
      }
    },
    // 删除token重新设置token
    resetToken({ commit }) {
      return new Promise((resolve) => {
        removeToken(); // must remove  token  first
        commit("RESET_STATE");
        resolve();
      });
    },
  },
  getters: {},
};

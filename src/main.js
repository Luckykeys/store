import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
// 引入公共资源
import "./styles/reset.css";
import "element-ui/lib/theme-chalk/index.css";
import "./styles/iconfonts/iconfont.css";



Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API;

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  beforeCreate() {
    // 初始化全局事件总线对象
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

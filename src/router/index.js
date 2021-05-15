import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// Layout: 整体界面布局的根路由组件
import Layout from "@/views/Layout/index.vue";

/**
 * 常量路由的数组
 * 也就是任何角色用户都可以访问的所有路由的数组
 */
export const constantRoutes = [
  /* 首页根路由 */
  {
    path: "/",
    component: Layout,
    redirect: "/business",
    children: [
      {
        path: "business",
        name: "Business",
        component: () =>
          import(
            /* webpackChunkName: "business" */ "@/views/Business/index.vue"
          ),
      },
      /* 收银记账 */
      {
        path: "cashier",
        name: "Cashier",
        component: () =>
          import(/* webpackChunkName: "cashier" */ "@/views/Cashier/index.vue"),
      },
      /* 会员管理 */
      {
        path: "users",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "users" */ "@/views/Users/index.vue"),
      },
      /* 商品管理 */
      {
        path: "goods",
        name: "Goods",
        component: () =>
          import(/* webpackChunkName: "goods" */ "@/views/Goods/index.vue"),
      },
      /* 系统设置 */
      {
        path: "system",
        name: "System",
        component: () =>
          import(/* webpackChunkName: "system" */ "@/views/System/index.vue"),
      },
    ],
  },
  /* 登录 */
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/Login/index.vue"),
  },
  /* 收银记账*/
  // {
  //   path: "/cashier",
  //   component: Layout,
  //   redirect: "/cashier",
  //   children: [
  //     {
  //       path: "cashier",
  //       name: "Cashier",
  //       component: () => import(/* webpackChunkName: "main" */ "@/views/Cashier/index.vue"),
  //       meta: { title: "收银记账", icon: "dashboard" },
  //     },
  //   ],
  // },
  /* 404 */
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    hidden: true,
  },
];

/**
 * 异步路由的数组
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [];

/* 
必须最后才注册的路由
用于处理当请求路径没有一个匹配时, 自动跳转到404路由界面
*/
export const lastRoute = {
  path: "*",
  redirect: "/404",
  hidden: true,
};
/* 
用于创建只注册常量路由的路由器的函数
*/
const createRouter = () =>
  new VueRouter({
    // mode: 'hash', // 带#模式
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }), // 切换路由自动滑动到顶部
    routes: constantRoutes, // 默认只有常量路由, 其它权限路由后面动态添加
  });

// 生成只包含常量路由的路由器
const router = createRouter();

// 向外暴露重置路由器的matcher的函数
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  // 重新生成只包含常量路由的路由器
  const newRouter = createRouter();

  // 重置路由器的matcher(只包含常量路由)
  router.matcher = newRouter.matcher;
}

// 向外暴露路由器
export default router;

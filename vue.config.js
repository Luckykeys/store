const path = require("path");
module.exports = {
  // 改了配置，一定要重启才能生效
  devServer: {
    // port:8888,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://192.168.1.26/",
    //     changeOrigin: true, // 允许跨域
    //     pathRewrite: { // 重写路径
    //       "^/api": "",
    //     },
    //   },
    // },
  },
  // lintOnSave: false, // 关闭所有eslint检查
  // 当前配置会和vue的webpack合并
  configureWebpack: {
    resolve: {
      alias: {
        // 配置路径别名(可以简写路径)
        "@views": path.resolve(__dirname, "src/views"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@comps": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api"),
      },
    },
  },
  // css: {
  //   extract: false, //false表示开发环境,true表示生成环境
  //   sourceMap: false,
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [
  //         require("postcss-px-to-viewport")({
  //           unitToConvert: "px", // 需要转换的单位，默认为"px"
  //           viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
  //           viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
  //           unitPrecision: 3, // 单位转换后保留的精度
  //           propList: [
  //             // 能转化为vw的属性列表
  //             "*",
  //           ],
  //           viewportUnit: "vw", // 希望使用的视口单位
  //           fontViewportUnit: "vw", // 字体使用的视口单位
  //           selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  //           minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  //           mediaQuery: false, // 媒体查询里的单位是否需要转换单位
  //           replace: true, // 是否直接更换属性值，而不添加备用属性
  //           exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  //         }),
  //       ],
  //     },
  //   },
  // },
};

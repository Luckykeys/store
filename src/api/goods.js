import request from "@utils/request.js";

//获取商品分页列表
export const getGoodsList = (data) => {
  return request({
    method: "post",
    url: "/goods",
    data,
  });
};

//添加商品图片
// export const getGoodsPictures = (data) => {
//   return request({
//     method: "post",
//     url: "/goods-pictures/create",
//     data,
//   });
// };

//商品条码检测唯一存在
export const getGoodsExist = (data) => {
  return request({
    method: "post",
    url: "/goods/exist",
    data,
  });
};

//添加商品
export const getGoodsCreate = (data) => {
  return request({
    method: "post",
    url: "/goods/create",
    data,
  });
};

//获取商品详情
export const getGoodsDetail = (data) => {
  return request({
    method: "post",
    url: "/goods/view",
    data,
  });
};

//获取出入库单记录列表分页
export const getGoodsInOutList = (data) => {
  return request({
    method: "post",
    url: "/stock-inout-order",
    data,
  });
};

//获取商品分类列表
export const getGoodsCategoryList = (data) => {
  return request({
    method: "post",
    url: "/goods-category/list",
    data,
  });
};

//创建商品分类及子分类
export const getGoodsCategoryCreate = (data) => {
  return request({
    method: "post",
    url: "/goods-category/create",
    data,
  });
};

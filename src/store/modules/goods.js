import {
  getGoodsList,
  getGoodsInOutList,
  getGoodsCategoryList,
  getGoodsCategoryCreate,
} from "@api/goods";
import { Message } from "element-ui";
export default {
  state: {
    productDataList: [], //商品分页列表
    stockInOutDataList: [], //商品库存出入库列表
    goodsCategoryList: [], //所有分类(一级+二级)
    goodsCategoryListTwo:[],
    total: 0,
    totalStock: 0,
    // totalCate: 0,
  },
  actions: {
    /* 获取商品分页列表 */
    async getProductGoodsList(store, data) {
      const result = await getGoodsList(data);
      console.log(result);
      if (result.code === 0) {
        Message({ message: "商品分页成功", type: "success" });
        const productDataList = result.data;
        store.commit("GET_PRODUCT_GOODSLIST", productDataList);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 获取出入库单记录列表分页 */
    async getProductGoodsInOutList(store, data) {
      const result = await getGoodsInOutList(data);
      console.log(result);
      if (result.code === 0) {
        Message({ message: "出入库记录分页成功", type: "success" });
        const stockInOutDataList = result.data;
        store.commit("GET_PRODUCTGOODS_INOUTLIST", stockInOutDataList);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    //获取商品分类列表(所有分类，一级二级都有)
    async getProductGoodsCategoryList(store, data) {
      const result = await getGoodsCategoryList(data);
      console.log(result);
      if (result.code === 0) {
        Message({ message: "分类列表成功", type: "success" });
        const goodsCategoryList = result.data;
        store.commit("GET_PRODUCTGOODS_CATEGORYLIST", goodsCategoryList);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 创建商品分类及子分类 */
    async createGoodsCategory(store, data) {
      const result = await getGoodsCategoryCreate(data);
      if (result.code === 0) {
        Message({ message: "分类++成功", type: "success" });
        store.commit("CREATE_GOODS_CATEGORY", data);
      } else {
        this.$message.error(result.msg);
      }
    },

  },
  mutations: {
    GET_PRODUCT_GOODSLIST(state, productDataList) {
      state.productDataList = productDataList.items;
      state.total = productDataList.pages.totalCount;
    },
    GET_PRODUCTGOODS_INOUTLIST(state, stockInOutDataList) {
      state.stockInOutDataList = stockInOutDataList.items;
      state.totalStock = stockInOutDataList.pages.totalCount;
    },
    GET_PRODUCTGOODS_CATEGORYLIST(state, goodsCategoryList) {
      state.goodsCategoryList = goodsCategoryList;
    },
    CREATE_GOODS_CATEGORY(state, data) {
      state.goodsCategoryList = state.goodsCategoryList.push(data);
    },
    
  },
  getters: {},
};

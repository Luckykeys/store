<template>
  <div>
    <ProductDataList
      v-if="showProductDataList"
      :showAddNewGoods="showAddNewGoods"
      :showBatchOutIn="showBatchOutIn"
    ></ProductDataList>
    <div v-else>
      <AddGoods v-if="!showBatchOutInData" :backProductList="backProductList"></AddGoods>
      <BatchOutIn v-else></BatchOutIn>
    </div>
  </div>
</template>

<script>
import ProductDataList from "./productDataList";
import BatchOutIn from "./batchOutIn";
import AddGoods from "./addGoods";
export default {
  name: "GoodsStock",
  data() {
    return {
      showProductDataList: true, //代表的是商品库存页面
      showBatchOutInData: false,
    };
  },
  methods: {
    /* 展示新增商品页面 */
    showAddNewGoods() {
      this.showProductDataList = false;
      this.showBatchOutInData = false;
    },
    backProductList() {
      this.showProductDataList = true;
      this.showBatchOutInData = false;
    },
    showBatchOutIn() {
      this.showProductDataList = false;
      this.showBatchOutInData = true;
    },
  },
  components: {
    ProductDataList,
    BatchOutIn,
    AddGoods,
  },
};
</script>

<style lang="less" scoped></style>

<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商品库存" name="first">
        <GoodsStock></GoodsStock>
      </el-tab-pane>
      <el-tab-pane label="商品分类" name="second">
        <GoodsCategory></GoodsCategory>
      </el-tab-pane>
      <el-tab-pane label="出入库记录" name="third">
        <StockInout></StockInout>
      </el-tab-pane>
      <el-tab-pane label="商品盘点" name="fourth">商品盘点</el-tab-pane>
      <el-tab-pane label="供应商管理" name="five">供应商管理</el-tab-pane>
      <el-tab-pane label="调拨管理" name="six">调拨管理</el-tab-pane>
      <el-tab-pane label="商品设置" name="seven">商品设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GoodsStock from "./GoodsStock/index";
import GoodsCategory from "./GoodsCategory/index";
import StockInout from "./StockInout/index";

export default {
  name: "Goods",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    GoodsStock,
    GoodsCategory,
    StockInout,
  },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__item {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}
/deep/.el-tabs__item.is-active {
  background-color: #666;
  border-radius: 3px 3px 0 0;
  color: #eeeeee;
  border-bottom-color: none;
}
/deep/.el-tabs--card > .el-tabs__header {
  border-bottom: 1px solid #666;
}
</style>

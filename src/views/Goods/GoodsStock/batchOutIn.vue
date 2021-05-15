<template>
  <div>
    <el-tabs class="myAddTabs" v-model="activeName">
      <el-tab-pane label="批量出入库" name="first">
        <el-card>
          <el-form
            label-width="100px"
            :model="batchInOutForm"
            size="small"
            style="border:1px soild red;"
          >
            <el-form-item label="类型：">
              <el-radio-group v-model="batchInOutForm.resource">
                <el-radio label="商品入库"></el-radio>
                <el-radio label="商品出库"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品分类：">
              <el-select
                v-model="value"
                placeholder="全部小分类"
                size="small"
                style="margin: 0px 15px 0px 0px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select v-model="value" placeholder="全部" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品名称：">
              <el-autocomplete
                placeholder="商品名称、拼音、条码"
                prefix-icon="el-icon-search"
                v-model="batchInOutForm.name"
              >
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="商品售价：">
              <el-input v-model="batchInOutForm.resource" disabled></el-input>
            </el-form-item>
            <el-form-item label="当前库存：">
              <el-input v-model="batchInOutForm.resource" disabled></el-input>
            </el-form-item>
            <el-form-item label="入库数量：">
              <el-input v-model="batchInOutForm.resource"></el-input>
            </el-form-item>
            <el-form-item label="本次进价">
              <el-input placeholder="进价不变时无需填写" v-model="batchInOutForm.resource"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" style="width:230px">添加</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="批量出入库记录" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      batchInOutForm: {},
      value: "",
      options: [{}],
    };
  },
};
</script>

<style lang="less" scoped>
.myAddTabs {
  margin: 15px 0px;
  /deep/.el-tabs__item {
    height: 37px;
    line-height: 37px;
    font-size: 14px;
  }
  /deep/.el-tabs__item.is-active {
    background-color: #fff;
    color: #000;
    border-bottom-color: #a8dd18;
  }
  /deep/.el-tabs--card > .el-tabs__header {
    border-bottom: 1px solid #c8043a;
  }
  /deep/.el-input {
    width: 300px;
  }
}
</style>

<template>
  <div>
    <div class="stock-inout-top">
      <el-autocomplete
        size="small"
        style="margin: 0px 15px"
        placeholder="商品名称、拼音、条码"
        prefix-icon="el-icon-search"
        v-model="input2"
      >
      </el-autocomplete>
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
    </div>
    <el-table
      size="mini"
      border
      height="500"
      v-loading="listLoading"
      ref="stockInOutDataList"
      :data="stockInOutDataList"
      tooltip-effect="dark"
      :header-cell-style="{
        'background-color': '#ecf3fc',
        color: '#333',
        'font-weight': '400',
      }"
      style="width: 100%;margin-top : 20px"
    >
      <el-table-column prop="created_at" label="时间"> </el-table-column>

      <el-table-column prop="goods.goods_name" label="商品名称" width="185">
      </el-table-column>
      <el-table-column prop="goods_category_id" label="商品分类" width="200">
      </el-table-column>
      <el-table-column prop="goods_cost" label="入库进价" width="120">
      </el-table-column>
      <el-table-column
        prop="stock_inout_num*stock_inout_price"
        label="发生金额"
      >
      </el-table-column>
      <el-table-column prop="stock_inout_bnum" label="原始数量">
      </el-table-column>
      <el-table-column
        prop="stock_inout_num"
        label="变动数量	"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="stock_inout_anum" label="剩余数量">
      </el-table-column>
      <el-table-column prop="admin_id" label="操作人员"> </el-table-column>
      <el-table-column prop="stock_inout_order_no" label="业务单号">
      </el-table-column>
      <el-table-column prop="stock_inout_desc" label="备注"> </el-table-column>
      <el-table-column label="操作">
        <el-link type="success" size="mini">查看销售记录</el-link>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page"
      :total="totalStock"
      :page-size.sync="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      style="padding: 20px 0"
      layout="prev, pager, next,  total , sizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      listLoading: false,
      // stockInOutDataList: [],
      page: 1, //当前页码
      pageSize: 10, //每页条数
      //   totalStock: 0, // 总数量
      options: [],
      input2: "",
      input1: "",
      value: "",
    };
  },
  created(){
    this.getProductsListPage()
  },
  computed: {
    ...mapState({
      stockInOutDataList: (state) => state.goods.stockInOutDataList,
      totalStock: (state) => state.goods.totalStock,
    }),
  },
  methods: {
    ...mapActions(["getProductGoodsInOutList"]),
    //获取出入库单记录列表分页
    async getProductsListPage() {
      this.listLoading = true;
      const { page, pageSize } = this;
      const data = { page, pageSize };
      data.store_id = 1;
      await this.getProductGoodsInOutList(data);
      this.listLoading = false;
    },
    /* 分页器 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getProductsListPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getProductsListPage();
    },
  },
};
</script>

<style lang="less" scoped></style>

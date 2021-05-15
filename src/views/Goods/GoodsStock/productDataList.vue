<template>
  <div>
    <div class="goods-top">
      <el-button icon="el-icon-plus" class="addGoods" @click="showAddGoodsPage"
        >新增商品</el-button
      >
      <el-button type="primary" size="small" @click="batchInOut"
        >批量出入库</el-button
      >
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
      <el-select v-model="value" placeholder="智能搜索" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-link :underline="false" class="text">筛选</el-link>
      <el-link :underline="false" class="text">简报</el-link>
    </div>
    <el-row :gutter="15" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <span>本月过生日的会员</span>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">详情</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <span>计次卡7天内过期的会员</span>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">系统设置</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <span>今日新增会员</span>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">查看</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('shoppings')">
          <div class="card-panel-icon-wrapper icon-shopping">
            <span>今日会员消费总额 </span>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">更多</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-table
      size="mini"
      border
      height="500"
      v-loading="listLoading"
      ref="productDataList"
      :data="productDataList"
      tooltip-effect="dark"
      :header-cell-style="{
        'background-color': '#ecf3fc',
        color: '#333',
        'font-weight': '400',
      }"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="goods_name" label="商品名称" width="185" sortable>
        <template scope="scope">
          <div @click="getProductGoodsDetail(scope.row)">
            <span class="name">{{ scope.row.goods_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="goods_barcode"
        label="商品条码"
        width="480"
        sortable
      >
      </el-table-column>
      <el-table-column prop="goods_category_id" label="商品分类" width="120">
      </el-table-column>
      <el-table-column prop="goods_price" label="售价"> </el-table-column>
      <el-table-column prop="goods_specs" label="商品规格"> </el-table-column>
      <el-table-column
        prop="goods_stock"
        label="库存"
        align="center"
        width="100"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作">
        <el-link type="success" size="mini">出库</el-link>
        <el-link type="warning" size="mini">入库</el-link>
        <el-link type="warning" size="mini">出入库记录</el-link>
        <el-link type="warning" size="mini">分享</el-link>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page.sync="page"
      :total="total"
      :page-size.sync="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      style="padding: 20px 0"
      layout="prev, pager, next,  total , sizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <el-drawer
      title="商品详情"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <el-form :model="goodsDetailForm" label-width="100px" size="mini">
          <el-form-item label="商品图片：">
            <img :src="goodsDetailForm.goods_picture" alt="" />
          </el-form-item>
          <el-form-item label="商品名称：">
            <span>{{ goodsDetailForm.goods_name }}</span>
          </el-form-item>
          <el-form-item label="商品分类：">
            <span>{{ goodsDetailForm.goods_category_text }}</span>
          </el-form-item>
          <el-form-item label="商品售价：">
            <span>{{ goodsDetailForm.goods_specs_unit }}</span>
          </el-form-item>
          <el-form-item label="商品进价：">
            <span>{{ goodsDetailForm.goods_cost }}</span>
          </el-form-item>

          <el-form-item
            :label="`商品库存(${goodsDetailForm.goods_specs_unit})：`"
          >
            <span>{{ goodsDetailForm.goods_stock }}</span>
          </el-form-item>
          <el-form-item label="库存预警：">
            <span>{{ goodsDetailForm.goods_stock_warn }}</span>
          </el-form-item>
          <el-form-item label="商品条码：">
            <span>{{ goodsDetailForm.goods_barcode }}</span>
          </el-form-item>
          <el-form-item label="规格型号：">
            <span>{{ goodsDetailForm.goods_specs }}</span>
          </el-form-item>
          <el-form-item label="备注信息：">
            <span>{{ goodsDetailForm.goods_desc }}</span>
          </el-form-item>
          <el-form-item label="商品类型：">
            <span>{{ goodsDetailForm.goods_type }}</span>
          </el-form-item>
          <el-form-item label="进货时间：">
            <span>{{ goodsDetailForm.created_at_text }}</span>
          </el-form-item>
          <el-form-item label="积分规则：">
            <span>{{ goodsDetailForm.goods_category_text }}</span>
          </el-form-item>
          <el-form-item label="供应商：">
            <span>{{ goodsDetailForm.goods_category_text }}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getGoodsDetail } from "@api/goods";
export default {
  name: "ProductDataList",
  props: ["showAddNewGoods", "showBatchOutIn"],
  data() {
    return {
      listLoading: false,
      // productDataList: [],
      page: 1, //当前页码
      pageSize: 10, //每页条数
      // total: 0, // 总数量
      tableChecked: [], //被选中的记录数据-----对应“批量删除”传的参数值
      ids: [], //批量删除id
      input: "",
      input2: "",
      drawer: false,
      value: "",
      goodsDetailForm: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      productDataList: (state) => state.goods.productDataList,
      total: (state) => state.goods.total,
    }),
  },
  created() {
    this.getProductsListPage();
  },
  methods: {
    ...mapActions(["getProductGoodsList"]),

    //选中多选框
    handleSelectionChange(selection) {
      // console.log(selection);
      this.ids = [];
      selection.forEach((item) => {
        this.ids.push(item.id);
      });
    },
    //批量删除和单个删除
    batchInOut() {
      this.showBatchOutIn();
    },
    /* 点击新增按钮到新增按钮页面 */
    showAddGoodsPage() {
      this.showAddNewGoods();
      console.log("111");
    },
    /* 获取商品分页 */
    async getProductsListPage() {
      this.listLoading = true;
      const { page, pageSize } = this;
      const data = { page, pageSize };
      data.store_id = 1;
      await this.getProductGoodsList(data);
      this.listLoading = false;
    },
    // 点击单元格显示弹框获取会员详情
    async getProductGoodsDetail(val) {
      console.log(val, "PeopleId");
      this.drawer = true;
      // this.$set(this.memberInfo, "member_name", val.member_name);
      const { id, store_id } = val;
      const result = await getGoodsDetail({ id, store_id });
      if (result.code === 0) {
        this.$message.success("获取会员详情成功");
        this.goodsDetailForm = result.data;
      } else {
        this.$message.error(result.msg);
      }
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
    handleClose() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="less" scoped>
.goods-top {
  margin-bottom: 20px;
  display: flex;
  height: 32px;
  .el-button {
    font-size: 14px;
  }
  .el-button.addGoods {
    padding: 6px 15px;
    background-color: #ff6a3c;
    color: #fff;
    border-color: #ff6a3c;
  }
}
/deep/.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  line-height: 20px;
}
.panel-group {
  margin-top: 18px;
  display: none;
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

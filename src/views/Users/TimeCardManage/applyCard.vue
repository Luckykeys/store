<template>
  <!-- 会员办卡管理页面 -->
  <div class="applyContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>计次卡管理</span>
        <i
          class="el-icon-close"
          style="float: right; font-size: 20px; line-height: 40px"
          @click="backFoward"
        ></i>
      </div>
      <div class="card-manage">
        <el-button type="primary" class="add-card" @click="addCardTypeCreate"
          >添加卡类型</el-button
        >
        <el-button type="primary" @click="shipApplyCard">会员办卡</el-button>
        <el-autocomplete
          size="small"
          clearable
          style="margin:0 10px;"
          prefix-icon="el-icon-search"
          v-model="state"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          placeholder="搜索计次卡名称"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
            <span class="addr">{{ item.phone }}</span>
          </template>
        </el-autocomplete>
      </div>
      <el-table
        size="mini"
        border
        v-loading="listLoading"
        ref="timeTableData"
        :data="timeTableData"
        tooltip-effect="dark"
        :header-cell-style="{
          'background-color': '#f5f5f5',
          color: '#666',
          'font-weight': '400',
        }"
        style="width:100%"
      >
        <el-table-column
          prop="count_card_name"
          label="计次卡类型名称"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="goods_id" label="绑定服务" width="500">
        </el-table-column>
        <el-table-column prop="card" label="办卡会员数" width="100">
        </el-table-column>
        <el-table-column prop="count_card_valid_period" label="有效期">
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-link
              type="warning"
              size="mini"
              icon="el-icon-edit"
              :underline="false"
              style="margin-right:15px"
              @click="updateCountCard(scope.$index, scope.row)"
              >编辑</el-link
            >
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="deleteCountCard(scope.$index, scope.row)"
            >
              <el-link
                slot="reference"
                type="danger"
                size="mini"
                :underline="false"
                icon="el-icon-delete"
                >删除</el-link
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="page"
        :total="total"
        :page-size.sync="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        style="padding: 20px 0;float:right"
        layout="prev, pager, next,  total , sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
      <!-- 添加卡类型的弹框 -->
      <el-dialog
        :title="cardTypeForm.id ? '修改计次卡' : '添加计次卡'"
        :visible.sync="cardTypeVisible"
        width="23%"
      >
        <el-form ref="cardTypeForm" :model="cardTypeForm" label-width="80px">
          <el-form-item label="卡片类型">
            <el-radio-group v-model="cardTypeForm.count_card_type">
              <el-radio label="1">无限制计次卡</el-radio>
              <el-radio label="2">特定计次卡</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="卡片名称">
            <el-input
              v-model="cardTypeForm.count_card_name"
              autocomplete="off"
              class="card-name"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="绑定服务">
            <el-select
              v-model="cardTypeForm.goods_id"
              placeholder="请选择"
              size="small"
            >
              <el-option label="区域一" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效期至">
            <span>顾客开卡后</span
            ><el-input
              v-model="cardTypeForm.count_card_valid_period"
              autocomplete="off"
              class="card-number"
              size="mini"
            ></el-input
            ><span>个月</span>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              @click="submitTypeForm('cardTypeForm')"
              >完成</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="cardTypeVisible = false"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 会员办卡的弹框 -->
      <el-dialog title="会员办卡" :visible.sync="applyVisible">
        <el-form
          :model="memberApplyFrom"
          :rules="memberApplyRules"
          ref="memberApplyFrom"
          label-width="100px"
          class="demo-member-apply"
          size="mini"
          inline
        >
          <el-form-item label="选择会员" prop="member_id">
            <el-autocomplete
              clearable
              :fetch-suggestions="querySearch"
              v-model="memberApplyFrom.member_name"
              :trigger-on-focus="true"
              placeholder="搜索会员"
              @select="handleSelect"
              @clear="handleClear"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.phone }}</span>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item label="充值次数" prop="act_num">
            <el-input
              v-model="memberApplyFrom.act_num"
              autocomplete="off"
              class="card-name"
            ></el-input>
          </el-form-item>
          <el-form-item label="计次卡类型" prop="count_card_id">
            <el-select
              v-model="memberApplyFrom.count_card_id"
              placeholder="请选择"
            >
              <el-option
                v-for="card in timeTableData"
                :key="card.id"
                :label="card.count_card_name"
                :value="card.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收款金额" prop="act_money">
            <el-input
              v-model="memberApplyFrom.act_money"
              autocomplete="off"
              class="card-name"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效期至" prop="count_card_expire">
            <el-date-picker
              v-model="memberApplyFrom.count_card_expire"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收款方式" prop="act_mode_id">
            <el-select
              v-model="memberApplyFrom.act_mode_id"
              placeholder="请选择"
            >
              <el-option label="现金" value="1"></el-option>
              <el-option label="微信" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作人员" prop="region">
            <el-select v-model="memberApplyFrom.region" placeholder="请选择">
              <el-option label="管理人员" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息" prop="remarks">
            <el-input
              v-model="memberApplyFrom.remarks"
              autocomplete="off"
              class="card-name"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div>
            <el-checkbox v-model="checked">打印小票</el-checkbox>
            <el-checkbox v-model="checked">发送短信账单</el-checkbox>
          </div>
          <div>
            <el-button type="success" size="mini" @click="applyVisible = false"
              >取消</el-button
            >
            <el-button type="warning" size="mini" @click="submitMemeberCardForm"
              >完成</el-button
            >
          </div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ApplyCard",
  props: ["backTimeCardList"],
  timeTableData: [],
  listLoading: false,
  data() {
    var validateId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择一个会员"));
      } else {
        callback();
      }
    };
    return {
      state: "",
      value1: "",
      page: 1, //当前页码
      pageSize: 10, //每页条数
      total: 0,
      checked: false,
      listLoading: false,
      // timeTableData: [],
      radio: "1",
      cardTypeVisible: false, //添加卡种类
      applyVisible: false, //会员办卡
      cardTypeForm: {},
      memberApplyFrom: {},
      restaurants: [], //搜索框搜索会员名称的时候下面的数据
      memberApplyRules: {
        member_id: [{ required: true, validator: validateId, change: "blur" }],
        count_card_id: [
          { required: true, message: "请选择一个计次卡", trigger: "blur" },
        ],
        count_card_expire: [
          { required: true, message: "请选择一个时间", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      memberTableData: (state) => state.member.memberTableData,
      timeTableData: (state) => state.timecard.timeTableData,
    }),
  },
  created() {
    this.getAllCountCardsList(); //获取所有计次卡
  },
  methods: {
    ...mapActions([
      "getAllCards",
      "getCountCardsAdd",
      "getCountCardsUpdate",
      "getHandletMemberCards",
      "getHandleDelCard",
    ]),
    backFoward() {
      this.backTimeCardList();
    },
    /* 获取所有计次卡 */
    async getAllCountCardsList() {
      await this.getAllCards({ store_id: 1 });
    },
    /* 添加卡类型弹框显示 */
    addCardTypeCreate() {
      this.cardTypeVisible = true;
      this.cardTypeForm = {};
    },
    /* 修改计次卡 */
    async updateCountCard(index, row) {
      console.log(index, row);
      this.cardTypeVisible = true;
      this.cardTypeForm = JSON.parse(JSON.stringify(row));
    },
    /* 删除计次卡 */
    async deleteCountCard(index, row) {
      console.log(index, row);
      const id = row.id;
      await this.getHandleDelCard({
        id,
        store_id: 1,
      });
    },
    /* 添加计次卡或者修改计次卡 */
    submitTypeForm() {
      this.$refs.cardTypeForm.validate(async (valid) => {
        if (valid) {
          const data = this.cardTypeForm;
          data.store_id = 1;
          await this[data.id ? "getCountCardsUpdate" : "getCountCardsAdd"](
            data
          );
          this.getAllCountCardsList();
          this.cardTypeVisible = false;
        }
      });
    },

    //搜索框 queryString输入的文字
    querySearch(queryString, cb) {
      this.restaurants = this.memberTableData.map((item) => {
        return {
          value: item.member_name,
          phone: item.member_phone,
          member_id: item.id,
        };
      });
      console.log(this.restaurants);
      var tableData = this.restaurants;
      var results = queryString
        ? tableData.filter(this.createFilter(queryString))
        : tableData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    async handleSelect(item) {
      // console.log(item);
      this.memberApplyFrom.member_id = item.member_id;
      this.memberApplyFrom.member_name = item.value;
    },
    handleClear() {
      this.state = "";
    },
    /* 显示会员办卡弹框 */
    shipApplyCard() {
      this.applyVisible = true;
      this.memberApplyFrom = {};
    },
    /* 会员办卡 */
    async submitMemeberCardForm() {
      const data = this.memberApplyFrom;
      data.store_id = 1;
      await this.getHandletMemberCards(data);
      this.applyVisible = false;
    },
    /* 分页器 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getAllCountCardsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getAllCountCardsList();
    },
  },
};
</script>

<style lang="less">
/* element ui 修改样式 */
.el-table td div {
  display: flex;
  .name {
    margin-left: 15px;
  }
}
.el-autocomplete-suggestion li {
  display: flex !important;
  font-size: 12px;
  justify-content: space-between;
  padding: 0 10px;
  line-height: 20px;
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90px;
  }
}
.el-form--inline .el-form-item {
  margin-right: 0;
  width: 390px;
}
</style>
<style lang="less" scoped>
.applyContainer {
  width: 100%;
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    /deep/.el-card__header {
      padding: 0px 20px;
      line-height: 40px;
    }
    .card-manage {
      margin-bottom: 20px;
      height: 32px;
      .el-button {
        padding: 8px 15px;
        border-radius: 2px;
      }
      .add-card {
        padding: 8px 15px;
        background-color: #ff6a3c;
        color: #fff;
        border-color: #ff6a3c;
      }
      /deep/.el-input__inner {
        width: 175px;
      }
    }
    /deep/.el-table__header-wrapper {
      border-bottom: 2px solid #c8ddf6;
      width: 100%;
      box-sizing: border-box;
      border-color: #e8e8e8;
    }
    /deep/.el-table__empty-text {
      width: 100%;
      height: 400px;
      line-height: 400px;
      border-bottom: 2px soild #ddd;
    }
  }
  .el-input.card-name {
    width: 200px;
  }
  .el-input.card-number {
    width: 50px;
    margin: 0px 10px;
  }
  /deep/.el-dialog__body {
    font-size: 12px;
    padding: 15px 40px;
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 80px;
  }
}
</style>

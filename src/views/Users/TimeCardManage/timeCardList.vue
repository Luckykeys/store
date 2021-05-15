<template>
  <div>
    <div class="cards-top">
      <el-button type="primary" @click="memberApplyCard">卡类型管理</el-button>
      <el-button @click="memberApplyCard" class="apply-card"
        >会员办卡</el-button
      >
      <el-autocomplete
        size="small"
        clearable
        style="margin:0px 10px"
        prefix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        v-model="state"
        :trigger-on-focus="true"
        placeholder="卡号、手机号、姓名"
        @select="handleSelect"
        @clear="handleClear"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.phone }}</span>
        </template>
      </el-autocomplete>
      <el-select
        v-model="value"
        placeholder="全部计次卡"
        size="small"
        style="margin-right:10px"
      >
        <el-option
          v-for="count in timeTableData"
          :key="count.id"
          :label="count.count_card_name"
          :value="count.id"
        >
        </el-option>
      </el-select>
      <el-select v-model="value1" placeholder="所有状态" size="small">
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
      size="small"
      border
      v-loading="listLoading"
      ref="memberCardTableData"
      :data="memberCardTableData"
      tooltip-effect="dark"
      :header-cell-style="{
        'background-color': '#ecf3fc',
        color: '#333',
        'font-weight': '400',
      }"
      style="width: 100%"
    >
      <el-table-column prop="member.member_name" label="会员名称" width="380">
      </el-table-column>
      <el-table-column
        prop="countCard.count_card_name"
        label="计次卡名"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="serviceItem.goods_name"
        label="服务项目"
        width="280"
      >
      </el-table-column>
      <el-table-column prop="count_card_num" label="剩余次数" width="80">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="开卡日期"
        width="95"
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="count_card_expire"
        label="到期时间"
        width="95"
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="80"
        :formatter="statusFormatter"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            size="mini"
            @click="updateCard(scope.$index, scope.row)"
            :underline="false"
            style="margin:0 10px"
            >编辑</el-link
          >|
          <el-link
            type="primary"
            size="mini"
            @click="recharge(scope.row)"
            :underline="false"
            style="margin:0 10px"
            >充值</el-link
          >|
          <el-link
            type="primary"
            size="mini"
            :underline="false"
            style="margin:0 10px"
            >计次明细</el-link
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      :current-page.sync="page"
      :total="total"
      :page-size.sync="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      style="padding: 20px 0; float: right"
      layout="prev, pager, next,  total , sizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- 修改计次卡的弹框 -->
    <el-dialog title="修改计次卡" :visible.sync="updateCardVisible" width="20%">
      <el-form
        :model="updateCardForm"
        ref="updateCardForm"
        label-width="100px"
        size="mini"
      >
        <el-form-item label="卡片名称：">
          <el-select
            v-model="updateCardForm.count_card_name"
            placeholder="请选择"
          >
            <el-option
              v-for="item in timeTableData"
              :key="item.id"
              :label="item.count_card_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间：">
          <el-date-picker
            v-model="updateCardForm.count_card_expire"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <p class="update-tipe">需要修改卡名，请移步到会员配置</p>
        <el-form-item>
          <el-button type="success" @click="submitTimeCard('updateCardForm')"
            >确实</el-button
          >
          <el-button @click="updateCardVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 会员充值的弹框 -->
    <el-dialog title="计次充值" :visible.sync="rechargeVisible" width="25%">
      <p class="tipe">提示：使用计次收款方式,根据商品数量扣减次数。</p>
      <el-form
        :model="rechargeForm"
        ref="rechargeForm"
        label-width="150px"
        size="mini"
      >
        <el-form-item label="充值次数：">
          <el-input
            v-model="rechargeForm.act_num"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="收款方式：">
          <el-select
            v-model="rechargeForm.act_mode_id"
            placeholder="请选择活动区域"
          >
            <el-option label="现金" value="1"></el-option>
            <el-option label="微信" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前剩余次数：">
          <span>{{ rechargeForm.count_card_num }}</span>
        </el-form-item>
        <el-form-item label="实收金额：">
          <el-input
            v-model="rechargeForm.act_money"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="业务员：">
          <!-- <el-input
            v-model="rechargeForm.act_num"
            autocomplete="off"
          ></el-input> -->
        </el-form-item>
        <el-form-item label="备注信息：">
          <el-input
            v-model="rechargeForm.remarks"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div style="width:300px;margin:15px auto;">
          <el-checkbox label="发送充次提醒短信" name="type"></el-checkbox>
          <el-checkbox label="打印储值小票" name="type"></el-checkbox>
        </div>
        <el-form-item>
          <el-button type="success" @click="submitForm('rechargeForm')"
            >确实</el-button
          >
          <el-button @click="rechargeVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { mapState, mapActions } from "vuex";
import { getMemberSearch } from "@api/member";
import { getMemberCardReCharge } from "@api/timecard";
export default {
  name: "TimeCardList",
  props: ["showApplyCard"],
  data() {
    return {
      // memberCardTableData: [],
      listLoading: false,
      state: "",
      page: 1, //当前页码
      pageSize: 10, //每页条数
      // total: 0, // 总数量
      updateCardVisible: false,
      rechargeVisible: false,
      updateCardForm: {},
      rechargeForm: {},
      restaurants: [],
      value1: "",
      options: [
        {
          value: "1",
          label: "正常",
        },
        {
          value: "2",
          label: "过期",
        },
        {
          value: "3",
          label: "删除",
        },
      ],
      value: "",
    };
  },
  created() {
    this.getTimeCardList();
    this.getAllCountCardsList();
  },
  computed: {
    ...mapState({
      memberCardTableData: (state) => state.timecard.memberCardTableData,
      timeTableData: (state) => state.timecard.timeTableData,
      total: (state) => state.timecard.total,
    }),
  },
  methods: {
    ...mapActions(["getMemberCardsList", "getAllCards", "getCountCardsUpdate"]),
    /* 时间格式化 */
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date * 1000).format("YYYY-MM-DD");
    },
    /* 状态格式化 */
    statusFormatter: function(row) {
      switch (row.status) {
        case 1:
          return "正常";
        case 2:
          return "过期";
        case 3:
          return "删除";
      }
    },
    /* 点击进入添加计次卡页面 */
    memberApplyCard() {
      this.showApplyCard();
    },
    /* 获取所有计次卡 */
    async getAllCountCardsList() {
      await this.getAllCards({ store_id: 1 });
    },
    /* 获取会员的办卡分页 */
    async getTimeCardList() {
      this.listLoading = true;
      const { page, pageSize } = this;
      let data = { page, pageSize };
      data.sort = "-id";
      data.store_id = 1;
      await this.getMemberCardsList(data);
      this.listLoading = false;
    },
    /* 显示编辑计次卡弹框 */
    updateCard(index, row) {
      console.log(index, row);
      this.updateCardVisible = true;
      this.updateCardForm.id = row.id;
      this.updateCardForm.count_card_name = row.countCard.count_card_name;
      this.updateCardForm.count_card_valid_period = row.count_card_expire;
    },
    /* 修改计次卡 */
    submitTimeCard() {
      this.$refs.updateCardForm.validate(async (valid) => {
        if (valid) {
          console.log("111");
          const data = this.updateCardForm;
          data.store_id = 1;
          // await this.getCountCardsUpdate(data);
          // this.updateCardVisible = false;
          // this.getTimeCardList();
        }
      });
    },
    /* 显示会员充值弹框 */
    recharge(row) {
      this.rechargeVisible = true;
      console.log(row);
      this.rechargeForm.count_card_num = row.count_card_num;
      this.rechargeForm.id = row.id;
    },
    /* 充值计次卡 */
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // const member_count_card_id = this.rechargeForm.id;
          const data = this.rechargeForm;
          console.log(data);
          data.member_count_card_id = this.rechargeForm.id;
          data.store_id = 1;
          const result = await getMemberCardReCharge(data);
          console.log(result);
          if (result.code === 0) {
            this.$message.success("充值成功");
            this.rechargeForm.count_card_num =
              this.rechargeForm.count_card_num + this.rechargeForm.act_num;
            this.rechargeVisible = false;
            this.getTimeCardList();
          } else {
            this.$message.error(result.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //搜索框
    querySearch(queryString, cb) {
      this.restaurants = this.memberCardTableData.map((item) => {
        return {
          value: item.member.member_name,
          phone: item.member.member_phone,
          id: item.member.id,
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
      const keyword = item.value;
      console.log(keyword);
      const result = await getMemberSearch({
        store_id: 1,
        keyword,
      });
      console.log(result);
      // // this.memberTableData = result.data;
      // this.$store.commit("EIDT_MEMBERCARD_TABLEDATA", result.data);
    },
    handleClear() {
      this.getTimeCardList();
    },
    /* 分页器 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTimeCardList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getTimeCardList();
    },
  },
};
</script>

<style lang="less" scoped>
.cards-top {
  margin-bottom: 20px;
  display: flex;
  height: 32px;
  line-height: 32px;
  .el-button {
    padding: 6px 15px;
  }
  .apply-card {
    padding: 6px 15px;
    background-color: #ff6a3c;
    color: #fff;
    border-color: #ff6a3c;
  }
  /deep/.el-input__inner {
    width: 180px;
  }
}
/deep/.el-table__header-wrapper {
  border-bottom: 2px solid #c8ddf6;
  width: 100%;
  box-sizing: border-box;
}
/deep/.el-table__empty-text {
  width: 100%;
  height: 400px;
  line-height: 400px;
  border-bottom: 2px soild #ddd;
}
/deep/.el-dialog__title {
  font-size: 15px;
  font-weight: bold;
}
/deep/.el-dialog__header {
  padding: 15px 15px 10px;
}
/deep/.el-dialog__body {
  border-top: 1px solid #ccc;
  padding: 5px 15px;
}
/deep/.el-input--mini .el-input__inner {
  width: 200px;
}
.el-dialog {
  .tipe {
    color: #c09853;
    text-shadow: 0 1px 0 rgb(255 255 255 / 50%);
    border: 1px solid #fbeed5;
    margin-bottom: 10px;
    background-color: #fcf8e3;
    padding: 8px 14px;
    font-size: 12px;
  }
  .el-button {
    padding: 8px 25px;
    font-size: 14px;
  }
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-top: 15px;
}
.update-tipe {
  color: #c09853;
  text-shadow: 0 1px 0 rgb(255 255 255 / 50%);
  background-color: #fcf8e3;
  border: 1px solid #fbeed5;
  padding: 8px 14px;
  font-size: 12px;
  width: 250px;
  margin: 0px auto;
}
</style>

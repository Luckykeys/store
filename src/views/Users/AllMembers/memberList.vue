<template>
  <!-- 会员列表页面 -->
  <div>
    <div class="users-top">
      <el-button icon="el-icon-plus" @click="addMembers">新增会员</el-button>
      <el-autocomplete
        size="small"
        clearable
        prefix-icon="el-icon-search"
        popper-class="my-autocomplete"
        v-model="state"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="卡号、手机号、姓名"
        @select="handleSelect"
        @clear="handleClear"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.phone }}</span>
        </template>
      </el-autocomplete>
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
      ref="memberTableData"
      :data="memberTableData"
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
      <el-table-column prop="member_card" label="卡号" width="185" sortable>
      </el-table-column>
      <el-table-column prop="member_name" label="会员名称" width="480" sortable>
        <template scope="scope">
          <div @click="rePeoplemessageCard(scope.row)" class="member-name">
            <div class="block">
              <el-avatar
                shape="square"
                size="small"
                src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
              ></el-avatar>
            </div>
            <!-- <img
              :src="scope.row.member_thumbs"
              style="width: 28px; height:28px;"
            /> -->
            <span class="name">{{ scope.row.member_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="tag.tag_name"
        label="标签"
        width="350"
        @cell-mouse-enter.native="enter"
      >
        <template slot-scope="scope">
          <span
            v-for="(col, index) in scope.row.tag"
            :key="index"
            :style="{ 'background-color': col.color }"
            v-show="colorRound"
            class="tag-round"
          ></span>
          <el-tag
            :disable-transitions="false"
            @mouseleave.native="colorRound = true"
            v-show="!colorRound"
            closable
            size="small"
            :style="{ 'background-color': item.color }"
            v-for="(item, index) in scope.row.tag"
            :key="item.id"
            @close="handleClose(scope.row, scope.row.tag, index)"
            >{{ item.tag_name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="member_phone" label="电话号码" width="120">
      </el-table-column>
      <el-table-column prop="group.group_name" label="分组"> </el-table-column>
      <el-table-column
        prop="member_account"
        label="储值余额"
        align="center"
        width="100"
        sortable
      >
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="success" size="mini">记账</el-button>
        <el-button type="warning" size="mini">QQ</el-button>
      </el-table-column>
    </el-table>
    <div
      style="margin-top: 20px; display: flex; justify-content: space-between"
      v-show="memberTableData.length"
    >
      <div>
        <el-dropdown @command="batchSetGroup">
          <el-button class="el-dropdown-link" size="mini" type="primary">
            移动到分组<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="item.id"
              v-for="item in memberGroup"
              :key="item.id"
              >{{ item.group_name }}</el-dropdown-item
            >
            <el-dropdown-item @click.native="addNewChangeGroup"
              >新增分组</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="batchSetTag">
          <el-button class="el-dropdown-link" size="mini" type="primary">
            打标签<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :command="item.id"
              v-for="item in memberTag"
              :key="item.id"
              >{{ item.tag_name }}</el-dropdown-item
            >
            <el-dropdown-item @click.native="dialogNewTag = true"
              >新增标签</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" size="mini">发短信</el-button>
        <el-button type="primary" size="mini">发优惠券</el-button>
        <el-button type="primary" size="mini" @click="batchIntegralToZero">积分清零</el-button>
        <el-button type="danger" size="mini" @click="batchDelete"
          >删除</el-button
        >
      </div>
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
    </div>
    <!-- 会员详情的弹框 -->
    <el-dialog
      :title="`${memberInfo.member_name}的详细信息`"
      :visible.sync="dialogMemberInfo"
    >
      <el-button type="success" style="margin-bottom: 10px" size="mini"
        >快速销售</el-button
      >
      <MemberInfo :memberInfo="memberInfo"></MemberInfo>
    </el-dialog>
    <!-- 新增会员标签的弹框 -->
    <el-dialog title="新增会员标签" :visible.sync="dialogNewTag" width="20%">
      <el-form ref="tagForm" :model="tagForm" label-width="50px">
        <el-form-item label="标签">
          <el-input v-model="tagForm.tag_name"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker v-model="tagForm.color"></el-color-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogNewTag = false">取 消</el-button>
        <el-button type="primary" @click="addNewChangeTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MemberInfo from "./memberInfo";
import {
  getMemberInfo,
  delMembers,
  batchGroup,
  batchTag,
  batchIntegral,
  getTableTagDel,
  getMemberSearch,
} from "@api/member";
export default {
  name: "MemberList",
  props: ["showAddNewMember"],
  data() {
    return {
      listLoading: false,
      colorRound: true, //标签是否显示圆点
      activeName: "first",
      dialogMemberInfo: false, //显示详情数据弹框
      dialogNewTag: false, //显示新增会员标签弹框
      // memberTableData: [], //会员分页数据(table表格) 移到vuex中
      memberInfo: {}, //会员详情数据(dialog弹框信息)
      tableChecked: [], //被选中的记录数据-----对应“批量删除”传的参数值
      ids: [], //批量删除id
      searchText: "",
      page: 1, //当前页码
      pageSize: 10, //每页条数
      // total: 0, // 总数量
      tagForm: {
        color: "#FF7300",
      },
      restaurants: [], //搜索框搜索的时候下面的数据
      state: "",
    };
  },
  computed: {
    ...mapState({
      memberAppell: (state) => state.member.memberAppell,
      memberGroup: (state) => state.member.memberGroup,
      memberTag: (state) => state.member.memberTag,
      memberTableData: (state) => state.member.memberTableData,
      total: (state) => state.member.total,
    }),
  },
  created() {
    this.getMemberListPage(); /* 获取会员分页 */
    this.getAllNewMemberGroup(); /* 获取会员所有分组 */
    this.getAllNewMemberTag(); /* 获取所有会员标签 */
    this.$bus.$on("getMemberListPage", { store_id: 1 });
  },
  methods: {
    ...mapActions([
      "getAllMembersList",
      "getAllMemberAppell",
      "getAllMemberGroup",
      "getAllMemberTag",
      "createNewMemberAppell",
      "createNewMemberGroup",
      "createNewMemberTag",
    ]),
    //获取会员分页
    async getMemberListPage() {
      this.listLoading = true;
      const { page, pageSize } = this;
      const data = { page, pageSize };
      data.store_id = 1;
      await this.getAllMembersList(data);
      this.listLoading = false;
    },
    //搜索框
    querySearch(queryString, cb) {
      this.restaurants = this.memberTableData.map((item) => {
        return {
          value: item.member_name,
          phone: item.member_phone,
          id: item.id,
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
      const keyword = item.value;
      const result = await getMemberSearch({
        store_id: 1,
        keyword,
      });
      // this.memberTableData = result.data;
      this.$store.commit("EIDT_MEMBERTABLE_DATA", result.data);
    },
    handleClear() {
      this.getMemberListPage();
    },
    // 点击单元格显示弹框获取会员详情
    async rePeoplemessageCard(val) {
      console.log(val, "PeopleId");
      this.dialogMemberInfo = true;
      this.$set(this.memberInfo, "member_name", val.member_name);
      const { id, store_id } = val;
      const result = await getMemberInfo({ id, store_id });
      if (result.code === 0) {
        // this.$message.success("获取会员详情成功");
        this.memberInfo = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    //选中多选框
    handleSelectionChange(selection) {
      // console.log(selection);
      this.ids = [];
      selection.forEach((item) => {
        this.ids.push(item.id);
      });
    },
    //批量删除和单个删除
    batchDelete() {
      if (this.ids.length) {
        this.$confirm(
          `被删除的会员,储值、积分永久清除!该会员以往的消费记录将变为普通销售。您确认删除选中的${this.ids.length}个会员`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => {
            const resids = JSON.stringify(this.ids);
            const result = await delMembers({
              store_id: 1,
              ids: resids,
            });
            if (result.code === 0) {
              this.$message.success("删除成功");
              this.getMemberListPage();
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先勾选会员",
          type: "warning",
        });
      }
    },
    //批量移动会员分组
    async batchSetGroup(command) {
      // console.log(command);
      if (this.ids.length) {
        const resids = JSON.stringify(this.ids);
        const group_id = command;
        const result = await batchGroup({
          store_id: 1,
          group_id,
          ids: resids,
        });
        if (result.code === 0) {
          this.$message.success("移动会员成功");
          this.getMemberListPage();
        } else {
          this.$message.error(result.msg);
        }
      } else {
        this.$message({
          message: "请先勾选会员",
          type: "warning",
        });
      }
    },
    //批量打标签
    async batchSetTag(command) {
      console.log(command);
      if (this.ids.length) {
        const resids = JSON.stringify(this.ids);
        const tag_id = command;
        const result = await batchTag({
          store_id: 1,
          tag_id,
          ids: resids,
        });
        if (result.code === 0) {
          this.$message.success("打标签成功");
          this.getMemberListPage();
        } else {
          this.$message.error(result.msg);
        }
      } else {
        this.$message({
          message: "请先勾选会员",
          type: "warning",
        });
      }
    },
    //批量积分清零
    async batchIntegralToZero() {
      if (this.ids.length) {
        this.$confirm(
          `确定清零可用积分？ 您选择的${this.ids.length}位会员，可用积分将全部清空为0。 清除会员累计积分，并调整等级为普通会员`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => {
            const resids = JSON.stringify(this.ids);
            const result = await batchIntegral({
              store_id: 1,
              ids: resids,
            });
            if (result.code === 0) {
              this.$message.success("清零成功");
              this.getMemberListPage();
            } else {
              this.$message.error(result.msg);
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "请先勾选会员",
          type: "warning",
        });
      }
    },
    /* 新增会员回调函数 */
    addMembers() {
      this.showAddNewMember();
    },
    /* 获取会员所有分组 */
    async getAllNewMemberGroup() {
      await this.getAllMemberGroup({ store_id: 1 });
    },
    /* 获取所有会员标签 */
    async getAllNewMemberTag() {
      await this.getAllMemberTag({ store_id: 1 });
    },
    /* 点击新增会员分组 */
    addNewChangeGroup() {
      this.$prompt("请输入会员分组", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          // console.log(value);
          const group_name = value;
          await this.createNewMemberGroup({
            store_id: 1,
            group_name: group_name,
          });
          this.getAllNewMemberGroup();
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消输入" });
        });
    },
    /* 点击新增会员标签 */
    async addNewChangeTag() {
      this.dialogNewTag = true;
      const { tag_name, color } = this.tagForm;
      await this.createNewMemberTag({ tag_name, color, store_id: 1 });
      this.dialogNewTag = false;
      this.getAllNewMemberTag();
      this.getMemberListPage();
    },
    /* 分页器 */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getMemberListPage();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getMemberListPage();
    },
    /* 删除table表格会员标签 */
    async handleClose(row, selected, index) {
      const { store_id, id } = row;
      selected = selected.splice(index, 1);
      let tag_id = ""; //标签id
      selected.forEach((item) => {
        tag_id = item.id;
      });
      await getTableTagDel({
        store_id,
        member_id: id,
        tag_id,
      });
      this.getAllNewMemberTag();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    enter() {
      console.log("111");
    },
  },
  components: {
    MemberInfo,
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
  // display: flex !important;
  font-size: 12px;
  // justify-content: space-between;
  // padding: 0 10px;
  line-height: 20px;
  .name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90px;
  }
}
</style>
<style scoped lang="less">
/deep/.el-dialog__body {
  font-size: 12px;
  padding: 15px 20px;
}
/deep/.el-color-picker__trigger {
  width: 100px;
}
/deep/.el-tag {
  margin-right: 10px;
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  margin-right: 12px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.users-top {
  margin-bottom: 20px;
  display: flex;
  height: 32px;
  .el-button {
    padding: 6px 15px;
    background-color: #ff6a3c;
    color: #fff;
    border-color: #ff6a3c;
    margin-right: 10px;
  }
  .text {
    margin-left: 20px;
    color: #4990e2;
    &:hover {
      color: #23527c;
    }
  }
}
.el-table-self {
  margin-top: 20px;
}
.tag-round {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
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

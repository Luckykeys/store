<template>
  <div>
    <!-- 会员设置头部 -->
    <div class="user-reward-title">
      <p class="reward">会员奖励设置</p>
      <span>|</span>
      <p class="all">
        应用于所有渠道来源的会员,包括微信会员卡、手机橱窗及单个会员录入,拓客维客神器!
      </p>
    </div>
    <!-- 会员奖励 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="reward-setup">
        <div><i class="iconfont icon-weixiao"></i><span>新会员奖励</span></div>
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="reward-setup">
        <div>
          <i class="iconfont icon-xiaofeijiangli"></i><span>新会员奖励</span>
        </div>
        <el-switch
          v-model="value"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </div>
      <div class="reward-integral">
        <span>赠送积分</span>
        <input type="text" class="addIntegral" /><span>元 = </span
        ><input type="text" class="addIntegral" />
        <span>积分</span>
      </div>
    </el-card>
    <!-- 会员分组 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="form-group">
        <p class="reward">会员分组设置</p>
        <span>|</span>
        <p class="all">当前{{ memberGroup.length }}个分组</p>
      </div>
      <div class="form-group-tags">
        <div class="tags-list" v-for="group in memberGroup" :key="group.id">
          <span class="tags-title">{{ group.group_name }}</span>
          <el-dropdown trigger="click" class="icon-info" size="mini">
            <i class="el-icon-edit"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                @click.native="updaMemGroup(group)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native="delMemGroup(group)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="add">
        <p @click="addGroups">+ 新增会员分组</p>
      </div>
    </el-card>
    <!-- 会员称谓 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="form-group">
        <p class="reward">会员称谓设置</p>
        <span>|</span>
        <p class="all">当前{{ memberAppell.length }}个称谓</p>
      </div>
      <div class="form-group-tags">
        <div class="tags-list" v-for="appell in memberAppell" :key="appell.id">
          <span class="tags-title">{{ appell.appellation_name }}</span>
          <el-dropdown trigger="click" class="icon-info" size="mini">
            <i class="el-icon-edit"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                @click.native="updaMemApple(appell)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native="delMemAppells(appell)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="add">
        <p href="" @click="addAppells">+ 新增会员称谓</p>
      </div>
    </el-card>
    <!-- 会员标签 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="form-group">
        <p class="reward">会员标签设置</p>
        <span>|</span>
        <p class="all">当前{{ memberTag.length }}个标签</p>
      </div>
      <div class="member-tags">
        <div
          class="form-member-tags"
          v-for="tag in memberTag"
          :key="tag.id"
          :style="{ 'background-color': tag.color }"
        >
          <img src="@/assets/images/tag-cover.png" class="tag-mask" />
          <span class="my-tag-style">{{ tag.tag_name }}</span>
          <el-dropdown trigger="click" size="mini">
            <i class="el-icon-arrow-right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                @click.native="updaMemTags(tag)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native="delAllTags(tag)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="add">
        <p href="" @click="showTagDia">+ 新增会员标签</p>
      </div>
    </el-card>
    <!-- 店铺计次卡 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="form-group">
        <p class="reward">店铺计次卡设置</p>
        <span>|</span>
        <p class="all">当前{{ timeTableData.length }}种计次卡</p>
      </div>
      <div class="form-group-tags">
        <div class="tags-list" v-for="card in timeTableData" :key="card.id">
          <span class="tags-title">{{ card.count_card_name }}</span>
          <el-dropdown trigger="click" class="icon-info" size="mini">
            <i class="el-icon-edit"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-edit"
                @click.native="updatCards(card)"
                >编辑</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-delete"
                @click.native="delCards(card)"
                >删除</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="add">
        <p href="" @click="addNewCountCard">+ 新增会员计次卡</p>
      </div>
    </el-card>
    <!-- 计次卡过期提醒 -->
    <el-card class="box-card" shadow="never" style="margin-top:20px">
      <div class="form-group">
        <p class="reward">计次卡过期提醒设置</p>
        <span>|</span>
        <p class="all">
          在会员管理页面显示
        </p>
      </div>
      <div>
        <span>显示计次卡</span>
        <input type="text" class="count-card-time" />
        <span>天过期的会员</span>
      </div>
    </el-card>
    <!-- 新增会员标签和修改会员标签的弹框 -->
    <el-dialog
      :title="tagForm.id ? '修改会员标签' : '新增会员标签'"
      :visible.sync="dialogNewTag"
      width="20%"
    >
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
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加卡类型的弹框 -->
    <el-dialog
      :title="cardTypeForm.id ? '修改计次卡' : '添加计次卡'"
      :visible.sync="cardTypeVisible"
      width="20%"
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "MemberSettings",
  data() {
    return {
      value: true,
      dialogNewTag: false,
      tagForm: {},
      cardTypeVisible: false,
      cardTypeForm: {},
    };
  },
  computed: {
    ...mapState({
      memberAppell: (state) => state.member.memberAppell,
      memberGroup: (state) => state.member.memberGroup,
      memberTag: (state) => state.member.memberTag,
      timeTableData: (state) => state.timecard.timeTableData,
    }),
  },
  created() {
    this.getAllNewMemberGroup();
    this.getAllNewMemberAppell();
    this.getAllNewMemberTag();
    this.getAllCardTime();
  },
  methods: {
    ...mapActions([
      "getAllMemberAppell",
      "getAllMemberGroup",
      "getAllMemberTag",
      "createNewMemberAppell",
      "createNewMemberGroup",
      "createNewMemberTag",
      "deleteNewMemberGroup",
      "deleteAllNewMemberGroup",
      "delAllMemberTags",
      "deleteAllMemApple",
      "getAllCards",
      "getHandleDelCard",
      "updateMemberGroup",
      "updateMemberAppell",
      "getTagUpdate ",
      "updateMemberTags",
      "getCountCardsAdd",
      "getCountCardsUpdate",
    ]),
    /* 获取会员所有计次卡 */
    async getAllCardTime() {
      await this.getAllCards({ store_id: 1 });
    },
    /* 获取会员所有分组 */
    async getAllNewMemberGroup() {
      await this.getAllMemberGroup({ store_id: 1 });
    },
    /* 创建会员分组*/
    addGroups() {
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
    /* 编辑分组 */
    updaMemGroup(group) {
      console.log(group);
      const { id, store_id } = group;
      this.$prompt("请输入会员分组", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          // console.log(value);
          const group_name = value;
          await this.updateMemberGroup({
            id,
            store_id,
            group_name,
          });
          this.getAllNewMemberGroup();
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消输入" });
        });
    },
    /* 删除分组 */
    delMemGroup(group) {
      console.log(group);
      const { id, store_id } = group;
      console.log(id, store_id);
      this.$confirm("您确定要删除此分组吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.deleteAllNewMemberGroup({ store_id, id });
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 获取称谓所有分组 */
    async getAllNewMemberAppell() {
      await this.getAllMemberAppell({ store_id: 1 });
    },
    /* 创建会员称谓 */
    addAppells() {
      this.$prompt("请输入称谓名称", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          const appellation_name = value;
          /* 这里需要用到async await的原因就是要等到新增完成后才能重新更新称谓数据，要不然会出现没有数据显示的bug */
          await this.createNewMemberAppell({
            store_id: 1,
            appellation_name: appellation_name,
          });
          this.getAllNewMemberAppell();
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消输入" });
        });
    },
    /* 编辑称谓 */
    updaMemApple(appell) {
      console.log(appell);
      const { id, store_id } = appell;
      this.$prompt("请输入会员分组", "消息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          // console.log(value);
          const appellation_name = value;
          await this.updateMemberAppell({
            id,
            store_id,
            appellation_name,
          });
          this.getAllNewMemberAppell();
        })
        .catch(() => {
          this.$message({ type: "info", message: "取消输入" });
        });
    },
    /* 删除称谓 */
    delMemAppells(appell) {
      console.log(appell);
      const { id, store_id } = appell;
      console.log(id, store_id);
      this.$confirm("您确定要删除此称谓吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.deleteAllMemApple({ store_id, id });
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 获取会员所有标签 */
    async getAllNewMemberTag() {
      await this.getAllMemberTag({ store_id: 1 });
    },
    /* 创建会员标签 */
    showTagDia() {
      this.dialogNewTag = true;
      this.tagForm = {};
    },
    /* 修改会员标签 */
    updaMemTags(tag) {
      console.log(tag);
      this.dialogNewTag = true;
      this.tagForm = JSON.parse(JSON.stringify(tag));
    },
    /* 创建会员标签或者修改会员标签 */
    addOrUpdate() {
      this.$refs.tagForm.validate(async (valid) => {
        if (valid) {
          const data = this.tagForm;
          console.log(data);
          data.store_id = 1;
          await this[data.id ? "updateMemberTags" : "createNewMemberTag"](data);
          this.dialogNewTag = false;
          this.getAllNewMemberTag();
        }
      });
    },
    /* 删除标签 */
    delAllTags(tag) {
      console.log(tag);
      const { id, store_id } = tag;
      console.log(id, store_id);
      this.$confirm("您确定要删除此标签吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.delAllMemberTags({ store_id, id });
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 新增会员计次卡 */
    addNewCountCard() {
      this.cardTypeVisible = true;
      this.cardTypeForm = {};
    },
    updatCards(card) {
      this.cardTypeVisible = true;
      this.cardTypeForm = JSON.parse(JSON.stringify(card));
    },
    /* 删除计次卡 */
    delCards(card) {
      console.log(card);
      const { id, store_id } = card;
      console.log(id, store_id);
      this.$confirm("您确定要删除此标签吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.getHandleDelCard({ store_id, id });
          this.$message({ type: "success", message: "删除成功!" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
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
          this.getAllCardTime();
          this.cardTypeVisible = false;
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
.user-reward-title {
  padding-left: 21px;
  margin-bottom: 15px;
  .reward {
    display: inline-block;
    font-size: 14px;
    font-weight: bolder;
  }
  span {
    margin: 0px 10px;
  }
  .all {
    display: inline-block;
    color: #868686;
    font-size: 12px;
  }
}
.box-card {
  width: 100%;
  .reward-setup {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    .iconfont {
      color: #f76e4b;
      font-size: 15px;
      border-radius: 50%;
      margin-right: 15px;
    }
  }
  .reward-integral {
    input.addIntegral {
      width: 50px;
      outline: none;
      margin: 0 15px;
    }
  }
  .form-group {
    padding: 0px 20px 15px 0px;
    .reward {
      display: inline-block;
      font-size: 14px;
    }
    span {
      margin: 0px 10px;
    }
    .all {
      display: inline-block;
      color: #868686;
      font-size: 12px;
    }
  }
  input.count-card-time {
    width: 50px;
    margin: 0 10px;
    outline: none;
  }
  .form-group-tags {
    display: flex;
    .tags-list {
      display: flex;
      cursor: pointer;
      margin: 0px 10px 10px 0px;
      span {
        display: inline-block;
        background-color: #eee;
        padding: 7px 12px;
        border-right: 1px solid #fff;
      }
      .icon-info {
        background-color: #eee;
        padding: 6px 12px;
        i {
          display: inline-block;
          font: normal normal normal 14px/1 FontAwesome;
          font-size: inherit;
          text-rendering: auto;
          transform: translate(0, 0);
          color: #f76e4b !important;
        }
      }
    }
  }
  .member-tags {
    display: flex;
    .form-member-tags {
      display: flex;
      margin: 0px 20px 12px 0;
      // background-color: rgb(255, 94, 0);
      border-radius: 3px 3px;
      .tag-mask {
        vertical-align: middle;
      }
      .my-tag-style {
        color: #fff;
        line-height: 19px;
        display: inline-block;
        vertical-align: bottom;
        padding-left: 5px;
        padding-right: 5px;
      }
      .right {
        margin-top: 4px;
        color: #fff;
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        transform: translate(0, 0);
        padding: 0px 5px 0px 0px;
      }
      .el-dropdown {
        .el-icon-arrow-right {
          margin-top: 3px;
          color: #fff;
          font-size: 12px;
          display: inline-block;
          font: normal normal normal 8px/1 FontAwesome;

          transform: translate(0, 0);
          padding: 0px 5px 0px 0px;
        }
      }
    }
  }
  .add {
    p {
      color: #337ab7;
      background-color: transparent;
      cursor: pointer;
    }
  }
}
.el-input.card-name {
  width: 200px;
}
.el-input.card-number {
  width: 50px;
  margin: 0px 10px;
}
</style>

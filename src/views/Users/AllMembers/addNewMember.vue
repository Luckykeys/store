<template>
  <!-- 新增会员页面 -->
  <div class="addMembersContainer">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="新增会员" name="first">
        <el-form
          label-position="right"
          :model="memberRuleForm"
          :rules="rules"
          ref="memberRuleForm"
          label-width="100px"
          class="member-form"
          size="small"
          inline
        >
          <el-form-item
            label="会员头像"
            prop="member_thumbs"
            style="width: 800px"
          >
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="memberRuleForm.member_thumbs"
                :src="memberRuleForm.member_thumbs"
                class="avatar"
              />
              <i
                v-else
                class="iconfont icon-shangchuantouxiang1-copy avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺ID" prop="store_id">
            <el-input v-model="memberRuleForm.store_id"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="member_phone">
            <el-input v-model="memberRuleForm.member_phone"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号" prop="member_card">
            <el-input v-model="memberRuleForm.member_card"></el-input>
          </el-form-item>
          <el-form-item label="会员称谓" prop="member_appellation_id">
            <el-select
              v-model="memberRuleForm.member_appellation_id"
              placeholder="请选择会员称谓"
            >
              <el-option
                v-for="item in memberAppell"
                :key="item.id"
                :label="item.appellation_name"
                :value="item.id"
              ></el-option>
              <el-option
                label="新增称谓"
                value="memberRuleForm.member_appellation_id"
                @click.native="addNewAppellation"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员姓名" prop="member_name">
            <el-input
              v-model="memberRuleForm.member_name"
              class="input-with-select"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="介绍人" prop="member_guide">
            <el-input
              v-model="memberRuleForm.member_guide"
              placeholder="卡号、手机号、姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="QQ号码" prop="member_qq">
            <el-input v-model="memberRuleForm.member_qq"></el-input>
          </el-form-item>
          <!-- <el-form-item
            label="会员生日"
            prop="commemoration"
            :key="indexs"
            v-for="(domain, indexs) in memberRuleForm.commemoration"
          >
            <el-date-picker
              v-model="value"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker
            ><el-button @click.prevent="removeDomain(domain)"
              >删除</el-button
            >
            <el-button @click="addDomain">添加纪念日</el-button>
          </el-form-item> -->
          <el-form-item label="会员地址" prop="member_address">
            <el-input v-model="memberRuleForm.member_address"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="member_tel">
            <el-input v-model="memberRuleForm.member_tel"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="member_email">
            <el-input v-model="memberRuleForm.member_email"></el-input>
          </el-form-item>
          <el-form-item label="会员喜好" prop="member_interest">
            <el-input v-model="memberRuleForm.member_interest"></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="member_wechat">
            <el-input v-model="memberRuleForm.member_wechat"></el-input>
          </el-form-item>
          <el-form-item label="会员分组" prop="member_group_id">
            <el-select
              v-model="memberRuleForm.member_group_id"
              placeholder="请选择会员分组"
            >
              <el-option
                v-for="item in memberGroup"
                :key="item.id"
                :label="item.group_name"
                :value="item.id"
              ></el-option>
              <el-option
                label="新增分组"
                value="memberRuleForm.member_group_id"
                @click.native="addNewChangeGroup"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注信息" prop="member_remark">
            <el-input
              v-model="memberRuleForm.member_remark"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="success" size="small" @click="submitForm">保存</el-button>
          <el-button size="small" @click="resetForm('memberRuleForm')" type="warning"
            >重置</el-button
          >
          <el-button size="small" type="primary" @click="backList">返回</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="批量导入" name="second">批量导入</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getNewMember, getAutoIncrement } from "@api/member";
export default {
  name: "AddNewMember",
  props: ["backMemberManage"],
  data() {
    return {
      activeName: "first",
      memberRuleForm: {},
      value: "",
      rules: {
        store_id: [
          { required: true, message: "请输入店铺ID", trigger: "blur" },
        ],
        member_card: [
          { required: true, message: "请输入会员卡号", trigger: "blur" },
        ],
        member_name: [
          { required: true, message: "请输入会员姓名", trigger: "blur" },
        ],
      },
      // memberAppell: [],
      // memberGroup: [],
    };
  },
  computed: {
    ...mapState({
      memberAppell: (state) => state.member.memberAppell,
      memberGroup: (state) => state.member.memberGroup,
    }),
  },
  created() {
    this.getAutoNewIncrement(); //获取自增卡号
    this.getAllNewMemberAppell(); //获取会员称谓options
    this.getAllNewMemberGroup(); //获取会员分组options
  },
  methods: {
    ...mapActions([
      "getAllMemberAppell",
      "getAllMemberGroup",
      "createNewMemberAppell",
      "createNewMemberGroup",
    ]),
    /* 新增会员 */
    submitForm() {
      this.$refs.memberRuleForm.validate(async (valid) => {
        if (valid) {
          const data = this.memberRuleForm;
          const result = await getNewMember(data);
          console.log(result);
          if (result.code === 0) {
            this.$message.success("新增会员成功");
            this.backMemberManage();
          } else {
            this.$message.error(result.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    backList() {
      this.backMemberManage();
    },
    /* 点击新增会员切换页面的时候应该请求会员卡号 */
    async getAutoNewIncrement() {
      const result = await getAutoIncrement({ store_id: 1 });
      // console.log(result);
      if (result.code === 0) {
        this.$message.success("自增卡号成功");
        // this.memberRuleForm.member_card = result.data.number;
        this.$set(this.memberRuleForm, "member_card", result.data.number);
      } else {
        this.$message.error(result.msg);
      }
    },
    /* 获取会员所有称谓 */
    async getAllNewMemberAppell() {
      await this.getAllMemberAppell({ store_id: 1 });
    },
    /* 创建会员称谓 */
    addNewAppellation() {
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
    /* 获取会员所有分组 */
    async getAllNewMemberGroup() {
      await this.getAllMemberGroup({ store_id: 1 });
    },
    /* 创建会员分组*/
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
    removeDomain(item) {
      if (item && this.memberRuleForm.commemoration.length > 1) {
        var index = this.memberRuleForm.commemoration.indexOf(item);
        if (index !== -1) {
          this.memberRuleForm.commemoration.splice(index, 1);
        }
      } else {
        return false;
      }
    },
    addDomain() {
      this.memberRuleForm.commemoration.push({
        commemoration_name: "",
        commemoration_day: "",
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.memberRuleForm.member_thumbs = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped lang="less">
.addMembersContainer {
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
  .member-form {
    // padding-top: 10px;
    width: 800px;
    .avatar-uploader .el-upload {
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      background-color: #eeeeee;
      text-align: center;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 30px;
      color: #8c939d;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .avatar {
      width: 60px;
      height: 60px;
      display: block;
    }
    /* 会员头像的label和图片对齐 */
    /deep/.el-form-item--small .el-form-item__content,
    .el-form-item--small .el-form-item__label {
      vertical-align: middle;
      line-height: 30px;
    }
    /deep/.el-input.el-input {
      width: 200px;
    }
    /deep/.el-textarea.el-input--small {
      width: 200px;
    }
  }
  .dialog-footer {
    margin-left: 50px;
    .el-button{
      width:70px;
      font-size: 14px;
    }
  }
}
</style>

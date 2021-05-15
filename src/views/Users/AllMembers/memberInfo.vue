<template>
  <div>
    <!-- 会员详情页面 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClickInfo">
      <el-tab-pane label="概要" name="first">
        <div class="h-top">
          <div class="h-left">
            <div class="h-photo">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i
                  v-else
                  class="iconfont icon-shangchuantouxiang1-copy avatar-uploader-icon"
                ></i>
              </el-upload>
            </div>
            <div class="h-info">
              <span class="h-name">{{ memberInfo.member_name }}</span>
              <span class="h-group">{{ memberInfo.group }}</span>
              <span class="h-tel">{{ memberInfo.member_phone }}</span>
            </div>
          </div>
          <div class="h-right">
            <div class="h-more">
              <div class="h-block">
                <span class="h-more-time">0</span>
                <span class="h-more-title">购物次数</span>
              </div>
              <div class="h-block">
                <span class="h-more-time">0</span>
                <span class="h-more-title">购物数量</span>
              </div>
              <div class="h-block">
                <span class="h-more-time">0.00</span>
                <span class="h-more-title">累计消费金额</span>
              </div>
            </div>
          </div>
        </div>
        <div class="h-bottom">
          <div>
            上次消费:无
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="详细信息" name="second">
        <el-form
          ref="memberInfoData"
          :model="memberInfoData"
          label-width="80px"
          size="mini"
          inline
        >
          <el-form-item label="会员头像" class="item-avatar">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="memberInfoData.member_thumbs"
                :src="memberInfoData.member_thumbs"
                class="avatar"
              />
              <i
                v-else
                class="iconfont icon-shangchuantouxiang1-copy avatar-uploader-icon"
              ></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="会员姓名">
            <el-input v-model="memberInfoData.member_name"></el-input>
          </el-form-item>
          <el-form-item label="会员称谓">
            <el-input v-model="memberInfoData.appellation"></el-input>
          </el-form-item>
          <el-form-item label="会员卡号">
            <el-input v-model="memberInfoData.member_card"></el-input>
          </el-form-item>
          <el-form-item label="加入时间">
            <el-input
              :v-model="memberInfoData.created_at | formatDateTime"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员生日">
            <el-input v-model="memberInfoData.commemoration"></el-input>
          </el-form-item>
          <el-form-item label="其他电话">
            <el-input v-model="memberInfoData.member_phone"></el-input>
          </el-form-item>
          <el-form-item label="QQ号码">
            <el-input v-model="memberInfoData.member_qq"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="memberInfoData.member_wechat"></el-input>
          </el-form-item>
          <el-form-item label="电子信箱">
            <el-input v-model="memberInfoData.member_email"></el-input>
          </el-form-item>
          <el-form-item label="会员地址">
            <el-input v-model="memberInfoData.member_address"></el-input>
          </el-form-item>
          <el-form-item label="会员喜好">
            <el-input v-model="memberInfoData.member_interest"></el-input>
          </el-form-item>
          <el-form-item label="介绍人">
            <el-input v-model="memberInfoData.member_guide"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              v-model="memberInfoData.member_remark"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div style="width:1000px;border-top: 1px solid #ccc"></div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitMember"
              >立即更新</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="消费记录" name="third"></el-tab-pane>
      <el-tab-pane label="储值卡" name="fourth"></el-tab-pane>
      <el-tab-pane label="计次卡" name="five"></el-tab-pane>
      <el-tab-pane label="积分折扣" name="six"></el-tab-pane>
      <el-tab-pane label="历史消息" name="seven"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { parseTime } from "@/utils";
export default {
  name: "MemberInfo",
  props: ["memberInfo"],
  data() {
    return {
      activeName: "first",
      imageUrl: "",
      memberInfoData: {},
    };
  },
  //转换时间戳的方法
  filters: {
    formatDateTime(value) {
      return parseTime(value);
    },
  },
  methods: {
    //修改会员提交
    onSubmitMember() {
      console.log("submit!");
    },
    handleClickInfo(tab, event) {
      console.log(tab, event);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 png 格式!");
      }
      return isJPG;
    },
  },
  created() {
    this.memberInfoData = this.memberInfo;
  },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__item {
  font-size: 12px;
}
.h-top {
  display: flex;
  justify-content: space-between;
  height: 150px;
  border-bottom: 1px solid #e4e4e4;
  .h-left {
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 150px;
    .h-photo {
      width: 100px;
      height: 100px;
      margin: 10px;
      position: relative;
      cursor: pointer;
      .avatar-uploader-icon {
        font-size: 90px;
        color: #8c939d;
        line-height: 100px;
        text-align: center;
        width: 100px;
      }
    }
    .h-info {
      width: 100px;
      height: 100px;
      position: relative;
      cursor: pointer;
      margin-top: 20px;
      width: 158px;
      height: 150px;
      .h-name {
        display: block;
        font-size: 16px;
        margin-bottom: 10px;
        height: 20px;
        line-height: 20px;
        font-weight: bold;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .h-group {
        display: block;
        font-size: 12px;
        margin-bottom: 14px;
        color: #999;
      }
      .h-tel {
        display: block;
        margin-bottom: 12px;
        font-size: 14px;
        color: #666;
      }
    }
  }
  .h-right {
    float: left;
    width: 320px;
    height: 150px;
    .h-more {
      margin-top: 20px;
      width: 320px;
      height: 70px;
      .h-block {
        height: 56px;
        float: left;
        padding: 0 20px;
        border-right: 1px solid #ddd;
        .h-more-time {
          display: block;
          color: #333;
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 10px;
          margin-top: 10px;
          max-width: 80px;
        }
        .h-more-title {
          display: block;
          color: #999;
          text-align: center;
        }
      }
    }
  }
}
.h-bottom {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/deep/.el-input--mini {
  width: 150px;
}
.item-avatar {
  width: 1000px;
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
}
/* 会员头像的label和图片对齐 */
/deep/.el-form-item--mini .el-form-item__content,
.el-form-item--mini .el-form-item__label {
  vertical-align: middle;
  line-height: 30px;
}
</style>

<template>
  <div>
    <!-- 头部 -->
    <div class="login-header">
      <div class="container">
        <img src="@/assets/images/logo_in.png" alt="" class="login-logo" />
        <ul class="header-top">
          <li>
            <a>店铺管理<i class="iconfont icon-jiantou-copy"></i></a>
          </li>
          <li>
            <a>会员营销<i class="iconfont icon-jiantou-copy"></i></a>
          </li>
          <li>
            <a>解决方案<i class="iconfont icon-jiantou-copy"></i></a>
          </li>
          <li><a>价格资费</a></li>
          <li><a>免费下载</a></li>
        </ul>
        <div class="header-btn">
          <el-button class="el-login" @click="handleLogin">登录</el-button>
          <el-button class="el-register">注册</el-button>
        </div>
      </div>
    </div>
    <!-- 登录form表单 -->
    <div class="login-banner">
      <div class="banner-container">
        <el-card class="login-box" shadow="hover">
          <div slot="header" class="clearfix">
            <span class="login-info">登录你的生意专家</span>
            <el-button
              class="login-register"
              style="float: right; padding: 3px 0"
              type="text"
              >注册</el-button
            >
          </div>
          <div class="text">
            <el-form
              :model="userForm"
              :rules="rules"
              ref="userForm"
              class="login-form"
              label-width="80px"
            >
              <el-form-item label="账号" prop="username">
                <el-input
                  type="text"
                  placeholder="输入您的邮箱或手机号码"
                  v-model="userForm.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  placeholder="输入您的密码"
                  v-model="userForm.password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  :loading="loading"
                  type="primary"
                  @click="submitForm('userForm')"
                  class="login-btn"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="over">
            <a href="" class="forget-pass">忘记密码了？</a>
            <a class="manage-login">连锁后台登录</a>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 底部 -->
    <div class="motto">
      <img src="@/assets/images/signature.jpg" alt="" />
    </div>
    <div class="bottom">
      <span>电话：400-168-3399</span>
      <span>服务条款隐私政策网站地图©2010-2021生意专家™</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入您的邮箱或手机号码",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        ],
      },
      loading: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.userForm);
          this.$store.dispatch("login", this.userForm);
          this.$router.push("/");
          this.loading = false;
        } else {
          return false;
        }
      });
    },
    /* 点击右上角的登录按钮 */
    handleLogin() {
      this.$router.push({
        path: "/login",
      });
      console.log("111");
    },
  },
};
</script>

<style lang="less" scoped>
.login-header {
  border-color: #e6e6e6;
  .container {
    width: 1200px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 144px;
      height: 36px;
    }
    .header-top {
      display: flex;
      width: 850px;
      height: 70px;
      line-height: 70px;
      li {
        a {
          color: #323232;
          border-radius: 0;
          margin-bottom: -1px;
          border-bottom: 1px solid transparent;
          font-size: 14px;
          margin-left: 15px;
          margin-right: 15px;
        }
        &:hover {
          border-bottom: 1px solid #e65024;
          color: #e65024;
        }
      }
    }
    .header-btn {
      .el-login {
        background-color: #f76e4b;
        color: #fff;
        font-size: 12px;
        border-radius: 0px;
        &:hover {
          background-color: #fff;
          color: #f76e4b;
          border-color: #f76e4b;
        }
      }
      .el-register {
        background-color: #fff;
        color: #f76e4b;
        border-radius: 0px;
        font-size: 12px;
        border: 1px solid transparent;
        &:hover {
          border-color: #f76e4b;
        }
      }
    }
  }
}
.login-banner {
  background-image: url("../../assets/images/login-banner.jpg");
  height: 500px;
  background-repeat: no-repeat;
  background-size: 100%;
  .banner-container {
    width: 1200px;
    margin: 0 auto;
    height: 500px;
    .login-box {
      float: right;
      width: 350px;
      height: 330px;
      margin: 90px 0px;
      /deep/.el-card__header {
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        line-height: 30px;
      }
      .login-info {
        font-size: 16px;
      }
      .login-register {
        font-size: 16px;
        color: #f76e4b;
      }
      .text {
        font-size: 14px;
        // margin-bottom: 18px;
      }
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both;
      }
      .login-form {
        .login-btn {
          width: 220px;
        }
      }
      .over {
        margin: 0 auto;
        width: 230px;
        display: flex;
        justify-content: space-between;
        .forget-pass {
          color: #000;
          font-size: 14px;
        }
        .manage-login {
          color: #337ab7;
          font-size: 14px;
        }
      }
    }
  }
}
.motto {
  margin-top: 10px;
  width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #eee;
}
.bottom {
  width: 1200px;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <div>
    <ul class="top-nav">
      <li class="top-nav-role">
        <span class="login-role">嘻</span>
        <div class="login-user">
          <span>嘻嘻嘻</span>
        </div>
      </li>
      <li class="top-nav-info">
        <span class="shop-name"
          >生意专家<i class="iconfont icon-jiantou-copy"></i
        ></span>
        <div class="shop-info">
          <div class="shop-info-top">
            <span class="version">免费版</span>
            <img src="@/assets/images/user.png" alt="" class="upload-avatar" />
            <span class="shop-info-shopId">
              店铺ID ：<span>8369875</span>
            </span>
          </div>
          <div class="shop-info-bottom">
            <a class="shop-simple-info">
              <span>30</span>
              <span>店铺积分</span>
            </a>
            <a class="shop-simple-info">
              <span>0</span>
              <span>礼金券</span>
            </a>
          </div>
          <button class="shop-detail-info">查看店铺详情</button>
        </div>
      </li>
      <li class="scrollor">
        <div class="free-box">
          <a>马上升级</a>
          <a>
            <img src="@/assets/images/bell.gif" alt="" class="bell" />
            <span>升级行业版，提高门店管理效率</span>
          </a>
        </div>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-shangcheng4"></i>
          <span>商城</span>
        </a>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-hao1"></i>
          <span>新增</span>
        </a>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-kehuduan"></i>
          <span>客户端</span>
        </a>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-fuwupingjia-kefu"></i>
          <span>客服</span>
        </a>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-gonggao"></i>
          <span>消息</span>
        </a>
      </li>
      <li class="top-nav-button">
        <a>
          <i class="iconfont icon-luntan"></i>
          <span>论坛</span>
        </a>
      </li>
      <li class="top-nav-button">
        <el-dropdown trigger="click">
          <a class="el-dropdown-link">
            <i class="iconfont icon-duosefuzhu-gengduotiaojian1"></i>
            <span>更多</span>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              ><i class="el-icon-document-checked"></i
              >新手任务</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="el-icon-present"></i>邀请有礼</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="el-icon-setting"></i>系统设置</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="el-icon-download"></i>产品手册</el-dropdown-item
            >
            <el-dropdown-item
              ><i class="el-icon-rank"></i>默认路线</el-dropdown-item
            >
            <el-dropdown-item divided @click.native="logout"
              ><i class="el-icon-position"></i>安全退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </li>

      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.top-nav {
  display: flex;
  justify-content: space-between;
  position: relative;
  .top-nav-role {
    display: inline-block;
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    background-color: #697b93;
    border-radius: 100%;
    vertical-align: middle;
    margin: 11px 0px;
    &:hover .login-user {
      display: block;
    }
    .login-user {
      display: none;
      position: absolute;
      top: 50px;
      left: -20px;
      background: #fff;
      z-index: 10001;
      border-radius: 3px;
      padding: 10px 14px;
      text-align: center;
      min-width: 60px;
      box-shadow: 0px 1px 4px 0 #697b93;
      white-space: nowrap;
      span {
        display: inline-block;
        color: #333;
        font-size: 14px;
        height: 14px;
        line-height: 14px;
      }
    }
  }
  .top-nav-info {
    margin-left: 10px;
    width: 80px;
    height: 50px;
    line-height: 50px;
    position: relative;
    .shop-name {
      display: inline-block;
      max-width: 10em;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover + .shop-info {
        display: block;
      }
    }
    .shop-info {
      display: none;
      width: 240px;
      height: 263px;
      position: absolute;
      top: 50px;
      left: 0;
      z-index: 999;
      background-color: #fff;
      box-shadow: 1px 1px 6px 0 #697b93;
      border-radius: 10px;
      .shop-info-top {
        background-color: #ff8000;
        height: 131px;
        text-align: center;
        border-radius: 10px 10px 20px 20px;
        /* 免费版字体 */
        .version {
          vertical-align: middle;
          width: 68px;
          height: 18px;
          line-height: 18px;
          font-size: 12px;
          color: #ffffff;
          background-color: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          position: absolute;
          text-align: center;
          top: 20px;
          left: 10px;
        }
        .upload-avatar {
          width: 64px;
          height: 64px;
          margin-top: 20px;
          border-radius: 50%;
          border: 2px solid #ffffff;
          cursor: pointer;
        }
        .shop-info-shopId {
          display: block;
          font-size: 16px;
          line-height: 0;
          color: #ffffff;
        }
      }
      .shop-info-bottom {
        display: flex;
        justify-content: space-around;
        .shop-simple-info {
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 17px;
          margin-top: 5px;
          color: #666666;
        }
      }
      .shop-detail-info {
        background-color: #fff;
        width: 100%;
        font-size: 14px;
        padding: 5px 0px;
        border: none;
        border-top: 1px solid #e8e8e8;
        color: #333333;
      }
    }
  }
  .scrollor {
    margin: 0 10px;
    flex: 1;
    .free-box {
      position: relative;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bell {
        width: 24px;
        height: 24px;
        float: left;
        margin-top: 12px;
      }
      a {
        color: #ff6a3b;
        font-size: 14px;
        cursor: pointer;
        font-weight: 600;
      }
    }
  }
  .top-nav-button {
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 50px;
      span {
        font-size: 12px;
        color: #777777;
      }
      .icon-shangcheng4 {
        color: coral;
      }
      .icon-hao1 {
        color: rgb(255, 144, 80);
      }
      .icon-kehuduan {
        color: blue;
      }
      .icon-fuwupingjia-kefu {
        color: brown;
      }
      .icon-gonggao {
        color: #ff8000;
      }
      .icon-luntan {
        color: rgb(47, 189, 255);
      }
      .icon-duosefuzhu-gengduotiaojian1 {
        color: rgb(12, 139, 0);
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>

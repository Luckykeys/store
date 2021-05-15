<template>
  <div class="asider-container">
    <div class="sidebar-logo-container">
      <div class="logo-box">
        <router-link class="sidebar-logo-link" to="/business">
          <!-- <img src="../../assets/images/logo_in.png" class="sidebar-logo" /> -->
          <h1 class="sidebar-title">生意专家</h1>
        </router-link>
      </div>
    </div>
    <ul class="left-nav-content">
      <li class="left-nav-top">
        <router-link class="left-nav-top-inner cashier" to="/cashier">
          <i class="iconfont icon-shouyinjizhang"></i>
          <span>收银记账</span>
        </router-link>
        <router-link class="left-nav-top-inner member" to="/users">
          <i class="iconfont icon-huiyuanguanli1"></i>
          <span>会员管理</span>
        </router-link>
      </li>
    </ul>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#4a535e"
      text-color="#fff"
      router
    >
      <el-menu-item-group>
        <template slot="title">管理</template>
        <el-menu-item index="1-1" class="show"
          ><i class="iconfont icon-xiaoshouchaxun1"></i>销售查询</el-menu-item
        >
        <el-menu-item index="1-2"
          ><i class="iconfont icon-zhichuguanli"></i>支出管理</el-menu-item
        >
        <el-menu-item index="/goods"
          ><i class="iconfont icon-shangpinguanli"></i>商品管理</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">分析</template>
        <el-menu-item index="2-1"
          ><i class="iconfont icon-xiaoshoufenxi"></i>销售分析</el-menu-item
        >
        <el-menu-item index="2-2"
          ><i class="iconfont icon-huiyuanfenxi"></i>会员分析</el-menu-item
        >
        <el-menu-item index="2-2"
          ><i class="iconfont icon-shangpinfenxi1"></i>商品分析</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">营销</template>
        <el-menu-item index="3-1"
          ><i class="iconfont icon-lipin"></i>营销活动</el-menu-item
        >
        <el-menu-item index="3-2"
          ><i class="iconfont icon-faduanxin"></i>发短信</el-menu-item
        >
        <el-menu-item index="3-3"
          ><i class="iconfont icon-xiaochengxu1"></i>小程序微商城</el-menu-item
        >
        <el-menu-item index="3-1"
          ><i class="iconfont icon-weixin"></i>微信会员卡</el-menu-item
        >
      </el-menu-item-group>
      <el-menu-item index="8" class="line">
        <i class="iconfont icon-shengyi"></i>
        <el-badge is-dot class="item">生意商城</el-badge>
      </el-menu-item>
      <el-menu-item index="/system">
        <i class="iconfont icon-set"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.asider-container {
  height: 100%;
  .sidebar-logo-container {
    & .logo-box {
      font-size: 0;
      height: 50px;
      line-height: 50px;
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
    }
    position: relative;
    width: 100%;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      & .sidebar-logo {
        width: 150px;
        height: 50px;
        text-align: center;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 20px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }
  }
  .left-nav-content {
    .left-nav-top {
      display: flex;
      height: 90px;
      width: 200px;
      .left-nav-top-inner {
        height: 90px;
        display: flex;
        width: 50%;
        flex-direction: column;
        box-sizing: border-box;
        justify-content: space-evenly;
        color: #ffffff;
        text-decoration: none;
        border-bottom: 4px solid transparent;
        &:hover {
          background-color: rgba(40, 42, 62, 0.4);
          border-bottom: 4px solid #ff6a3c;
          border-left: none;
          padding: 0 !important;
          box-sizing: border-box;
        }
        .iconfont {
          font-size: 30px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
  .el-menu-vertical-demo {
    border: none;
    /deep/.el-menu-item-group__title {
      // height: 28px;
      // line-height: 28px;
      font-size: 12px;
      text-align: left;
      padding-left: 15px;
      color: #ffffff;
      position: relative;
      background-color: rgba(255, 255, 255, 0.05);
      margin-bottom: 5px;
    }
    /deep/.el-menu-item {
      height: 36px;
      line-height: 36px;
      text-align: left;
      font-size: 14px;
      cursor: pointer;
      border-left: 4px solid transparent;
      &:hover {
        background-color: rgba(40, 42, 62, 0.4);
        border-left: 4px solid #ff6a3c;
        box-sizing: border-box;
        width: 200px;
      }
      .iconfont {
        color: #ffffff;
        font-size: 20px;
        padding: 0px 12px 0px 25px;
        &.icon-xiaochengxu1 {
          color: rgb(0, 204, 211);
        }
        &.icon-weixin {
          color: #1afa29;
        }
        &.icon-shengyi {
          color: rgb(255, 115, 0);
        }
      }
      &.line {
        border-top: 1px solid #fff;
        margin-top: 5px;
        .el-badge__content {
          background-color: red;
          &.is-fixed.is-dot {
            right: -3px;
            top: 9px;
          }
        }
      }
    }
  }
}
</style>

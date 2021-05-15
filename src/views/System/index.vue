<template>
  <div>
    <el-tabs
      :tab-position="tabPosition"
      class="tabContanier"
      type="border-card"
    >
      <el-tab-pane>
        <span slot="label" class="menu">
          <i class="iconfont icon-wodedianpu"></i>
          <span>我的店铺</span>
          <i class="el-icon-arrow-right"></i>
        </span>
        <PersonalStores></PersonalStores>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" class="menu">
          <i class="iconfont icon-shujuxinxi"></i>
          <span>数据信息</span>
          <i class="el-icon-arrow-right"></i>
        </span>
        <DataInfo></DataInfo>
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-shouyinshezhi"></i><span>收银设置</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        收银设置
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-shangpinshezhi"></i><span>商品设置</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        商品设置
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-huiyuan"></i><span>会员设置</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        <MemberSettings></MemberSettings>
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-hongqi"></i><span>自选行业功能</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        自选行业功能
      </el-tab-pane>

      <el-tab-pane style="margin-top: 20px"
        ><span slot="label" class="menu"
          ><i class="iconfont icon-duanxinshezhi"></i><span>短信设置</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        短信设置
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-weixin1"></i><span>微信绑定</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        微信绑定
      </el-tab-pane>
      <el-tab-pane style="margin-top: 20px"
        ><span slot="label" class="menu"
          ><i class="iconfont icon-dayin"></i><span>打印设置</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        我的行程
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-anquanzhongxin"></i><span>安全中心</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        我的行程
      </el-tab-pane>
      <el-tab-pane
        ><span slot="label" class="menu"
          ><i class="iconfont icon-DataAnalysis"></i><span>数据管理</span
          ><i class="el-icon-arrow-right"></i
        ></span>
        我的行程
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MemberSettings from "./memberSettings";
import PersonalStores from "./personalStores";
import DataInfo from "./dataInfo";
export default {
  name: "stystem",
  data() {
    return {
      tabPosition: "left",
    };
  },
  components: {
    MemberSettings,
    PersonalStores,
    DataInfo,
  },
};
</script>
<style lang="less">
.tabContanier {
  height: 100%;
  .el-tabs__nav-wrap {
    width: 200px;
    // background-color:#fff;
  }
  /deep/.el-tab-pane > .is-left {
    padding: 10px 30px;
  }
  .el-tabs__header.is-left {
    height: 545px;
  }
  .el-tabs__item {
    line-height: 0px;
    color: brown;
    height: 45px;
  }
  .el-tabs__content {
    padding: 30px;
  }
  .menu {
    display: flex;
    align-items: center;
    height: 40px;

    .iconfont {
      margin-right: 35px;
      position: relative;
      color: rgb(240, 93, 39);
    }
    .el-icon-arrow-right {
      position: absolute;
      left: 175px;
    }
  }
}
</style>

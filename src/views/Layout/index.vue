<template>
  <el-container style="height:100%">
    <!-- 左边侧边栏 -->
    <el-aside width="200px">
      <CommonAside></CommonAside>
    </el-aside>
    <el-container>
      <!-- 右边头部 -->
      <el-header height="50px">
        <CommonHeader></CommonHeader>
      </el-header>
      <!-- 右边主要内容 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside/index";
import CommonHeader from "@/components/CommonHeader/index";
export default {
  name: "Main",
  data() {
    return {};
  },
  computed: {},
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #ffffff;
  color: #333;
  height: 50px;
  min-height: 50px;
  list-style: none;
  box-sizing: border-box;
  border-bottom: 1px solid #cccccc;
  position: relative;
  // min-width: 700px;
}

.el-aside {
  background-color: #4a535e;
  color: #333;
  text-align: center;
  overflow: visible;
}

.el-main {
  min-height: calc(100vh - 50px);
  background-color: #ffffff;
  padding: 25px !important;
  overflow: visible;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>

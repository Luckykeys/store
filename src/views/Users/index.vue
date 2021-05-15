<template>
  <!-- 会员管理页面 -->
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="所有会员" name="first">
        <AllMemebers></AllMemebers>
      </el-tab-pane>
      <el-tab-pane label="计次卡管理" name="second">
        <TimeCardManage></TimeCardManage>
      </el-tab-pane>
      <el-tab-pane label="储值变更明细" name="third">储值变更明细</el-tab-pane>
      <el-tab-pane label="会员设置" name="fourth">会员设置</el-tab-pane>
      <el-tab-pane label="会员属性" name="five">会员属性</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AllMemebers from "./AllMembers/index"; //所有会员页面
import TimeCardManage from "./TimeCardManage/index"; //计次卡管理页面
export default {
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {},
  components: {
    AllMemebers,
    TimeCardManage,
  },
};
</script>

<style lang="less" scoped>
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
</style>

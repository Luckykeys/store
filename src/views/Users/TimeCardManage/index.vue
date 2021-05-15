<template>
  <div>
    <TimeCardList v-if="timeCardList" :showApplyCard="showApplyCard"></TimeCardList>
    <ApplyCard v-else :backTimeCardList="backTimeCardList"></ApplyCard>
  </div>
</template>

<script>
import TimeCardList from "./timeCardList";
import ApplyCard from "./applyCard";
export default {
  data() {
    return {
      timeCardList: true,  //代表的是计次卡列表页面
    };
  },
  methods: {
    showApplyCard() {
      this.timeCardList = false;
    },
    backTimeCardList() {
      this.timeCardList = true;
    },
    /* 让卡类型管理页面的会员办卡弹框显示 */
    
  },
  components: {
    TimeCardList,
    ApplyCard,
  },
};
</script>

<style scoped lang="less"></style>
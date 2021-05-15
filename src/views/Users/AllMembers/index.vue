<template>
  <div>
    <MemberList v-if="memberManage" :showAddNewMember="showAddNewMember"></MemberList>
    <AddNewMember v-else :backMemberManage="backMemberManage"></AddNewMember>
  </div>
</template>

<script>
import MemberList from "./memberList";
import AddNewMember from "./addNewMember";
export default {
  data() {
    return {
      memberManage: true,  //代表的是会员列表页面
    };
  },
  methods: {
    showAddNewMember() {
      this.memberManage = false;
    },
    backMemberManage() {
      this.memberManage = true;
    },
  },
  components: {
    MemberList,
    AddNewMember,
  },
};
</script>

<style scoped lang="less"></style>
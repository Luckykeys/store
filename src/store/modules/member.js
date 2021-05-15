import {
  getMemberList,
  getMemberAppellation,
  getMemberGroup,
  getMemberAppellCreate,
  getMemberGroupCreate,
  getMemberTag,
  getTagCreate,
  getMemberTagDel,
  getMemberGroupDelete,
  getMemberTagDelete,
  getMemAppleactioDel,
  getMemberGroupUpdate,
  getMemberAppellUpdate,
  getTagUpdate
} from "@api/member";
import { Message } from "element-ui";
export default {
  state: {
    memberAppell: [], //会员称谓数组(id+name)
    memberGroup: [], //会员分组数组(id+name)
    memberTag: [], //会员标签数组(id+name)
    memberTableData: [], //会员分页数据(table表格) 所有会员
    total: 0,
  },
  actions: {
    /* 获取所有会员 */
    async getAllMembersList(store, data) {
      const result = await getMemberList(data);
      // console.log(result)
      if (result.code === 0) {
        Message({ message: "获取所有会员", type: "success" });
        store.commit("GET_ALLMEMBERS_LIST", result.data);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 获取所有会员称谓 */
    async getAllMemberAppell(store, storeId) {
      const result = await getMemberAppellation(storeId);
      if (result.code === 0) {
        // Message({ message: "获取称谓成功", type: "success" });
        const memberAppell = result.data;
        store.commit("GET_ALL_MEMBERAPPELL", memberAppell);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 获取会员所有分组 */
    async getAllMemberGroup(store, storeId) {
      const result = await getMemberGroup(storeId);
      if (result.code === 0) {
        // Message({ message: "获取分组成功", type: "success" });
        const memberGroup = result.data;
        store.commit("GET_ALL_MEMBERGROUP", memberGroup);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 获取会员所有标签 */
    async getAllMemberTag(store, storeId) {
      const result = await getMemberTag(storeId);
      if (result.code === 0) {
        // Message({ message: "获取标签成功", type: "success" });
        const memberTag = result.data;
        store.commit("GET_ALL_MEMBERTAG", memberTag);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 创建会员称谓 */
    async createNewMemberAppell(store, { store_id, appellation_name }) {
      const result = await getMemberAppellCreate({
        store_id,
        appellation_name,
      });
      if (result.code === 0) {
        Message({ message: "称谓++成功", type: "success" });
        store.commit("CREATE_NEW_MEMBERAPPELL", { store_id, appellation_name });
      } else {
        this.$message.error(result.msg);
      }
    },
    /* 创建会员分组 */
    async createNewMemberGroup(store, { store_id, group_name }) {
      const result = await getMemberGroupCreate({ store_id, group_name });
      if (result.code === 0) {
        Message({ message: "分组++成功", type: "success" });
        store.commit("CREATE_NEW_MEMBERGROUP", { store_id, group_name });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 创建会员标签 */
    async createNewMemberTag(store, { store_id, tag_name, color }) {
      const result = await getTagCreate({ store_id, tag_name, color });
      if (result.code === 0) {
        Message({ message: "标签++成功", type: "success" });
        store.commit("CREATE_NEWMEMBER_TAG", { store_id, tag_name, color });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 删除所有的会员称谓 */
    async deleteAllMemApple(store, { store_id, id }) {
      const result = await getMemAppleactioDel({ store_id, id });
      if (result.code === 0) {
        Message({ message: "分组删除成功", type: "success" });
        store.commit("DELETE_ALLMEM_APPLE", { store_id, id });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 删除所有的会员分组 */
    async deleteAllNewMemberGroup(store, { store_id, id }) {
      const result = await getMemberGroupDelete({ store_id, id });
      if (result.code === 0) {
        Message({ message: "分组删除成功", type: "success" });
        store.commit("DELETE_ALLNEWMEMBER_GROUP", { store_id, id });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 删除所有的会员标签 */
    async delAllMemberTags(store, { store_id, id }) {
      const result = await getMemberTagDelete({ store_id, id });
      if (result.code === 0) {
        Message({ message: "删除标签--成功", type: "success" });
        store.commit("DEL_ALLMEMBER_TAGS", { store_id, id });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 删除会员table页面的标签 */
    async delMemberTag(store, { store_id, id }) {
      const result = await getMemberTagDel({ store_id, id });
      if (result.code === 0) {
        Message({ message: "删除table标签--成功", type: "success" });
        store.commit("DEL_MEMBER_TAG", { store_id, id });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 修改会员分组 */
    async updateMemberGroup(store, data) {
      const result = await getMemberGroupUpdate(data);
      if (result.code === 0) {
        Message({ message: "修改计次卡成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 修改会员称谓 */
    async updateMemberAppell(store, data) {
      const result = await getMemberAppellUpdate(data);
      if (result.code === 0) {
        Message({ message: "修改计次卡成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 修改会员标签 */
    async updateMemberTags(store, data) {
      const result = await getTagUpdate(data);
      if (result.code === 0) {
        Message({ message: "修改计次卡成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
  },
  mutations: {
    // 更改memberTableData
    EIDT_MEMBERTABLE_DATA(state, data) {
      state.memberTableData = data;
    },
    GET_ALLMEMBERS_LIST(state, memberTableData) {
      state.memberTableData = memberTableData.items;
      state.total = memberTableData.meta.totalCount;
    },
    GET_ALL_MEMBERAPPELL(state, memberAppell) {
      state.memberAppell = memberAppell;
    },
    GET_ALL_MEMBERGROUP(state, memberGroup) {
      state.memberGroup = memberGroup;
    },
    CREATE_NEW_MEMBERAPPELL(state, { store_id, appellation_name }) {
      state.memberAppell = state.memberAppell.push({
        store_id,
        appellation_name,
      });
    },
    CREATE_NEW_MEMBERGROUP(state, { store_id, group_name }) {
      state.memberGroup = state.memberGroup.push({
        store_id,
        group_name,
      });
    },
    GET_ALL_MEMBERTAG(state, memberTag) {
      state.memberTag = memberTag;
    },
    CREATE_NEWMEMBER_TAG(state, { store_id, tag_name, color }) {
      state.memberTag = state.memberTag.push({
        store_id,
        tag_name,
        color,
      });
    },
    /* 删除会员管理列表的标签 */
    DEL_MEMBER_TAG(state, { store_id, id }) {
      console.log(store_id);
      state.memberTag = state.memberTag.filter((tag) => {
        return tag.id !== id;
      });
    },
    DELETE_ALLNEWMEMBER_GROUP(state, { store_id, id }) {
      console.log(store_id);
      state.memberGroup = state.memberGroup.filter((group) => {
        return group.id !== id;
      });
    },
    /* 删除所有的会员标签 */
    DEL_ALLMEMBER_TAGS(state, { store_id, id }) {
      console.log(store_id);
      state.memberTag = state.memberTag.filter((tag) => {
        return tag.id !== id;
      });
    },
    DELETE_ALLMEM_APPLE(state, { store_id, id }) {
      console.log(store_id);
      state.memberAppell = state.memberAppell.filter((apple) => {
        return apple.id !== id;
      });
    },
  },
  getters: {},
};

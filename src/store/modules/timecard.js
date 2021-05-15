import {
  getMemberCountCardList,
  getAllCountCards,
  getCountCardCreate,
  getMemberApplyCard,
  getCountCardDelete,
  getCountCardUpdate,
} from "@api/timecard";
import { Message } from "element-ui";
export default {
  state: {
    memberCardTableData: [], //会员办卡的列表
    timeTableData: [], //计次卡类型的列表
    total: 0,
  },
  actions: {
    /* 获取会员的计次卡分页 */
    async getMemberCardsList(store, storeId) {
      const result = await getMemberCountCardList(storeId);
      // console.log(result)
      if (result.code === 0) {
        Message({ message: "会员办卡列表", type: "success" });
        const memberCardTableData = result.data;
        store.commit("GET_MEMBER_CARDSLIST", memberCardTableData);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 获取所有计次卡 */
    async getAllCards(store, storeId) {
      const result = await getAllCountCards(storeId);
      if (result.code === 0) {
        Message({ message: "计次卡类型列表", type: "success" });
        const timeTableData = result.data;
        console.log(timeTableData);
        store.commit("GET_ALLCARDS", timeTableData);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 添加计次卡 没有mutations函数,不需要改变数据*/
    async getCountCardsAdd(store, data) {
      const result = await getCountCardCreate(data);
      if (result.code === 0) {
        Message({ message: "计次卡++成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 会员办计次卡 */
    async getHandletMemberCards(store, data) {
      const result = await getMemberApplyCard(data);
      if (result.code === 0) {
        Message({ message: "会员办卡++成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 删除计次卡 */
    async getHandleDelCard(store, data) {
      const result = await getCountCardDelete(data);
      if (result.code === 0) {
        Message({ message: "计次卡删除成功", type: "success" });
        store.commit("GET_HANDLEDEL_CARD", data);
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
    /* 修改计次卡 */
    async getCountCardsUpdate(store, data) {
      const result = await getCountCardUpdate(data);
      if (result.code === 0) {
        Message({ message: "修改计次卡成功", type: "success" });
      } else {
        Message({ message: result.msg, type: "error" });
      }
    },
  },
  mutations: {
    // 更改memberCardTableData
    EIDT_MEMBERCARD_TABLEDATA(state, data) {
      state.memberCardTableData = data;
    },
    GET_MEMBER_CARDSLIST(state, memberCardTableData) {
      state.memberCardTableData = memberCardTableData.items;
      state.total = memberCardTableData.meta.totalCount;
    },
    GET_ALLCARDS(state, timeTableData) {
      state.timeTableData = timeTableData;
    },
    GET_HANDLEDEL_CARD(state, data) {
      state.timeTableData = state.timeTableData.filter((time) => {
        return time.id !== data.id;
      });
    },
  },
  getters: {},
};

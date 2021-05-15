import request from "@utils/request.js";

//#region 会员办卡
//获取会员的计次卡分页(计次卡管理页面进去表格)
export const getMemberCountCardList = (data) => {
  return request({
    method: "post",
    url: "/member-count-card/index",
    data,
  });
};

//会员办计次卡
export const getMemberApplyCard = (data) => {
  return request({
    method: "post",
    url: "/member-count-card/apply",
    data,
  });
};

//会员计次卡充值
export const getMemberCardReCharge = (data) => {
  return request({
    method: "post",
    url: "/member-count-card/recharge",
    data,
  });
};
//#endregion

//#region 计次卡
//获取所有计次卡(点击卡管理类型展示的表格)
export const getAllCountCards = (data) => {
  return request({
    method: "post",
    url: "/count-card/all",
    data,
  });
};

//创建计次卡
export const getCountCardCreate = (data) => {
  return request({
    method: "post",
    url: "/count-card/create",
    data,
  });
};

//删除计次卡
export const getCountCardDelete = (data) => {
  return request({
    method: "post",
    url: "/count-card/delete",
    data,
  });
};

//修改计次卡
export const getCountCardUpdate = (data) => {
  return request({
    method: "post",
    url: "/count-card/update",
    data,
  });
};
//#endregion

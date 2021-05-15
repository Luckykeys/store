import request from "@/utils/request";

//获取会员分页 List
export const getMemberList = (data) => {
  return request({
    url: "/member/index",
    method: "post",
    data,
  });
};

//搜索会员 search
export const getMemberSearch = (data) => {
  return request({
    url: "/member/search",
    method: "post",
    data,
  });
};

//获取会员详情 Info
export const getMemberInfo = (data) => {
  return request({
    method: "post",
    url: "/member/view",
    data,
  });
};

//获取会员自增卡号 Increment
export const getAutoIncrement = (data) => {
  return request({
    method: "post",
    url: "/member/get-auto-increment-member-card-number",
    data,
  });
};

//新增会员 AddNew
export const getNewMember = (data) => {
  return request({
    method: "post",
    url: "/member/create",
    data,
  });
};

//批量删除会员 DelMember
export const delMembers = (data) => {
  return request({
    method: "post",
    url: "/member/batch-delete",
    data,
  });
};

//批量移动分组 BatchGroup
export const batchGroup = (data) => {
  return request({
    method: "post",
    url: "/member/batch-set-group",
    data,
  });
};

//批量打标签 BatchTag
export const batchTag = (data) => {
  return request({
    method: "post",
    url: "/member/batch-add-tag",
    data,
  });
};

//批量积分清零
export const batchIntegral = (data) => {
  return request({
    method: "post",
    url: "/member/batch-integral-to-zero",
    data,
  });
};

//#region 会员标签
//获取会员标签 Tag
export const getMemberTag = (data) => {
  return request({
    method: "post",
    url: "/member-tag/all",
    data,
  });
};

//创建会员标签 CreateTag
export const getTagCreate = (data) => {
  return request({
    method: "post",
    url: "/member-tag/create",
    data,
  });
};

//修改会员标签 CreateTag
export const getTagUpdate = (data) => {
  return request({
    method: "post",
    url: "/member-tag/update",
    data,
  });
};

//删除所有会员标签
export const getMemberTagDelete = (data) => {
  return request({
    method: "post",
    url: "/member-tag/delete",
    data,
  });
};

//在会员管理页面table中删除会员标签 Tag
export const getTableTagDel = (data) => {
  return request({
    method: "post",
    url: "/member/delete-tag",
    data,
  });
};
//#endregion

//#region 会员称谓
//获取会员称谓 Appell
export const getMemberAppellation = (data) => {
  return request({
    method: "post",
    url: "/member-appellation/all",
    data,
  });
};

//创建会员称谓  CreateAppell
export const getMemberAppellCreate = (data) => {
  return request({
    method: "post",
    url: "/member-appellation/create",
    data,
  });
};

//修改会员称谓 
export const getMemberAppellUpdate = (data) => {
  return request({
    method: "post",
    url: "/member-appellation/update",
    data,
  });
}; 

//删除所有会员称谓
export const getMemAppleactioDel = (data) => {
  return request({
    method: "post",
    url: "/member-appellation/delete",
    data,
  });
};
//#endregion

//#region 会员分组
//获取会员分组 Group
export const getMemberGroup = (data) => {
  return request({
    method: "post",
    url: "/member-group/all",
    data,
  });
};

//创建会员分组 CreateGroup
export const getMemberGroupCreate = (data) => {
  return request({
    method: "post",
    url: "/member-group/create",
    data,
  });
};

//修改会员分组
export const getMemberGroupUpdate = (data) => {
  return request({
    method: "post",
    url: "/member-group/update",
    data,
  });
};

//删除会员组
export const getMemberGroupDelete = (data) => {
  return request({
    method: "post",
    url: "/member-group/delete",
    data,
  });
};
//#endregion

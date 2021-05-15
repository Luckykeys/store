<template>
  <div class="personal-stores">
    <div class="top-title">
      <div class="title-logo">
        <img src="@/assets/images/shop-default.png" alt="" />
      </div>
      <div class="title-info">
        <span>生意专家</span>
        <i class="iconfont icon-quan"></i>
      </div>
    </div>
    <div class="store-text">
      <table border="1" class="table-shop-brief">
        <tbody>
          <tr>
            <td>手机号码：</td>
            <td class="userphone">136-8714-0462</td>
            <td class="text-linking">修改</td>
          </tr>
          <tr>
            <td>电子邮箱：</td>
            <td class="useremail">
              <span class="nulltipe">您还没有填写</span>
            </td>
            <td class="text-linking">添加</td>
          </tr>
          <tr>
            <td>有效期：</td>
            <td class="userrenew">通用零售版 已过期</td>
            <td class="text-linking"></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="store-info">
      <div class="nav-info">
        <span class="word">店铺基本信息</span>
        |
        <span>
          <a href="" class="updateInfo">修改店铺信息</a>
        </span>
      </div>
      <table border="1" class="table-shop-brief">
        <tbody>
          <tr>
            <td>店铺名称：</td>
            <td class="accname">生意专家</td>
          </tr>
          <tr>
            <td>店主姓名</td>
            <td class="username">小姜</td>
          </tr>
          <tr>
            <td>店铺简称：</td>
            <td class="accshortname">餐饮设施</td>
          </tr>
          <tr>
            <td>店铺电话：</td>
            <td class="usertel"></td>
          </tr>
          <tr>
            <td>店铺地址：</td>
            <td class="accaddress"></td>
          </tr>
          <tr>
            <td>行业类型：</td>
            <td class="shoptype">
              <span class="nulltipe">您还没有填写</span>
            </td>
          </tr>
          <tr>
            <td>注册时间：</td>
            <td class="regdate">2021-04-01</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      tableData: [],
    };
  },
};
</script>

<style lang="less" scoped>
.personal-stores {
  .top-title {
    display: flex;
    height: 40px;
    .title-logo {
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }
    .title-info {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      span {
        font-size: 14px;
        line-height: 14px;
      }
      i {
        margin-top: 5px;
        font-size: 18px;
        color: #f93939;
      }
    }
  }
  .store-text {
    margin: 20px 0px;
    .table-shop-brief {
      border: 1px solid #d9d9d9;
      width: 100%;
      max-width: 100%;
    }
    .table-shop-brief tbody tr td {
      padding: 12px 18px;
      color: #666;
      font-size: 14px;
      border: 1px solid #ddd;
      .nulltipe {
        color: #ccc;
        font-size: 12px;
      }
    }
    .text-linking {
      width: 90px;
      text-align: center;
    }
    .table-shop-brief tbody tr td:first-child {
      width: 110px;
    }
  }
  .store-info {
    .nav-info {
      margin-bottom: 20px;
      font-size: 14px;
      .word {
        line-height: 14px;
        margin-right: 10px;
      }
      .updateInfo {
        color: #1482f3;
        margin-left: 10px;
      }
    }
    .table-shop-brief {
      border: 1px solid #d9d9d9;
      width: 100%;
      max-width: 100%;
    }
    .table-shop-brief tbody tr td {
      padding: 12px 18px;
      color: #666;
      font-size: 14px;
      border: 1px solid #ddd;
      .nulltipe {
        color: #ccc;
        font-size: 12px;
      }
    }
    .table-shop-brief tbody tr td:first-child {
      width: 110px;
    }
  }
}
</style>

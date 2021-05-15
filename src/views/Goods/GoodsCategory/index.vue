<template>
  <div>
    <!-- 商品分类列表 -->
    <div class="category-top">
      <el-button icon="el-icon-plus" @click="addCategory">添加分类</el-button>
      <el-autocomplete
        size="small"
        clearable
        prefix-icon="el-icon-search"
        popper-class="my-autocomplete"
        v-model="state"
        :trigger-on-focus="false"
        placeholder="卡号、手机号、姓名"
      >
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.phone }}</span>
        </template>
      </el-autocomplete>
    </div>
    <el-table :data="goodsCategoryList" style="width: 100%" size="small">
      <el-table-column type="expand">
        <template>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="大分类"
        prop="category_name"
        width="600px"
      ></el-table-column>
      <el-table-column label="分布" prop="goods_num">
        <template slot-scope="scope">
          <span
            >{{ scope.row.goods_num }}个小分类,{{
              scope.row.goods_num
            }}种商品</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="success" icon="el-icon-upload2" size="mini"
          >置顶</el-button
        >
        <el-button type="warning" icon="el-icon-edit" size="mini"
          >修改名称</el-button
        >
        <el-button type="danger" icon="el-icon-delete" size="mini"
          >删除大分类</el-button
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "",
  data() {
    return {
      listLoading: false,
      state: "",
      activeNames: ["1"],
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
      // goodsCategoryList: [],
    };
  },
  created() {
    this.getProductCategory();
  },
  computed: {
    ...mapState({
      goodsCategoryList: (state) => state.goods.goodsCategoryList,
    }),
  },
  methods: {
    ...mapActions(["getProductGoodsCategoryList"]),
    /* 获取商品分类列表 */
    async getProductCategory() {
      this.listLoading = true;
      await this.getProductGoodsCategoryList({ store_id: 1 });
      this.listLoading = false;
    },
    addCategory() {
      console.log("添加分类");
    },
    handleChange(val) {
      console.log(val);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style lang="less" scoped>
.category-top {
  margin-bottom: 20px;
  display: flex;
  height: 32px;
  .el-button {
    padding: 6px 15px;
    background-color: #ff6a3c;
    color: #fff;
    border-color: #ff6a3c;
    margin-right: 10px;
    border-radius: 0;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

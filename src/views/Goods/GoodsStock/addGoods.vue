<template>
  <el-card>
    <el-page-header @back="goBack" content="添加商品"></el-page-header>
    <el-tabs class="myAddTabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="普通商品" name="first">
        <el-form
          ref="addGoodsForm"
          :rules="rules"
          :model="addGoodsForm"
          label-width="80px"
          size="mini"
        >
          <el-form-item label="商品条码" prop="goods_barcode">
            <el-input v-model="addGoodsForm.goods_barcode"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goods_name">
            <el-input v-model="addGoodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品售价" prop="goods_price">
            <el-input v-model="addGoodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品进价" prop="goods_cost">
            <el-input v-model="addGoodsForm.goods_cost"></el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_stock">
            <el-input v-model="addGoodsForm.goods_stock"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" prop="pictures">
            <!-- Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API -->
            <!--
              file-list: 指定显示的图片列表数组 [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
              action: 指定上传图片的路径
              list-type: 指定图片列表的风格样式
              on-preview: 指定点击预览大图的回调函数
              on-remove: 点击删除的回调函数
            -->
            <el-upload
              :action="`${$BASE_API}goods-pictures/create`"
              list-type="picture-card"
              :file-list="pictures"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              name="pictures"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="addGoodsForm.pictures" alt="" />
            </el-dialog>
            <span>只能上传jpg/png文件，且不超过50kb</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select
              v-model="addGoodsForm.goods_category_id"
              placeholder="请选择大分类"
            >
              <el-option
                v-for="bigC in goodsCategoryList"
                :key="bigC.id"
                :label="bigC.category_name"
                :value="bigC.id"
              ></el-option>
              <el-option
                label="新增大分类"
                value="addGoodsForm.goods_category_id"
                @click.native="addBigCategory"
              ></el-option>
            </el-select>
            <el-select
              v-model="addGoodsForm.goods_category_id"
              placeholder="请选择小分类分类"
            >
              <el-option
                v-for="bigC in goodsCategoryList"
                :key="bigC.id"
                :label="bigC.category_name"
                :value="bigC.id"
              ></el-option>
              <el-option
                label="新增小分类"
                value="addGoodsForm.goods_category_id"
                @click.native="addBigCategory"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-input v-model="addGoodsForm.goods_specs"></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-select
              v-model="addGoodsForm.goods_specs_unit"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品折扣">
            <el-select
              v-model="addGoodsForm.goods_discount"
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="1"></el-option>
              <el-option label="区域二" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input v-model="addGoodsForm.goods_stock_warn"></el-input>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input v-model="addGoodsForm.goods_desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addGoodsForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('addGoodsForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <el-dialog
          title="收货地址"
          :visible.sync="dialogFormVisible"
          width="30%"
        >
          <el-form :model="addCategoryForm" size="mini">
            <el-form-item label="大分类名称" :label-width="formLabelWidth">
              <el-input
                v-model="addCategoryForm.category_name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="小分类名称" :label-width="formLabelWidth">
              <el-input
                v-model="addCategoryForm.children"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCategories">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  getGoodsCreate,
  getGoodsExist,
  getGoodsCategoryCreate,
} from "@api/goods";
export default {
  name: "",
  props: ["backProductList"],
  data() {
    return {
      activeName: "first",
      addGoodsForm: {},
      allImageList: [],  //上传得所有的图片
      addCategoryForm: {},
      value: "",
      formLabelWidth: "100px",
      dialogFormVisible: false,
      dialogVisible: false, //图片对话框显示还是隐藏
      dialogImageUrl: "", //点击显示放大的图片地址
      rules: {
        goods_barcode: [
          { required: true, validator: this.goodsBarcodeValidator },
        ],
        goods_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在2 到 5 个字符", trigger: "blur" },
        ],
        /* 自定义校验 */
        pictures: [{ required: true, validator: this.picturesValidator }],
      },
    };
  },
  computed: {
    ...mapState({
      goodsCategoryList: (state) => state.goods.goodsCategoryList,
    }),
    //格式图片
    //要对这里传入的图片对应的值做处理，因为element中所对应的值和我们的数据值的名字不一样
    //map 长度不变值变
    pictures() {
      return this.allImageList.map((item) => {
        return {
          uid: item.uid || item.id,
          name: item.imgName,
          url: item.imgUrl,
        };
      });
    },
  },
  created() {
    this.getAllCategory();
  },
  methods: {
    ...mapActions(["getProductGoodsCategoryList", "createGoodsCategory"]),
    goBack() {
      this.backProductList();
    },
    /* 新增大分类 */
    addBigCategory() {
      this.dialogFormVisible = true;
    },
    /* 获取商品分类 */
    async getAllCategory() {
      await this.getProductGoodsCategoryList({
        store_id: 1,
      });
    },
    async addCategories() {
      const data = this.addCategoryForm;
      console.log(data);
      const result = await getGoodsCategoryCreate(data);
      console.log(result);
    },
    async goodsBarcodeValidator(rule, value, callback) {
      console.log(rule);
      const goods_barcode = value;
      const result = await getGoodsExist({
        store_id: 1,
        goods_barcode,
      });
      if (result.code === 0) {
        this.$message.success("检测成功");
      } else {
        callback(new Error(result.msg));
      }
    },
    //校验图片至少要上传一张
    picturesValidator(rule, value, callback) {
      console.log(rule, value, callback);
      if (this.allImageList.length > 0) {
        callback();
        return;
      }
      callback(new Error("请至少上传一张图片"));
    },
    //处理图片的放大函数
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传之前触发的函数
    beforeAvatarUpload(file) {
      // console.log(file.type);
      const imgTypes = ["image/jpeg", "image/jpg", "image/png"]; //图片的类型
      //检测文件类型
      const isMyTypes = imgTypes.indexOf(file.type) > -1;
      //检测图片大小是否是小于50kB
      const isLt = file.size / 1024 < 50;
      if (!isMyTypes) {
        this.$message.error("上传SPU图片只能是 JPG/PNG 格式!");
      }
      if (!isLt) {
        this.$message.error("上传SPU图片大小不能超过 2MB!");
      }
      return isMyTypes && isLt;
    },
    //上传成功后触发的函数
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.allImageList.push({
        uid: file.uid,
        imgName: file.name,
        imgUrl: file.url,
      });
      console.log(this.allImageList);
    },
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.allImageList = this.allImageList.filter((img) => {
        return img.imgUrl !== file.url;
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    /* 添加商品 */
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.addGoodsForm);
          const data = this.addGoodsForm;
          data.store_id = 1;
          data.pictures = this.allImageList.map((item) => {
            return item.imgUrl;
          });
          // console.log(arr)
          console.log(data.pictures);
          // data.pictures = JSON.stringify(data.pictures);
          data.pictures = data.pictures.replaceAll(" ", "");
          console.log(data.pictures);

          console.log(data.pictures);
          const result = await getGoodsCreate(data);
          if (result.code === 0) {
            this.$message.success("新增会员成功");
            this.backProductList();
          } else {
            this.$message.error(result.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      console.log(tab.name, event);
      if (tab.name === "first") {
        this.addGoodsForm.goods_type = 1;
      } else {
        this.addGoodsForm.goods_type = 2;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.myAddTabs {
  margin: 15px 0px;
  /deep/.el-tabs__item {
    height: 37px;
    line-height: 37px;
    font-size: 14px;
  }
  /deep/.el-tabs__item.is-active {
    background-color: #fff;
    color: #000;
    border-bottom-color: #a8dd18;
  }
  /deep/.el-tabs--card > .el-tabs__header {
    border-bottom: 1px solid #c8043a;
  }
  /deep/.el-input {
    width: 300px;
  }
  /deep/.el-upload--picture-card {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 60px;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 50px;
    height: 50px;
  }
}
</style>

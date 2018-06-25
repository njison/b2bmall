<template>
  <div class="gray-box">
    <el-tabs type="border-card">
      <el-tab-pane label="商品信息">
        <el-table  :data="product.skuAttrValDtos" border style="width: 100%">
        <el-table-column prop="attrName" label="属性" width="300">
        </el-table-column>
        <el-table-column prop="attrValueName" label="参数" width="886">
        </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="供货商信息">
        <div class="tableStyle" style="width: 300px;">供货商</div>
        <div class="tableStyle" style="width: 886px;">{{product.venderName}}</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { goodsDetail, addCart } from '/api/goods'
  import { getStore } from '/utils/storage'
  export default {
    data() {
      return {
        vendorData: [],
        productData:[],
        userId: '',
        product: []
      }
    },

    methods: {
      _productDet (goodsId) {
        let params={
          goodsDto:{
            goodsId:goodsId
          }
        }
        goodsDetail(params).then(res => {
          if(res.code=='success'){
            this.product = res.goodsDto
          }
        })
      }
    },
    components: {
    },
    created () {
      let id = this.$route.query.goodsId
      this._productDet(id)
      this.userId = getStore('userId')
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    border:0px;
    border-radius:8px;
  }
  .tableStyle{
    float:left;
    border: 1px solid #ebeef5;
    padding: 10px;
  }
</style>

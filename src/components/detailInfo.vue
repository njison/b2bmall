<template>
  <div class="gray-box">
   <el-tabs type="border-card">
  <el-tab-pane label="商品信息">

   <el-table  :data="productData" border style="width: 100%">
      <el-table-column prop="attribute" label="属性" width="300">
      </el-table-column>
      <el-table-column prop="dataInfo" label="参数" width="886">
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <el-tab-pane label="供货商信息">
    <el-table :data="vendorData" border style="width: 100%">
      <el-table-column prop="attribute" label="属性" width="300">
      </el-table-column>
      <el-table-column prop="dataInfo" label="参数" width="886">
      </el-table-column>
    </el-table>
  </el-tab-pane>
</el-tabs>
  </div>
</template>
<script>
  import { productDet, addCart } from '/api/goods'
  import { getStore } from '/utils/storage'
  export default {
    data() {
      return {
        vendorData: [],
        productData:[],
        userId: ''
      }
    },

    methods: {
      _productDet (productId) {
        productDet({params: {productId}}).then(res => {
          let result = res.result.data
          this.productData = result.productData
          this.vendorData = result.vendorData
        })
      }
    },
    components: {
    },
    created () {
      let id = this.$route.query.productId
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
</style>

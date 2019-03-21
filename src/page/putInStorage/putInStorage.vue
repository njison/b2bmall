<template>
  <div>
    <section class="w mt30 clearfix">
      <y-shelf title="串号列表">

        <div slot="content" class="table" v-loading="loading" element-loading-text="加载中...">
          <!--<el-input placeholder="串号" v-model="input3" style="width: 300px;position: absolute;top: 10px;right: 20px;z-index:10000;">-->
            <!--<template slot="prepend">串号</template>-->
          <!--</el-input>-->
          <el-table border :data="returnOrderList" stripe style="width: 90% "  @current-change="handleCurrentChange1">
            <!--<el-table-column label="" align="center">-->
              <!--<template slot="prepend">-->
                <!--<el-checkbox v-model="checked"></el-checkbox>-->
              <!--</template>-->

            <!--</el-table-column>-->
            <el-table-column style="width:225px;" prop="serialNo" label="串号" align="center"></el-table-column>
            <el-table-column prop="goodsId" label="商品编码" align="center"> </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="venderName" label="供货商" align="center"></el-table-column>
            <!--<el-table-column prop="time" label="资源状态" align="center"></el-table-column>-->
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </y-shelf>
    </section>
    <div style="width: 175px;margin: 0 auto">
      <img src="../../../static/images/downall1.png" @click="downall" alt="" width="40">
      <img src="../../../static/images/down1.png" @click="downOne" alt="" width="40">
      <!--<img v-else="isAllReturn==true" src="../../../static/images/down1.png" alt="" width="40">-->
      <img src="../../../static/images/upall1.png" @click="upall" alt="" width="40">
    </div>
    <section class="w mt30 clearfix">
      <y-shelf title="待退货串号">
        <div slot="content" class="table" v-loading="loading" element-loading-text="加载中...">
          <!--<el-input placeholder="串号" v-model="input3" style="width: 300px;position: absolute;top: 10px;right: 20px;z-index:10000;">-->
            <!--<template slot="prepend">串号</template>-->
          <!--</el-input>-->
          <el-table @current-change="handleCurrentChange1" border :data="returnData"  style="width: 90%">
            <el-table-column style="width:225px;" prop="serialNo" label="串号" align="center"></el-table-column>
            <el-table-column prop="goodsId" label="商品编码" align="center"> </el-table-column>
            <el-table-column prop="goodsName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="venderName" label="供货商" align="center"></el-table-column>
            <!--<el-table-column prop="time" label="资源状态" align="center"></el-table-column>-->
            <el-table-column  label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalReturn">
          </el-pagination>
          <!--<el-form-item label="退货原因">-->
            <!--<el-input type="textarea"></el-input>-->
          <!--</el-form-item>-->
        </div>
      </y-shelf>
    </section>
    <div class="w mt30 clearfix">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="退货原因" required>
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin: 20px auto;width: 160px;">
      <el-button type="primary" style="right: 10px" @click="subReturnGoods">提交</el-button>
      <!--<el-button type="info" plain>返回</el-button>-->
    </div>
  </div>
</template>
<script>
  import { getDocketId, getReturnOrderList, returnGoods, getApplyOperId } from '/api/index.js'
  import YShelf from '/components/shelf'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        totalReturn:0,
        loading: true,
        checked: true,
        input3:'',
        orderId:'',
        docketId:'',
        returnOrderList:[],
        returnData:[],
        returnList:[],
        venderId:'',
        warehouseId:'',
        goodsSkuId:'',
        staffId:'',
        currentRow:'',
        isAllReturn:false,
        form: {
         reason:''
        }


      }
    },
    methods: {
      messageSuccess (m) {
        this.$message({
          message: m,
          type: 'success'
        })
      },
      message (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.loading = true
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
//        console.log (this.$refs.singleTable.setCurrentRow(row))
      },
      handleCurrentChange1(val) {
        this.currentRow = val;
//        console.log(this.currentRow)
      },
      _getApplyOperId(){
        getApplyOperId().then(res => {
          if(res){
            if (res.code == 'success'){
                this.staffId  = res.staffId
            }
          }
        })
      },
      _getReturnOrderList(){
        let params = {
          orderId:this.docketId,
          rsType:60
        }
        getReturnOrderList(params).then(res => {
          if(res){
            if (res.code == 'success'){
              this.loading = false
              this.total = res.inGoodsInsts.length
              this.returnOrderList = res.inGoodsInsts
              this.venderId = res.venderId
              this.warehouseId = res.warehouseId

            }
          }
        })
      },
      downOne(){
          if(this.isAllReturn){
            this.message('已选全部退货 !')
          }else{
            if(this.currentRow != '' && this.currentRow != null){
              if(this.currentRow.rsState=='60_100'){
                this.returnData.push(this.currentRow)
              }else{
                this.message('设备串码状态非可用!')
              }
              this.totalReturn = this.returnData.length
            }else{
              this.message('请选择要退货的商品 !')
            }
          }


      },
      downall(){
        var addNum = 0
        for(var i =0;i<this.returnOrderList.length;i++){
            if(this.returnOrderList[i].rsState=='60_100'){
              addNum++
              if(addNum==this.returnOrderList.length){
                this.returnData = this.returnOrderList
                this.isAllReturn = true
              }

            }else{
              this.message('设备串码状态非可用!')
            }
        }
        this.totalReturn = this.returnData.length

      },
      upall(){
          this.returnData = []
          this.totalReturn = this.returnData.length
      },
      deleteRow(index) {
        this.returnData.splice(index, 1);
        this.isAllReturn = false
        this.totalReturn = this.returnData.length
        this._getReturnOrderList()
      },
      subReturnGoods(){
          if(this.form.reason == ''){
            this.message('请填写退库原因!')
          }else if(this.returnData.length==0){
            this.messageSuccess('请选择要退库的商品!')
          }
          else{
            var channelRefundGoodsDtoList = []
            for (var i = 0; i < this.returnData.length; i++) {
              var obj = {};
              obj.applyOperId = this.staffId;
              obj.refundReason =this.form.reason;
              obj.refundState = 1;
              obj.venderId =this.venderId;
              obj.serialNo =this.returnData[i].serialNo;
              obj.skuId = this.returnData[i].goodsId;
              obj.skuName = this.returnData[i].goodsName;
              obj.rsType = 60;
              obj.instId= this.returnData[i].instId;
              obj.goodsSkuId =this.returnData[i].skuId;
              obj.warehouseId = this.warehouseId;
              obj.regionId = this.returnData[i].regionId;
              obj.orderType = 3;
//              userCode = getStore('userCode'),
              channelRefundGoodsDtoList.push(obj);
            }
            var params = {
              channelRefundGoodsDtoList:channelRefundGoodsDtoList
            }
            returnGoods(params).then(res => {
              if(res){
                if (res.code == 'success'){
                  if (res.code == 'success'){
                    this.messageSuccess('退库成功!')
                    this.$router.push({path: 'order'})
                  }else{
                    this.message('退库失败!')
                  }
                }
              }
            })
          }

      }

    },
    mounted () {
      this.orderId = this.$route.query.orderId
      this.docketId =this.$route.query.docketId
//      this._getDocketId()
      this._getReturnOrderList()
      this._getApplyOperId()

    },
    created(){

    },
    components: {
      YShelf,
      product,
      mallGoods
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .sk_item {
    width: 170px;
    height: 225px;
    padding: 0 14px 0 15px;
    > div {
      width: 100%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    img {
      width: 130px;
      height: 130px;
      margin: 17px 0;
    }
    .sk_item_name {
      color: #999;
      display: block;
      max-width: 100%;
      _width: 100%;
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      height: 32px;
      line-height: 16px;
      word-wrap: break-word;
      word-break: break-all;
    }
    .sk_item_price {
      padding: 3px 0;
      height: 25px;
    }
    .price_new {
      font-size: 18px;
      font-weight: 700;
      margin-right: 8px;
      color: #f10214;
    }
    .price_origin {
      color: #999;
      font-size: 12px;
    }
  }

  .box {
    overflow: hidden;
    position: relative;
    z-index: 0;
    margin-top: 29px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .14);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);

  }

  ul.box {
    display: flex;
    li {
      flex: 1;
      img {
        display: block;
        width: 305px;
        height: 200px;
      }
    }
  }

  .mt30 {
    margin-top: 30px;
  }

  .hot {
    display: flex;
    > div {
      flex: 1;
      width: 25%;
    }
  }

  .table {
    align-items: center;
    display: flex;
    flex-direction: column;
    p{
      font-size: 18px;
      margin-top: 2vw;
      // color: #5683EA;
    }
    .el-table{
      // margin: 5vw 8vw 2vw 8vw;
      margin: 2vw 0 2vw 0vw;
    }
    .el-pagination{
      align-self: flex-end;
      margin: 0 3.5vw 2vw;
    }
  }

  .donate {
    // align-items: center;
    display: flex;
    flex-direction: column;
    margin: 1vw 3vw 2vw 3vw;
    p{
      font-size: 16px;
      margin-top: 1vw;
    }
  }

  .floors {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .imgbanner {
      width: 50%;
      height: 430px;
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .box{
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    /*height: 200px;*/
  }
</style>

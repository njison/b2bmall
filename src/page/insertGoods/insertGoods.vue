<template>
  <div>
    <section class="w mt30 clearfix">
      <y-shelf title="商品列表">
        <div slot="content" class="table" v-loading="loading" element-loading-text="加载中...">
          <el-table border :data="orderList" stripe style="width: 90%"   highlight-current-row
                    @current-change="handleCurrentChange1">
            <el-table-column  prop="goodsId" label="商品编码" align="center"></el-table-column>
            <el-table-column  prop="goodsName" label="商品名称" align="center"> </el-table-column>
            <el-table-column  prop="goodsNum" label="订单数量" align="center"></el-table-column>
            <!--<el-table-column  prop="info" label="实际数量" align="center"></el-table-column>-->
            <el-table-column  prop="colorName" label="颜色" align="center"></el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalOrderList">
          </el-pagination>
        </div>
      </y-shelf>
    </section>
    <div class="w box mt30 ">
      <div style="width: 90%;margin: 20px auto">
        <el-input
          placeholder="商品名称"
          v-model="addGoodsName"
          clearable style="width: 50%">
        </el-input>
        <el-input
          placeholder="导入串号"
          v-model="serialNo"
          clearable style="margin-top: 20px;width: 50%">
        </el-input>
        <el-button type="primary"  @click="_subImei">新增</el-button>

      </div>

    </div>

    <section class="w mt30 clearfix">
      <y-shelf title="入库明细">
        <div slot="content" class="table" v-loading="loading" element-loading-text="加载中...">
          <el-table border :data="insertData" stripe style="width: 90%">
            <el-table-column  prop="serialNo" label="IMEI" align="center"></el-table-column>
            <!--<el-table-column  prop="" label="副IMEI" align="center"> </el-table-column>-->
            <!--<el-table-column  prop="money" label="商品编码" align="center"></el-table-column>-->
            <el-table-column  prop="skuName" label="商品名称" align="center"></el-table-column>
            <el-table-column  prop="colorName" label="颜色" align="center"></el-table-column>
            <el-table-column  label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, insertData)"
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
            :total="total">
          </el-pagination>
        </div>
      </y-shelf>
    </section>
    <div style="margin: 20px auto;width: 160px;">
      <el-button type="primary" style="right: 10px" @click="_sub">提交</el-button>
      <el-button type="info" plain>返回</el-button>
    </div>
  </div>
</template>
<script>
  import { getOrderList, goodsDetail } from '/api/goods'
  import { subImei, subGoods, getWareHouse} from '/api/index.js'
  import YShelf from '/components/shelf'
  import product from '/components/product'
  import mallGoods from '/components/mallGoods'
  import { getStore } from '/utils/storage'
//  require('../../../static/changyan/jquery.min.js')
  export default {
    data () {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        serialNo:'',
        loading: false,
        uploadForm: new FormData(),
        insertData:[],
        orderList:[],
        goodsId:'',
        product:[],
        goodsName:[],
        addGoodsName:'',
        currentRow:'',
        realNum:0,
        checkNum:false,
        orderId:'',
        venderId:'',
        insertTmpList:new Array(),
        userCode:'',
        totalOrderList:0

      }
    },
    watch:{
      addGoodsName(){
          if(this.addGoodsName==''){
              this.setCurrent(row)
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
        this._subImei()
        this.loading = true
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._subImei()
        this.loading = true
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange1(val) {
        this.currentRow = val;
        this.serialNo = ''
        this.addGoodsName = this.currentRow.goodsName
//        console.log(this.currentRow)
      },
      _getWareHouse(){
          let params = {
//            orgId: getStore('orgId'),
            state: "1",
            isRack:"0",
            type:"1"

        }
        getWareHouse(params).then(res => {

        })
      },
      _getOrderDet () {
        let params = {
          orderDto: {
            orderId: this.orderId
          },
          pageNum:1,
          pageSize:9999999
        }
        getOrderList(params).then(res => {
          if(res){
            if (res.code == 'success'){
              this.loading=false
              this.orderList = res.orderDtoList[0].orderItemDtoList
              this.venderId = res.orderDtoList[0].venderId
              this.totalOrderList = this.orderList.length
            }
          }
        })

      },
      _subImei(){
        let params = {
            serialNo:this.serialNo,
            col12:this.venderId ,
            orderId:this.currentRow.orderId,
            rsType:60,
            skuId:this.currentRow.skuId
        }
        subImei(params).then(res => {
          if(res){
            if (res.code == 'success'){
              if(this.serialNo==''){
                this.message('请输入imei!')
              }else if(this.orderId==''){
                this.message('请选择机型!')
              }else if(res.objInsts.length==0){
                this.message('请确认串码是否正确!')
              }else{
                this.messageSuccess('新增成功!')
                var orderItem = res.objInsts[0];

//                往orderList里面插入instId
                var instId = orderItem.instId
                let params = {
                  orderDto: {
                    orderId: this.orderId
                  },
                  pageNum:1,
                  pageSize:9999999
                }

                getOrderList(params).then(res => {
                  if(res){
                    if (res.code == 'success'){
                      for (var i = 0; i < this.orderList.length; i++) {
                          if(this.orderList[i].goodsName==this.currentRow.goodsName){
                            this.orderList[i].instId = instId
                            this.orderList[i].serialNo = this.serialNo

                          }
                      }
                    }
                  }
                })
                //                往orderList里面插入instId end
                //wk begin
                var insertTmp = []
                insertTmp.goodsName = this.currentRow.goodsName

                insertTmp.serialNo = this.currentRow.serialNo
                insertTmp.num =1

                if (this.insertTmpList.length ==0) {
                  //list为空时，直接新增
                  this.insertTmpList.push(insertTmp)
                } else {
                    var pushFlag = true;
                  for (var j = 0; j < this.insertTmpList.length; j++) {
                    if (this.insertTmpList[j].goodsName == insertTmp.goodsName) {
                      this.insertTmpList[j].num +=1
                      pushFlag = false
                    }
                  }

                  if (pushFlag) {
                    this.insertTmpList.push(insertTmp)
                  }

                }
                orderItem.goodsName = this.currentRow.goodsName
                this.insertData.push(orderItem)
                this.loading = false
                this.total = this.insertData.length

              }

            }
          }
        })

      },
      _sub(){
          var insertFlag = 0
        //循环商品明细列表
        for (var i = 0; i < this.orderList.length; i++) {
              //与构建的list循环比较
          if (this.insertTmpList.length > 0 && this.insertTmpList.length == this.orderList.length) {
            for (var j = 0; j < this.insertTmpList.length; j++) {
              if (this.insertTmpList[j].goodsName == this.orderList[i].goodsName ) {
                if(this.insertTmpList[j].num == this.orderList[i].goodsNum) {
                      insertFlag += 0
              }else
              {
                insertFlag += 1
              }
              }
            }
          } else {
            insertFlag += 1

          }

        }
        if (insertFlag>0) {
          this.message('入库不正确!')
        } else {
          console.log('可以提交')
          var batchImportCode = new Date().getTime();
          var excelLists = []
          var goodsId = ''
          var orderId = ''
//          var arr = [];
          for (var i = 0; i < this.orderList.length; i++) {
            goodsId = this.orderList[i].goodsId
            orderId = this.orderList[i].orderId
              for(var i =0;i<this.insertData.length;i++){
                var obj = {};
                obj.regionId = '';
                obj.skuId = this.insertData[i].skuId;
                obj.warehouseId = '';
                obj.serialNo =this.insertData[i].serialNo;
                obj.col11 = '';
                obj.goodsId = goodsId ;
                obj.orderId = orderId;
                obj.batchImportCode = batchImportCode;
                obj.rsType = 60;
                obj.instId= this.insertData[i].instId
                excelLists.push(obj);
              }

          }
          let params = {
            orderId:this.orderId,
            inOrderId:'',
            batchImportCode :batchImportCode,
            regionId :'',
            warehouseId:'',
            rsType :60,
            userCode:getStore('userCode'),
            comment:'',
            excelLists:excelLists
        }
        subGoods(params).then(res => {
          if(res){
            if (res.code == 'success'){
              this.messageSuccess('购买成功!')
              this._getOrderDet()
              this.$router.push({path: 'order'})
            }else{
              this.message(res.description)
            }
          }

        })
      }


      },
      deleteRow(index, rows) {
//          console.log(rows)
        for (var j = 0; j < this.insertTmpList.length; j++) {
          if (this.insertTmpList[j].goodsName == this.insertData[index].goodsName) {
            this.insertTmpList[j].num -=1
          }
        }
        rows.splice(index, 1);
      }
    },
    mounted () {
      this.orderId = this.$route.query.orderId
      this._getOrderDet()
      this._getWareHouse()
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
  el-upload-dragger {
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    width: 360px;
    height: 40px!important;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
</style>

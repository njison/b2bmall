<template>
  <div>
    <y-shelf title="我的订单">
      <div slot="content">
        <div v-loading="loading" element-loading-text="加载中..." v-if="orderList.length" style="min-height: 10vw;">
          <div v-for="(item,i) in orderList" :key="i">
            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="date" v-text="item.createDate"></span>
                  <span class="order-id"> 订单号： <a @click="orderDetail(item.orderId)">{{item.orderId}}</a> </span>
                </div>
                <div class="f-bc">
                  <span class="price">单价</span>
                  <span class="num">数量</span>

                </div>
              </div>
              <div class="last">
                <span class="sub-total">实付金额</span>
                <span class="operation">订单操作</span>
                <span class="order-detail">
                  <a @click="orderDetail(item.orderId)">查看详情 ><em class="icon-font"></em></a>
                </span>
              </div>
            </div>
            <!--<div class="pr" v-if="item.orderItemDtoList.length==0" style="height:110px;text-align: center;line-height: 110px; ">此订单无商品</div>-->

            <div class="pr">
              <div  class="cart" v-for="(good,j) in item.orderItemDtoList" :key="j">
                <div class="cart-l" :class="{bt:j>0}">
                  <div class="car-l-l">
                    <div class="img-box">
                      <a @click="goodsDetails(good.goodsId)">
                        <img :src="good.url" alt="">
                      </a>
                    </div>
                    <div class="ellipsis">
                      <a style="color: #626262;" @click="goodsDetails(good.goodsId)">{{good.goodsName}}</a>
                      <ul class="attribute">
                        <li>{{good.colorName}}</li>
                      </ul>
                    </div>
                  </div>
                  <div class="cart-l-r">
                    <div>¥ {{good.goodsPrice}}</div>
                    <div class="num">{{good.goodsNum}}</div>
                  </div>
                </div>
                <div class="cart-r">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="prod-operation pa" style="right: 0;top: 0;">
                <div class="total">¥ {{item.orderPrice}}</div>
                <div class="type" v-if="item.state=='1'">
                  <el-button @click="isCancelOrder(item.orderId)" type="primary" size="small" class="del-order">取消订单</el-button></div>
                <div class="status">
                  <!--供货商已取消-->
                  <p v-if="item.state=='0'">供货商审批不通过</p>
                  <p v-if="item.state=='1'">待确认</p>
                  <p v-if="item.state=='2'">待发货</p>
                  <p v-if="item.state=='3'">待收货</p>
                  <p v-if="item.state=='4'">交易完成</p>
                  <!--采购方已取消-->
                  <p v-if="item.state=='5'">已取消</p>
                  <!--{{getOrderStatus(item.state)}}-->
                </div>
              </div>

            </div>
          </div>
        </div>
        <div v-loading="loading" element-loading-text="加载中..." class="no-info" v-else>
          <div style="padding: 100px 0;text-align: center">
            你还未创建过订单
          </div>
        </div>
      </div>
    </y-shelf>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>是否取消此订单 ?</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="cancelOrder">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import { getOrderList, orderCancel } from '/api/goods'
  import YShelf from '/components/shelf'
  import { setStore,getStore } from '/utils/storage'
  export default {
    data () {
      return {
        orderList: [0],
        userId: '',
        orderStatus: '',
        loading: true,
        currentPage: 1,
        pageSize: 5,
        total: 0,
        orderItemDtoList: '',
        dialogVisible: false,
        orderId:''
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      messageSuccess (m) {
        this.$message({
          message: m,
          type: 'success'
        })
      },
      messageError (m) {
        this.$message.error({
          message: m
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this._orderList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this._orderList()
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            goodsId: id
          }
        })
      },
      orderDetail (orderId) {
        setStore('orderId', orderId)
        this.$router.push({
          name: 'orderDetail',
          params: {
            'orderId': orderId
          }
        })
      },
      _orderList () {
        let params = {
          orderDto: {
            userId: this.userId
          },
          pageNum:1,
          pageSize:9999999
        }
        getOrderList(params).then(res => {
          if(res){
            if (res.code == 'success'){
              this.loading=false
              this.orderList = res.orderDtoList
              this.total = res.orderDtoList.length
            }
          }
        })
      },
      _delOrder (orderId, i) {
        let params = {
          params: {
            orderId: orderId
          }
        }
        delOrder(params).then(res => {
          if(res){
            if (res.success === true) {
              this.orderList.splice(i, 1)
            } else {
              this.messageError('删除失败')
            }
          }
        })
      },
      isCancelOrder(orderId){
        this.orderId = orderId
        this.dialogVisible = true
      },
      cancelOrder () {
        let params = {
          orderDto: {
            orderId: this.orderId,
            userId: this.userId
          }
        }
        orderCancel(params).then(res => {
          if(res){
            if (res.code == 'success') {
              this.messageSuccess('取消成功')
              this.dialogVisible = false
              this._orderList()
            } else {
              this.messageError('取消失败')
            }
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      this._orderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 0px;
  }

  .order-id {
    margin-left: 25px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
  .attribute, .name p {
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
  }
</style>

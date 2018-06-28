<template>
  <div>
    <y-shelf v-bind:title="orderTitle">
      <div slot="content" v-for="(item,i) in orderList">
        <div v-loading="loading" element-loading-text="加载中..." style="min-height: 10vw;position: static;" v-if="orderList.length">
          <div class="orderStatus"  v-if="item.state =='1'"  >
            <el-steps :active="1" style="width:80%">
              <el-step title="下单" :description="item.createDate"></el-step>
              <el-step title="供货商确认" :description="item.confirmDate"></el-step>
              <el-step title="供货商发货" :description="item.sendDate"></el-step>
              <el-step title="收货" :description="item.receiveDate"></el-step>
              <el-step title="交易成功" :description="item.completeDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus"  v-if="item.state =='2' "  >
            <el-steps :active="2" style="width:80%">
              < <el-step title="下单" :description="item.createDate"></el-step>
              <el-step title="供货商确认" :description="item.confirmDate"></el-step>
              <el-step title="供货商发货" :description="item.sendDate"></el-step>
              <el-step title="收货" :description="item.receiveDate"></el-step>
              <el-step title="交易成功" :description="item.completeDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus"  v-if="item.state =='3' "  >
            <el-steps :active="3" style="width:80%">
              <el-step title="下单" :description="item.createDate"></el-step>
              <el-step title="供货商确认" :description="item.confirmDate"></el-step>
              <el-step title="供货商发货" :description="item.sendDate"></el-step>
              <el-step title="收货" :description="item.receiveDate"></el-step>
              <el-step title="交易成功" :description="item.completeDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus"  v-if="item.state =='4' "  >
            <el-steps :active="4" style="width:80%">
              <el-step title="下单" :description="item.createDate"></el-step>
              <el-step title="供货商确认" :description="item.confirmDate"></el-step>
              <el-step title="供货商发货" :description="item.sendDate"></el-step>
              <el-step title="收货" :description="item.receiveDate"></el-step>
              <el-step title="交易成功" :description="item.completeDate"></el-step>
            </el-steps>
          </div>
          <div class="orderStatus"  v-if="item.state =='0'||item.state =='5' "  >
            <el-steps :active="2" style="width:80%">
              <el-step title="下单"v-bind:description="item.createDate"></el-step>
              <el-step title="交易完成" v-bind:description="item.completeDate"></el-step>
            </el-steps>
          </div>
          <div class="status-now">
            <ul>
              <li class="status-title"><h3>订单状态：{{item.orderState}}</h3></li>
              <li class="button">
               <!-- <el-button @click="orderPayment(orderId)" type="primary" size="small">现在付款</el-button>
               <!--&ndash;&gt; <el-button @click="_cancelOrder()" size="small">取消订单</el-button>-->
              </li>
            </ul>
          </div>

          <div class="gray-sub-title cart-title">
            <div class="first">
              <div>
                <span class="order-id">商品名称</span>
              </div>
              <div class="f-bc">
                <span class="price">单价</span>
                <span class="num">数量</span>
                <span class="operation">小计</span>
              </div>
            </div>
          </div>

          <!--商品-->
          <div >
            <div class="goods-table">
              <div class="cart-items" v-for="(goods,i) in item.orderItemDtoList" :key="i">
                <a @click="goodsDetails(goods.goodsId)" class="img-box"><img :src="goods.url" alt=""></a>
                <div class="name-cell ellipsis">
                  <a @click="goodsDetails(goods.goodsId)" title="" target="_blank">{{goods.goodsName}}</a>
                </div>
                <div class="n-b">
                  <div class="price">¥ {{goods.goodsPrice}}</div>
                  <div class="goods-num">{{goods.goodsNum}}</div>
                  <div class="subtotal"> ¥ {{goods.totalPrice}}</div>
                </div>
              </div>
            </div>
            <!--合计-->
            <div class="order-discount-line">
              <p style="font-size: 14px;font-weight: bolder;"> <span style="padding-right:47px">商品总计：</span>
                <span style="font-size: 16px;font-weight: 500;line-height: 32px;">¥ {{item.orderPrice}}</span>
              </p>
              <p><span style="padding-right:30px">运费：</span><span style="font-weight: 700;">+ ¥ 0.00</span></p>
              <p class="price-total"><span>应付金额：</span><span class="price-red">¥ {{item.orderPrice}}</span></p>
            </div>

            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="order-id">收货信息</span>
                </div>
              </div>
            </div>
            <div style="height: 155px;padding: 20px 30px;">
              <p class="address">姓名：{{ item.addressName }}</p>
              <p class="address">联系电话：{{ item.linkPersonTelephone }}</p>
              <p class="address">详细地址：{{ item.addressDetail }}</p>
            </div>

            <div class="gray-sub-title cart-title">
              <div class="first">
                <div>
                  <span class="order-id">供货商信息</span>
                </div>
              </div>
            </div>
            <div style="height: 155px;padding: 20px 30px;">
              <p class="address">供货商名称：{{ item.venderName }}</p>
            </div>


          </div>
          </div>

        <div v-loading="loading" element-loading-text="加载中..." v-else>
          <div style="padding: 100px 0;text-align: center">
            获取该订单信息失败
          </div>
        </div>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import { getOrderList, getOrderLogList } from '/api/goods'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  import countDown from '/components/countDown'
  export default {
    data () {
      return {
        orderList: [],
        userId: '',
        orderStatus: 0,
        orderId: '',
        userName: '',
        tel: '',
        streetName: '',
        orderTitle: '',
        createTime: '',
        payTime: '',
        closeTime: '',
        finishTime: '',
        orderTotal: '',
        loading: true,
        countTime: 0,
        orderLog:[]
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      orderPayment (orderId) {
        window.open(window.location.origin + '/order/payment?orderId=' + orderId)
      },
      goodsDetails (id) {
        this.$router.push({path: 'goodsDetails/goodsId=' + id})
      },
      _getOrderlog(){
        let params = {
          orderDto: {
            orderId: this.orderId
          }
        }
        getOrderLogList(params).then(res => {
            if (res.code == 'success'){
              this.orderLog = res
            } else {

            }
          })
      },
      _getOrderDet () {
        let params = {
          orderDto: {
            orderId: this.orderId
          }
        }
        getOrderList(params).then(res => {
          if (res.code == 'success'){
            this.loading=false
            this.orderList = res.orderDtoList
          } else {

          }

        })
      },

    },
    created () {
      this.userId = getStore('userId')
      this.orderId = this.$route.query.orderId
      this.orderTitle = '订单号：' + this.orderId
      this._getOrderDet()
      this._getOrderlog()
    },
    components: {
      YShelf,
      countDown
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/style/mixin";

  .orderStatus {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -150px 20px 60px;
  }

  .orderStatus-close {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: 50px -800px 20px 60px;
  }

  .status-now {
    background: #F6F6F6;
    border: 1px solid #dadada;
    border-radius: 5px;
    padding: 22px 30px 20px;
    margin: 0 30px 30px 30px;
    line-height: 38px;
  }

  .status-title {
    font-size: 18px;
    color: #666;
  }

  .button {
    float: right;
    margin: -37px 0 20px 0;
  }

  .realtime {
    border-top: 1px solid #dcdcdc;
    margin-top: 20px;
    padding-top: 26px;
  }

  .red {
    color: #d44d44;
  }

  .address {
    line-height: 38px;
    word-wrap: break-word;
    word-spacing: normal;
    word-break: break-all;
    color: #626262;
  }

  .img-box {
    border: 1px solid #EBEBEB;
    margin-left: -80px;
  }

  img {
    display: block;
    @include wh(80px);
  }

  .goods-table {
    .n-b {
      display: flex;
      align-items: center;
      justify-content: center;
      > div {
        color: #626262;
        font-weight: 700;
        width: 150px;
        text-align: center;
      }
    }
    .cart-items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 110px;
      padding: 15px 0 15px 111px;
      border-bottom: 1px solid #EFEFEF;
      a {
        color: #333;
      }
    }
    .price {
      padding-left: 107px;
    }
    .goods-num {
      padding-left: 60px;
    }
  }

  .order-discount-line {
    padding: 22px 30px 20px;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
    &:first-child {
      line-height: 32px;
      text-align: right;
      font-size: 14px;
      font-weight: bolder;
    }
  }

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
    margin-left: 10px;
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

  .price-total {
    height: 54px;
    line-height: 54px;
    font-size: 18px;
  }

  .price-red {
    font-weight: 700;
    color: #d44d44;
  }
</style>

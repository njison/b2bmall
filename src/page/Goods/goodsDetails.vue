<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in product.fileDtoList" :key="i" :class="{on:product.url===item.url}" v-if='i<=4' @click="product.url=item.url">
                <img v-lazy="item.url" :alt="product.goodsName">
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="product.url" :alt="product.goodsName">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.goodsName}}</h4>
          <h6>
            <span><!--{{product.subTitle}}-->
            {{product.goodsTitle}}</span>
            <span class="price" v-if="chanelType===4">
              <em>¥</em><i>{{product.goodsShipPrice}}</i>
            </span>
            <span class="price" v-else>
              <em>¥</em><i>{{product.goodsSettlePrice}}</i>
            </span>
          </h6>

          <!--<div class="height-range">-->
            <!--<span >月销量：{{product.monthNum}}台</span>-->
          <!--</div>-->
          <div class="height-range">
            <span >供应商名称：{{product.venderName}}</span>
          </div>
          <div class="height-range">
            <span >商品剩余数量：{{product.inventory}} 台</span>
          </div>
          <div class="height-range" v-if="product.status==4">
            <span style="color:#d44d44">该商品已下架</span>
          </div>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <div class="item-cols-num clearfix" style="height: 140px;display: flex;align-items: center; justify-content: center;">
            <div class="select">
              <span class="down"
                    @click.stop.prevent="down()" :class="{'down-disabled':goodsNum==0}">-</span>
              <span class="num">
                <input type="text"
                       :class="{show:show}"
                       v-model="goodsNum>=limit?limit:goodsNum"
                       @blur="blur()"
                       maxlength="2">
                <ul>
                  <li v-for="i in numList" :key="i">{{goodsNum}}</li>
                </ul>
              </span>
              <span class="up" :class="{'up-disabled':goodsNum>=product.inventory}"
                    @click.stop.prevent="up()">+</span>
            </div>
          </div>
          <!--<buy-num @edit-num="editNum" :limit="100" :Num="goodsNum"></buy-num>-->
        </div>
        <div class="buy" v-if="product.status==4" @click="soldOut">
          <y-button text="加入购物车"
                    classStyle="disabled-btn"
                    style="width: 145px;height: 50px;line-height: 48px;">
          </y-button>
          <y-button text="现在购买"
                    classStyle="disabled-btn"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
        <div class="buy" v-else-if="product.inventory=='0'" @click="noBuy">
          <y-button text="加入购物车"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px">
          </y-button>
          <y-button text="现在购买"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
        <div class="buy" v-else="product.inventory!='0'">
          <y-button text="加入购物车"
                    @btnClick="addCart(product.goodsId,product.goodsShipPrice,product.goodsSettlePrice,product.goodsRetailPrice,product.goodsName,product.url)"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px">
          </y-button>
          <y-button text="现在购买"
                    @btnClick="checkout(product.goodsId)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <detail-info>
      </detail-info>
    </div>
  </div>
</template>
<script>
  import { goodsDetail, addCart } from '/api/goods'
  import { mapMutations, mapState } from 'vuex'
  import YShelf from '/components/shelf'
  import DetailInfo from '/components/detailInfo'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        goodsMsg: {},
        small: [],
        big: '',
        product: [],
        goodsNum: 1,
        userId: '',
        show: true,
        flag: true,
        Num: '',
        numList: [],
        limit:1,
        chanelType:getStore('chanelType')
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      message (m) {
        this.$message.error({
          message: m
        })
      },
      _productDet (goodsId) {
          let params={
            goodsDto:{
                  goodsId:goodsId
              }
          }
        goodsDetail(params).then(res => {
          if(res){
            if(res.code=='success'){
              this.product = res.goodsDto
              this.limit = Number(this.product.inventory)
            }
          }
        })
      },
      addCart (id, goodsShipPrice,goodsSettlePrice, goodsRetailPrice, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          let cartAddParams = {
            cartDto :{
              goodsNum: this.goodsNum,
              goodsId:id,
              userId:getStore('userId'),
              userName:getStore('userName')
            }
          }

          addCart(cartAddParams).then(res => {
            // 并不重新请求数据
            this.ADD_CART({
              goodsNum: this.goodsNum,
              goodsId: id,
              goodsSettlePrice: goodsSettlePrice,
              goodsRetailPrice:goodsRetailPrice ,
              goodsShipPrice:goodsShipPrice,
              goodsName: name,
              goodsImg: img
            })
          })

          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      },
      checkout (goodsId) {
        this.$router.push({path: '/checkout', query: {goodsId, num: this.goodsNum}})
      },
      up () {
        this.flag = false
        let n = this.goodsNum
        this.goodsNum++
        this.numList = [n - 1, n, n + 1]
        this.show = true
      },
      down () {
        let n = this.goodsNum
        if ( n > 1 ) {
          this.flag = false
          this.goodsNum--
          this.numList = [n - 1, n, n + 1]
          this.show = true
        }else{
          this.goodsNum==1
        }
      },
      blur () {
//          console.log('数量'+this.goodsNum)
//          console.log('水位'+this.limit)
          if( this.goodsNum > this.limit ){
            this.message('所填数量大于库存 !')
          }
        this.goodsNum = this.goodsNum > this.limit ? Number(this.limit) : Number(this.goodsNum)
//        this.message('所填数量大于库存 !')
      },
      editNum (num) {
        this.goodsNum = num
      },
      noBuy(){
        this.message('没有库存，无法购买 !')
      },
      soldOut(){
        this.message('该商品已下架，无法购买 !')
      }
    },
    components: {
      YShelf, BuyNum, YButton, DetailInfo
    },
    created () {
      let id = this.$route.query.goodsId
      this._productDet(id)
      this.userId = getStore('userId')
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }
  .height-range{
    margin-top: 15px;
  }
  .height-range-bottom{
    margin-bottom: 15px;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;
    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;
        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }
          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;
            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }
            img {
              display: block;
              @include wh(100%);
            }
          }
        }
        .thumb {
          .big {
            margin-left: 20px;
          }
          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }
    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;
      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }
      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }
      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }
      .num {
        /*padding: 29px 0 8px 10px;*/
        /*border-top: 1px solid #ebebeb;*/
        display: flex;
        align-items: center;
        padding-left: 8px;
      }
      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }
    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }

  .font-right {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    i {
      padding-left: 2px;
      font-size: 24px;
    }
  }
  .select {
    input {
      z-index: 10;
      width: 36px;
      height: 18px;
      background-color: #fff;
      border: none;
      text-align: center;
      line-height: 18px;
      font-size: 14px;
      padding: 0;
      color: #666;
      visibility: hidden;
      position: relative;
      border: none;
      &.show {
        visibility: visible;
      }
    }
    ul {
      padding: 0;
      line-height: 18px;
      font-size: 14px;
      display: inline-block;
      position: absolute;
      left: 0;
      list-style: none;
      width: 36px;
      font-family: system-ui;
      z-index: 1;
      transform: translateY(-36px);
    }
    .up.up-disabled, .up.up-disabled:hover {
      background-position: 0 -240px !important;
      cursor: not-allowed !important;
    }
  }

  /*数量*/
  .item-cols-num {
    display: inline-block;
  }

  .select {
    height: 40px;
    padding-top: 4px;
    input {
      width: 100%;
      text-align: center;
    }
    .down {
      background-position: 0 -60px;
    }
    .down.down-disabled:hover {
      background-position: 0 -300px;
      cursor: not-allowed;
    }
    .down, .up {
      background: url(../../../static/images/cart-updown_8303731e15@2x.jpg) no-repeat;
      overflow: hidden;
      float: left;
      width: 34px;
      height: 37px;
      background-size: 100% auto;
      line-height: 40px;
      text-indent: -9999em;
      cursor: pointer;
      user-select: none;
    }
    .num {
      position: relative;
      overflow: hidden;
      text-align: center;
      float: left;
      width: 36px;
      height: 18px;
      margin: 7px 0 0;
      border: none;
      border-radius: 3px;
      line-height: 18px;
      text-align: center;
      font-size: 14px;
    }
    .up {
      margin: 0;
      background-position: 0 0;
      &:hover {
        background-position: 0 -120px;
      }
    }
    .down {
      background-position: 0 -60px;
      &:hover {
        background-position: 0 -180px;
      }
    }
  }

  .down.down-disabled {
    background-position: 0 -300px;
    cursor: not-allowed;
  }
</style>

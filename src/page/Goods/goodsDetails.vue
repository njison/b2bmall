<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.goodsName">
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
            采购价：</span>
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
            <span >产品简介：{{product.goodsTitle}}</span>
          </div>

        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @edit-num="editNum" :limit="100"></buy-num>
        </div>
        <div class="buy">
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
        chanelType:getStore('chanelType')
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
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
            this.ADD_CART({ goodsNum: this.goodsNum, goodsId: id, goodsSettlePrice: goodsSettlePrice, goodsRetailPrice:goodsRetailPrice ,goodsShipPrice:goodsShipPrice, goodsName: name, goodsImg: img})
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
      editNum (num) {
        this.goodsNum = num
      }
    },
    components: {
      YShelf, BuyNum, YButton, DetailInfo
    },
    created () {
//        let id=180000613194510824000124
      let id = this.$route.query.goodsId
      this._productDet(id)
      this.userId = getStore('userId')
//      console.log(getStore('vendorType'))
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
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
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
</style>

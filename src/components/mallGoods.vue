<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <router-link target="_blank" :to="'goodsDetails?goodsId='+msg.goodsId">
          <div class="imgBox" style="text-align: center">
            <img v-lazy="msg.goodsHostImg" :alt="msg.goodsName" width="100%" v-if="msg.goodsHostImg">
            <img v-else="!msg.goodsHostImg" src="../../static/images/CMlogo1.png" :alt="msg.goodsName" style="margin-top:20px;">
          </div>
        </router-link>
      </div>
      <h6 class="good-title" v-html="msg.goodsName"></h6>
      <h3 class="sub-title ellipsis">{{msg.goodsAd}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <router-link target="_blank" :to="'goodsDetails?goodsId='+msg.goodsId">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </router-link>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(msg.goodsId,msg.goodsShipPrice,msg.goodsSettlePrice,msg.goodsRetailPrice,msg.goodsName,msg.goodsHostImg)"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <p v-if="chanelType===4" ><span style="font-size:14px">￥</span>{{msg.goodsShipPrice}}</p>
        <p v-else ><span style="font-size:14px">￥</span>{{msg.goodsSettlePrice}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { addCart, goodsDetail } from '/api/goods.js'
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from '/utils/storage'
  //  import util from '/lib/util.js'
  export default {
    props: {
      msg: {},
    },
    data () {
      return {
        hotImg:'',
        chanelType:getStore('chanelType'),
        limit:''
      }
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART','GET_USERINFO']),
      goodsDetails (id) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            goodsId: id
          }
        })
      },
      messageError (m) {
        this.$message.error({
          message: m
        })
      },
      addCart (id, goodsShipPrice,goodsSettlePrice, goodsRetailPrice, name, img) {
        let params={
          goodsDto:{
            goodsId:id
          }
        }
        goodsDetail(params).then(res => {
          if(res){
            if(res.code=='success'){
              this.limit = Number(res.goodsDto.iventory)
            }
          }
        })
        if(Number(this.limit)==0) {
          this.messageError('该商品可售数量为0')
        }else {
          if (!this.showMoveImg) {     // 动画是否在运动
            let cartAddParams = {
              cartDto: {
                goodsNum: 1,
                goodsId: id,
                userId: getStore('userId'),
                userName: getStore('userName')
              }
            }
            addCart(cartAddParams).then(res => {
                if(res){
                  if (res.code == 'success') {
                    // 并不重新请求数据
                    this.ADD_CART({
                      goodsNum: 1,
                      goodsId: id,
                      goodsSettlePrice: goodsSettlePrice,
                      goodsRetailPrice: goodsRetailPrice,
                      goodsShipPrice: goodsShipPrice,
                      goodsName: name,
                      goodsImg: img
                    })
                  }
                }

            })
            // 加入购物车动画
            var dom = event.target
            // 获取点击的坐标
            let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
            let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
            // 需要触发
//          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
            if (!this.showCart) {
              this.SHOW_CART({showCart: true})
            }
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart','userInfo'])
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .good-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      .imgBox {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
        overflow: hidden;
      }
    }
    .imgBox img{

    }
    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }
    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>

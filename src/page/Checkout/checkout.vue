<template>
  <div class="checkout">
    <y-header>
      <div slot="nav"></div>
    </y-header>
    <div class="w" style="padding-top: 40px;">
      <!-- 收货地址 -->
      <y-shelf title="收货信息">
      <div slot="content">
        <ul class="address-item-list clearfix">
          <li v-for="(item,i) in getAddress"
              :key="i"
              class="address pr"
              :class="{checked:addressId === item.addressId}"
              @click="chooseAddress(item.addressId, item.addressName, item.addressPhone, item.addressDetail)">
               <span v-if="addressId === item.addressId" class="pa">
                 <svg viewBox="0 0 1473 1024" width="17.34375" height="12">
                 <path
                   d="M1388.020 57.589c-15.543-15.787-37.146-25.569-61.033-25.569s-45.491 9.782-61.023 25.558l-716.054 723.618-370.578-374.571c-15.551-15.769-37.151-25.537-61.033-25.537s-45.482 9.768-61.024 25.527c-15.661 15.865-25.327 37.661-25.327 61.715 0 24.053 9.667 45.849 25.327 61.715l431.659 436.343c15.523 15.814 37.124 25.615 61.014 25.615s45.491-9.802 61.001-25.602l777.069-785.403c15.624-15.868 25.271-37.66 25.271-61.705s-9.647-45.837-25.282-61.717M1388.020 57.589z"
                   fill="#6A8FE5" p-id="1025">
                   </path>
                 </svg>
               </span>
            <p v-if="item.isDefault=='true'">收货人: {{item.addressName}} (默认地址)</p>
            <p v-if="item.isDefault=='false'">收货人: {{item.addressName}}</p>
            <p class="street-name ellipsis">收货地址: {{item.addressDetail}}</p>
            <p>手机号码: {{item.addressPhone}}</p>
            <div class="operation-section">
              <span class="update-btn" style="font-size:12px" @click="update(item)">修改</span>
              <span class="delete-btn" style="font-size:12px" :data-id="item.addressId" @click="del(item)">删除</span>
            </div>
          </li>

          <li class="add-address-item" @click="update()">
            <img src="../../../static/svg/jia.svg" alt="">
            <p>使用新地址</p>
          </li>
        </ul>
      </div>
    </y-shelf>
      <!--支付方式-->
      <y-shelf title="支付方式">
        <div slot="content">
          <el-radio class="checkType" v-model="radio" label="1">线下支付</el-radio>
          <!--<el-radio class="checkType" disabled v-model="radio" label="2">线上支付</el-radio>-->
        </div>
      </y-shelf>
      <!--支付方式-->
      <!-- 购物清单 -->
      <y-shelf title="购物清单">
        <div slot="content">
          <div class="box-inner ui-cart">
            <div>
              <!--标题-->
              <div class="cart-table-title">
                <span class="name">商品信息</span>
                <span class="subtotal">小计</span>
                <span class="num">数量</span>
                <span class="price">单价</span>
                <!--<span class="price">颜色</span>-->
              </div>
              <!--列表-->
              <div class="cart-table" v-for="(item,i) in cartList" :key="i" v-if="item.checked === '1'">
                <div class="cart-group divide pr" :data-goodsid="item.goodsId">
                  <div class="cart-top-items">
                    <div class="cart-items clearfix">
                      <!--图片-->
                      <div class="items-thumb fl">
                        <img :alt="item.goodsName"
                             :src="item.goodsImg">
                        <a @click="goodsDetails(item.goodsId)" :title="item.goodsName" target="_blank"></a>
                      </div>
                      <!--信息-->
                      <div class="name hide-row fl">
                        <div class="name-table">
                          <a @click="goodsDetails(item.goodsId)" :title="item.goodsName" target="_blank"
                             v-text="item.goodsName"></a>
                          <ul class="attribute">
                            <li>{{item.colorName}}</li>
                          </ul>
                        </div>
                      </div>
                      <!--商品数量-->
                      <div>
                        <!--总价格-->
                        <div v-if="chanelType===4" class="subtotal" style="font-size: 14px">¥ {{item.goodsShipPrice * item.goodsNum}}</div>
                        <div v-else class="subtotal" style="font-size: 14px">¥ {{item.goodsSettlePrice * item.goodsNum}}</div>

                        <!--<div class="subtotal" style="font-size: 14px">¥ {{item.salePrice * item.goodsNum}}</div>-->
                        <!--数量-->
                        <div class="item-cols-num">
                          <span v-text="item.goodsNum"></span>
                        </div>
                        <!--价格-->
                        <div class="price" v-if="chanelType===4">¥ {{item.goodsShipPrice}}</div>
                        <div class="price" v-else>¥ {{item.goodsSettlePrice}}</div>

                        <!--<div class="price">¥ {{item.salePrice}}</div>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 合计 -->
            <div class="cart-bottom-bg fix-bottom">
              <div class="fix-bottom-inner">
                <div class="shipping">
                  <div class="shipping-box" style="padding: 0 40px;">
                    <div class="shipping-total shipping-price"><h4
                      class="highlight">应付总额：<em>￥{{checkPrice}}</em>
                    </h4>
                    </div>
                  </div>
                  <y-button class="big-main-btn"
                            :classStyle="submit?'disabled-btn':'main-btn'"
                            style="margin: 0;width: 130px;height: 50px;line-height: 50px;font-size: 16px"
                            :text="submitOrder"
                            @btnClick="checkInventory()">
                  </y-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </y-shelf>
      <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
        <div slot="content" class="md" :data-id="msg.addressId">
          <div>
            <input type="text" maxlength="20" placeholder="收货人姓名" v-model="msg.userName">
          </div>
          <div>
            <input type="text" placeholder="手机号码" v-model="msg.tel">
          </div>
          <div>
            <input type="text" placeholder="收货地址" v-model="msg.streetName">
          </div>
          <div>
            <!--<el-checkbox v-if="msg.isDefault==true"  v-model="msg.isDefault" checked>设为默认</el-checkbox>-->
            <el-checkbox v-model="msg.isDefault">设为默认</el-checkbox>
          </div>
          <y-button text='保存'
                    class="btn"
                    :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                    @btnClick="saveAddress({addressId:msg.addressId,userId:userId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
          </y-button>
        </div>
      </y-popup>
    </div>
    <y-footer></y-footer>
  </div>
</template>
<script>
  import { getCartList, productDet, submitOrder, addAddress, getAddressList, modifyAddress, deleteAddress, goodsDetail } from '/api/goods'
  import YShelf from '/components/shelf'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YHeader from '/common/header'
  import YFooter from '/common/footer'
  import { getStore } from '/utils/storage'
  import { Encrypt, Decrypt }  from '/utils/secret'
  import md5 from 'js-md5';
  export default {
    data () {
      return {
        cartList: [],
        addList: [],
        addressId: '',
        popupOpen: false,
        popupTitle: '管理收货地址',
        num: '', // 立刻购买
        productId: '',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        userName: '',
        tel: '',
        streetName: '',
        userId: '',
        orderTotal: 0,
        submit: false,
        submitOrder: '提交订单',
        getAddress: [],
        chanelType:'',
        show: true,
        limit:'',
        product:[],
        checkBlank:false,
        checkPhone:false,
        radio: '1',
        color:'',
        colorId:''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
      },

      // 选中的总价格
      checkPrice () {
        let totalPrice = 0
        this.cartList && this.cartList.forEach(item => {
          if (item.checked == '1' && this.chanelType===4) {
            totalPrice += (item.goodsNum * item.goodsShipPrice)
          }else if (item.checked == '1' && this.chanelType!=4) {
            totalPrice += (item.goodsNum * item.goodsSettlePrice)
          }
        })
        this.orderTotal = totalPrice
        return totalPrice
      }
    },
    methods: {
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
      goodsDetails (id) {
        this.$router.push({
          path: '/goodsDetails',
          query: {
            goodsId: id
          }
        })
      },
//      upperCase(){
//        var phone = this.msg.tel
//        if(!(/^1[34578]\d{9}$/.test(phone))){
//          this.messageError("手机号码有误，请重填");
//          this.checkPhone=false
//          return false;
//        }else{
//          this.checkPhone=true
//        }
//      },
//      isBlank(){
//        if (this.msg.streetName.replace(/(^\s*)|(\s*$)/g, "")==""||this.msg.userName.replace(/(^\s*)|(\s*$)/g, "")==""){
//          this.checkBlank=false
//          this.messageError("请填写完整 !");
//          return false;
//        }else{
//          this.checkBlank=true
//        }
//
//      },
      //获取商品详情
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
              this.limit = Number(res.goodsDto.inventory)
            }
          }
        })
      },
      // 获取购物车商品
      _getCartList () {
        let cartParams = {
          cartDto :{
            userId:  getStore('userId')
          }
        }
        getCartList(cartParams).then(res => {
          this.cartList =  res.cartDtoList
        })
      },
      //验证库存
      checkInventory(){
        var flag = 0
        this.cartList && this.cartList.forEach(item => {
          if(item.checked=='1'){
             if (Number(item.inventory)<item.goodsNum) {
                  this.messageError('库存不足')
                  this.submitOrder = '提交订单'
                  flag++
             }
            if (item.state == '4') {
              this.messageError('该商品已下架')
              flag++
            }
          }

        })

        if (flag == 0) {
          this._submitOrder ()
        }

      },
      // 提交订单后跳转付款页面
      _submitOrder () {
        var isChecked = 0
        this.submitOrder = '提交订单中...'
        this.submit = true

        if (this.addressId === '') {
          this.messageError('请选择收货地址')
          this.submitOrder = '提交订单'
          this.submit = false
          isChecked = 1
          return
        }
        if (this.cartList.length === 0) {
          this.messageError('非法操作')
          this.submitOrder = '提交订单'
          this.submit = false
          isChecked = 1
          return
        }

        if(isChecked ==0){
          var orderItems = []
          for (var i = 0; i < this.cartList.length; i++) {
            var orderItem = new Object();

            if (this.cartList[i].checked === '1' && this.chanelType === 4) {
              orderItem.placeOrderMethod = this.cartList[i].placeOrderMethod;
              orderItem.goodsId = this.cartList[i].goodsId;
              orderItem.goodsNum = this.cartList[i].goodsNum;
              orderItem.colorId = this.cartList[i].colorId;
              orderItem.colorName = this.cartList[i].colorName;
              orderItem.goodsPriceStr = Encrypt(this.cartList[i].goodsSettlePrice+'');
              orderItem.totalPriceStr = Encrypt(this.cartList[i].goodsSettlePrice * this.cartList[i].goodsNum+'');
              orderItem.venderId = this.cartList[i].venderId;
              orderItem.venderName = this.cartList[i].venderName;
              orderItems.push(orderItem)
            } else if (this.cartList[i].checked === '1' && this.chanelType != 4) {
              orderItem.placeOrderMethod = this.cartList[i].placeOrderMethod;
              orderItem.goodsId = this.cartList[i].goodsId;
              orderItem.goodsNum = this.cartList[i].goodsNum;
              orderItem.colorId = this.cartList[i].colorId;
              orderItem.colorName = this.cartList[i].colorName;
              orderItem.goodsPriceStr = Encrypt(this.cartList[i].goodsSettlePrice+'');
              orderItem.totalPriceStr = Encrypt(this.cartList[i].goodsSettlePrice * this.cartList[i].goodsNum+'');
              orderItem.venderId = this.cartList[i].venderId;
              orderItem.venderName = this.cartList[i].venderName;
              orderItems.push(orderItem)
            }

          }
          let params = {
            orderDto:{
              userId: this.userId,
              addressId:this.addressId,
              paymentMethod:'1',
              buyOrgId:getStore('orgCode'),
              comments:'',
              linkPerson:this.userName,
              linkPersonTelephone:this.tel,
              linkPersonAddress:this.streetName
            },
            orderItemDtos:orderItems

          }
//          console.log(params)
          submitOrder(params).then(res => {
            if(res){
              if (res.code =='success' ) {
                this.messageSuccess('操作成功')
                this.$router.push({path: '/user/orderList'})
              } else {
                this.messageError('操作失败')
                this.submitOrder = '提交订单'
                this.submit = false
              }
            }
          })
        }

      },
      // 选择地址
      chooseAddress (addressId, userName, tel, streetName) {
        this.addressId = addressId
        this.userName = userName
        this.tel = tel
        this.streetName = streetName
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.addressName
          this.msg.tel = item.addressPhone
          this.msg.streetName = item.addressDetail
          this.msg.isDefault = item.isDefault=='true'
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
      // 保存
      saveAddress (add) {
        var phone = this.msg.tel

        var pattern = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;

        var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
        var sqlStr = str.split(',');
        var flag = true;

        for (var i = 0; i < sqlStr.length; i++) {
          if (this.msg.streetName.toLowerCase().indexOf(sqlStr[i]) != -1) {
            flag = false;
            break;
          }
        }

        if(this.msg.streetName.replace(/(^\s*)|(\s*$)/g, "")==""||this.msg.userName.replace(/(^\s*)|(\s*$)/g, "")==""){

          this.messageError("请填写完整 !");

        }else if(!(/^1[34578]\d{9}$/.test(phone))){

          this.messageError("手机号码有误，请重填");

        }else if(this.msg.streetName === '' || this.msg.streetName === null){

          this.messageError("地址不能为空 !");

        }else if(pattern.test(this.msg.streetName)){

          this.messageError("地址不符合规则，请重新填写 !");

        }else if(flag==false){

          this.messageError("地址不符合规则，请重新填写 !");

        }else {
          this.popupOpen = false
          if (add.addressId) {
            let params = {
              addressDto: {
                isDefault: add.isDefault,
                addressDetail: add.streetName,
                addressPhone: add.tel,
                userId: add.userId,
                addressName: add.userName,
                addressId: add.addressId
              }
            }
            modifyAddress(params).then(res => {
              if (res) {
                if (res.code = '"success"') {
                  this.messageSuccess('修改成功')
                  this.getAddressList()
                  setTimeout(() => {
                    this.addressId = add.addressId
                    this.userName = add.userName
                    this.tel = add.tel
                    this.streetName = add.streetName
                  }, 100)


                }
              }
            })
          } else {
            let params = {
              addressDto: {
                isDefault: add.isDefault,
                addressDetail: add.streetName,
                addressPhone: add.tel,
                userId: add.userId,
                addressName: add.userName
              }
            }
            addAddress(params).then(res => {
              if (res) {
                if (res.code = '"success"') {
                  this.messageSuccess('添加成功')
                  this.getAddressList()
                }
              }
            })
          }
        }
      },
      // 删除
      del (item) {
        let params={
          addressDto:{
            userId:item.userId,
            addressId:item.addressId
          }
        }
        deleteAddress(params).then(res => {
          if(res){
            if(res.code='"success"'){
              this.messageSuccess('删除成功')
              this.addressId = ''
              this.userName = ''
              this.tel = ''
              this.streetName = ''
              this.getAddressList()
            }
          }
        })
      },
      _productDet (goodsId,colorId) {
        let params={
          goodsDto:{
            goodsId:goodsId,
            colorId:colorId
          }
        }
        goodsDetail(params).then(res => {
          if(res){
            if(res.code=='success'){
              let item = res.goodsDto
              item.checked = '1'
              item.goodsImg = item.url
              item.goodsNum = this.num
              item.colorId = this.colorId
              item.colorName = this.color
              item.inventory = this.inventory
              if(this.chanelType===4){
                item.productPrice = item.goodsShipPrice
              }else{
                item.productPrice = item.goodsSettlePrice
              }
              this.cartList.push(item)
            }
          }
        })
      },
      // 获取地址信息
      getAddressList(){
        let params={
          addressDto:{
            userId: this.userId
          }
        }
        getAddressList(params).then(res => {
          if(res){
            if (res.code !== "success") {
              this.error = true
              return
            }else{
              let data = res.addressDtoList
              if (data.length) {
                this.getAddress = data
                data && data.forEach(item => {
                  if (item.isDefault == 'true' ) {
                    this.addressId = item.addressId || '1'
                    this.userName = item.addressName
                    this.tel = item.addressPhone
                    this.streetName = item.addressDetail
                  }
                })
              } else {
                this.getAddress = []
              }
            }
          }
        })
      }
    },
    created () {
      this.userId = getStore('userId')
      let query = this.$route.query
      if (query.goodsId && query.num) {
        this.goodsId = query.goodsId
        this.num = query.num
        this.color = query.color
        this.colorId = query.attrValue
        this.inventory = query.inventory
        this._productDet(this.goodsId,this.colorId)
      } else {
        this._getCartList()
      }
    },
    mounted () {
      this.chanelType = getStore('chanelType')
      this.getAddressList()
    },
    components: {
      YShelf,
      YButton,
      YPopup,
      YHeader,
      YFooter
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  // 收货地址
  .address-item-list {
    padding: 30px 13px 0;
    .address {
      padding: 19px 14px 0 19px;
      p {
        line-height: 26px;
      }
    }
    li.checked {
      border-color: #6A8FE5;
      position: relative;
      background: #fff;
      .pa {
        right: 15px;
        top: 18px;
      }
      &:hover {
        background: #fff;
      }
    }
    li {
      position: relative;
      overflow: hidden;
      float: left;
      width: 276px;
      height: 158px;
      margin: 0 0 30px 16px;
      border: 1px solid #E5E5E5;
      border-radius: 3px;
      background: #FAFAFA;
      line-height: 14px;
      text-align: left;
      word-wrap: break-word;
      word-break: normal;
      color: #626262;
      cursor: pointer;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
      &:hover {
        background: #F2F2F2;
        .operation-section {
          visibility: visible;
          transform: translate(0, 0);
        }
      }
      &.add-address-item {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          margin-top: 5px;
        }
      }
      .operation-section {
        visibility: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 28px;
        background: #E1E1E1;
        border-top: 1px solid #E1E1E1;
        transition: all .2s ease;
        transform: translate(0, 29px);
        border-top: 1px solid #E1E1E1;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 11;
        span {
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          height: 100%;
          &:hover {
            background: #F2F2F2;
          }
        }

        span + span {
          border-left: 1px solid #E1E1E1;
        }

      }
    }
  }

  .s-content {
    .md {
       div {
        text-align: left;
        margin-bottom: 15px;
        input {
          width: 100%;
          height: 50px;
          font-size: 18px;
          padding: 10px 20px;
          border: 1px solid #ccc;
          border-radius: 6px;
          box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
          line-height: 46px;
        }
      }
    }

    .btn {
      margin: 0;
      width: 100%;
      height: 50px;
      font-size: 14px;
      line-height: 48px
    }
  }

  .ui-cart {
    img {
      width: 80px;
      height: 80px;
    }

    .cart-table-title {
      position: relative;
      z-index: 1;
      line-height: 38px;
      height: 38px;
      padding: 0 0 0 30px;
      font-size: 12px;
      background: #eee;
      border-bottom: 1px solid #dbdbdb;
      border-bottom-color: rgba(0, 0, 0, .08);
      .name {
        float: left;
        text-align: left;
      }
      span {
        width: 137px;
        float: right;
        text-align: center;
        color: #838383;
      }
    }
    .cart-group.divide {
      .cart-items {
        border-top: 1px dashed #eee;
      }
    }
    .cart-items {
      position: relative;
      height: 140px;
      margin-left: 74px;
      .subtotal {
        font-weight: 700;
      }
      .item-cols-num,
      .price,
      .subtotal {
        overflow: hidden;
        float: right;
        width: 137px;
        text-align: center;
        color: #666;
        line-height: 140px;
      }
      /*数量*/
      .subtotal,
      .item-cols-num {
        padding-top: 50px;
        line-height: 40px;
      }
      .select {
        width: 112px;
        height: 40px;
        padding-top: 4px;
        margin: 0 auto;
        line-height: 40px;
        .down {
          background-position: 0 -60px;
        }
        .down.down-disabled:hover {
          background-position: 0 -300px;
          cursor: not-allowed;
        }
        .num {
          position: relative;
          overflow: hidden;
          display: inline-block;
          width: 36px;
          height: 18px;
          margin: 7px 0 0;
          border: none;
          border-radius: 3px;
          line-height: 18px;
          text-align: center;
          font-size: 14px;
          transition: all .2s ease-out;
        }
      }

    }
    .down.down-disabled {
      background-position: 0 -300px;
      cursor: not-allowed;
    }
  }

  .cart-group.divide .cart-top-items:first-child .cart-items {
    border-top: none;
  }

  .items-choose {
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
  }

  .items-thumb {
    position: relative;
    margin-top: 30px;
    overflow: hidden;
    width: 80px;
    height: 80px;
  }

  .cart-items .items-thumb > a, .ui-cart .cart-items .items-thumb > i {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: 1px solid #fff;
    border-radius: 3px;
    border: 0 solid rgba(255, 255, 255, .1);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .06);
  }

  .name {
    width: 380px;
    margin-left: 20px;
    color: #323232;
    display: table;
    a {
      color: #333;
      font-size: 16px;
    }
  }

  .name-table {
    display: table-cell;
    vertical-align: middle;
    height: 140px;
  }

  .fix-bottom {
    padding: 22px 29px 19px 30px;
    height: 90px;
    width: 100%;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
    background: linear-gradient(#fdfdfd, #f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0, 0, 0, .04);
    .cart-bottom-bg {
      height: 80px;
      border-top: 1px solid #D9D9D9;
      border-radius: 0 0 8px 8px;
    }
    .fix-bottom-inner {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .shipping {
      display: flex;
      align-items: center;
    }
    em {
      display: inline-block;
      position: relative;
      top: 3px;
      margin-top: -4px;
      font-size: 24px;
      color: #d44d44;
      font-weight: 700;
    }
  }

  .attribute, .name p {
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
  }
  .payType{
    float: left;
    margin: 20px;
    width: 120px;
    height: 50px;
    line-height: 48px;
    text-align: center;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    font-size: 12px;
    color: #626262;
    background: #f3f3f3;
    background: -webkit-linear-gradient(#fbfbfb, #ececec);
    background: linear-gradient(#fbfbfb, #ececec);
  }
  .checkType{
    margin: 20px;
  }
</style>

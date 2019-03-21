<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="getAddress.length">
          <div class="address-item" v-for="(item,i) in getAddress" :key="i">
            <div class="name">{{item.addressName}}</div>
            <div class="address-msg">{{item.addressDetail}}</div>
            <div class="telephone">{{item.addressPhone}}</div>
            <div class="defalut" >
              <p v-if="item.isDefault=='false'" class="defalut-address"></p>
              <p v-if="item.isDefault=='true'">( 默认地址 )</p>
            </div>
            <div class="operation">
              <el-button type="primary" icon="el-icon-edit" size="small"  @click="update(item)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small" :data-id="item.addressId" @click="del(item)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <input type="text" placeholder="收货人姓名" v-model="msg.userName">
        </div>
        <div>
          <input type="text" placeholder="手机号码" v-model="msg.tel">
        </div>
        <div>
          <input type="text" placeholder="收货地址" v-model="msg.streetName">
        </div>
        <div>
          <!--<el-checkbox v-if="msg.isDefault==='true'" class="auto-login" v-model="msg.isDefault" checked>设为默认</el-checkbox>-->
          <el-checkbox v-model="msg.isDefault">设为默认</el-checkbox>
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="saveAddress({userId:userId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import { addAddress, getAddressList, modifyAddress, deleteAddress } from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import { getStore } from '/utils/storage'
  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault:false
        },
        checked: true,
        userId: '',
        getAddress:[],
        checkBlank:false,
        checkPhone:false
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
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
      getAddressList(){
        let params = {
          addressDto: {
            userId: this.userId
          }
        }
        getAddressList(params).then(res => {
          if(res){
            if (res.code !== "success") {
              return
            }
            this.getAddress = res.addressDtoList
          }
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this.getAddressList()
        }
        return false
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

        if(this.msg.streetName.replace(/(^\s*)|(\s*$)/g, "")==""||this.msg.userName.replace(/(^\s*)|(\s*$)/g, "")=="") {

          this.messageError("请填写完整 !");

        }else if(!(/^1[34578]\d{9}$/.test(phone))){

          this.messageError("手机号码有误，请重填");

        }else if(this.msg.streetName === '' || this.msg.streetName === null){

          this.messageError("地址不能为空 !");

        }else if(pattern.test(this.msg.streetName)){

          this.messageError("地址不符合规则，请重新填写 !");

        }else if(flag==false){

          this.messageError("地址不符合规则，请重新填写 !");

        }else{
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
                } else {
                  this.messageError('修改失败')
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
                } else {
                  this.messageError('修改失败')
                }
              }
            })
          }
        }
      },
      // 删除
      del (item) {
        let params = {
          addressDto: {
            userId: item.userId,
            addressId: item.addressId
          }
        }
        deleteAddress(params).then(res => {
          if(res){
            if (res.code = '"success"') {
              this.messageSuccess('删除成功')
              this.getAddressList()
            }
          }
        })
      },

  // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.addressName
          this.msg.tel = item.addressPhone
          this.msg.streetName = item.addressDetail
          this.msg.isDefault= item.isDefault=='true'
          this.msg.addressId = item.addressId
//          console.log(item.addressId)
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
    },
    created () {
      this.userId = getStore('userId')
      this.getAddressList()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
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
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      margin-left: 115px;
    }
    .tel {
      margin-left: 195px;
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
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
</style>

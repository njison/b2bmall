<template>
  <div class="wrap">
    <div class="header clear-fix">
      <div class="logo-box">
        <img src="../../../static/images/CMlogo.png" alt="">
      </div>
      <div class="logo-text">
        <h1> 辽宁移动零售库存系统</h1>
      </div>
    </div>
    <div class="error_content" v-if="checkStatus==false">
      <div class="error_left">
        <span class="sp_con">赶紧修，大家等着呢。</span>
      </div>
      <div class="error_right">
        <div class="error_detail">
          <p class="error_p_title">哎呦~ 服务器居然累倒了!</p>
          <p class="error_p_con">●别急，工程师正在紧急处理，马上就好。</p>
          <!--<p class="error_p_con">●您可致电010-*****转8169,***通知***开发人员!</p>-->
          <p class="error_p_con">●我们的进步需要您的反馈,感谢您的使用,请您耐心等待!</p>
        </div>
      </div>
    </div>
    <div class="main" v-else="checkStatus==true">
      <img src="../../../static/images/main-background.png" class="rs_bg" v-if="!bgImg">
      <img :src="bgImg" class="rs_bg" v-else>
      <div class="login-main">
        <div class="l-m-title" >
          欢迎登录
      </div>
        <form action="">
          <div class="inp-box">
            <input type="text" placeholder="用户名" class="inp-full" v-model="ruleForm.userName">
          </div>
          <div class="inp-box">
            <input type="password" placeholder="密码" class="inp-full" v-model="ruleForm.userPwd">
          </div>
          <div class="inp-box" v-if="currentValue===true">
            <div style="float: left;">
              <input type="text" placeholder="验证码" class="inp-part" v-model="ruleForm.checkCode">
            </div>
            <div class="checkCode" @click="getCheckCode">
              <img v-if="!vercodeUrl" src="../../../static/images/img-ewm.png" width="100%" alt="验证码" title="点击换一张"/>
              <img v-else :src="vercodeUrl" width="100%" alt="验证码" title="点击换一张"/>
            </div>
            <div style="clear: both"></div>
          </div>

          <div class="inp-box" v-if="currentValue===true">
            <div style="float: left;">
              <input type="password" placeholder="短信验证码" class="inp-part" v-model="ruleForm.phoneCode">
            </div>
            <div style="float: right">
              <div type="button" class="l-m-btn btn-part">
                <span  @click="getCode" v-show="show">发送短信</span>
                <span v-show="!show"> 重新发送({{msgCount}})</span>
               </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div style="margin-top: 25px">
            <y-button :text="logintxt"
                      @btnClick="login"
                      style="margin: 0;width: 100%;height: 40px;font-size: 16px;line-height: 40px;background: #22a8f5;color: #fff"
                      class="l-m-btn btn-full">
            </y-button>
            </div>
        </form>
      </div>
    </div>
    <div class="footer">
      版权所有&nbsp;©&nbsp;2018 中国移动集团公司辽宁省公司
    </div>
  </div>
</template>
<!--<script src="../../../static/geetest/gt.js"></script>-->
<script>
import store from '../../store/'
import YFooter from '/common/footer'
import YButton from '/components/YButton'
import { userLogin, geetest ,userToken,vcode,getBanner,userInfo, phoneCode, checkCodeShow,cleanUserInfo} from '/api/index.js'
import { addCart } from '/api/goods.js'
import { setStore, getStore, removeStore } from '/utils/storage.js'
import md5 from 'js-md5';
//require('../../../static/geetest/gt.js')
let Base64 = require('js-base64').Base64;
let checkCodeUrl = ''
// 判断访问地址
// 外网
if(window.location.href.indexOf('221.180.247.82')>-1){

  checkCodeUrl='http://221.180.247.82:80/rims/verificationCode'

}else if(window.location.href.indexOf('10.68.76.20')>-1){
// 内网
  checkCodeUrl = 'http://10.68.76.20:8000/rims/verificationCode'

}else if(window.location.href.indexOf('192.168.1.112')>-1){
// 测试
  checkCodeUrl = 'http://192.168.1.112:9000/rims/verificationCode'

}else if(window.location.href.indexOf('localhost:8080')>-1){
// 本地
  checkCodeUrl = 'http://192.168.1.112:9000/rims/verificationCode'
}

var captcha
export default {
  data () {
    return {
      cart: [],
      loginPage: true,
      ruleForm: {
        userName: '',
        userPwd: '',
        errMsg: '',
        checkCode:'',
        phoneCode:''
      },
      registered: {
        userName: '',
        userPwd: '',
        userPwd2: '',
        errMsg: ''
      },
      autoLogin: false,
      logintxt: '登录',
      vercodeUrl:checkCodeUrl,
      bgImg:'',
      checkStatus:true,
      show:true,
      msgCount:'',
      currentValue:true
    }
  },
  computed: {
    count () {
      return this.$store.state.login
    }
  },
  methods: {
      // 短信验证码
    getCode(){
        if( this.currentValue===true){
          if (!this.ruleForm.userName || !this.ruleForm.userPwd || !this.ruleForm.checkCode) {
            this.message('请填写完整!')
          } else {
            let pwd=md5(this.ruleForm.userPwd);
//            let pwd=Base64.encode(this.ruleForm.userPwd);
            var params = {
              userName: this.ruleForm.userName,
              userPwd: pwd,
              verify:md5(this.ruleForm.checkCode),
              sso:0
            }
            phoneCode(params).then(res => {
                if(res){
                  if(res.errorCode=='SUCCESS'){
                    this.messageSuccess('发送成功 ！')
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                      this.msgCount = TIME_COUNT;
                      this.show = false;
                      this.timer = setInterval(() => {
                        if (this.msgCount > 0 && this.msgCount <= TIME_COUNT) {
                          this.msgCount--;
                        } else {
                          this.show = true;
                          clearInterval(this.timer);
                          this.timer = null;
                        }
                      }, 1000)
                    }
                  }else if (res.errorCode == 'P_LOGIN_PASSWORD_ERROR') {
                    this.message('密码错误')
                    this.logintxt = '登录'
                  } else if (res.errorCode == 'P_LOGIN_NOSTAFF') {
                    this.message('该用户不存在')
                    this.logintxt = '登录'
                  }else if(res.errorCode== 'P_MSG_EXCEED_RETRY_LIMIT'){
                    this.message('用户已锁定')
                    this.logintxt = '登录'
                  }else if(res.errorCode== 'SMS_CHECK_ERROR'){
                    this.message('短信验证码错误')
                    this.logintxt = '登录'
                  }else if(res.errorCode== 'P_VERIFICATION_CODE_WRONG') {
                    this.message('图形验证码错误')
                    this.logintxt = '登录'
                  }else{
                    this.message('发送失败 !')
                    this.logintxt = '登录'
                  }
                }

            })
          }
        }

    },
      // 图形验证码
    getCheckCode(){
      this.vercodeUrl=checkCodeUrl+'?'+Math.random()* 100000 + 1
    },
    open (t, m) {
      this.$notify.info({
        title: t,
        message: m
      })
    },
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
    getRemembered () {
      var judge = getStore('remember')
      if (judge === 'true') {
        this.autoLogin = true
        this.ruleForm.userName = getStore('rusername')
        this.ruleForm.userPwd = getStore('rpassword')
      }
    },
    rememberPass () {
      if (this.autoLogin === true) {
        setStore('remember', 'true')
        setStore('rusername', this.ruleForm.userName)
        setStore('rpassword', this.ruleForm.userPwd)
      } else {
        setStore('remember', 'false')
        removeStore('rusername')
        removeStore('rpassword')
      }
    },
    async  userToken () {
      await  userToken().then(res1 => {
        setStore('token', res1)
        this.$router.push({
          path: '/'
        })
      })

    },
    toRegister () {
      this.$router.push({
        path: '/register'
      })
    },
    // 登录返回按钮
    login_back () {
      this.$router.go(-1)
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart () {
      let cartArr = []
      let locaCart = JSON.parse(getStore('buyCart'))
      if (locaCart && locaCart.length) {
        locaCart.forEach(item => {
          cartArr.push({
            userId: getStore('userId'),
            productId: item.productId,
            productNum: item.productNum
          })
        })
      }
      this.cart = cartArr
    },
    _cleanUserInfo(){
      let params ={
        userName: this.ruleForm.userName
      }
      cleanUserInfo(params).then(res => {
        if(res) {
          if (res.isSuccess == 'success') {

          }
        }
      })

    },

    async  login () {
      this.logintxt = '登录中...'
      this.rememberPass()
      this._cleanUserInfo()
      if(this.currentValue===true){
        if (!this.ruleForm.userName || !this.ruleForm.userPwd || !this.ruleForm.checkCode || !this.ruleForm.phoneCode) {
          this.message('请填写完整!')
          this.logintxt = '登录'

          return false
        }
      }else{
        if (!this.ruleForm.userName || !this.ruleForm.userPwd ) {
          this.message('请填写完整!')
          this.logintxt = '登录'

          return false
        }
      }
      let pwd=md5(this.ruleForm.userPwd);
//      let pwd=Base64.encode(this.ruleForm.userPwd);
      var params = {
        userName: this.ruleForm.userName,
        userPwd: pwd,
        verify:this.ruleForm.checkCode,
        smsCode: this.ruleForm.phoneCode,
        isMallLogin:1
      }
       userLogin(params).then(res => {
           if(res) {

               if (res.isSuccess == true) {
                 if (res.errorCode == 'P_LOGIN_PASSWORD_ERROR') {
                   this.message('密码错误')
                   this.logintxt = '登录'
                 } else if (res.errorCode == 'P_LOGIN_NOSTAFF') {
                   this.message('该用户不存在')
                   this.logintxt = '登录'
                 }else if(res.errorCode== 'P_MSG_EXCEED_RETRY_LIMIT'){
                   this.message('用户已锁定')
                   this.logintxt = '登录'
                 }else if(res.errorCode== 'SMS_CHECK_ERROR'){
                   this.message('短信验证码错误')
                   this.logintxt = '登录'
                 }else if(res.errorCode== 'P_VERIFICATION_CODE_WRONG'){
                   this.message('图形验证码错误')
                   this.logintxt = '登录'
                 }else if(res.errorCode== 'SUCCESS') {
                   setStore('userId', res.userId)
                   setStore('chanelType', res.chanelType)
                   setStore('userName', res.userName)
                   setStore('orgCode', res.STAFF_ORG_CODE)
                   setStore('token', res.userToken)
                   setStore('userCode', res.userCode)
                   // 登录后成功后存用户信息
                   store.commit('RECORD_USERINFO', {info: res})
//              this.userToken();
                   // 登录后添加当前缓存中的购物车
//              if (this.cart.length) {
//                for (var i = 0; i < this.cart.length; i++) {
//                  addCart(this.cart[i]).then(res => {
//                    if (res.success === true) {
//                    }
//                  })
//                }
                   removeStore('buyCart')
                   this.$router.push({
                     path: '/'
                   })
//              } else {
                   /* this.$router.push({
                    path: '/'
                    })*/
//              }
                 }else{
                   this.message('登录失败，请联系管理员')
                   this.logintxt = '登录'
                 }
               } else {
                 this.logintxt = '登录'
                 return false
               }
             }


      })
    },
    checkUser(){
      let params = {
        userToken: getStore('token')
      }
      userInfo(params).then(res => {
        if (res) {
          this.checkStatus=true
        } else {
          this.checkStatus=false
        }
      })
    },
    isCheckCode(){
      checkCodeShow().then(res => {
          if(res){
            if(res.currentValue === 'true'){
              this.currentValue=true
            }else{
              this.currentValue=false
            }
          }

      })
    },
    getBanner(){
      let params = {
        materialDto :{
          materialType: "4"
        }
      }
      getBanner(params).then(res => {
          if(res){
            if (res.code !== "success") {
              this.error = true
              return
            }
            let data = res
            this.loading = false
            if(data.materialDtoList.length>0){
              this.bgImg = data.materialDtoList[0].url
            }
          }


      })
    },
  },
  mounted () {

    this.getBanner()
    this.getRemembered()
    this.login_addCart()

    this.isCheckCode()
    this.checkUser()
  },
  created () {
    this.getCheckCode()
//    console.log(window.location.href.substr(0,20))

  },
  components: {
    YFooter,
    YButton
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  *{  margin: 0;padding: 0;  }
  table {  border-collapse: collapse;  border-spacing: 0;  width: 100%;  }
  fieldset, img {  border: 0;  }
  address, caption, cite, code, dfn, em, i, strong, th, var {  font-style: normal;  font-weight: normal;  }
  button {  background: none;  border: none;  cursor: pointer;  display: inline-block;  font-size: 14px;  vertical-align: middle;  }
  ol, ul, li {  list-style: none;  }
  hr {  height: 0;  border: none;  }
  caption, th {  text-align: left;  }
  h1, h2, h3, h4, h5, h6 {  font-size: 100%;  font-weight: normal;  }
  a, a:hover, a:active, a:link {  text-decoration: none;  color: #333;  }
  html, body {
    font-family: "microsoft yahei", "Droid Sans", "Helvetica Neue", "Droid Sans Fallback", "Heiti SC", "Hiragino Sans GB", Simsun, Tahoma, Arial, Roboto, sans-self;
    height: 100%;
  }
  body {  font-weight: normal;  background: #fff;  color: #333;  position: relative;  }
  body, button, input, textarea {
    font-family: "microsoft yahei", "Droid Sans", "Helvetica Neue", "Droid Sans Fallback", "Heiti SC", "Hiragino Sans GB", Simsun, Tahoma, Arial, Roboto, sans-self;
    font-size: 14px;
  }
  strong {  font-weight: bold;  }
  button, input, textarea {  outline: none;  }
  div {  -webkit-box-sizing: border-box;  box-sizing: border-box;  }
  .clear-fix:after {  display: block;  clear: both;  content: "";  visibility: hidden;  height: 0;  }
  .clear-fix {  zoom: 1;  }
  .clear {  clear: both;  }
  .fl {  float: left;  }
  .fr {  float: right;  }
  .ml10 {  margin-left: 10px;  }
  .ml20 {  margin-left: 20px;  }
  .mr10 {  margin-right: 10px;  }
  .mr20 {  margin-right: 20px;  }
  .mb10 {  margin-bottom: 10px;  }
  .mb20 {  margin-bottom: 20px;  }
  .mlr10 {  margin-left: 10px;  margin-right: 10px;  }
  .mlr20 {  margin-left: 20px;  margin-right: 20px;  }
  .text-center {  text-align: center;  }
  .text-left {  text-align: left;  }
  .text-right {  text-align: right;  }
  .box-sizing {  box-sizing: border-box;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  }
  .wrap {
    /*position: absolute;*/
    width: 100%;
    min-height: 100%;
    /*background: url('../images/main-background.png') no-repeat center center #0a4cd7;*/
    background-size: cover;
  }
  .f12 {  font-size: 12px;  }
  .fwb {  font-weight: bold;  }
  .header {
    height: 80px;
    border-bottom: 1px solid #d4d5d6;
    padding: 22px 56px;
    background: #fff;
  }
  .header .logo-box {
    float: left;
  }
  .header .space-line {
    float: left;
    margin: 0 15px;
  }
  .logo-text h1{
      color: #2d4664;
      font-size: 24px;
      display: inline-block;
      vertical-align: middle;
      margin: 0;
      padding: 0;
      font-weight: 700;
      margin-left: 10px;
  }
  .footer {
    border-top: 1px solid #d4d5d6;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #fff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 12px;
  }
  .login-main {
    border: 1px solid #d4d5d6;
    border-radius: 5px;
    position: absolute;
    right: 45%;
    margin-right: -450px;
    width:320px;
    padding: 33px 50px;
    background: #fff;
    top: 20%;
    z-index: 201;
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  }
  .login-main .l-m-title {
    text-align: center;
    color: #22a8f5;
    margin-bottom: 30px;
    font-size: 28px;
  }
  .login-main .inp-box {
    margin-bottom: 20px;
  }
  .login-main .inp-box .inp-full,
  .login-main .inp-box .inp-part {
    height: 40px;
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
  }
  .login-main .inp-box .inp-full {
    width: 100%;
  }
  .login-main .inp-box .inp-part {
    width: 108px;
    margin-right: 5px;
  }
  .login-main .inp-box img {
    vertical-align: middle;
    /*<!--margin-top: -3px;-->*/
  }
  .l-m-btn {
    background: #22a8f5;
    color: #fff;
    border-radius: 5px;
    text-align: center;
  }
  .l-m-btn:hover {
    background: #0186d1;
  }
  .btn-part {
    width: 100px;
    height: 40px;
    line-height: 40px;
    /*<!--margin-top: -3px;-->*/
  }
  .btn-full {
    width: 100%;
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .main {
    height: 450px;
    border-top: #e6e7e7 solid 1px;
    /*border-bottom: #A0A0A0 1px solid;*/
    background-sizing: 100%;
    /*position: relative;*/
  }
  .rs_bg {
    position: relative;
    width: 100%;
    height: 450px;
    z-index: 100;
  }
  .checkCode {
    float: right;
    width: 100px;
    height: 40px;
  }
  .error_content{ margin: 0 auto; width: 1000px;}
  .error_left{ margin: 20px 0 0 50px; width: 330px ; height: 345px; background: url('../../../static/images/timg.png') no-repeat;background-size: 100%;float: left;}
  .error_right{ width: 450px; float: left; }
  .error_detail { margin: 180px 0 0 120px;     width: 400px; height: auto; }
  .error_detail .error_p_title{ font-size: 28px; color: #eb8531;}
  .error_detail .error_p_con{ font-size:14px; margin-top: 10px; line-height: 20px;}
  .sp_con{ margin-left: 128px; color:#1A4EC0;margin-top: 39px;position: absolute;font-size: 18px; }
  .btn_error { margin: 80px 0 0 160px;}
  .btn_error a{  padding: 5px; border: 1px solid  #CCCCCC; }
  .btn_back1{background: dodgerblue; color: #ffffff;}
  .btn_back2{ margin-left:25px;background: #CCCCCC;}

  .btn {
    width: 40px;
    height: 38px;
    cursor: pointer;
    color: #FF813B;
    float: right;
    margin-top: 1px;
    border-left: solid 1px #FF813B;
    font-size: 20px;
    background: no-repeat;
  }
  /*# sourceMappingURL=./style.css.map */
</style>

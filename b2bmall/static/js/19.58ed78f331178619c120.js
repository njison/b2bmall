webpackJsonp([19],{147:function(n,t,e){function a(n){e(306)}var i=e(58)(e(242),e(352),a,"data-v-442ba459",null);n.exports=i.exports},166:function(n,t,e){function a(n){e(169)}var i=e(58)(e(167),e(170),a,"data-v-39a213d4",null);n.exports=i.exports},167:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{text:{type:[String,Number],default:"一颗小按钮"},inputType:{type:[String],default:"button"},classStyle:{type:String,default:"default-btn"}},methods:{btnClick:function(n){this.$emit("btnClick",n)}}}},168:function(n,t,e){t=n.exports=e(137)(!0),t.push([n.i,".default-btn[data-v-39a213d4],.disabled-btn[data-v-39a213d4],.main-btn[data-v-39a213d4]{width:100px;height:30px;line-height:28px;vertical-align:middle}input[data-v-39a213d4]{display:inline-block;cursor:pointer;text-align:center}.gray-btn[data-v-39a213d4]{border:1px solid #d5d5d5;color:#646464}.default-btn[data-v-39a213d4]{border:1px solid #e1e1e1;border-radius:4px;font-size:12px;color:#646464;background-color:#f9f9f9;background-image:-webkit-linear-gradient(top,#fff,#f9f9f9);background-image:linear-gradient(180deg,#fff,#f9f9f9)}.default-btn[data-v-39a213d4]:hover{background-color:#eee;background-image:-webkit-linear-gradient(top,#f5f5f5,#eee);background-image:linear-gradient(180deg,#f5f5f5,#eee)}.main-btn[data-v-39a213d4]{border:1px solid #5c81e3;border-radius:4px;font-size:12px;color:#fff;background-color:#678ee7;background-image:-webkit-linear-gradient(top,#678ee7,#5078df);background-image:linear-gradient(180deg,#678ee7,#5078df)}.main-btn[data-v-39a213d4]:hover{background-color:#6c8cd4;background-image:-webkit-linear-gradient(top,#6c8cd4,#4769c2);background-image:linear-gradient(180deg,#6c8cd4,#4769c2)}.disabled-btn[data-v-39a213d4]{cursor:not-allowed;border:1px solid #afafaf;border-radius:4px;font-size:12px;color:#fff;background-color:#a9a9a9;background-image:-webkit-linear-gradient(top,#b8b8b8,#a9a9a9);background-image:linear-gradient(180deg,#b8b8b8,#a9a9a9)}","",{version:3,sources:["F:/ztesoft/newb2bmall/b2bmall/src/components/YButton.vue"],names:[],mappings:"AAEA,wFACE,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,qBAAuB,CACxB,AACD,uBACE,qBAAsB,AACtB,eAAgB,AAChB,iBAAmB,CAOpB,AAGD,2BACE,yBAA0B,AAC1B,aAAe,CAChB,AACD,8BACE,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,yBAA0B,AAC1B,2DAA8D,AAC9D,qDAAyD,CAC1D,AACD,oCACI,sBAAuB,AACvB,2DAA8D,AAC9D,qDAAyD,CAC5D,AACD,2BACE,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,WAAY,AACZ,yBAA0B,AAC1B,8DAAiE,AACjE,wDAA4D,CAC7D,AACD,iCACI,yBAA0B,AAC1B,8DAAiE,AACjE,wDAA4D,CAC/D,AACD,+BACE,mBAAoB,AACpB,yBAA0B,AAC1B,kBAAmB,AACnB,eAAgB,AAChB,WAAY,AACZ,yBAA0B,AAC1B,8DAAiE,AACjE,wDAA4D,CAC7D",file:"YButton.vue",sourcesContent:['\n@charset "UTF-8";\n.default-btn[data-v-39a213d4], .main-btn[data-v-39a213d4], .disabled-btn[data-v-39a213d4] {\n  width: 100px;\n  height: 30px;\n  line-height: 28px;\n  vertical-align: middle;\n}\ninput[data-v-39a213d4] {\n  display: inline-block;\n  cursor: pointer;\n  text-align: center;\n  /*> span {*/\n  /*user-select: none;*/\n  /*display: inline-block;*/\n  /*width: 100%;*/\n  /*height: 100%;*/\n  /*}*/\n}\n\n/*灰色的按钮*/\n.gray-btn[data-v-39a213d4] {\n  border: 1px solid #d5d5d5;\n  color: #646464;\n}\n.default-btn[data-v-39a213d4] {\n  border: 1px solid #e1e1e1;\n  border-radius: 4px;\n  font-size: 12px;\n  color: #646464;\n  background-color: #f9f9f9;\n  background-image: -webkit-linear-gradient(top, #fff, #f9f9f9);\n  background-image: linear-gradient(180deg, #fff, #f9f9f9);\n}\n.default-btn[data-v-39a213d4]:hover {\n    background-color: #eee;\n    background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);\n    background-image: linear-gradient(180deg, #f5f5f5, #eee);\n}\n.main-btn[data-v-39a213d4] {\n  border: 1px solid #5c81e3;\n  border-radius: 4px;\n  font-size: 12px;\n  color: #fff;\n  background-color: #678ee7;\n  background-image: -webkit-linear-gradient(top, #678ee7, #5078df);\n  background-image: linear-gradient(180deg, #678ee7, #5078df);\n}\n.main-btn[data-v-39a213d4]:hover {\n    background-color: #6c8cd4;\n    background-image: -webkit-linear-gradient(top, #6c8cd4, #4769c2);\n    background-image: linear-gradient(180deg, #6c8cd4, #4769c2);\n}\n.disabled-btn[data-v-39a213d4] {\n  cursor: not-allowed;\n  border: 1px solid #afafaf;\n  border-radius: 4px;\n  font-size: 12px;\n  color: #fff;\n  background-color: #a9a9a9;\n  background-image: -webkit-linear-gradient(top, #b8b8b8, #a9a9a9);\n  background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);\n}\n'],sourceRoot:""}])},169:function(n,t,e){var a=e(168);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(138)("33e2b63a",a,!0,{})},170:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement;return(n._self._c||t)("input",{class:n.classStyle,attrs:{type:n.inputType,readonly:"",disabled:"disabled-btn"===n.classStyle},domProps:{value:n.text},on:{click:function(t){n.btnClick(t)}}})},staticRenderFns:[]}},171:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["title"]}},173:function(n,t,e){t=n.exports=e(137)(!0),t.push([n.i,".gray-box[data-v-379d4dd3]{position:relative;margin-bottom:30px;overflow:hidden;background:#fff;border-radius:8px;border:1px solid #dcdcdc;border-color:rgba(0,0,0,.14);box-shadow:0 3px 8px -6px rgba(0,0,0,.1)}.gray-box .title[data-v-379d4dd3]{padding-left:30px;position:relative;z-index:10;height:60px;padding:0 10px 0 24px;border-bottom:1px solid #d4d4d4;border-radius:8px 8px 0 0;box-shadow:0 1px 7px rgba(0,0,0,.06);background:#f3f3f3;background:-webkit-linear-gradient(#fbfbfb,#ececec);background:linear-gradient(#fbfbfb,#ececec);line-height:60px;font-size:18px;color:#333;display:flex;justify-content:space-between;align-items:center}.gray-box .title h2[data-v-379d4dd3]{font-size:18px;font-weight:400;color:#626262;display:inline-block}","",{version:3,sources:["F:/ztesoft/newb2bmall/b2bmall/src/components/shelf.vue"],names:[],mappings:"AACA,2BACE,kBAAmB,AACnB,mBAAoB,AACpB,gBAAiB,AACjB,gBAAiB,AACjB,kBAAmB,AACnB,yBAA0B,AAC1B,6BAAkC,AAClC,wCAA8C,CAC/C,AACD,kCACI,kBAAmB,AACnB,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,sBAAuB,AACvB,gCAAiC,AACjC,0BAA2B,AAC3B,qCAA0C,AAC1C,mBAAoB,AACpB,oDAAsD,AACtD,4CAA8C,AAC9C,iBAAkB,AAClB,eAAgB,AAChB,WAAY,AACZ,aAAc,AACd,8BAA+B,AAC/B,kBAAoB,CACvB,AACD,qCACM,eAAgB,AAChB,gBAAiB,AACjB,cAAe,AACf,oBAAsB,CAC3B",file:"shelf.vue",sourcesContent:["\n.gray-box[data-v-379d4dd3] {\n  position: relative;\n  margin-bottom: 30px;\n  overflow: hidden;\n  background: #fff;\n  border-radius: 8px;\n  border: 1px solid #dcdcdc;\n  border-color: rgba(0, 0, 0, 0.14);\n  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);\n}\n.gray-box .title[data-v-379d4dd3] {\n    padding-left: 30px;\n    position: relative;\n    z-index: 10;\n    height: 60px;\n    padding: 0 10px 0 24px;\n    border-bottom: 1px solid #d4d4d4;\n    border-radius: 8px 8px 0 0;\n    box-shadow: rgba(0, 0, 0, 0.06) 0 1px 7px;\n    background: #f3f3f3;\n    background: -webkit-linear-gradient(#fbfbfb, #ececec);\n    background: linear-gradient(#fbfbfb, #ececec);\n    line-height: 60px;\n    font-size: 18px;\n    color: #333;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n.gray-box .title h2[data-v-379d4dd3] {\n      font-size: 18px;\n      font-weight: 400;\n      color: #626262;\n      display: inline-block;\n}\n"],sourceRoot:""}])},174:function(n,t,e){var a=e(173);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(138)("158a5602",a,!0,{})},175:function(n,t,e){function a(n){e(174)}var i=e(58)(e(171),e(176),a,"data-v-379d4dd3",null);n.exports=i.exports},176:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"gray-box"},[e("div",{staticClass:"title"},[e("h2",[n._v(n._s(n.title))]),n._v(" "),e("div",[n._t("right")],2)]),n._v(" "),e("div",[n._t("content")],2)])},staticRenderFns:[]}},242:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e(175),i=e.n(a),A=e(166),o=e.n(A),d=e(16);t.default={data:function(){return{show:!0,count:25,userId:"",orderTotal:"",userName:"",tel:"",streetName:"",checkPrice:"",payNow:"等待支付...",submit:!1,nickName:"",money:"",info:"",email:"",dialogVisible:!0,isCustom:0,imgPath:"static/qr/alipay/custom.png",picName:"",timeout:!1,timecount:""}},computed:{},methods:{changePic:function(){this.show=!this.show},toMoney:function(n){return n=parseFloat(n),n=n.toFixed(2),n=n.toLocaleString()},handleClose:function(){this.countDown(),this.countTime()},showRed:function(){this.dialogVisible=!0},countDown:function(){var n=this;if(0===this.count)return this.payNow="确认已支付",void(this.submit=!0);this.count--,setTimeout(function(){n.countDown()},1e3)},countTime:function(){var n=this,t=e.i(d.a)("setTime");if(t<=0)return this.timeout=!0,this.timecount="",void(this.count=1e4);t--,this.showTime(t),e.i(d.b)("setTime",t),setTimeout(function(){n.countTime()},1e3)},showTime:function(n){var t=0,e=0;if(null===n||""===n)return"";n>=60?(t=Math.floor(n/60),e=n%60):e=n,t>=0&&t<=9&&(t="0"+t),e>=0&&e<=9&&(e="0"+e),this.timecount="请于 "+t+" 分 "+e+" 秒 内支付"},paySuc:function(){this.$router.push({path:"/order/paysuccess",query:{price:this.orderTotal}})}},mounted:function(){var n=e.i(d.a)("price"),t=e.i(d.a)("isCustom");this.orderTotal=this.toMoney(n),"NaN"===this.orderTotal&&this.$router.push({path:"/"}),"true"!==t&&(this.picName=this.orderTotal,this.imgPath="static/qr/alipay/"+this.picName+".png")},components:{YShelf:i.a,YButton:o.a}}},278:function(n,t,e){t=n.exports=e(137)(!0),t.push([n.i,".w[data-v-442ba459]{padding-top:39px}.order-info[data-v-442ba459]{padding:60px 0 55px;color:#333;background:#fff!important}.order-info h3[data-v-442ba459]{padding-bottom:14px;line-height:36px;text-align:center;font-size:36px;color:#212121}.order-info .payment-detail[data-v-442ba459]{text-align:center;line-height:24px;font-size:14px;color:#999}.box-inner[data-v-442ba459]{line-height:60px;background:#f9f9f9;border-top:1px solid #e5e5e5;box-sizing:border-box}.box-inner>div[data-v-442ba459]{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:0 20px}.box-inner em[data-v-442ba459]{margin-left:5px;font-size:24px;color:#d44d44;font-weight:700;margin-right:20px}.box-inner em span[data-v-442ba459]{margin-right:4px;font-size:16px}.box-btn[data-v-442ba459]{line-height:60px;background:#f9f9f9;border-top:1px solid #e5e5e5;box-sizing:border-box}.box-btn>div[data-v-442ba459]{display:flex;justify-content:flex-end;align-items:center;padding:0 20px}.box-btn em[data-v-442ba459]{margin-left:5px;font-size:24px;color:#d44d44;font-weight:700;margin-right:20px}.box-btn em span[data-v-442ba459]{margin-right:4px;font-size:16px}.payment-money[data-v-442ba459]{text-align:center;font-size:30px;color:#d44d44;font-weight:700}.img-box[data-v-442ba459]{position:relative;width:180px;height:auto;min-height:168px;margin:0 auto;padding:6px;border:1px solid #d3d3d3;box-shadow:1px 1px 1px #ccc;display:inline-block}.explain[data-v-442ba459]{margin:5px 0 12px}.pic[data-v-442ba459]{margin-top:3px}.fn-left[data-v-442ba459]{margin-left:-5px}.fn-right[data-v-442ba459]{font-size:13px;color:#4d4d4d;line-height:18px;margin:-57px 0 0 33px}.download-alipay[data-v-442ba459]{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;margin-top:-5px;font-size:12px;color:#a6a6a6;text-decoration:underline;width:25%;margin:0 auto}.qrguide-area[data-v-442ba459]{position:absolute;top:113px;left:713px;width:204px;height:183px;cursor:pointer}.show-img[data-v-442ba459]{display:block}.close-img[data-v-442ba459]{display:none}.red[data-v-442ba459]{position:absolute;top:482px;left:1151px;width:47px;height:50px;cursor:pointer}.el-dialog--small[data-v-442ba459]{width:30%}.qr-red[data-v-442ba459]{display:block;margin:0 auto;width:70%}.count[data-v-442ba459]{display:flex;position:absolute;text-align:center;width:230px;flex-direction:column;align-items:center;margin-left:calc(50% - 115px);margin-top:0;color:#222;margin-top:-18px}.timeout[data-v-442ba459]{position:absolute;top:0;right:0;left:0;bottom:0;background:hsla(0,0%,100%,.95);color:#222;line-height:200px;text-align:center;z-index:1}","",{version:3,sources:["F:/ztesoft/newb2bmall/b2bmall/src/page/Order/alipay.vue"],names:[],mappings:"AACA,oBACE,gBAAkB,CACnB,AACD,6BACE,oBAAqB,AACrB,WAAY,AACZ,yBAA4B,CAC7B,AACD,gCACI,oBAAqB,AACrB,iBAAkB,AAClB,kBAAmB,AACnB,eAAgB,AAChB,aAAe,CAClB,AACD,6CACI,kBAAmB,AACnB,iBAAkB,AAClB,eAAgB,AAChB,UAAY,CACf,AACD,4BACE,iBAAkB,AAClB,mBAAoB,AACpB,6BAA8B,AAC9B,qBAAuB,CACxB,AACD,gCACI,aAAc,AACd,sBAAuB,AACvB,yBAA0B,AAC1B,mBAAoB,AACpB,cAAgB,CACnB,AACD,+BACI,gBAAiB,AACjB,eAAgB,AAChB,cAAe,AACf,gBAAiB,AACjB,iBAAmB,CACtB,AACD,oCACM,iBAAkB,AAClB,cAAgB,CACrB,AACD,0BACE,iBAAkB,AAClB,mBAAoB,AACpB,6BAA8B,AAC9B,qBAAuB,CACxB,AACD,8BACI,aAAc,AACd,yBAA0B,AAC1B,mBAAoB,AACpB,cAAgB,CACnB,AACD,6BACI,gBAAiB,AACjB,eAAgB,AAChB,cAAe,AACf,gBAAiB,AACjB,iBAAmB,CACtB,AACD,kCACM,iBAAkB,AAClB,cAAgB,CACrB,AACD,gCACE,kBAAmB,AACnB,eAAgB,AAChB,cAAe,AACf,eAAiB,CAClB,AACD,0BACE,kBAAmB,AACnB,YAAa,AACb,YAAa,AACb,iBAAkB,AAClB,cAAe,AACf,YAAa,AACb,yBAA0B,AAC1B,4BAA6B,AAC7B,oBAAsB,CACvB,AACD,0BACE,iBAAqB,CACtB,AACD,sBACE,cAAgB,CACjB,AACD,0BACE,gBAAkB,CACnB,AACD,2BACE,eAAgB,AAChB,cAAe,AACf,iBAAkB,AAClB,qBAAuB,CACxB,AACD,kCACE,aAAc,AACd,sBAAuB,AACvB,yBAA0B,AAC1B,mBAAoB,AACpB,gBAAiB,AACjB,eAAgB,AAChB,cAAe,AACf,0BAA2B,AAC3B,UAAW,AACX,aAAe,CAChB,AACD,+BACE,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,aAAc,AACd,cAAgB,CACjB,AACD,2BACE,aAAe,CAChB,AACD,4BACE,YAAc,CACf,AACD,sBACE,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,WAAY,AACZ,YAAa,AACb,cAAgB,CACjB,AACD,mCACE,SAAW,CACZ,AACD,yBACE,cAAe,AACf,cAAe,AACf,SAAW,CACZ,AACD,wBACE,aAAc,AACd,kBAAmB,AACnB,kBAAmB,AACnB,YAAa,AACb,sBAAuB,AACvB,mBAAoB,AACpB,8BAA+B,AAC/B,aAAgB,AAChB,WAAY,AACZ,gBAAkB,CACnB,AACD,0BACE,kBAAmB,AACnB,MAAO,AACP,QAAS,AACT,OAAQ,AACR,SAAU,AACV,+BAAsC,AACtC,WAAY,AACZ,kBAAmB,AACnB,kBAAmB,AACnB,SAAW,CACZ",file:"alipay.vue",sourcesContent:["\n.w[data-v-442ba459] {\n  padding-top: 39px;\n}\n.order-info[data-v-442ba459] {\n  padding: 60px 0 55px;\n  color: #333;\n  background: #fff !important;\n}\n.order-info h3[data-v-442ba459] {\n    padding-bottom: 14px;\n    line-height: 36px;\n    text-align: center;\n    font-size: 36px;\n    color: #212121;\n}\n.order-info .payment-detail[data-v-442ba459] {\n    text-align: center;\n    line-height: 24px;\n    font-size: 14px;\n    color: #999;\n}\n.box-inner[data-v-442ba459] {\n  line-height: 60px;\n  background: #f9f9f9;\n  border-top: 1px solid #e5e5e5;\n  box-sizing: border-box;\n}\n.box-inner > div[data-v-442ba459] {\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    align-items: center;\n    padding: 0 20px;\n}\n.box-inner em[data-v-442ba459] {\n    margin-left: 5px;\n    font-size: 24px;\n    color: #d44d44;\n    font-weight: 700;\n    margin-right: 20px;\n}\n.box-inner em span[data-v-442ba459] {\n      margin-right: 4px;\n      font-size: 16px;\n}\n.box-btn[data-v-442ba459] {\n  line-height: 60px;\n  background: #f9f9f9;\n  border-top: 1px solid #e5e5e5;\n  box-sizing: border-box;\n}\n.box-btn > div[data-v-442ba459] {\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n    padding: 0 20px;\n}\n.box-btn em[data-v-442ba459] {\n    margin-left: 5px;\n    font-size: 24px;\n    color: #d44d44;\n    font-weight: 700;\n    margin-right: 20px;\n}\n.box-btn em span[data-v-442ba459] {\n      margin-right: 4px;\n      font-size: 16px;\n}\n.payment-money[data-v-442ba459] {\n  text-align: center;\n  font-size: 30px;\n  color: #d44d44;\n  font-weight: 700;\n}\n.img-box[data-v-442ba459] {\n  position: relative;\n  width: 180px;\n  height: auto;\n  min-height: 168px;\n  margin: 0 auto;\n  padding: 6px;\n  border: 1px solid #d3d3d3;\n  box-shadow: 1px 1px 1px #ccc;\n  display: inline-block;\n}\n.explain[data-v-442ba459] {\n  margin: 5px 0 12px 0;\n}\n.pic[data-v-442ba459] {\n  margin-top: 3px;\n}\n.fn-left[data-v-442ba459] {\n  margin-left: -5px;\n}\n.fn-right[data-v-442ba459] {\n  font-size: 13px;\n  color: #4D4D4D;\n  line-height: 18px;\n  margin: -57px 0 0 33px;\n}\n.download-alipay[data-v-442ba459] {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  align-items: center;\n  margin-top: -5px;\n  font-size: 12px;\n  color: #a6a6a6;\n  text-decoration: underline;\n  width: 25%;\n  margin: 0 auto;\n}\n.qrguide-area[data-v-442ba459] {\n  position: absolute;\n  top: 113px;\n  left: 713px;\n  width: 204px;\n  height: 183px;\n  cursor: pointer;\n}\n.show-img[data-v-442ba459] {\n  display: block;\n}\n.close-img[data-v-442ba459] {\n  display: none;\n}\n.red[data-v-442ba459] {\n  position: absolute;\n  top: 482px;\n  left: 1151px;\n  width: 47px;\n  height: 50px;\n  cursor: pointer;\n}\n.el-dialog--small[data-v-442ba459] {\n  width: 30%;\n}\n.qr-red[data-v-442ba459] {\n  display: block;\n  margin: 0 auto;\n  width: 70%;\n}\n.count[data-v-442ba459] {\n  display: flex;\n  position: absolute;\n  text-align: center;\n  width: 230px;\n  flex-direction: column;\n  align-items: center;\n  margin-left: calc(50% - 115px);\n  margin-top: 0px;\n  color: #222;\n  margin-top: -18px;\n}\n.timeout[data-v-442ba459] {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.95);\n  color: #222;\n  line-height: 200px;\n  text-align: center;\n  z-index: 1;\n}\n"],sourceRoot:""}])},306:function(n,t,e){var a=e(278);"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e(138)("4874983d",a,!0,{})},352:function(n,t){n.exports={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"w",staticStyle:{"padding-bottom":"100px"}},[e("y-shelf",{attrs:{title:"XPay收银台 收款方: Exrick"}},[e("div",{attrs:{slot:"content"},slot:"content"},[e("div",{staticClass:"box-inner order-info"},[e("p",{staticClass:"payment-detail"},[n._v("扫一扫付款（元）")]),n._v(" "),e("p",{staticClass:"payment-money"},[n._v(n._s(n.orderTotal))]),n._v(" "),e("div",{staticClass:"img-box"},[e("img",{staticClass:"pic",attrs:{id:"qr",src:n.imgPath,alt:"加载失败",width:"168px",height:"168px"}}),n._v(" "),e("div",{staticClass:"explain"},[e("img",{staticClass:"fn-left",attrs:{src:"https://t.alipayobjects.com/images/T1bdtfXfdiXXXXXXXX.png",alt:"扫一扫标识"}}),n._v(" "),e("div",{staticClass:"fn-right"},[n._v("打开手机支付宝"),e("br"),n._v("扫一扫继续付款")]),n._v(" "),n.timeout?e("div",{staticClass:"timeout"},[n._v("二维码已过期")]):n._e()])]),n._v(" "),e("a",{staticClass:"download-alipay",attrs:{href:"https://mobile.alipay.com/index.htm",target:"_blank"}},[n._v("首次使用请下载手机支付宝")]),n._v(" "),e("div",{staticClass:"count"},[n._v(n._s(n.timecount))]),n._v(" "),e("div",{staticClass:"qrguide-area"},[e("img",{class:n.show?"show-img":"close-img",attrs:{src:"https://t.alipayobjects.com/images/rmsweb/T13CpgXf8mXXXXXXXX.png"},on:{click:function(t){n.changePic()}}}),n._v(" "),e("img",{class:n.show?"close-img":"show-img",attrs:{src:"https://t.alipayobjects.com/images/rmsweb/T1ASFgXdtnXXXXXXXX.png"},on:{click:function(t){n.changePic()}}})]),n._v(" "),e("img",{staticClass:"red",attrs:{src:"static/images/red.png",width:"50px",height:"50px",title:"支付领红包"},on:{click:function(t){n.showRed()}}})]),n._v(" "),e("div",[e("div",{staticClass:"box-btn"},[e("div",[e("span"),n._v(" "),e("em",[e("span",[n._v("¥")]),n._v(n._s(n.orderTotal))]),n._v(" "),e("y-button",{staticStyle:{width:"120px",height:"40px","font-size":"16px","line-height":"38px"},attrs:{text:n.payNow,classStyle:n.submit?"main-btn":"disabled-btn"},on:{btnClick:function(t){n.paySuc()}}})],1)])])])]),n._v(" "),e("el-dialog",{staticStyle:{"text-align":"center",width:"50%",margin:"0 auto"},attrs:{title:"支付红包",visible:n.dialogVisible,width:"30%"},on:{"update:visible":function(t){n.dialogVisible=t},close:n.handleClose}},[e("img",{staticClass:"qr-red",attrs:{src:"http://oweupqzdv.bkt.clouddn.com/1512881761970_small.jpg"}}),n._v(" "),e("span",[n._v("支付前领个红包吧(每日可领一次)")]),n._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:function(t){n.dialogVisible=!1}}},[n._v("领取了")])],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=19.58ed78f331178619c120.js.map
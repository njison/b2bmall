webpackJsonp([6],{346:function(t,e,i){function a(t){i(507)}var o=i(245)(i(444),i(556),a,"data-v-0e416fd1",null);t.exports=o.exports},369:function(t,e,i){function a(t){i(372)}var o=i(245)(i(370),i(373),a,"data-v-39a213d4",null);t.exports=o.exports},370:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{text:{type:[String,Number],default:"一颗小按钮"},inputType:{type:[String],default:"button"},classStyle:{type:String,default:"default-btn"}},methods:{btnClick:function(t){this.$emit("btnClick",t)}}}},371:function(t,e,i){e=t.exports=i(339)(!1),e.push([t.i,".default-btn[data-v-39a213d4],.disabled-btn[data-v-39a213d4],.main-btn[data-v-39a213d4]{width:100px;height:30px;line-height:28px;vertical-align:middle}input[data-v-39a213d4]{display:inline-block;cursor:pointer;text-align:center}.gray-btn[data-v-39a213d4]{border:1px solid #d5d5d5;color:#646464}.default-btn[data-v-39a213d4]{border:1px solid #e1e1e1;border-radius:4px;font-size:12px;color:#646464;background-color:#f9f9f9;background-image:-webkit-linear-gradient(top,#fff,#f9f9f9);background-image:linear-gradient(180deg,#fff,#f9f9f9)}.default-btn[data-v-39a213d4]:hover{background-color:#eee;background-image:-webkit-linear-gradient(top,#f5f5f5,#eee);background-image:linear-gradient(180deg,#f5f5f5,#eee)}.main-btn[data-v-39a213d4]{border:1px solid #5c81e3;border-radius:4px;font-size:12px;color:#fff;background-color:#678ee7;background-image:-webkit-linear-gradient(top,#678ee7,#5078df);background-image:linear-gradient(180deg,#678ee7,#5078df)}.main-btn[data-v-39a213d4]:hover{background-color:#6c8cd4;background-image:-webkit-linear-gradient(top,#6c8cd4,#4769c2);background-image:linear-gradient(180deg,#6c8cd4,#4769c2)}.disabled-btn[data-v-39a213d4]{cursor:not-allowed;border:1px solid #afafaf;border-radius:4px;font-size:12px;color:#fff;background-color:#a9a9a9;background-image:-webkit-linear-gradient(top,#b8b8b8,#a9a9a9);background-image:linear-gradient(180deg,#b8b8b8,#a9a9a9)}",""])},372:function(t,e,i){var a=i(371);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(340)("2817f91c",a,!0,{})},373:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{class:t.classStyle,attrs:{type:t.inputType,readonly:"",disabled:"disabled-btn"===t.classStyle},domProps:{value:t.text},on:{click:function(e){t.btnClick(e)}}})},staticRenderFns:[]}},374:function(t,e,i){"use strict";i.d(e,"r",function(){return o}),i.d(e,"f",function(){return n}),i.d(e,"h",function(){return r}),i.d(e,"q",function(){return d}),i.d(e,"g",function(){return s}),i.d(e,"k",function(){return l}),i.d(e,"j",function(){return c}),i.d(e,"i",function(){return f}),i.d(e,"b",function(){return g}),i.d(e,"c",function(){return p}),i.d(e,"d",function(){return u}),i.d(e,"e",function(){return v}),i.d(e,"o",function(){return h}),i.d(e,"m",function(){return m}),i.d(e,"l",function(){return x}),i.d(e,"n",function(){return b}),i.d(e,"a",function(){return A}),i.d(e,"p",function(){return y});var a=i(247),o=function(t){return a.a.fetchGet("/goods/allGoods",t)},n=function(t){return a.a.fetchPost("/cart/queryCartList",t)},r=function(t){return a.a.fetchPost("/cart/addCart",t)},d=function(t){return a.a.fetchPost("/cart/modifyCart",t)},s=function(t){return a.a.fetchPost("/cart/deleteCart",t)},l=function(t){return a.a.fetchPost("/terminalStatusMgr/addOrderAndOrderItem",t)},c=function(t){return a.a.fetchPost("/member/payOrder",t)},f=function(t){return a.a.fetchGet("/member/orderDetail",t)},g=function(t){return a.a.fetchPost("/goods/querySCGoodsInfo",t)},p=function(t){return a.a.fetchPost("/esservice/searchGoodsByKeyword",t)},u=function(t){return a.a.fetchPost("/dcData/getDcDataByDcName",t)},v=function(t){return a.a.fetchPost("/vender/queryVenderList",t)},h=function(t){return a.a.fetchPost("/address/queryAddressList",t)},m=function(t){return a.a.fetchPost("/address/addAddress",t)},x=function(t){return a.a.fetchPost("/address/modifyAddress",t)},b=function(t){return a.a.fetchPost("/address/deleteAddress",t)},A=function(t){return a.a.fetchPost("/terminalStatusMgr/queryOrderList",t)},y=function(t){return a.a.fetchPost("/terminalStatusMgr/orderCancel",t)}},375:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["title"]}},376:function(t,e,i){e=t.exports=i(339)(!1),e.push([t.i,".gray-box[data-v-379d4dd3]{position:relative;margin-bottom:30px;overflow:hidden;background:#fff;border-radius:8px;border:1px solid #dcdcdc;border-color:rgba(0,0,0,.14);box-shadow:0 3px 8px -6px rgba(0,0,0,.1)}.gray-box .title[data-v-379d4dd3]{padding-left:30px;position:relative;z-index:10;height:60px;padding:0 10px 0 24px;border-bottom:1px solid #d4d4d4;border-radius:8px 8px 0 0;box-shadow:0 1px 7px rgba(0,0,0,.06);background:#f3f3f3;background:-webkit-linear-gradient(#fbfbfb,#ececec);background:linear-gradient(#fbfbfb,#ececec);line-height:60px;font-size:18px;color:#333;display:flex;justify-content:space-between;align-items:center}.gray-box .title h2[data-v-379d4dd3]{font-size:18px;font-weight:400;color:#626262;display:inline-block}",""])},377:function(t,e,i){var a=i(376);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(340)("0d0b540d",a,!0,{})},378:function(t,e,i){function a(t){i(377)}var o=i(245)(i(375),i(379),a,"data-v-379d4dd3",null);t.exports=o.exports},379:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"gray-box"},[i("div",{staticClass:"title"},[i("h2",[t._v(t._s(t.title))]),t._v(" "),i("div",[t._t("right")],2)]),t._v(" "),i("div",[t._t("content")],2)])},staticRenderFns:[]}},410:function(t,e,i){t.exports=i.p+"static/img/CMlogo1.c50c76a.png"},416:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["product"]}},417:function(t,e,i){e=t.exports=i(339)(!1),e.push([t.i,".item .img-box[data-v-ddf2dc50]{display:flex;align-items:center;justify-content:center}.item[data-v-ddf2dc50]{position:relative;height:429px;text-align:center}.item img[data-v-ddf2dc50]{display:block;width:206px;height:206px}.item .info[data-v-ddf2dc50]{width:100%;padding:0 10px}.item .info h6[data-v-ddf2dc50]{font-size:16px;color:#424242}.item .info h6[data-v-ddf2dc50],.item .info p[data-v-ddf2dc50]{overflow:hidden;line-height:1.2;white-space:nowrap;text-overflow:ellipsis}.item .info p[data-v-ddf2dc50]{padding-top:7px;font-size:12px;color:#b2b2b2}",""])},418:function(t,e,i){var a=i(417);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(340)("5d03ff16",a,!0,{})},420:function(t,e,i){function a(t){i(418)}var o=i(245)(i(416),i(421),a,"data-v-ddf2dc50",null);t.exports=o.exports},421:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item",attrs:{id:"product.spu.id"}},[i("div",{staticClass:"img-box"},[i("img",{attrs:{src:t.product.spu.sku_info[0].ali_image,alt:""}})]),t._v(" "),i("div",{staticClass:"info"},[i("h6",{staticClass:"ellipsis"},[t._v(t._s(t.product.spu.sku_info[0].title))]),t._v(" "),i("p",[t._v(t._s(t.product.spu.sku_info[0].sub_title))])]),t._v(" "),i("p",{staticClass:"price"},[i("i",[t._v("¥")]),t._v(" "),i("span",[t._v(t._s(t.product.spu.price))])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("ul",{staticClass:"dot-list"},[i("li")])}]}},435:function(t,e){t.exports="data:image/png;base64,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"},439:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(248),o=i.n(a),n=i(369),r=i.n(n),d=i(374),s=i(249),l=i(64);e.default={props:{msg:{}},data:function(){return{hotImg:"",chanelType:i.i(l.a)("chanelType"),limit:1}},methods:o()({},i.i(s.c)(["ADD_CART","ADD_ANIMATION","SHOW_CART","GET_USERINFO"]),{goodsDetails:function(t){this.$router.push({path:"/goodsDetails",query:{goodsId:t}})},messageError:function(t){this.$message.error({message:t})},addCart:function(t,e,a,o,n,r,s){var c=this;if(0==Number(s))this.messageError("该商品可售数量为0");else if(!this.showMoveImg){var f={cartDto:{goodsNum:1,goodsId:t,userId:i.i(l.a)("userId"),userName:i.i(l.a)("userName")}};i.i(d.h)(f).then(function(i){c.ADD_CART({goodsNum:1,goodsId:t,goodsSettlePrice:a,goodsRetailPrice:o,goodsShipPrice:e,goodsName:n,goodsImg:r})});var g=event.target,p=g.getBoundingClientRect().left+g.offsetWidth/2,u=g.getBoundingClientRect().top+g.offsetHeight/2;this.ADD_ANIMATION({moveShow:!0,elLeft:p,elTop:u,img:r}),this.showCart||this.SHOW_CART({showCart:!0})}}}),computed:o()({},i.i(s.b)(["login","showMoveImg","showCart","userInfo"])),mounted:function(){},components:{YButton:r.a}}},444:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i(95),o=i(378),n=i.n(o),r=i(420),d=i.n(r),s=i(554),l=i.n(s),c=i(64);e.default={data:function(){return{error:!1,banner:[],mark:0,bgOpt:{px:0,py:0,w:0,h:0},home:[],loading:!1,notify:"1",dialogVisible:!1,timer:"",left:!0,right:!0,announce:"",videoLeft:"",videoRight:""}},methods:{autoPlay:function(){++this.mark>this.banner.length-1&&(this.mark=0)},play:function(){this.timer=setInterval(this.autoPlay,2500)},change:function(t){this.mark=t},startTimer:function(){this.timer=setInterval(this.autoPlay,2500)},stopTimer:function(){clearInterval(this.timer)},linkTo:function(t){"1"==t.materialType&&this.$router.push({path:"/goodsDetails",query:{productId:t.skuId}})},bgOver:function(t){this.bgOpt.px=t.offsetLeft,this.bgOpt.py=t.offsetTop,this.bgOpt.w=t.offsetWidth,this.bgOpt.h=t.offsetHeight},bgMove:function(t,e){var i=this.bgOpt,a=void 0,o=void 0,n=e.pageX-i.px,r=e.pageY-i.py;a=(i.w,n-i.w/2),o=(i.h,i.h/2-r),t.style.transform="rotateY("+a/50+"deg) rotateX("+o/50+"deg)",t.style.transform="rotateY("+a/50+"deg) rotateX("+o/50+"deg)"},bgOut:function(t){t.style.transform="rotateY(0deg) rotateX(0deg)",t.style.transform="rotateY(0deg) rotateX(0deg)"},showNotify:function(){var t=i.i(c.a)("notify");this.notify!==t&&(this.dialogVisible=!0,i.i(c.b)("notify",this.notify))},_getBanner:function(){var t=this,e={materialDto:{materialType:"1"}};i.i(a.h)(e).then(function(e){if(e){if("success"!==e.code)return void(t.error=!0);var i=e;t.loading=!1,t.banner=i.materialDtoList}})},_getPanel:function(){var t=this,e={panelDto:null};i.i(a.i)(e).then(function(e){if(e){if(!1===e.success)return void(t.error=!0);t.home=e.panelDtoList}})},getAnnounce:function(){var t=this,e={announcementMgrDto:null};i.i(a.j)(e).then(function(e){e&&"success"===e.code&&(""==e.announcementMgrDtos&&null==e.announcementMgrDtos&&0==e.announcementMgrDtos||(t.announce=e.announcementMgrDtos[0].announcementContent))})},videoShow:function(){var t=this,e={videoMgrDto:null};i.i(a.k)(e).then(function(e){e&&"success"===e.code&&(""!=e.videoMgrDtos&&null!=e.videoMgrDtos&&0!=e.videoMgrDtos.length?(t.videoLeft=e.videoMgrDtos[0].url,t.videoRight=e.videoMgrDtos[1].url):(t.left=!1,t.right=!1))})},closed:function(t){1==t?this.right=!1:this.left=!1}},mounted:function(){this._getBanner(),this._getPanel(),this.showNotify(),this.getAnnounce(),this.videoShow()},created:function(){this.play()},components:{YShelf:n.a,product:d.a,mallGoodsIndex:l.a}}},478:function(t,e,i){e=t.exports=i(339)(!1),e.push([t.i,'.home[data-v-0e416fd1],.no-info[data-v-0e416fd1]{display:flex;flex-direction:column}.no-info[data-v-0e416fd1]{padding:100px 0;text-align:center;font-size:30px}.no-info .no-data[data-v-0e416fd1]{align-self:center}.fade-enter-active[data-v-0e416fd1],.fade-leave-active[data-v-0e416fd1]{transition:opacity .5s}.fade-enter[data-v-0e416fd1],.fade-leave-to[data-v-0e416fd1]{opacity:0}.page[data-v-0e416fd1]{position:absolute;width:100%;top:470px;z-index:30}.page .dots[data-v-0e416fd1]{display:flex;flex-direction:row;align-items:center;justify-content:center}.page .dots .dot-active[data-v-0e416fd1]{display:inline-block;width:15px;height:15px;background-color:#f5f5f5;border-radius:8px;margin-right:10px;cursor:pointer}.page .dots .dot[data-v-0e416fd1]{opacity:.2}.activity-panel[data-v-0e416fd1]{width:1220px;margin:0 auto}.activity-panel .box[data-v-0e416fd1]{overflow:hidden;position:relative;z-index:0;margin-top:25px;box-sizing:border-box;border:1px solid rgba(0,0,0,.14);border-radius:8px;background:#fff;box-shadow:0 3px 8px -6px rgba(0,0,0,.1)}.activity-panel .content[data-v-0e416fd1]{float:left;position:relative;box-sizing:border-box;width:25%;height:200px;text-align:center}.activity-panel .content[data-v-0e416fd1] :before{position:absolute;top:0;left:0;z-index:1;box-sizing:border-box;border-left:1px solid #f2f2f2;border-left:1px solid rgba(0,0,0,.1);width:100%;height:100%;content:"";pointer-events:none}.activity-panel .i[data-v-0e416fd1]{width:305px;height:200px}.activity-panel .cover-link[data-v-0e416fd1]{cursor:pointer;display:block;position:absolute;top:0;right:0;bottom:0;left:0;z-index:4;background:url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat}.activity-panel a[data-v-0e416fd1]{color:#5079d9;cursor:pointer;transition:all .15s ease-out;text-decoration:none}.activity-panel a[data-v-0e416fd1]:hover{box-shadow:inset 0 0 38px rgba(0,0,0,.08);transition:all .15s ease}.banner[data-v-0e416fd1],.banner div[data-v-0e416fd1],.banner span[data-v-0e416fd1]{font-family:Microsoft YaHei;transition:all .3s;transition-timing-function:linear}.banner[data-v-0e416fd1]{cursor:pointer;perspective:3000px;position:relative;z-index:19;margin:0 auto;width:1220px}.bg[data-v-0e416fd1]{position:relative;width:1220px;height:500px;margin:20px auto;background-size:100% 100%;border-radius:10px;transform-style:preserve-3d;transform-origin:50% 50%;transform:rotateY(0deg) rotateX(0deg)}.bg div[data-v-0e416fd1]{position:relative;height:100%;width:100%}.img1[data-v-0e416fd1]{top:0}.img1[data-v-0e416fd1],.img2[data-v-0e416fd1]{display:block;position:absolute;width:100%;height:100%;border-radius:10px}.img2[data-v-0e416fd1]{bottom:5px;left:0;background-size:95% 100%}.img3[data-v-0e416fd1]{display:block;position:absolute;width:100%;height:100%;top:0;border-radius:10px}.a[data-v-0e416fd1]{z-index:20;transform:translateZ(40px)}.b[data-v-0e416fd1]{z-index:20;transform:translateZ(30px)}.c[data-v-0e416fd1]{transform:translateZ(0)}.sk_item[data-v-0e416fd1]{width:170px;height:225px;padding:0 14px 0 15px}.sk_item>div[data-v-0e416fd1]{width:100%}.sk_item a[data-v-0e416fd1]{display:flex;flex-direction:column;justify-content:center;align-items:center;transition:all .3s}.sk_item a[data-v-0e416fd1]:hover{transform:translateY(-5px)}.sk_item img[data-v-0e416fd1]{width:130px;height:130px;margin:17px 0}.sk_item .sk_item_name[data-v-0e416fd1]{color:#999;display:block;max-width:100%;_width:100%;overflow:hidden;font-size:12px;text-align:left;height:32px;line-height:16px;word-wrap:break-word;word-break:break-all}.sk_item .sk_item_price[data-v-0e416fd1]{padding:3px 0;height:25px}.sk_item .price_new[data-v-0e416fd1]{font-size:18px;font-weight:700;margin-right:8px;color:#f10214}.sk_item .price_origin[data-v-0e416fd1]{color:#999;font-size:12px}.box[data-v-0e416fd1]{overflow:hidden;position:relative;z-index:0;margin-top:29px;box-sizing:border-box;border:1px solid rgba(0,0,0,.14);border-radius:8px;background:#fff;box-shadow:0 3px 8px -6px rgba(0,0,0,.1)}ul.box[data-v-0e416fd1]{display:flex}ul.box li[data-v-0e416fd1]{flex:1}ul.box li img[data-v-0e416fd1]{display:block;width:305px;height:200px}.mt30[data-v-0e416fd1]{margin-top:30px}.hot[data-v-0e416fd1]{display:flex}.hot>div[data-v-0e416fd1]{flex:1;width:25%}.floors[data-v-0e416fd1]{width:100%;display:flex;flex-wrap:wrap;align-items:center}.floors .imgbanner[data-v-0e416fd1]{width:50%;height:430px}.floors .imgbanner .cover-link[data-v-0e416fd1]{cursor:pointer;display:block;position:absolute;top:60px;left:0;width:50%;height:430px;z-index:4;background:url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat}.floors .imgbanner .cover-link[data-v-0e416fd1]:hover{box-shadow:inset 0 0 38px rgba(0,0,0,.08);transition:all .15s ease}.floors img[data-v-0e416fd1]{display:block;width:100%;height:100%}.fl[data-v-0e416fd1]{float:left}.vivas[data-v-0e416fd1]{overflow:hidden;margin-left:-10px;margin-bottom:-10px}.vivas li[data-v-0e416fd1]{float:left;margin-left:10px;margin-bottom:10px;width:141px;height:100px;overflow:hidden}.w[data-v-0e416fd1]{width:1200px}.video[data-v-0e416fd1]{width:400px;position:fixed;z-index:999;bottom:0}.videoClose[data-v-0e416fd1]{position:relative;top:30px;left:370px;z-index:1000}',""])},505:function(t,e,i){e=t.exports=i(339)(!1),e.push([t.i,".good-item .ds[data-v-d9c0e812]{display:flex;align-items:center;justify-content:center}.good-item[data-v-d9c0e812]{background:#fff;width:25%;transition:all .5s;height:430px}.good-item[data-v-d9c0e812]:hover{transform:translateY(-3px);box-shadow:1px 1px 20px #999}.good-item .ds[data-v-d9c0e812]{width:100%;display:none}.good-item .good-img .imgBox[data-v-d9c0e812]{margin:50px auto 10px;width:206px;height:206px;display:block;overflow:hidden}.good-item .good-price[data-v-d9c0e812]{margin:15px 0;height:30px;text-align:center;line-height:30px;color:#d44d44;font-family:Arial;font-size:18px;font-weight:700}.good-item .good-title[data-v-d9c0e812]{line-height:1.2;font-size:16px;color:#424242;margin:0 auto;padding:0 14px;text-align:center;overflow:hidden}.good-item h3[data-v-d9c0e812]{text-align:center;line-height:1.2;font-size:12px;color:#d0d0d0;padding:10px}",""])},507:function(t,e,i){var a=i(478);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(340)("724f7462",a,!0,{})},534:function(t,e,i){var a=i(505);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(340)("204dac66",a,!0,{})},543:function(t,e,i){t.exports=i.p+"static/img/error.4ef4bf7.png"},547:function(t,e,i){t.exports=i.p+"static/img/notice.1dc6e08.png"},554:function(t,e,i){function a(t){i(534)}var o=i(245)(i(439),i(583),a,"data-v-d9c0e812",null);t.exports=o.exports},556:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[t.error?t._e():a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticStyle:{"min-height":"35vw"},attrs:{"element-loading-text":"加载中..."}},[a("div",{staticStyle:{background:"#fff","margin-top":"10px",padding:"8px"}},[a("div",{staticStyle:{width:"1220px",margin:"0 auto"}},[t._m(0),t._v(" "),a("div",{staticStyle:{float:"left",color:"#dcdfe6"}},[t._v("|")]),t._v(" "),a("div",{staticStyle:{float:"left","margin-left":"10px",color:"red",width:"95%"}},[a("marquee",{attrs:{direction:"left"}},[t._v(t._s(t.announce))])],1),t._v(" "),a("div",{staticStyle:{clear:"both"}})])]),t._v(" "),a("div",{staticClass:"banner"},[a("div",{ref:"bg",staticClass:"bg"},[a("transition",{attrs:{name:"fade"}},t._l(t.banner,function(e,i){return i===t.mark?a("div",{key:i,staticStyle:{position:"absolute"}},[a("router-link",{attrs:{to:"goodsDetails?goodsId="+e.goodsId,target:"_blank"}},[e.url?a("img",{staticClass:"img1",attrs:{src:e.url}}):t._e()])],1):t._e()}))],1),t._v(" "),a("div",{staticClass:"page"},[a("ul",{staticClass:"dots"},t._l(t.banner,function(e,i){return a("li",{key:i,staticClass:"dot-active",class:{dot:i!=t.mark},on:{click:function(e){t.change(i)}}})}))])]),t._v(" "),t._l(t.home,function(e,i){return a("div",{key:i},[3==e.panelType?a("section",{staticClass:"w mt30 clearfix"},[a("y-shelf",{attrs:{title:e.panelName}},[a("div",{staticClass:"floors",attrs:{slot:"content"},slot:"content"},t._l(e.panelDtosGoodsList,function(t,e){return a("mall-goods-Index",{key:e,attrs:{msg:t}})}))])],1):t._e()])})],2),t._v(" "),t._l(t.home,function(e,i){return a("div",[1==e.panelType?a("section",{staticClass:"w mt30 clearfix"},[a("y-shelf",{attrs:{title:e.panelName}},[a("div",{staticClass:"floors",attrs:{slot:"content"},slot:"content"},[a("ul",{staticClass:"clearfix vivas"},t._l(e.panelDtosGoodsList,function(t,e){return a("li",{key:e,staticClass:"vivasli"},[a("router-link",{attrs:{to:"search?vendorId="+t.goodsId,target:"_blank"}},[a("img",{attrs:{src:t.url}})])],1)}))])])],1):t._e()])}),t._v(" "),t.error?a("div",{staticClass:"no-info"},[t._m(1)]):t._e(),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.right,expression:"right"}],staticClass:"video",staticStyle:{right:"0"},on:{click:function(e){t.closed(1)}}},[a("img",{staticClass:"videoClose",attrs:{src:i(435),alt:"关闭",width:"30"}}),t._v(" "),a("video",{attrs:{width:"400",autoplay:"autoplay",loop:"loop"}},[a("source",{attrs:{src:t.videoRight,type:"video/mp4"}})])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.left,expression:"left"}],staticClass:"video",staticStyle:{left:"0"},on:{click:function(e){t.closed(2)}}},[a("img",{staticClass:"videoClose",attrs:{src:i(435),alt:"关闭",width:"30"}}),t._v(" "),a("video",{attrs:{width:"400",autoplay:"autoplay",loop:"loop"}},[a("source",{attrs:{src:t.videoLeft,type:"video/mp4"}})])])],2)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{float:"left","margin-right":"10px"}},[a("img",{attrs:{src:i(547),alt:"",width:"20"}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"no-data"},[a("img",{attrs:{src:i(543)}}),t._v(" "),a("br"),t._v(" 抱歉！出错了...\n    ")])}]}},583:function(t,e,i){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"good-item"},[a("div",{},[a("router-link",{attrs:{target:"_blank",to:"goodsDetails?goodsId="+t.msg.goodsId}},[a("div",{staticClass:"good-img"},[a("div",{staticClass:"imgBox",staticStyle:{"text-align":"center"}},["null/null"!=t.msg.url?a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.msg.url,expression:"msg.url"}],attrs:{alt:t.msg.goodsName,width:"100%"}}):a("img",{staticStyle:{"margin-top":"20px"},attrs:{src:i(410),alt:t.msg.goodsName}})])]),t._v(" "),a("h6",{staticClass:"good-title",domProps:{innerHTML:t._s(t.msg.productName)}},[t._v(t._s(t.msg.goodsName))]),t._v(" "),a("h3",{staticClass:"sub-title ellipsis"},[t._v(t._s(t.msg.subTitle))]),t._v(" "),a("div",{staticClass:"good-price pr"},[a("div",{staticClass:"ds pa"},[a("router-link",{attrs:{target:"_blank",to:"goodsDetails?goodsId="+t.msg.goodsId}},[a("y-button",{staticStyle:{margin:"0 5px"},attrs:{text:"查看详情"}})],1),t._v(" "),a("y-button",{staticStyle:{margin:"0 5px"},attrs:{text:"加入购物车",classStyle:"main-btn"},on:{btnClick:function(e){t.addCart(t.msg.goodsId,t.msg.goodsShipPrice,t.msg.goodsSettlePrice,t.msg.goodsRetailPrice,t.msg.goodsName,t.msg.url,t.msg.inventory)}}})],1),t._v(" "),4===t.chanelType?a("p",[a("span",{staticStyle:{"font-size":"14px"}},[t._v("￥")]),t._v(t._s(t.msg.goodsShipPrice))]):a("p",[a("span",{staticStyle:{"font-size":"14px"}},[t._v("￥")]),t._v(t._s(t.msg.goodsSettlePrice))])])])],1)])},staticRenderFns:[]}}});
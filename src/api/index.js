import http from './public'
//清除用户信息loginSessionInvalidate
export const cleanUserInfo = (params) => {
  return http.fetchPost('/loginSessionInvalidate', params)
}
// 登陆
export const userLogin = (params) => {
  return http.fetchPost('/login', params)
}
// 手机验证码
export const phoneCode = (params) => {
  return http.fetchPost('/sendSmsCode', params)
}
// Token
export const userToken = (params) => {
  return http.fetchGet('/usertoken', params)
}
// 退出登陆
export const loginOut = (params) => {
  return http.fetchGet('/member/loginOut', params)
}
// 用户信息
export const userInfo = (params) => {
  return http.fetchPost('/checkUserToken', params)
}
// 验证是否显示图形验证码和短信验证码
export const checkCodeShow = (params) => {
  return http.fetchGet('sysparams/HAS_VERIFICATION_CODE', params)
}
// 注册账号
export const register = (params) => {
  return http.fetchPost('/member/register', params)
}
// 上传图片
export const upload = (params) => {
  return http.fetchPost('/member/imgaeUpload', params)
}
// 修改头像
export const updateheadimage = (params) => {
  return http.fetchPost('/member/updateheadimage', params)
}
// // 捐赠列表
// export const thanksList = (params) => {
//   return http.fetchGet('/member/thanks', params)
// }
// 首页接口
export const productHome = (params) => {
  return http.fetchGet('/goods/home', params)
}

// 首页banner轮播图接口
export const getBanner = (params) => {
  return http.fetchPost('/material/queryMaterialMallList', params)
}
// 首页panel接口
export const getPanel = (params) => {
  return http.fetchPost('/panel/queryMallPanelList', params)
}
// // 推荐板块
export const recommend = (params) => {
  return http.fetchGet('/goods/recommend', params)
}
// 捐赠板块
export const thank = (params) => {
  return http.fetchGet('/goods/thank', params)
}
// 极验验证码
export const geetest = (params) => {
  return http.fetchGet('/member/geetestInit?t=' + (new Date()).getTime(), params)
}
// 商品列表
export const goodsDetails = (params) => {
  return http.fetchGet('/goods/goodsDetails', params)
}
//公告
export const announcement = (params) => {
  return http.fetchPost('/announcement/queryEffectAnnouncement', params)
}
//视频
export const getVideo = (params) => {
  return http.fetchPost('/video/queryEffectVideo', params)
}
//提交imei
export const subImei = (params) => {
  return http.fetchPost('/VenderInOut/checkChannelInSerialNoAvailable', params)
}
//入库
export const subGoods = (params) => {
  return http.fetchPost('/VenderInOut/InStorageWithOrder', params)
}
// 获取wareHouse
export const getWareHouse = (params) => {
  return http.fetchPost('/wareHouse/queryWarehouseListByOrgId', params)
}
//获取DocketId
export const getDocketId = (params) => {
  return http.fetchPost('/terminalStatusMgr/queryInOrderIdByOrderId', params)
}
// 获取退货订单列表
export const getReturnOrderList = (params) => {
  return http.fetchPost('/VenderInOut/getInOrderDetails', params)
}
// 退货
export const returnGoods = (params) => {
  return http.fetchPost('/ChannelRefundGoods/addNewRefundGoodsApply', params)
}
// 获取用户信息
export const getApplyOperId = (params) => {
  return http.fetchPost('/SimNetWorkBusi/getCurrentLoginMessage', params)
}


import http from './public'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/goods/allGoods', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  return http.fetchPost('/cart/queryCartList', params)

}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/cart/addCart', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/member/delCart', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/cart/modifyCart', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/cart/deleteCart', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('/member/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/member/updateAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/member/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/member/delAddress', params)
}
// 生成订单
export const submitOrder = (params) => {
  return http.fetchPost('/terminalStatusMgr/addOrderAndOrderItem', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/member/orderList', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/member/orderDetail', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const goodsDetail = (params) => {
  return http.fetchPost('/goods/querySCGoodsInfo', params)
}

// 删除订单
export const delOrder = (params) => {
  return http.fetchGet('/member/delOrder', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchPost('/esservice/searchGoodsByKeyword', params)
}
// 品牌列表
export const getBrand = (params) => {
  return http.fetchPost('/dcData/getDcDataByDcName', params)
}
// 供货商列表
export const getVendor = (params) => {
  return http.fetchPost('/vender/queryVenderList', params)
}
// // 快速搜索
// export const getQuickSearch = (key) => {
//   return http.fetchQuickSearch(`http://127.0.0.1:8080/item/itemList/_search?q=productName: ${key}`)
// }
// 模糊查询
// export const getQuickSearch = (params) => {
//   return http.fetchPost('/address/queryAddressList', params)
// }
// 获取用户地址
export const getAddressList = (params) => {
  return http.fetchPost('/address/queryAddressList', params)
}
// 添加地址
export const addAddress = (params) => {
  return http.fetchPost('/address/addAddress', params)
}
// 修改收货地址
export const modifyAddress = (params) => {
  return http.fetchPost('/address/modifyAddress', params)
}
// 删除收货地址
export const deleteAddress = (params) => {
  return http.fetchPost('/address/deleteAddress', params)
}
// 获取订单列表
export const getOrderList = (params) => {
  return http.fetchPost('/terminalStatusMgr/queryOrderList', params)
}
// 取消订单
export const orderCancel = (params) => {
  return http.fetchPost('/terminalStatusMgr/orderCancel', params)
}
// 获取订单日志
export const getOrderLogList = (params) => {
  return http.fetchPost('/terminalStatusMgr/queryOrderLogList', params)
}

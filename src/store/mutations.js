import {
  INIT_BUYCART,
  ADD_CART,
  GET_USERINFO,
  RECORD_USERINFO,
  ADD_ANIMATION,
  SHOW_CART,
  REDUCE_CART,
  EDIT_CART,
  GET_PRICE
} from './mutation-types'
import { setStore, getStore } from '../utils/storage'
export default {
  // 网页初始化时从本地缓存获取购物车数据
  [INIT_BUYCART] (state) {
    let initCart = getStore('buyCart')
    if (initCart) {
      state.cartList = JSON.parse(initCart)
    }
  },
  // 加入购物车
  [ADD_CART] (state, {goodsId, goodsRetailPrice, goodsSettlePrice, goodsShipPrice, goodsName, goodsImg, goodsNum,colorId,colorName}) {
    let cart = state.cartList // 购物车
    let falg = true
    let goods = {
      goodsId,
      goodsRetailPrice, //零售价
      goodsSettlePrice, //结算价
      goodsShipPrice, //出货价
      goodsName,
      goodsImg,
      goodsNum,
      colorId,
      colorName
    }
    if (cart.length) {        // 有内容
      cart.forEach(item => {
        if (item.goodsId === goodsId && item.colorId === colorId) {
          if (item.goodsNum >= 0) {
            falg = false
            item.goodsNum += goodsNum
          }
        }
      })
    }
    if (!cart.length || falg) {
      goods.goodsNum = goodsNum
      goods.checked = '1'
      cart.push(goods)
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', cart)
  },
  // 加入购物车动画
  [ADD_ANIMATION] (state, {moveShow, elLeft, elTop, img, cartPositionT, cartPositionL, receiveInCart}) {
    state.showMoveImg = moveShow
    if (elLeft) {
      state.elLeft = elLeft
      state.elTop = elTop
    }
    state.moveImgUrl = img
    state.receiveInCart = receiveInCart
    if (cartPositionT) {
      state.cartPositionT = cartPositionT
      state.cartPositionL = cartPositionL
    }
  },
  // 是否显示购物车
  [SHOW_CART] (state, {showCart}) {
    // let timer = null
    state.showCart = showCart
    // clearTimeout(timer)
    // if (showCart) {
    //   timer = setTimeout(() => {
    //     state.showCart = false
    //   }, 5000)
    // }
  },
  // 移除商品
  [REDUCE_CART] (state, {goodsId,colorId,colorName}) {
    let cart = state.cartList
    cart.forEach((item, i) => {
      if (item.goodsId === goodsId && item.colorId === colorId) {
        if (item.goodsNum > 1) {
          item.goodsNum--
        } else {
          cart.splice(i, 1)
        }
      }
    })
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 修改购物车
  [EDIT_CART] (state, {goodsId, goodsNum, checked,colorId,colorName}) {
    let cart = state.cartList
    if (goodsNum) {
      cart.forEach((item, i) => {
        if (item.goodsId === goodsId && item.colorId === colorId) {
          item.goodsNum = goodsNum
          item.checked = checked
        }
      })
    } else if (goodsId) {
      cart.forEach((item, i) => {
        if (item.goodsId === goodsId && item.colorId === colorId) {
          cart.splice(i, 1)
        }
      })
    } else {
      cart.forEach((item) => {
        item.checked = checked ? '1' : '0'
      })
    }
    state.cartList = cart
    // 存入localStorage
    setStore('buyCart', state.cartList)
  },
  // 记录用户信息
  [RECORD_USERINFO] (state, info) {
    state.userInfo = info
    state.login = true
    setStore('userInfo', info)
  },
  // 获取用户信息
  [GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },
  // 获取不同登录状态下的价格
  [GET_PRICE] (state, {goodsSettlePrice, goodsShipPrice}) {
    let chanelType = getStore('chanelType')
    if (chanelType === 4) {
      setStore('showPrice', goodsShipPrice)
      state.showPrice = goodsShipPrice
    } else {
      setStore('showPrice', goodsSettlePrice)
      state.showPrice = goodsSettlePrice
    }
  }
}

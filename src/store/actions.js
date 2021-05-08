import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'


export default {
  addCart(context, payLoad) {

    return new Promise((resolve,reject) => {

      let oldProduct = context.state.cartList.find(function (item) {
        return item.iid == payLoad.iid;
      })
  
      if (oldProduct) {
        context.commit(ADD_COUNTER,oldProduct)
        resolve('当前的商品数量+1')
      } else {
        context.commit(ADD_TO_CART,payLoad)
        resolve('添加商品成功')
      }
    })

  }
}
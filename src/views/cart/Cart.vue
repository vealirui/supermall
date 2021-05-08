<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <cart-list/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种语法
      // ...mapGetters(['cartLength','','') 数组语法


      // 自己定义名字（对象）
      ...mapGetters({
        length:'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }

  .nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
      position: relative;
    z-index: 9;
  }
</style>

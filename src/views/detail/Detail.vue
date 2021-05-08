<template>
  <div id="detail">
    <!-- <detail-nav-bar class="detail-nav" @titleClick="titleClick" :currentIndex="currentIndex"/> -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
<!--     <ul>
      <li v-for="(item, index) in $store.state.cartList" :key="index">
        {{item.count}}
      </li>
    </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
  // import Toast from '../../components/common/toast/Toast.vue';

import { debounce } from "common/utils.js";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { itemListenerMixin,backTopMixin } from "common/mixin";

import {mapActions} from 'vuex'
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTops: [],
      getThemTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部的图片轮播数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      this.$nextTick(() => {});
    }),
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });

    this.getThemTopY = debounce(() => {
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.params.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    }, 100);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getThemTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200);
      // console.log(index)
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTops.length;
      for (let i = 0; i < length - 1; i++) {
        /*   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTops[i] && positionY < 
       this.themeTops[i+1]) || (i === length -1 && positionY >= this.themeTops[i]))){
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex;
        } */

        if (
          this.currentIndex !== i &&
          positionY >= this.themeTops[i] &&
          positionY < this.themeTops[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
      // console.log(this.isShowBackTop);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    addToCart(){
      // console.log('ddd')
      const product = {}
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      this.addCart(product).then(res => {
    /*     this.show = true;
        this.message = res;

        setTimeout(() => { 
          this.show = false
          this.message = ''
        },1500)
        console.log(res); */

        this.$toast.show(res,1500)
        // console.log(this.$toast)
      })
      // this.$store.commit('addCart',product)
    /*   this.$store.dispatch('addCart',product).then(res => {
        console.log(res);
      }) */


    }
  },
  mounted() {},
  updated() {},
  destroyed() {
    // console.log('0')
    this.$bus.$off("itemImageLoad", this.itemListener);
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  position: relative;
}
</style>

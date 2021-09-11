<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index"
        @load="swiperImageLoad">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false,
        length:0
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      },
      swiperImageLoad(){
        this.$emit('swiperImageLoad');
      }
    }
  }
</script>

<style scoped>

</style>

<template>
  <div class="list-view">
    <div v-for="(item, index) in listData" :key="index"
    class="item">
      <img :src="iconURL(item)" alt="">
      <div class="item-info">{{item.info}}</div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'NormalListView',
  props:{
    listData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    iconURL(item) {
      return require(`assets/img/profile/` + item.icon);
    }
  }
}
</script>

<style scoped>
  .list-view {
    margin-top: 15px;
    background-color: #fff;
    color: #333;
    font-size: 15px;
  }

  .item {
    display: flex;
    height: 44px;
    line-height: 44px;
    align-items: center;
  }

  .item img {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    display: block;
  }
  
  .item-info {
    margin-left: 10px;
    flex: 1;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
    box-sizing: content-box;
  }

  .item:last-of-type .item-info {
    border-bottom: none;
  }

</style>
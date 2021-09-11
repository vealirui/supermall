<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue';
export default {
	name: "TabMenu",
    components: {
		  Scroll
    },
    props: {
		  categories: Array
    },
    data() {
		  return {
		    currentIndex: 0
      }
    },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index);
    }
  }
}
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  width: 100px;
  height: 100%;
  overflow: hidden;
  text-align: center;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}

.menu-list-item.active {
  background-color: #fff;
  color: var(--color-high-text);
  font-weight: 700;
  border-left: 3px solid var(--color-high-text);
}
</style>
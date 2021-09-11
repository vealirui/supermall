<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu 
      :categories="categories"
      @selectItem="selectItem"/>

      <scroll 
      id="tab-content" 
      ref="scroll"
      :probe-type="3">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"/>
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childCompose/TabMenu.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import TabContentCategory from './childCompose/TabContentCategory.vue';
import TabControl from 'components/content/tabControl/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';

import {getCategory, getSubcategory, getCategoryDetail} from 'network/category'
import {POP, NEW, SELL} from 'common/const'
export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    GoodsList,
  },
  data() {
    return {
      categories: [],
      categoryData:{},
      currentIndex: -1,
      currentType: 'pop',
      saveY: 0
    };
  },
  created() {
    this._getCategory();

    this.$bus.$on('itemImageLoad', () => {
      this.$refs.scroll.refresh();
    })
  },
  methods: {
     _getCategory() {
		    getCategory().then(res => {
		      // 1.获取分类数据
		      this.categories = res.data.category.list
			    console.log(res);
			    // 2.初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },
      _getSubcategories(index) {
        this.currentIndex = index;
		    const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
		    // 1.获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
		    getCategoryDetail(miniWallkey, type).then(res => {
		      // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },
      /**
       * 事件响应相关的方法
       */
      selectItem(index) {
        this._getSubcategories(index)
      },
    tabClick(index) {
      // console.log('hhh');
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
    }
  },
  computed: {
      showSubcategory() {
		    if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
		    if (this.currentIndex === -1) return []
		    return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
  },
  activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
	    this.saveY = this.$refs.scroll.getScrollY();
    },
};
</script>

<style scoped>
#category {
  position: relative;
  height: 100vh;
}

.nav-bar {
  font-weight: 700;
  color: #fff;
  background-color: var(--color-tint);
}

.content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
}

#tab-content {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>

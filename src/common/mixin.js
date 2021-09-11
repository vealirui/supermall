import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
import { TOP_DISTANCE } from "common/const.js";
import {POP, NEW, SELL} from "./const";

export const itemListenerMixin = {
  data(){
    return {
      itemListener:null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 50)

    this.itemListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemListener)
    // console.log('你是猪')
  }
}

export const backTopMixin ={
  components:{
    BackTop
  },
  data(){
    return {
      isShowBackTop:false
    }
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > TOP_DISTANCE;
    },
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break
      }
    }
  }
}
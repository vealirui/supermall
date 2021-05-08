<template>
  <div class="toast" v-show="isShow">
    {{message}} 
  </div>  
</template>

<script>
export default {
  name:'Toast',
  props:{
/*     message:{
      type:String,
      default:''
    },
    show:{
      type:Boolean,
      default:false
    } */
  },
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration = 2000){
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    z-index: 999;

    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(0,0,0,0.5);
    color: #fff;
  }
</style>
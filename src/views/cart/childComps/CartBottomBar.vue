<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
            :isChecked="isSelectAll" 
            class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="totol">
      合计:{{totolPrice}}
      </div>

    <div class="calculate">  
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue';
import {mapGetters} from 'vuex'

export default {
  name:'CartBottomBar',
  components:{
    CheckButton
  },
  computed:{
    ...mapGetters(['cartList']),
    totolPrice(){
      return '￥' +  this.cartList.filter(item => {
        return item.checked == true
      }).reduce((preValue, item ) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength(){
      return this.cartList.filter(item => item.checked == true).length
    },
    isSelectAll(){
      if(this.cartList.length == 0) return false;
      
      // return !(this.cartList.filter(item => !item.checked).length)


    //  return !this.cartList.find(item => !item.checked)

    let isChecked = false;
    for(let item of this.cartList){
      if(!item.checked){
        isChecked = false;
        return isChecked
      }
    }

    return true
    }
  },
  methods:{
    checkClick(){    
      if(this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: rgba(240, 240, 240, 0.8);
    position: relative;
    /* bottom: 40px; */
    /* line-height: 40px; */
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  .check-content{
    display: flex;
    height: 100%;
    /* line-height: 100%; */
    align-items: center;
    margin-left: 10px;
    width: 70px;
  }

  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .totol{
    margin-left: 20px;
    flex: 1
  }

  .calculate{
    height: 100%;
    width: 80px;
    background-color: red;
    color: #fff;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
  }
</style>
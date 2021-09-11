<template>
  <div class="account">
    <div class="account-item">
      <div><span class="balance">0.00</span>元</div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div><span class="balance">0</span>个</div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div><span class="balance">0</span>分</div>
      <div class="account-info">我的积分</div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'AccountInfo'
}
</script>

<style scoped>
  .account {
    display: flex;
    text-align: center;
  }

  .account-item {
    /* width: 100%; */
    flex: 1;
    background-color: #fff;
    margin-right: 1px;
    
    padding: 18px;
    font-size: 13px;
  }

  .account-item:last-of-type {
    margin-right: 0;
  }

  .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }

  .account-info {
    font-size: 14px;
    margin-top: 6px;
  }
</style>
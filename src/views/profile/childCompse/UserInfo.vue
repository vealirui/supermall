<template>
  <div class="user-info">
    <div class="avatar">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div> 
</template>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style scoped>
  .user-info {
    background-color: var(--color-tint);
    height: 85px;
    display: flex;
    padding: 0 15px;
    align-items: center;

    color: #fff;
  }

  .avatar img{
    width: 70px;
    height: 70px;
  }

  .info {
    flex: 1;
    padding-left: 15px;
    margin-top: -8px;
  }

  .info .login {
    margin-top: 15px;
  }

  .info .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .phone span {
    font-size: 13px;
  }

  .arrow {
    width: 20px;
    line-height: 85px;
  }

  .arrow img {
    width: 100%;
  }
</style>
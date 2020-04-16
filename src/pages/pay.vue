<template>
  <div>
    <!-- <van-nav-bar title="支付成功" left-text="" left-arrow fixed @click-left="onClickLeft" >
    </van-nav-bar> -->
    <div class="cont">
      <img src="~@/assets/pays.png" alt="">
      <p>你已付款成功！</p>
      <div class="btn">
        <van-button @click="chack" plain size="small" style="margin-left:.2rem">查看订单</van-button>
        <van-button @click="back" plain  size="small" style="margin-left:.2rem">返回首页</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    // onClickLeft () {
    //   this.$router.go(-1)
    // },
    chack () {
      this.$router.push('/order')
    },
    back () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar .van-icon{
  color: #404040;
  font-size: .55rem;
}
.van-nav-bar{
  height: 1.17rem;
  line-height: 1.17rem;
}
.van-nav-bar__title{
   color: #404040;
}
.cont{
  margin: 3.8rem auto 0;
  text-align: center;
  padding: 0 .5rem;
  img{
    width: 23%;
  }
  p{
    margin-top: .3rem;
    font-size: .34rem;
    color: #999999;
  }
  .btn{
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    .van-button--small{
      width: 3.5rem;
      height: 1.1rem;
      line-height: 1.1rem;
      border-radius: 40px;
      border:1px solid #BFBFBF;
      color: #999
    }
  }
}
</style>

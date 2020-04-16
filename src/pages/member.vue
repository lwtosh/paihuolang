<template>
  <div>
    <van-nav-bar title="黑金会员卡" left-text="" left-arrow fixed @click-left="onClickLeft">
    </van-nav-bar>
    <div class="setion1">
      <div class="box">
         <div class="img">
           <img class="img1" src="../assets/huiyuan.png" alt="">
           <img class="img2" src="../assets/ka-text.png" alt="">
        </div>
          <p class="text">购物花的少 分享赚得多</p>
          <p class="h5">成为黑金卡会员 省赚到底</p>
          <p class="text-index">分享得5%~60%推广奖励</p>
      </div>
    </div>
    <div class="setion2">
      <div class="li"></div>
      <div class="text-img">
        <img src="~@/assets/mender1.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
  background: #F5C164;
}
.van-nav-bar__title{
   color: #404040;
   font-weight: bold;
}
[class*=van-hairline]::after{
  border:none
}
.van-count-down, .van-divider{
  font-size: .48rem;
}
.setion1{
    margin-top: 1.1rem;
    background: #F5C164;
    text-align: center;
    padding: .2rem;
    .box{
     background: url('../assets/bgHd.png') no-repeat;
     background-size: 100% 100%;
     height: 6.5rem;
     .img{
      display: flex;
      justify-content: center;
      padding-top: 1rem;
      .img1{
        width: 1.62rem;
        height: 1rem;
        vertical-align: middle
      }
      .img2{
        width: 2.45rem;
        margin-top: 12px;
        height: .65rem;
      }
    }
    .text{
      color: #A5A5A5;
      font-size: .3rem;
      margin-top: 5px;
      letter-spacing:5px;
    }
    .h5{
      margin-top: 1.45rem;
      font-size: .48rem;
      font-weight: bold;
    }
    .text-index{
      font-size: .32rem;
      line-height: 2
    }
    }

}
.setion2{
   height: ceil(58vh);
   background: url('../assets/bgBd.png') no-repeat;
   background-size: 100% 100%;
   margin-top: -1.15rem;
   padding: 0 .3rem;
   position: relative;
   .li{
     position: absolute;
     top:-.3rem;
     left: 50%;
     width: 1.3rem;
     text-align: center;
     padding-top: .4rem;
     height: 1.62rem;
     font-weight: bold;
     margin-left: -.81rem;
     color: #EF0F0F;
     font-size: .3rem;
    background: url('../assets/btn.png') no-repeat;
    background-size: contain;
   }
   .text-img{
     width: 9rem;
     margin: auto;
     padding-top: 1.6rem;
     height: 6rem;
     img{
       width: 99%;
       height: 99%;
     }
   }
}
.btn{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  background:linear-gradient(-20deg,rgba(254,221,153,1) 0%,rgba(245,193,100,1) 100%);
  font-size: .37rem;
  text-align: center;
  .btn-text{
    color: #EF0F0F;
  }
 .btn-text1{
   font-size: .42rem;
  font-weight: 500;
 }
 .btn-text2{
   font-size: .3rem;
   margin-left: .25rem;
   text-decoration: line-through;
 }
}
</style>

<template>
  <div class="page">
     <div class="setion">
       <div class="guit">活动规则</div>
       <img src="../assets/text.png" alt="" class="textImg">
       <div class="main">
         <div class="bonus">
           <p class="bonus-text">奖金池</p>
           <p class="bonus-money"><span class="yen">￥</span>5800.25</p>
         </div>
         <div class="join">今日已参与人数:2800</div>
       </div>
       <div class="cur">
         <p class="cur-text">你当前的可用金币:100.25</p>
         <div class="part">立即参与瓜分</div>
       </div>
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 92vh;
  background: url('../assets/redBg.png');
  background-size: 100% 100%;
}
.setion{
  width: 93%;
  margin: auto;
  text-align: center;
  .guit{
    font-size: .3rem;
    text-align: right;
    color: #F5F5F5;
    line-height: 3;
  }
  .textImg{
    width: 85%;
    height: 2.53rem;
    margin-top: .8rem;
  }
  .main{
    width: 100%;
    height: 8.6rem;
   background: url('../assets/red.png');
   background-size: 100% 100%;
   .bonus{
     padding-top: 2rem;
     text-align: center;
     .bonus-text{
      font-size: .32rem;
      line-height: 2
     }
     .bonus-money{
       font-size: .48rem;
       font-weight: bold;
       color:#F52F00;
       letter-spacing:1px;
       .yen{
         font-size: .3rem;
       }
     }
   }
   .join{
     margin-top: 2.6rem;
     color: #fff;
     font-size: .34rem;
   }
  }
  .cur{
    .cur-text{
      font-size: .3rem;
      line-height: 2;
      color: #fff
    }
    .part{
      width: 7.5rem;
      height: 1.15rem;
      line-height: 1rem;
      font-size: .4rem;
      font-weight: bold;
      margin: auto;
      color: #F52F00;
      background: url('../assets/redarr.png');
      background-size: 100% 100%;
    }
  }
}
</style>

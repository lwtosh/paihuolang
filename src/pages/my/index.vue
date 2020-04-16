<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="setion1">
      <div class="header">
        <div class="left">
          <img class="ara" v-if='dataInfo.avatar' :src="dataInfo.avatar" alt="">
          <img class="ara" v-else src="../../assets/ara.png"  alt="">
          <div class="user" v-if="userId === true">
            <van-button color="#EF0F0F" plain size="small" @click="handleLogin">登录</van-button>
          </div>
          <div class="user" v-else>
            <div class="name">{{dataInfo.nickName}} <span class="kai" v-if='dataInfo3 =="" || status==1' ></span><span class="dai" v-if='identity > 0'></span> </div>
            <div class="id">ID:{{dataInfo.id}}</div>
          </div>
        </div>
        <!-- <div class="right">我的推广码</div> -->
      </div>
      <div class="heika"><span class="vip"></span><span class="ka-text"></span>| 黑金卡会员购物少花钱 分享多赚钱</div>
    </div>
    <div class="setion2">
       <div class="row">
          <div class="c-1" @click="handlOrder1">
            <div class="info" v-if="dataInfo4.noPayCount">{{dataInfo4.noPayCount}}</div>
            <img class="orderImg" src="../../assets/order1.png" alt="">
            <p class="order-text">待付款</p>
          </div>
          <div class="c-1" @click="handlOrder2">
            <div class="info" v-if="dataInfo4.pickCount">{{dataInfo4.pickCount}}</div>
            <img class="orderImg"  src="../../assets/order2.png" alt="">
            <p class="order-text">待收货</p>
          </div>
          <div class="c-1" @click="handlOrder3">
            <img class="orderImg" src="../../assets/order3.png" alt="">
            <p class="order-text">已完成</p>
          </div>
          <div class="c-1" @click="handlOrder4">
            <img class="orderImg"  src="../../assets/order4.png" alt="">
            <p class="order-text">违约</p>
          </div>
          <div class="c-1 c-1bg" @click="handlOrder">
            <img class="orderImg" src="../../assets/order5.png" alt="">
            <p class="order-text">全部订单</p>
          </div>
       </div>
    </div>
    <div class="setion3">
       <div class="row">
          <div class="c-1">
            <p class="order-text1" v-if="userId === true">--</p>
            <p class="order-text1" v-else>{{dataInfo1.score}}</p>
            <p class="order-text">我的积分</p>
          </div>
          <div class="c-1">
             <p class="order-text1" v-if="userId === true">--</p>
            <p class="order-text1" v-else>{{dataInfo1.ppVoucher}}</p>
            <p class="order-text">参拍券</p>
          </div>
          <div class="c-1">
             <p class="order-text1" v-if="userId === true">--</p>
            <p class="order-text1" v-else>{{dataInfo1.lePoint}}</p>
            <p class="order-text">拍豆</p>
          </div>
          <div class="c-1">
             <p class="order-text1" v-if="userId === true">--</p>
            <p class="order-text1" v-else>{{equity.toFixed(2)}}</p>
            <p class="order-text">金币</p>
          </div>
          <div class="c-1 c-1bg">
            <img class="orderImg" src="../../assets/mon.png" alt="">
            <p class="order-text">我的钱包</p>
          </div>
       </div>
    </div>
    <div class="setion4">
      <div class="h5">必备功能</div>
       <div class="row">
          <div class="c-1" @click="handTur">
            <img class="orderImg" src="../../assets/g-1.png" alt="">
            <p class="order-text">我的托管</p>
          </div>
          <div class="c-1" @click="handSale">
            <img class="orderImg m1" src="../../assets/g-2.png" alt="">
            <p class="order-text">我的寄卖</p>
          </div>
           <div class="c-1" @click="handleTu">
            <img class="orderImg m3" src="../../assets/g-5.png" alt="">
            <p class="order-text">我的徒弟</p>
          </div>
          <div class="c-1" @click="handAddress">
            <img class="orderImg m2" src="../../assets/g-3.png" alt="">
            <p class="order-text">我的地址</p>
          </div>
          <div class="c-1" @click="handleTel">
            <img class="orderImg m3" src="../../assets/g-4.png" alt="">
            <p class="order-text">客服</p>
          </div>
       </div>
    </div>
    </van-pull-refresh>
       <login v-if="show"></login>
    <!-- 导航底部 -->
      <BottomTab></BottomTab>
  </div>
</template>

<script>
import Vue from 'vue'
import login from '../login'
import BottomTab from '@/components/footer'
// import sdk from '../sdk'
export default {
  data () {
    return {
      selected: 'home',
      dataInfo: '',
      userId: true,
      show: false,
      loading: false,
      isLoading: false,
      inviteCode: '',
      status: '',
      equity: '--',
      identity: '',
      dataInfo1: '',
      dataInfo2: '',
      dataInfo4: '',
      dataInfo3: ''
    }
  },
  components: {
    BottomTab,
    login
  },
  created () {
    this.fromList()
    if (Vue.cookie.get('inviteCode')) {
      this.inviteCode = Vue.cookie.get('inviteCode')
    }
  },
  methods: {
    fromList () {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/fetchTinyUser'),
        method: 'get',
        params: {userId: Vue.cookie.get('userId')}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.dataInfo = data.data
        } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
        } else {
          this.$toast(data.message)
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getAccountByUid'),
        method: 'get'
      }).then(({data}) => {
        this.dataInfo1 = data.data
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getUserEquityByUid'),
        method: 'get'
      }).then(({data}) => {
        this.equity = data.data.equity
      })
      this.$http({
        url: this.$http.adornUrl('/h5/order/fetchOrderCount'),
        method: 'get'
      }).then(({data}) => {
        this.dataInfo4 = data.data
        if (data.code === 'ok') {
          this.userId = false
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getUserVipInfo'),
        method: 'get'
      }).then(({data}) => {
        this.dataInfo2 = data.data
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getUserVipInfo'),
        method: 'get'
      }).then(({data}) => {
        this.dataInfo3 = data.data
        this.status = data.data.status
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/fetchMyRelationInfo'),
        method: 'get'
      }).then(({data}) => {
        this.identity = data.data.identity
      })
    },
    handleLogin () {
      Vue.cookie.delete('token')
      Vue.cookie.delete('userId')
      var url = 'https://h5.paihuo11.cn/phlShop/index.html#/my'
      var auth = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
      var incode = '&inviteCode=' + this.inviteCode
      location.href = auth + encodeURIComponent(url) + incode
    },
    handlOrder () {
      this.$router.push('/order')
    },
    // 待付款
    handlOrder1 () {
      this.$router.push('/order?active=0')
    },
    // 待收货
    handlOrder2 () {
      this.$router.push('/order?active=2')
    },
    // 已完成
    handlOrder3 () {
      this.$router.push('/order?active=5')
    },
    // 违约
    handlOrder4 () {
      this.$router.push('/order?active=4')
    },
    handTur () {
      this.$router.push('/entrust')
    },
    handSale () {
      this.$router.push('/mySale')
    },
    handAddress () {
      this.$router.push('/addressManage')
    },
    handleTu () {
      this.$router.push('/apprentice')
    },
    handleTel () {
      window.location.href = '//h5.paihuo11.cn/text/Customer.html'
    },
    onRefresh () {
      this.fromList()
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }

}
</script>

<style lang="less" scoped>
.setion1{
  height: 5.6rem;
  width: 100%;
  background:  url('../../assets/headerBg.png') center no-repeat;
  background-size: 100% 100%;
  .header{
    padding:0 .3rem;
    display: flex;
    justify-content: space-between;
    padding-top: 1.7rem;
    .left{
      .ara{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        float: left;
      }
      .user{
        float: left;
        margin-top: .3rem;
        margin-left: .2rem;
        color: #fff;
        .name{
          font-size: .42rem;
          font-weight: bold;
          .kai,.dai{
            vertical-align: middle;
           display: inline-block;
           width: 1.3rem;
           height: .5rem;
           background: url('../../assets/ka.png') center no-repeat;
           background-size: 100% 100%;
          }
          .dai{
            width: .53rem;
            height: .5rem;
            margin-left: .15rem;
            background: url('../../assets/dai.png') center no-repeat;
            background-size: 100% 100%;
          }
        }
        .id{
          font-size: .26rem;
        }
      }
    }
    .right{
      position: absolute;
      right: 0;
      height: 1rem;
      line-height: 1rem;
      font-weight: bold;
      font-size: .34rem;
      width: 2.3rem;
      text-align: center;
      background: url('../../assets/tui.png') center no-repeat;
      background-size: 100% 100%;
    }
  }
  .heika{
    text-align: center;
    margin-top: 1.3rem;
    color: #A5A5A5;
    .vip,.ka-text{
      vertical-align: middle;
      display: inline-block;
      width: .65rem;
      height: .44rem;
      background: url('../../assets/vip.png') center no-repeat;
      background-size: 100% 100%;
    }
    .ka-text{
      width: 1.22rem;
      height: .29rem;
      margin-left: .1rem;
      margin-right: .1rem;
      background: url('../../assets/ka-text.png') center no-repeat;
      background-size: 100% 100%;
    }
  }
}
.setion2,.setion3,.setion4{
  background: #fff;
  height: 1.6rem;
  padding-top: .3rem;
  .row{
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    height: 100%;
    .c-1{
      width: 25%;
      height: 100%;
      position: relative;
      .info{
        position: absolute;
        border:1px solid #F03131;
        background: #fff;
        right: 20%;
        width: .28rem;
        color: #F03131;
        line-height: .35rem;
        height: .35rem;
        border-radius: 30px;
        font-size: .25rem;
      }
    }
    .orderImg{
      width: 34%;
      height: .6rem;
    }
    .order-text{
      font-size: .29rem;
      margin-top: .1rem;
      color: #595959;
    }
  }
}
.setion3{
  margin-top: .3rem;
  padding-top: 0;
   height: 2.3rem;
  .orderImg,.order-text1{
     padding-top: .6rem;
     font-weight: bold;
     font-size: .48rem;
    }
}
.setion4{
   margin-top: .3rem;
   height: 2.8rem;
   .h5{
     font-size: .34rem;
     margin: .2rem 0rem .4rem .4rem;
   }
   .row{
      .m1{
     width: .58rem;
     height: .62rem;
   }
   .m3{
     width: .63rem;
     height: .63rem;
   }
   .m2{
     width: .68rem;
     height: .64rem;
   }
   }

}
 .c-1bg{
      width: 1.5rem;
      height: 100%;
      background: url('../../assets/orderBg.png') no-repeat;
      background-size: 100% 100%;
    }
</style>

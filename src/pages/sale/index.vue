<template>
  <div>
   <!-- <van-nav-bar title="寄卖商城" left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar> -->
   <!-- banner -->
    <van-swipe  :auto="3000" class="banner" indicator-color="white">
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item.picUrl" :alt="item.desc">
        </van-swipe-item>
    </van-swipe>
    <!-- banner -->
    <!-- 商品 -->
    <div class="nav">
       <div class="f1"  @click="cur=0" :class="{active:cur==0}">上新</div>
       <div class="f1" @click="onClickCur" :class="{active:cur==1}">价格 <img class="action" :src="actionImg" alt=""></div>
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
     <van-list v-model="loading" :finished="finished" finished-text="暂无相关内容" @load="onLoad">
        <ul class="shopUl">
            <li class="shopUl-li" v-for="(item,index) in shopBanner" :key="index" @click="handleDetails(item.id)">
              <img :src="item.goodsVo.goodsCoverImg" alt="" class="shopImg" >
              <div class="box-bd">
                <div class="index-text">{{item.goodsVo.goodsName}}</div>
              <div class="price">
                <span class="yen">&yen;</span> <span>{{item.salePrice}}</span>
              </div>
              </div>
            </li>
         </ul>
      </van-list>
      </van-pull-refresh>
    <!-- 商品 -->
  </div>
</template>
<script>
// import sdk from '../sdk'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      img: [],
      actionImg: require('@/assets/action.png'),
      shopBanner: [],
      cur: 0,
      flag: false
    }
  },
  created () {
    this.fromList()
  },
  methods: {
    fromList () {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchEntrustSaleList'),
        method: 'get',
        params: {sortType: 'NEW'}
      }).then(({data}) => {
        this.shopBanner = data.data.content
      })
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchBanners'),
        method: 'get',
        params: {type: 'ENTRUST_SALE'}
      }).then(({data}) => {
        this.img = data.data
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickCur () {
      this.cur = 1
      this.flag = !this.flag

      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchEntrustSaleList'),
        method: 'get',
        params: {sortType: this.flag ? 'PRICE_ASC' : 'PRICE_DESC'}
      }).then(({data}) => {
        this.shopBanner = data.data.content
      })

      this.actionImg = this.flag ? require('@/assets/action2.png') : require('@/assets/action1.png')
    },
    handleDetails (id) {
      this.$router.push({path: '/saleDetails',
        query: {
          id: id
        }})
    },
    onRefresh () {
      this.fromList()
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    onLoad () {
      // this.fromList()
      setTimeout(() => {
        this.loading = false
        // eslint-disable-next-line no-self-compare
        if (this.shopBanner.length >= this.shopBanner.length) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  // margin-top: 1rem;
  height: 6rem;
  img{
    min-width: 100%;
    max-width: 100%;
    height: 100%;
  }
}
.nav{
  height: 1.4rem;
  line-height: 1.4rem;
  background: #fff;
  color: #404040;
  display:flex;
  font-size: .37rem;
  justify-content: space-around;
  .action{
    margin-left: .12rem;
    vertical-align: -.06rem;
    width: 20%;
  }
}
.active{
  color:#EF0F0F;
}
  .shopUl{
    display: flex;
    width: 90%;
    margin: auto;
    color: #404040;
    margin-top: 10px;
    justify-content: space-between;
     flex-wrap: wrap;
    .shopUl-li{
      width: 48%;
      background: #fff;
      border-radius: 5px;
      position: relative;
      margin-bottom: .2rem;
      .shopImg{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        width: 100%;
        height: 4.5rem;
      }
      .box-bd{
        margin: 0 .1rem;
        .index-text{
        padding: .15rem 0 0 0;
        font-size: .34rem;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
       display: -webkit-box;
       -webkit-line-clamp: 2;
        }
        .price{
          color: #EF0F0F;
          font-size: .48rem;
          font-weight: bold;
          margin-bottom: 10px;
          .yen{
            display: inline-block;
            font-size: .2rem;
          }
          span{
            display: inline-block;
          }
          .qi{
            display: inline-block;
            font-size: .25rem;
            font-weight: normal;
            background: #FFE3EE;
            padding: .08rem;
            border-radius: 10px;
          }
        }
      }

    }
  }
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
</style>

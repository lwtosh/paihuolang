<template>
  <div>
    <!-- banner -->
    <div class="moren" v-if="img.length == 0 || img == ''">
        <img src="../../assets/moren1.png" alt="" >
    </div>
    <van-swipe  :auto="3000" class="banner" indicator-color="white" v-else>
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item.picUrl" :alt="item.desc">
        </van-swipe-item>
    </van-swipe>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-tabs v-model="active" sticky swipeable background="#f5f5f5"  @change="onClick">
      <van-tab :title="item.name"  v-for="item in list" :key='item.id' :name="item.id">
    <div class="err" v-if="shopBanner.length == 0">
        <img src="../../assets/err2.png" class="err" alt="" >
        <p>还没有商品哦~</p>
    </div>
    <div class="list">
      <ul class="listUl" v-for="(item,index) in shopBanner" :key="index">
        <li class="listUl-li" @click="handDetails(item.id)">
          <img :src="item.goodsVo.goodsCoverImg" alt="" class="shopImg">
          <div class="cont-index">
            <h4 class="h4">{{item.goodsName}}</h4>
            <div class="qi">起拍价</div>
            <div class="price"><span class="yan">￥</span>{{item.startPrice }}</div>
            <div class="tip">
              <div class="shi">市场价: <span>￥{{item.goodsVo.marketPrice}}</span></div>
              <div class="statu" v-if="item.countDown == 0"><img class="hot" src="../../assets/hot.png" alt=""></div>
              <div class="statu"  v-if="item.countDown == -1">已结束</div>
              <div class="statu"  v-if="item.countDown > 0">
                <div style="color:#B3B3B3;margin-top: -0.65rem;">距开始</div>
                <van-count-down :time="item.countDown * 1000" millisecond class="time"  format="HH:mm:ss">
                   <template v-slot="timeData">
                      <span class="item" v:if='timeData.days > 0'>{{timeData.hours + timeData.days* 24}}</span>:
                      <span class="item" v:else>{{timeData.hours >= '10' ? timeData.hours:'0'+ timeData.hours}}</span>:
                      <span class="item">{{timeData.minutes >= '10' ? timeData.minutes:'0'+timeData.minutes}}</span>:
                      <span class="item">{{timeData.seconds >= '10' ? timeData.seconds:'0'+timeData.seconds}}</span>
                    </template>
                </van-count-down>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </van-tab>
    </van-tabs>
    </van-pull-refresh>
    <!-- 导航底部 -->
      <BottomTab></BottomTab>
  </div>
</template>

<script>
import BottomTab from '@/components/footer'
// import sdk from '../sdk'
export default {
  data () {
    return {
      img: [],
      list: [],
      shopBanner: [],
      isLoading: false,
      time: 30 * 60 * 60 * 1000
    }
  },
  components: {
    BottomTab
  },
  created () {
    this.fromList()
  },
  methods: {
    handDetails (id) {
      this.$router.push({path: '/actionDetails',
        query: {
          id: id
        }})
    },
    fromList () {
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchBanners'),
        method: 'get',
        params: {type: 'AUCTION'}
      }).then(({data}) => {
        this.img = data.data
      })
      this.$http({
        url: this.$http.adornUrl('/h5/round/fetchSubregion'),
        method: 'get'
      }).then(({data}) => {
        this.list = data.data
        this.categoryId = data.data[0].id
        this.goodsCategory(this.categoryId)
      })
    },
    goodsCategory (categoryId) {
      this.$http({
        url: this.$http.adornUrl('/h5/round/fetchAuctionLinePage'),
        method: 'get',
        params: {subregionId: categoryId}
      }).then(({data}) => {
        this.shopBanner = data.data.content
      })
    },
    onClick (name, title) {
      this.goodsCategory(name)
    },
    onRefresh () {
      this.fromList()
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    }
  }

}
</script>

<style lang="less" scoped>
.moren{
  height: 4.88rem;
  width: 100%;
  img{
    width: 4rem;
    height: 1.8rem;
    margin: 2rem 0 3rem 3rem;
    text-align: center;
  }
}
.banner {
    height: 4.88rem;
    img {
      min-width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .err{
    margin: 1rem auto 2rem;
    text-align: center;
    img{
      width: 60%;
    }
  }
  .list{
  padding: .3rem ;
  margin-bottom: 1.1rem;
  height: 100vh;
    .listUl-li{
     display: flex;
     padding: .2rem;
     background: #fff;
     margin-bottom: 10px;
     border-radius: 5px;
     box-shadow: 3px 5px 5px #eee;
     .shopImg{
       width: 3.5rem;
       height: 3.5rem;
       margin-right: .25rem;
        img {
         width: 100%;
         height: 100%;
      }
     }
     .cont-index{
       width: 80%;
       .h4{
         font-size: .38rem;
         color: #404040;
         font-weight: 400;
         line-height: 1.5;
         height: 1.2rem;
          overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
       }
       .qi{
            display: inline-block;
            font-size: .25rem;
            font-weight: normal;
            background: #FFE3EE;
            padding: .08rem;
            color: #EF0F0F;
            border-radius: 10px;
          }
       .price{
          color: #EF0F0F;
          font-size: .48rem;
          font-weight: bold;
          margin-bottom: 10px;
          .yan{
            font-size: .15rem;
          }
       }
       .tip{
         width: 100%;
         height: .8rem;
         line-height: .8rem;
         .shi{
           float: left;
           color: #B3B3B3;
           vertical-align: baseline;
         }
         .statu{
           float: right;
           color: #EF0F0F;
           text-align: right;
           .hot{
            width: 60%;
           }
         }
       }
     }
   }
  }
  .time{
    color: #F52A6A;
  }
  .item {
  display: inline-block;
  width: .45rem;
  margin-right: 2px;
  color: #fff;
  font-size: .2rem;
  text-align: center;
  border-radius:5px;
  background-color: #EF0F0F;
}
</style>

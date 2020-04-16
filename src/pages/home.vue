<template>
  <div>
    <!-- <van-search
  v-model="value"
  placeholder="请输入搜索关键词"
  show-action
  shape="round"
  background=""
  @search="onSearch"
>
  <div slot="action" @click="onSearch">搜索</div>
</van-search> -->
<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- banner -->
    <div v-if="img === ''">
    </div>
    <van-swipe  :auto="3000" class="banner" indicator-color="white" v-else>
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item.picUrl" :alt="item.desc">
        </van-swipe-item>
      </van-swipe>
      <!-- navlist -->
      <div class="nav">
        <ul class="tableTabs">
              <!-- <li class="table-tabs-item">
                <router-link to='/buyBeans'>
                <i>
                  <img src="@/assets/nav-3.png" alt="">
                </i>
                <p class="p">拍豆换购</p>
                </router-link>
              </li>-->
              <li class="table-tabs-item">
                <router-link to='/receive'>
                <i>
                  <img src="@/assets/nav-7.png" alt="">
                </i>
                <p class="p">免费领取</p>
                </router-link>
              </li>
              <li class="table-tabs-item">
                <router-link to='/sale'>
                <i>
                  <img src="@/assets/nav-1.png" alt="">
                </i>
                <p class="p">寄卖</p>
                </router-link>
              </li>
              <!-- <li class="table-tabs-item">
                <i>
                  <img src="@/assets/nav-6.png" alt="">
                </i>
                <p class="p">拆红包</p>
              </li> -->
              <li class="table-tabs-item">
                <router-link to='/news'>
                <i>
                  <img src="@/assets/nav-4.png" alt="">
                </i>
                <p class="p">资讯</p>
                </router-link>
              </li>
              <li class="table-tabs-item">
                <router-link to='/member'>
                <i>
                  <img src="@/assets/nav-5.png" alt="">
                </i>
                <p class="p">黑金会员</p>
                </router-link>
              </li>
            </ul>
      </div>
      <div class="section1">
        <div class="title">
          <span class="icon-xing"></span>
          <h4 class="h4">热拍推荐</h4>
          <router-link to='/auctionShop' class="more">更多>></router-link>
        </div>
       <van-swipe :loop="false" class="shopBanner" indicator-color="#EF0F0F" width="175">
         <van-swipe-item v-for="item in shopBanner" :key="item.id">
          <ul class="shopUl" >
            <li class="shopUl-li" @click="handleDetils(item.id)" style="width: 95%;">
              <img :src="item.goodsVo.goodsCoverImg ? item.goodsVo.goodsCoverImg: require('@/assets/tab1.png')" alt="" class="shopImg">
              <div class="tip" v-if="item.countDown > 0 "><van-count-down :time="item.countDown * 1000" format="距开始 HH:mm:ss" millisecond/></div>
              <div class="tip hot" style="background:#666" v-else-if="item.countDown == -1">今日已结束</div>
              <div class="tip hot" v-else>正在热拍</div>
              <div class="box-bd">
                <div class="index-text">{{item.goodsName}}</div>
              <div class="price">
                <span class="yen">&yen;</span> <span>{{item.startPrice}}</span> <span class="qi">起拍价</span>
              </div>
              </div>
            </li>
          </ul>
        </van-swipe-item>
      </van-swipe>
      </div>
      <!-- 各类精选 -->
      <div class="section1">
        <div class="title">
          <span class="icon-xing"></span>
          <h4 class="h4">精选推荐</h4>
          <router-link to='/shop' class="more">更多>></router-link>
        </div>
        <div class="cont">
            <ul class="shopUl1" >
              <li class="shopUl-li1" v-for="(item,index) in dataList" :key="index" @click="handleDetils1(item.id)">
                <img :src="item.goodsVo.goodsCoverImg " alt="" class="shopImg">
                <div class="box-bd">
                  <div class="index-text">{{item.goodsVo.goodsName }}</div>
                <div class="price">
                  <span class="yen">&yen;</span> <span>{{item.money}}</span>
                </div>
                </div>
               </li>
             </ul>
          </div>
      </div>
      </van-pull-refresh>
    <!-- 导航底部 -->
      <BottomTab/>
  </div>
</template>

<script>
import sdk from './sdk'
// import Vue from 'vue'
import BottomTab from '@/components/footer'
export default {
  data () {
    return {
      isLoading: false,
      img: [],
      shopBanner: [],
      lenght: '',
      dataList: [],
      active: 0,
      time: 30 * 60 * 60 * 1000
    }
  },
  components: {
    BottomTab
  },
  created () {
    this.fromList()
    sdk.getJSSDK(location.href, '')
    if (this.$route.query.inviteCode) {
      this.$cookie.set('inviteCode', this.$route.query.inviteCode)
    }
  },
  methods: {
    fromList () {
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchBanners'),
        method: 'get',
        params: {type: 'INDEX'}
      }).then(({data}) => {
        this.img = data.data
      })
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchNewestList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.shopBanner = data.data.content
          // this.shopBanner.reverse()
        } else {
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchQualityList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.dataList = data.data.content
        } else {
        }
      })
    },
    handleDetils (id) {
      this.$router.push({path: '/actionDetails',
        query: {
          id: id
        }})
    },
    handleDetils1 (id) {
      this.$router.push({path: '/shopDetails',
        query: {
          id: id
        }})
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
.van-search--show-action {
    padding-right: 0;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 50%;
    margin-left: -3.5rem;
    background: transparent;
}
.van-swipe__indicator {
    width: .4rem;
    height: 4px;
    background-color: #ebedf0;
    border-radius: 32%;
}
.van-search__content{
      background-color: transparent;
      border: 1px solid #f5f5f5;
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
    width: 80%;
    margin: auto;
    padding: .2rem 0;
    text-align: center;
    img{
      height: 3rem;
    }
  }
  .nav {
    border-radius: .2rem .2rem 0 0;
    overflow: hidden;
    position: relative;
    top: -.2rem;
    left: 0;
    z-index: 200;
    width: 100%;
    padding: .5rem 0;
    padding-bottom: .25rem;
    .tableTabs {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      .table-tabs-item {
        width: 25%;
        margin: .133333rem 0;
        flex: initial;
        text-align: center;
        cursor: pointer;
        .p {
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: #404040;
          box-orient: vertical;
        }
        img {
          width: 1.2rem;
          height: 1.2rem;
        }
      }
    }
  }
  .section1{
   width: 90%;
   margin: auto;
  }
  .title{
    height: .4rem;
    line-height: .4rem;
    .icon-xing{
      width: .08rem;
      height: .4rem;
      background: #EF0F0F;
      border-radius: 10px;
      margin-right: .2rem;
      display: inline-block;
      color: #404040;
    }
    .h4{
      display: inline-block;
      font-size: .4rem;
    }
    .more{
      float: right;
      font-size: .29rem;
      color: #404040;
    }
  }
  .shopBanner{
    height: 7.66rem;
  }
  .cont{
  //  width: 90%;
   margin: auto;
   margin-bottom: 1.4rem;
  }
  .shopUl1{
    justify-content: space-between;
    flex-wrap: wrap;
    display: flex;
  }
  .shopUl{
    display: -webkit-box;
    .shopUl-li{
    margin-right: 10px;

   }
  }
  .shopUl,.shopUl1{
    color: #404040;
    margin-top: 10px;
    justify-content: space-between;
    .shopUl-li,.shopUl-li1{
      width: 49%;
      background: #fff;
      border-radius: 5px;
      position: relative;
      .shopImg{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        width: 100%;
        height: 4.5rem;
      }
      .box-bd{
        padding: 0 .2rem;
        .index-text{
        padding: .15rem 0;
        font-size: .34rem;
        line-height: 1.5;
        height: .9rem;
         overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
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
    .shopUl-li1{
      margin-bottom: 10px;
    }
  }
  .tip{
    padding: 2.5px 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #F6A345;
    position: absolute;
    top: .5rem;
    left: 0;
  }
  .hot{
    background: #E41C11;
    color: #fff;
    font-size: .25rem;
  }
  .van-count-down, .van-divider{
    color: #fff;
    font-size: .25rem;
  }
  .van-tabs__nav{
    background:linear-gradient(0deg,rgba(255,255,255,1) 0%,rgba(245,245,245,1) 100%);
  }
</style>

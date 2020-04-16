<template>
  <div class="page">
    <!-- banner -->
    <van-swipe  :auto="3000" class="banner" indicator-color="white">
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item.picUrl" :alt="item">
        </van-swipe-item>
    </van-swipe>
    <!-- 通知 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-notice-bar color="#404040" background="#FFFFFF" style="border-bottom: 1px solid #F5F5F5;" :scrollable="false">
        <template slot="left-icon">
          <van-icon name="volume" class="vol"/>
        </template>
       <van-swipe  style="height: 20px;width:350px" :show-indicators='false' vertical loop :autoplay="4000">
        <van-swipe-item v-for="(item) in onticeData" :key="item">
          <p>{{item}}</p>
        </van-swipe-item>
      </van-swipe>
      </van-notice-bar>
    <!-- 商品内容 -->
    <van-tabs v-model="active" sticky swipeable background="#f5f5f5"  @change="onClick">
      <van-tab :title="item.name"  v-for="item in list" :key='item.id' :name="item.id">
        <div class="err" v-if="shopBanner.length == 0">
          <img src="../../assets/err2.png" class="err" alt="" >
          <p>还没有数据哦~</p>
        </div>
        <div class="list" v-else>
          <ul class="listUl" v-for="(item,index) in shopBanner" :key="index">
            <li class="listUl-li" @click="handleDetails(item.id)">
              <img :src="item.goodsVo.goodsCoverImg " alt="" class="shopImg">
              <div class="cont-index">
                 <h4 class="h4">{{item.goodsVo.goodsName}}</h4>
                 <div class="tip">
                 <div style="float: left;">
                   <div class="shi">市场价: <span>￥{{item.goodsVo.marketPrice}}</span></div>
                   <div class="price"><span class="yan">￥</span>{{item.money}}</div>
                 </div>
                  <div class="statu" ><van-button @click.stop="yonfjin(item.id)" size="small" type="primary" color="#EF0F0F">佣金{{item.shareRate}}%</van-button></div>
                  <!-- <div class="statu" ><van-button @click.stop="yonfjin(item)" icon="share"  size="small" type="primary" color="#EF0F0F">佣金{{item.shareRate}}%</van-button></div> -->
                </div>
               </div>
             </li>
           </ul>
         </div>
      </van-tab>
    </van-tabs>
    </van-pull-refresh>
    <!-- <van-dialog v-model="show" title="" cancel-button-color="#404040" confirm-button-color="#EF0F0F" show-cancel-button cancel-button-text='暂不开通' confirm-button-text="立即开通" @confirm="onClickConfirm">
      <div class="connte">
        <p class="colorSize">您还不是黑金卡会员</p>
        <p class="colorSize1">开通之后即可享受分享赚取收益</p>
      </div>
     </van-dialog> -->
     <van-popup
  v-model="show" round position="bottom" :style="{ height: '18%' }">
  <p class="dao">分享到</p>
  <div class="wrap">
    <div class="items" @click="onClickFir">
      <img :src="require('@/assets/wei.png')" alt="">
      <p class="items-text">微信好友</p>
    </div>
    <div class="items"  @click="onClickFir">
      <img :src="require('@/assets/wei1.png')" alt="">
      <p class="items-text">朋友圈</p>
    </div>
  </div>
  </van-popup>
  <div class="show" v-if="showShare" @click="onclickHide">
    <div class="share">
       <img class="fenxiang" :src="require('@/assets/shareArr.png')" alt="">
      <div class="textShare">
        <p>点击右上角“ ... ”</p>
        <p>分享给朋友吧！</p>
      </div>
    </div>
  </div>
    <!-- 导航底部 -->
      <BottomTab></BottomTab>
  </div>
</template>

<script>
import sdk from '../sdk'
import Vue from 'vue'
import BottomTab from '@/components/footer'
export default {
  data () {
    return {
      img: [],
      shopBanner: [],
      onticeData: [],
      list: [],
      time: 30 * 60 * 60 * 1000,
      isLoading: false,
      show: false,
      showShare: false,
      item: {},
      active: 0
    }
  },
  components: {
    BottomTab
  },
  created () {
    this.fromList()
  },
  methods: {
    handleDetails (id) {
      this.$router.push({path: '/shopDetails',
        query: {
          id: id
        }})
    },
    fromList () {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchBroadcast'),
        method: 'get',
        params: {
          page: 1, size: 20
        }
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.onticeData = data.data
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchBanners'),
        method: 'get',
        params: {type: 'DIRECT_PURCHASE'}
      }).then(({data}) => {
        this.img = data.data
      })
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchGoodsCategory'),
        method: 'get'
      }).then(({data}) => {
        this.list = data.data
        this.list.unshift({'name': '人气总榜', 'id': '', 'pathCode': '0-1'})
        this.categoryId = data.data[0].id
        this.goodsCategory(this.categoryId)
      })
    },
    goodsCategory (categoryId) {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchDirectPurchaseGoods'),
        method: 'get',
        params: {categoryId: categoryId}
      }).then(({data}) => {
        this.shopBanner = data.data.content
      })
    },
    yonfjin (id) {
      // this.show = true
      // this.item = item
      this.$router.push({path: '/shopDetails',
        query: {
          id: id
        }})
    },
    // 分享微信
    onclickHide () {
      this.showShare = false
    },
    onClickFir () {
      var url1 = 'http://h5.paihuo11.cn/phlShop/index.html#/shopDetails?id=' + this.item.id + '&shareUserId='
      var url2 = Vue.cookie.get('userId') ? Vue.cookie.get('userId') : '0'
      var m = '&' + 'inviteCode' + '='
      var url3 = Vue.cookie.get('inviteCode') ? Vue.cookie.get('inviteCode') : 'system'
      var url = url1 + url2 + m + url3
      var obj = {
        title: this.item.goodsVo.goodsName, // 分享标题
        desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        linkurl: url, // 分享链接
        img: this.item.goodsVo.goodsCoverImg// 分享内容显示的图片
      }
      sdk.getJSSDK(location.href, obj)
      this.show = false
      this.showShare = true
    },
    onClickConfirm () {
      this.$router.push('/member')
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
.page{
  position: relative;
}
.van-notice-bar__left-icon, .van-notice-bar__right-icon,.van-icon-volume:before{
  color: #EF0F0F
}
 .vol{
   color:#EF0F0F !important
 }
.banner {
    height: 5rem;
    img {
      min-width: 100%;
      max-width: 100%;
      height: 100%;
    }
  }
  .err{
    margin: 1rem auto 0;
    text-align: center;
    img{
      width: 60%;
    }
  }
  .list{
    padding: .3rem;
    margin-bottom: 1rem;
    // height: ceil(100-20vh);
    .listUl-li{
     display: flex;
    border-radius:10px;
     padding: .15rem;
     background: #fff;
     margin-bottom: 10px;
     box-shadow: 3px 5px 5px #eee;
     .shopImg{
       width: 3rem;
       height: 2.8rem;
       margin-right: .25rem;
     }
     .cont-index{
       flex: 1;
       .h4{
         font-size: .38rem;
         color: #404040;
         font-weight: 400;
         line-height: 1.3;
         margin-top: .2rem;
        margin-bottom: .2rem;
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
          margin-top: -.3rem;
          .yan{
            font-size: .15rem;
          }
       }
       .tip{
         height: .8rem;
         line-height: .8rem;
         .shi{
           color: #B3B3B3;
           vertical-align: baseline;
         }
         .statu{
           float: right;
           color: #EF0F0F;
           text-align: right;
           margin-top: .3rem;
           .hot{
            width: 60%;
           }
         }
       }
     }
   }
  }
.van-notice-bar__left-icon,{
  color: #EF0F0F !important;
}
.van-icon-volume:before{
   color: #EF0F0F !important;
}
.van-tabs__nav{
  background: transparent;
}
.van-button--large van-dialog__cancel{
  background: #F5F5F5;
}
.van-dialog{
  width: 258px;
  border-radius: 7px;
}
.connte{
  padding: .4rem 0;
  text-align: center;
}
.colorSize{
  font-size: .32rem;
  margin-bottom: .2rem;
  color: #EF0F0F;
}
.colorSize1{
  color: #999;
  font-size: .32rem;
}
.show{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: hsla(0,0%,5%,.6) no-repeat;
 .share{
  margin-top: .5rem;
  color: #fff;
  .textShare{
    float:right;
    font-size: .42rem;
    line-height: 1.5
  }
  .fenxiang{
    float: right;
    margin-left: .5rem;
    width: 2rem;
  }
 }
}
.dao{
 margin-top: .5rem;
 margin-left: .3rem;
 margin-bottom: .4rem
}
.wrap{
  display: flex;
  justify-content:  space-around;
  text-align: center;

  .items{
    font-size: .3rem;
    img{
      width: 50%;
    }
    .items-text{
      line-height: 1.5
    }
  }
}
</style>

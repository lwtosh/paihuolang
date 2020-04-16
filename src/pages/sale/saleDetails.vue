<template>
  <div class="page">
     <van-nav-bar v-if="isShow" title="详情"  left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar>
   <div class="hader" v-else>
     <div class="back" @click="onClickLeft"><img :src="require('@/assets/arr.png')" alt="" srcset=""></div>
     <div class="share" @click="onClickShare"><img :src="require('@/assets/a.png')" alt="" srcset=""></div>
   </div>
  <van-swipe @change="onChange" :auto="3000" class="banner">
  <van-swipe-item v-for="(item,index) in imgUrl1" :key="index">
          <img :src="item" :alt="item">
  </van-swipe-item>
  <div class="custom-indicator" slot="indicator">
    {{ current + 1 }}/4
    </div>
  </van-swipe>
  <!-- 标题 -->
  <div class="text">
    <div class="price"><span class="yen">￥</span>{{dataList.salePrice}}</div>
    <div class="text-index">
      <div class="">
        市场价: <span style="text-decoration: line-through">￥{{dataList.goodsVo.marketPrice }}</span>
      </div>
      <div >
        寄卖人:{{dataList.tinyUserInfo.nickName}}({{dataList.tinyUserInfo.id}})
      </div>
    </div>
    <div class="title">{{dataList.goodsVo.goodsName}}</div>
  </div>
  <!-- 详情 -->
  <div class="cont">
   <van-divider :style="{ color: '#404040', borderColor: '#CCCCCC', padding: '0 16px',fontSize:'.35rem' }">商品详情</van-divider>
   <div class="tetCont" v-if="dataList.goodsVo.goodsDetail">{{dataList.goodsVo.goodsDetail }}
   </div>
  </div>
  <div class="img" >
    <img  v-for="(item,index) in imgUrl2" :key="index" :src="item" :alt="item">
  </div>
  <div class="btn" @click="payMent">立即购买</div>
  <van-popup
  v-model="show" round position="bottom" :style="{ height: '18%' }">
  <p class="dao">分享到</p>
  <div class="wrap">
    <div class="items" @click="onClickWhart">
      <img :src="require('@/assets/wei.png')" alt="">
      <p class="items-text">微信好友</p>
    </div>
    <div class="items" @click="onClickWhart">
      <img :src="require('@/assets/wei1.png')" alt="">
      <p class="items-text">朋友圈</p>
    </div>
    <!-- <div class="items">
      <img :src="require('@/assets/qq.png')" alt="">
      <p class="items-text">QQ好友</p>
    </div>
    <div class="items">
      <img :src="require('@/assets/qq1.png')" alt="">
      <p class="items-text">QQ空间</p>
    </div> -->
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
  </div>
</template>

<script>
import Vue from 'vue'
import sdk from '../sdk'
export default {
  data () {
    return {
      imgUrl1: [],
      imgUrl2: [],
      current: 0,
      show: false,
      showShare: false,
      dataList: [],
      falg: false,
      isShow: false
    }
  },
  created () {
    this.$cookie.set('id', this.$route.query.id)
    this.list()
    if (this.$route.query.inviteCode) {
      this.$cookie.set('inviteCode ', this.$route.query.inviteCode)
    }
  },
  mounted () {
    // 监听页面滚动事件
    window.addEventListener('scroll', this.handleScroll)
    // 第二种方法
    if (window.performance.navigation.type === 1) {
    } else {
      this.falg = true
    }
  },
  methods: {
    payMent () {
      if (Vue.cookie.get('userId') === '' || Vue.cookie.get('userId') === null) {
        Vue.cookie.delete('token')
        Vue.cookie.delete('userId')
        window.location.href = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(location.href) + '&inviteCode=' + this.$route.query.inviteCode
      } else {
        this.$router.push({path: '/convert', query: {id: this.dataList.id, goodsName: this.dataList.goodsVo.goodsName, goodsCoverImg: this.dataList.goodsVo.goodsCoverImg, money: this.dataList.salePrice, curUrl: location.href, publishTime: this.dataList.publishTime}})
      }
    },
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchEntrustSaleDetail'),
        method: 'get',
        params: {id: this.$route.query.id}
      }).then(({data}) => {
        this.dataList = data.data
        this.imgUrl1 = data.data.goodsVo.goodsImgs.split(',')
        this.imgUrl2 = data.data.goodsVo.goodsDetailImgs.split(',')
        document.title = this.dataList.goodsVo.goodsName
      })
    },
    handleScroll () {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 150) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    onClickShare () {
      this.show = true
    },
    // 分享微信
    onClickWhart () {
      var url = location.href
      var obj = {
        title: this.dataList.goodsVo.goodsName, // 分享标题
        desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/saleDetails?id=' + this.$route.query.id, // 分享链接
        img: this.dataList.goodsVo.goodsCoverImg// 分享内容显示的图片
      }
      sdk.getJSSDK(url, obj)
      this.show = false
      this.showShare = true
    },
    onclickHide () {
      this.showShare = false
    },
    onChange (index) {
      this.current = index
    },
    onClickLeft () {
      if (this.falg === true) {
        this.$router.push('/')
      } else {
        this.$router.push('/sele')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  height: 9rem;
  img{
    min-width: 100%;
    max-width: 100%;
    height: 100%;
  }
}
.page{
  position: relative;
}
.hader{
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 99;
  height: 1rem;
  line-height: 1rem;
  width: 95%;
  padding: .2rem;
  .back,.share{
    img{
      width: 65%;
    }
  }
  .share{
    text-align: right
  }
}
.custom-indicator{
      position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.45);
}
.btn{
  position: fixed;
  bottom: 0;
  height: 1.2rem;
  width: 100%;
  text-align: center;
  line-height: 1.2rem;
  background: #EF0F0F;
  color: #fff;
  font-size: .4rem;
}
.text{
  padding:.2rem .3rem ;
  background: #fff;
  .price{
          color: #EF0F0F;
          font-size: .48rem;
          font-weight: bold;
          .yen{
            display: inline-block;
            font-size: .2rem;
          }
    }
    .text-index{
      font-size: .29rem;
      color: #B3B3B3;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      margin-bottom: .2rem;
    }
    .title{
      font-size: .38rem;
         color: #404040;
         font-weight: 400;
         line-height: 1.5;
          overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
    }
}
.cont{
  padding:.2rem .3rem ;
  background: #fff;
  margin-top: .2rem;
  .tetCont{
    padding: .25rem .3rem;
    background: #FFF8FA;
    border-radius: 10px;
    font-size: .37rem;
    color: #404040;
    line-height: 1.5
  }
}
.show{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: hsla(0,0%,5%,.7) no-repeat;
 .share{
  margin-top: .5rem;
  color: #fff;

  .textShare{
    float:right;
    line-height: 1.5;
     font-size: .42rem;
  }
  .fenxiang{
    float: right;
    margin-left: .5rem;
    width: 2rem;
  }
 }
}

.img{
  width: 100%;
  // margin-bottom: .9rem;
  img{
    width: 100%;
    margin-top: -.1rem;
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
.dao{
 margin-top: .5rem;
 margin-left: .3rem;
 margin-bottom: .4rem
}
.wrap{
  display: flex;
  justify-content: space-around;
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

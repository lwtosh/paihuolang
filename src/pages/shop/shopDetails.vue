<template>
  <div class="page">
    <van-nav-bar v-if="isShow" title="商品详情"  left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar>
   <div class="hader" v-else>
     <div class="back" @click="onClickLeft"><img :src="require('@/assets/arr.png')" alt="" srcset=""></div>
     <!-- <div class="share" @click="onClickShare"><img :src="require('@/assets/share.png')" alt="" srcset=""></div> -->
   </div>
  <van-swipe  @change="onChange" :auto="3000" class="banner">
  <van-swipe-item v-for="(item,index) in imgUrl1" :key="index">
          <img :src="item" :alt="item">
  </van-swipe-item>
  <div class="custom-indicator" slot="indicator">
    {{ current + 1 }}/{{imgUrl1.length}}
    </div>
  </van-swipe>
  <!-- 标题 -->
  <div class="pai">
      <div class="price"><span class="yen"> ￥</span>{{dataList.money}}</div>
      <div class="text-index">
        <div class="">
          市场价: <span style="text-decoration: line-through">￥{{dataList.goodsVo.marketPrice}}</span>
        </div>
        <div class="count">库存 : {{dataList.storeNum}}</div>
      </div>
    </div>
  <div class="text">
    <div class="title">{{dataList.goodsVo.goodsName}}</div>

    <div class="like" v-if='dataInfo3 =="" || status==1'>
      <div class="vip" style="color:#EF0F0F"><img src="../../assets/ka.png" alt=""> 您已是金卡会员,本单立省￥{{dataList.money * dataList.shareRate /100}}</div>
    </div>
    <div class="like" v-else >
      <div class="vip"><img src="../../assets/ka.png" alt=""> 开通黑金卡会员，立即省￥{{dataList.money * dataList.shareRate /100}}  元</div>
      <!-- <div class="kai" @click="handleopen">立即开通 <van-icon name="arrow" /></div> -->
    </div>
  </div>
  <!-- 详情 -->
  <div class="cont">
   <van-divider :style="{ color: '#404040', borderColor: '#CCCCCC', padding: '0 16px',fontSize:'.35rem' }">商品详情</van-divider>
   <div class="tetCont" v-if="dataList.goodsVo.goodsDetail">
     <p>{{dataList.goodsVo.goodsDetail}}</p>
   </div>
  </div>
  <div class="img">
    <img :src="item" :alt="item" v-for="(item,index) in imgUrl2" :key="index">
  </div>
  <div class="btnFl">
     <div class="btn1" @click="onClickShare">￥{{dataList.money * dataList.shareRate /100}} <p>分享赚</p></div>
     <div class="btn" @click="payMent">立即购买</div>
  </div>
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
  </div>
</template>

<script>
import Vue from 'vue'
import sdk from '../sdk'
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      img: [],
      current: 0,
      dataList: [],
      showShare: false,
      show: false,
      show1: false,
      show2: false,
      shareUserId: ' ',
      status: '',
      userId: '',
      isShow: false,
      falg: false,
      dataInfo3: '',
      imgUrl1: [],
      imgUrl2: []
    }
  },
  created () {
    this.list()
    this.$cookie.set('id', this.$route.query.id)
    if (this.$route.query.inviteCode) {
      this.$cookie.set('inviteCode', this.$route.query.inviteCode)
    }
    if (Vue.cookie.get('userId')) {
      this.userId = Vue.cookie.get('userId')
    }
    if (this.$route.query.shareUserId) {
      this.$cookie.set('shareUserId ', this.$route.query.shareUserId)
      this.shareUserId = this.$route.query.shareUserId
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
    reload () {
      this.show2 = false
      this.$nextTick(function () {
        this.show2 = true
      })
    },
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchEquityGoodsDetail'),
        method: 'get',
        params: {id: this.$route.query.id}
      }).then(({data}) => {
        this.dataList = data.data
        this.imgUrl1 = data.data.goodsVo.goodsImgs.split(',')
        this.imgUrl2 = data.data.goodsVo.goodsDetailImgs.split(',')
        document.title = data.data.goodsVo.goodsName
        // this.onClickWhart()
      })
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getUserVipInfo'),
        method: 'get'
      }).then(({data}) => {
        this.dataInfo3 = data.data
        this.status = this.dataInfo3.status
      })
    },
    handleScroll () {
      if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 150) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    payMent () {
      if (Vue.cookie.get('userId') === undefined) {
        Vue.cookie.delete('token')
        Vue.cookie.delete('userId')
        window.location.href = 'https://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(location.href) + '&inviteCode=' + this.$route.query.inviteCode
      } else {
        this.$router.push({path: '/convert', query: {id: this.dataList.id, goodsName: this.dataList.goodsVo.goodsName, goodsCoverImg: this.dataList.goodsVo.goodsCoverImg, money: this.dataList.money, curUrl: location.href, type: 2}})
      }
    },
    handleopen () {
      this.$router.push('/member')
    },
    onClickLeft () {
      if (this.falg === true) {
        this.$router.push('/shop')
      } else {
        this.$router.push('/shop')
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
        linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/shopDetails?id=' + this.$route.query.id + '&shareUserId=' + this.shareUserId + '&' + 'inviteCode' + '=' + Vue.cookie.get('inviteCode') ? Vue.cookie.get('inviteCode') : 'system', // 分享链接
        img: this.dataList.goodsVo.goodsCoverImg// 分享内容显示的图片
      }
      sdk.getJSSDK(url, obj)
      this.show = false
      this.showShare = true
    },
    onclickHide () {
      this.showShare = false
    },
    onClickFir () {
      this.show = false
      this.showShare = true
      var url = location.href
      var obj = {
        title: this.dataList.goodsVo.goodsName, // 分享标题
        desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/shopDetails?id=' + this.$route.query.id + '&shareUserId=' + this.userId, // 分享链接
        img: this.dataList.goodsVo.goodsCoverImg// 分享内容显示的图片
      }
      sdk.getJSSDK(url, obj)
    },
    onChange (index) {
      this.current = index
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
      width: 60%;
    }
  }
  .share{
    text-align: right
  }
}
.page{
  position: relative;
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
.btnFl{
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.btn,.btn1{
  height: 1.3rem;
  width: 50%;
  text-align: center;
  line-height: 1.3rem;
  background: #EF0F0F;
  color: #fff;
  font-size: .4rem;
}
.btn1{
  background: #fff;
  color: #EF0F0F;
  line-height: 1rem;
  font-size: .42rem;
  p{
    font-size: .26rem;
    margin-top: -.5rem
  }
}
.text{
  padding:.2rem .3rem ;
  background: #fff;
    .title{
      font-size: .38rem;
         color: #404040;
         font-weight: 400;
         line-height: 1.5;
         margin-bottom: 5px;
          overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
    }
    .like{
      display: flex;
      justify-content: space-between;
      padding: .1rem;
      background: #FEF2F6;
      height: .9rem;
      line-height: .9rem;
      border-radius: 5px;
      .vip{
        font-size: .32rem;
        img{
          vertical-align: -5px;
          width: 1.72rem;
          height: 0.5rem;
        }
      }
      .kai{
        color: #EF0F0F;
      }
    }
}
.pai{
  padding:.2rem .3rem ;
  background: #EF0F0F;
  .price{
      color: #fff;
      font-size: .48rem;
      .yen{
        display: inline-block;
        font-size: .2rem;
        color: #F9BABA;
      }
  }
  .text-index{
      font-size: .29rem;
      color: #F9BABA;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      .count{
        margin-top: -.3rem
      }
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
.img{
  width: 100%;
  margin-bottom: .9rem;
  img{
    width: 100%;
    margin-top: -.1rem;
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

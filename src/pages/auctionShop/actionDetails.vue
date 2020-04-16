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
    {{ current + 1 }}/{{this.imgUrl1.length}}
    </div>
  </van-swipe>
  <!-- 标题 -->
  <div class="text">
    <div class="title">{{dataList.goodsName}}</div>
    <div class="price"><span class="yen"> ￥</span>{{dataList.startPrice}} <span class="qi"> 起拍价</span></div>
      <div class="text-index">
        <div class="">
          市场价: <span style="text-decoration: line-through"><span>￥</span>{{dataList.goodsVo.marketPrice}}</span>
        </div>
      </div>
  </div>
  <!-- 三格 -->
  <div class="grid">
    <van-grid :border="false" :column-num="3">
      <van-grid-item class="item">
        <p class="colorFont"><span>￥</span>{{dataList.historyHighestPrice ? dataList.historyHighestPrice : 0}}</p>
        <p class="colorFont1">历史最高价</p>
      </van-grid-item>
     <van-grid-item class="item">
        <p class="colorFont"><span>￥</span>{{dataList.bidPlusPrice }}</p>
        <p class="colorFont1">加价幅度</p>
     </van-grid-item>
     <van-grid-item class="item">
        <p class="colorFont">{{dataList.depositRate }}%</p>
        <p class="colorFont1">保证金比例</p>
      </van-grid-item>
     </van-grid>
  </div>
  <!-- 场次 -->
  <div class="session" v-if="dataList1.length !== 0">
    <div class="se-hd">
      <p class="h5">本产品可直接参与竞拍场次</p>
      <!-- <p class="check">查看全部>></p> -->
    </div>
    <van-row gutter="20" class="row" v-for="item in dataList1" :key="item.id">
      <van-col span="8" v-if="item.type == 0">{{item.id}}场 <van-tag round  color="#FEF3E9" text-color="#EF690F">公场</van-tag></van-col>
      <van-col span="8" v-if="item.type == 1">{{item.id}}场 <van-tag round  color="#E9EFFE" text-color="#0F9DEF" >私场</van-tag></van-col>
      <van-col span="8" v-if="item.type == 2">{{item.id}}场 <van-tag round  color="#FEE9F0" text-color="#EF0F0F">代理</van-tag></van-col>
      <van-col span="8" v-if="item.countDown > 0" style="text-align: center">{{countDown}}开拍</van-col>
      <van-col span="8" v-else style="text-align: center;color:#EF0F0F">正在热拍</van-col>
      <van-col span="8"  style="text-align: right" v-if="item.type == 0"><van-button type="primary" color="#EF0F0F" @click="handlePart(item.id)"  size="small">立即参与</van-button></van-col>
      <van-col span="8"  style="text-align: right" v-else><van-button type="primary" color="#EF0F0F" @click="handlePart1(item.id)"  size="small"><img style="width: 17%;vertical-align: -2px;" src="../../assets/lock.png" alt=""> 立即参与</van-button></van-col>
    </van-row>
  </div>
  <!-- 流程 -->
  <div class="pro">
    <h5 class="h5">竞拍流程</h5>
    <div class="flex">
      <div class="item">
        <img class="pImg" :src="require('@/assets/p1.png')" alt=""  style="height: .6rem;">
        <p class="colorFont1">交保证金</p>
      </div>
     <div>
        <img class="arrimg" :src="require('@/assets/p0.png')" alt="">
     </div>
     <div>
       <div>
         <img class="pImg" :src="require('@/assets/p2.png')" alt="">
       </div>
        <p class="colorFont1">出价竞拍</p>
      </div>
      <div>
        <img class="arrimg" :src="require('@/assets/p0.png')" alt="">
     </div>
     <div>
        <img class="pImg" :src="require('@/assets/p3.png')" alt="" style="height: .6rem;">
        <p class="colorFont1">竞拍成功</p>
      </div>
      <div>
        <img class="arrimg"  :src="require('@/assets/p0.png')" alt="">
     </div>
     <div>
        <img class="pImg" :src="require('@/assets/p4.png')" alt="">
        <p class="colorFont1">支付货款</p>
      </div>
      <div>
        <img class="arrimg"  :src="require('@/assets/p0.png')" alt="">
     </div>
     <div>
        <img class="pImg" :src="require('@/assets/p5.png')" alt="">
        <p class="colorFont1">交易成功</p>
      </div>
    </div>
  </div>
  <!-- 详情 -->
  <div class="cont">
   <van-cell title="参拍指南" @click="Canpai"/>
   <van-cell value="商品详情"  />
   <div class="tetCont" v-if="dataList.goodsVo.goodsDetail">
     <p>{{dataList.goodsVo.goodsDetail}}</p>
   </div>
  </div>
  <div class="img"  >
    <img v-for="(item,index) in imgUrl2" :key="index" :src="item" :alt="item">
  </div>
  <!-- 分享 -->
  <van-popup v-model="show" round position="bottom" :style="{ height: '20%' }">
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
   </div>
  </van-popup>
  <!-- 输入场次密码 -->
  <van-popup v-model="show2" style="border-radius: 50px;padding:.1rem .2rem">
    <div class="shuru">
      <input type="password" class="input" placeholder="请输入本拍场密码" v-model="rom">
      <div class="click" @click="onClickRomm"> <img src="~@/assets/arr2.png" alt=""></div>
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
      time: 30 * 60 * 60 * 1000,
      dataList: [],
      isShow: false,
      rom: '',
      roundRuleId: '',
      show: false,
      show1: false,
      show2: false,
      showShare: false,
      falg: false,
      dataList1: [],
      num: '',
      countDown: '',
      marketPrice: '',
      imgUrl1: [],
      imgUrl2: [],
      current: 0
    }
  },
  created () {
    this.list()
    this.$cookie.set('id', this.$route.query.id)
    if (this.$route.query.inviteCode) {
      this.$cookie.set('inviteCode', this.$route.query.inviteCode)
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
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/round/fetchAuctionLineDetail'),
        method: 'get',
        params: {id: this.$route.query.id}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.dataList = data.data
          // this.onClickWhart()
          this.imgUrl1 = data.data.goodsVo.goodsImgs.split(',')
          this.imgUrl2 = data.data.goodsVo.goodsDetailImgs.split(',')
          document.title = this.dataList.goodsName
        } else {
          // this.$toast(data.message)
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/round/fetchRoundListByAuctionLine'),
        method: 'get',
        params: {auctionLineId: this.$route.query.id, page: 1, limit: 20}
      }).then(({data}) => {
        for (let i = 0; i < data.data.content.length; i++) {
          if (data.data.content[i].countDown > 0) {
            var num = data.data.content[i].countDown
            // eslint-disable-next-line no-unused-vars
            var timer = setInterval(() => {
              num--
              this.countDown = this.count(num)
              this.count(num)
              if (num === 0) {
                clearInterval(timer)
                this.countDown = '00:00:00'
                this.list()
              }
            }, 1000)
          }
        }
        this.dataList1 = data.data.content
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
    Canpai () { window.location.href = 'https://h5.paihuo11.cn/text/guide.html' },
    payMent () {
      this.$router.push('/convert')
    },
    // 分享微信
    onClickWhart () {
      var url = location.href
      var obj = {
        title: this.dataList.goodsVo.goodsName, // 分享标题
        desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/actionDetails?id=' + this.$route.query.id, // 分享链接
        img: this.dataList.goodsVo.goodsCoverImg// 分享内容显示的图片
      }
      sdk.getJSSDK(url, obj)
      this.show = false
      this.showShare = true
    },
    onclickHide () {
      this.showShare = false
    },
    handlePart (id) {
      if (Vue.cookie.get('userId') === '' || Vue.cookie.get('userId') === null) {
        Vue.cookie.delete('token')
        Vue.cookie.delete('userId')
        var url = location.href
        window.location.href = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(url) + '&inviteCode=' + this.$route.query.inviteCode
      } else {
        this.$router.push({path: '/bid', query: {id: id}})
      }
    },
    handlePart1 (id) {
      this.show2 = true
      this.roundRuleId = id
    },
    onClickRomm () {
      if (this.rom === '') {
        this.$toast('请输入本拍场密码')
      } else {
        this.$http({
          url: this.$http.adornUrl('/h5/round/enterAuctionRoom'),
          method: 'post',
          params: {roundRuleId: this.roundRuleId, password: this.rom}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.show2 = false
            this.$router.push({path: '/bid', query: {id: this.roundRuleId}})
          } else if (data.code === 'B19') {
            Vue.cookie.delete('token')
            Vue.cookie.delete('userId')
            var url = location.href
            window.location.href = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(url) + '&inviteCode=' + this.$route.query.inviteCode
          } else {
            this.$toast(data.message)
          }
        })
      }
    },
    onClickLeft () {
      if (this.falg === true) {
        this.$router.push('/auctionShop')
      } else {
        this.$router.push('/auctionShop')
      }
    },
    onChange (index) {
      this.current = index
    },
    count (time) {
      var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600)
      var min = Math.floor(time / 60) % 60 < 10 ? '0' + Math.floor(time / 60) % 60 : Math.floor(time / 60) % 60
      var s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60)
      // eslint-disable-next-line no-redeclare
      var time = h + ': ' + min + ':' + s
      return time
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  width: 100%;
  height: 9rem;
  img{
    width: 100%;
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
    .price{
      color: #EF0F0F;
      font-size: .48rem;
      font-weight: bold;
      margin-top: .1rem;
      .yen{
        display: inline-block;
        font-size: .2rem;
        font-weight: 400;
      }
      .qi{
          display: inline-block;
          font-size: 0.12rem;
          font-weight: normal;
          background: #FFE3EE;
          padding: 0.07rem;
          color: #EF0F0F;
          border-radius: 10px;
      }
  }
  .text-index{
      font-size: .29rem;
      color: #999;
      line-height: 1.5;
      display: flex;
      justify-content: space-between;
      .count{
        margin-top: -.3rem
      }
    }
}
.cont{
  padding:0rem .3rem ;
  background: #fff;
  margin-top: .2rem;
  padding-bottom: .3rem;
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

.grid{
  margin-top: .2rem;
  .colorFont{
  color: #EF0F0F;
  font-size: .42rem;
  span{
    font-size: .32rem;
   }
  }
  .colorFont1{
  color: #999;
  font-size: .32rem;
  }
}
.session,.pro{
  margin-top: .2rem;
   padding:.2rem .3rem ;
   background: #fff;
   .se-hd{
     height: .8rem;
     line-height: .8rem;
     .h5{
       float: left;
       font-size: .34rem;
     }
     .check{
       float: right;
       color: #808080;
       font-size: .29rem;
     }
   }
   .row{
     border-bottom: 1px solid #f5f5f5;
     height: 1.2rem;
     line-height: 1.2rem;
     font-size: .32rem;
   }
   .row:last-child{
      border-bottom: none;
   }
}
.pro{
   .h5{
     font-weight: 400;
   }
   .flex{
     display: flex;
     padding: .3rem 0;
     justify-content: space-around;
     align-items: center;
     flex-grow:1;
     .pImg{
      width: .55rem;
      margin-left: .3rem;
      text-align: center;
    }
    .arrimg{
       width: .3rem;
       height: .2rem;
     }
     .colorFont1{
       font-size: .26rem;
       white-space:nowrap;
       color: #999;
       margin-top: .1rem;
     }
   }

}
.shuru{
  display: flex;
  justify-content: space-between;
  .input{
     height: 1.4rem;
     line-height: 1.4rem;
     width: 5rem;
     margin: auto;
     background: #fff;
     border:none;
     padding: 0 .2rem;
     text-align: center;
     font-size: .36rem;
  }
  .click{
    width: 2rem;
    img{
      width: 95%;
    }
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
.van-cell{
  padding: 8px 0;
  font-size: .34rem;
}
.van-cell:not(:last-child)::after{
  left: 0;
}
.van-count-down, .van-divider{
  line-height: 1.2rem;
  font-size: .32rem;
}
.item{
  position: relative;
}
.van-tag{
  font-size: .12rem;
}
.item::after{
    content: '';
    position: absolute;
    right: 0;
    top: 22%;
    width: 0.1rem;
    z-index: 999;
    height: 1rem;
    color: #412525;;
}
.van-button--small{
  border-radius: 5px;
  color: #f5f5f5;
  padding: 0;
  width: 1.92rem;
  font-size: .32rem;
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
    img{
      width: 65%;
    }
    .items-text{
      line-height: 1.5
    }
  }
}
</style>

<template>
  <div>
   <van-nav-bar title="金币商城" left-text="" left-arrow fixed @click-left="onClickLeft"  @click-right="onClickRight">
     <van-icon name="search" slot="right" />
   </van-nav-bar>
   <!-- banner -->
    <van-swipe  :auto="3000" class="banner" indicator-color="white">
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item" :alt="item">
        </van-swipe-item>
    </van-swipe>
    <!-- banner -->
    <div class="come">
      <div class="h3">榜单推荐</div>
    </div>

    <!-- 商品 -->
    <van-tabs v-model="active" swipeable >
      <van-tab title="人气总榜">
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul class="shopUl">
            <li class="shopUl-li" v-for="(item,index) in shopBanner" :key="index" @click="handleDetails">
              <img :src="item.img" alt="" class="shopImg" >
              <div class="box-bd">
                <div class="index-text">{{item.title}}</div>
              <div class="price" v-if="item.mou !== '' && item.bi == ''">
                <span class="yen">&yen;</span> {{item.mou}}
              </div>
              <div class="price" v-else-if="item.mou !== '' && item.bi !== ''">
                <span class="yen">&yen;</span> <span>{{item.mou}}+{{item.bi}}</span><span class="yen">金币</span>
              </div>
              <div class="price" v-else>
                {{item.bi}} <span class="yen">金币</span>
              </div>
              </div>
            </li>
         </ul>
      </van-list>
      </van-tab>
      <van-tab title="食品饮料">内容 2</van-tab>
      <van-tab title="美容护肤">内容 3</van-tab>
      <van-tab title="居家日用">内容 4</van-tab>
    </van-tabs>
    <!-- 商品 -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      finished: false,
      img: ['https://img.alicdn.com/tfs/TB1BavQjxz1gK0jSZSgXXavwpXa-520-280.jpg_q90_.webp', 'https://img.alicdn.com/simba/img/TB1RxiWiKbviK0jSZFNSuuApXXa.jpg', 'https://img.alicdn.com/simba/img/TB1fyqujQY2gK0jSZFgSuw5OFXa.jpg'],
      shopBanner: [{img: 'https://img.alicdn.com/bao/uploaded/i4/3392536705/O1CN01nn6Y4T1zOwBUg4as7_!!0-item_pic.jpg',
        title: '花西子化妆品套装女全套初学者学生新手眉笔气垫散粉蜜粉彩妆组合',
        mou: 419.25,
        bi: 296}, {img: 'https://gw.alicdn.com/bao/upload/TB13QLZioT1gK0jSZFrXXcNCXXa.png',
        title: 'eos/伊欧诗滋润保湿补水润唇球唇膜女睡眠补水淡化唇纹日夜组合',
        mou: 95.00,
        bi: ''}, {img: 'https://imgservice2.suning.cn/uimg1/b2c/image/P5VFHFvu1olPGT-dUr3S5Q.jpg_400w_400h_4e',
        title: '欧莱雅复颜抗皱紧致护肤套装(水130ml+乳110ml+赠品水65ml*2',
        mou: 329.00,
        bi: ''}, {img: 'https://imgservice4.suning.cn/uimg1/b2c/image/y9uz91xHsaQ8c9pRyLq_rA.jpg_400w_400h_4e',
        title: '谜尚（MISSHA）弹力网格粉凝霜23号（无暇版）14g（BB霜气垫粉底滋润遮瑕保湿）正品保证',
        bi: 99,
        mou: ''}],
      active: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
    },
    handleDetails () {
      this.$router.push('/goldcoinDetails')
    },
    onLoad () {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < this.shopBanner.length; i++) {
      //     this.shopBanner.push(this.shopBanner.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.shopBanner.length >= 4) {
      //     this.finished = true;
      //   }
      // }, 500);
    }
  }
}
</script>

<style lang="less" scoped>
.banner{
  margin-top: 1rem;
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
.come{
  width: 90%;
  margin: auto;
  .h3{
    line-height: 1.2rem;
    font-size: .4rem;
  }
}

  .shopUl{
    display: flex;
    width: 90%;
    margin: auto;
    color: #404040;
    margin-top: 10px;
    justify-content: space-around;
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
  }
.van-nav-bar .van-icon{
  color: #404040;
  font-size: .55rem;
}
.van-nav-bar{
  height: 1.17rem;
  line-height: 1.17rem;
}
.van-tabs__nav{
  background-color:linear-gradient(0deg,rgba(255,255,255,1) 0%,rgba(245,245,245,1) 100%);
}
.van-nav-bar__title{
   color: #404040;
}
.van-tabs--line .van-tabs__wrap{
  height: 1.12rem !important;
  line-height: 1.12rem !important;
}
</style>

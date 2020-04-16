<template>
  <div>
   <van-nav-bar title="拍豆商城" left-text="" left-arrow fixed @click-left="onClickLeft"  @click-right="onClickRight">
     <van-icon name="search" slot="right" />
   </van-nav-bar>
   <!-- banner -->
    <van-swipe  :auto="3000" class="banner" indicator-color="white">
        <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item" :alt="item">
        </van-swipe-item>
    </van-swipe>
    <!-- banner -->
    <!-- 商品 -->
    <div class="nav">
       <div class="f1"  @click="handleChange1" :class="{active:cur==0}">销量</div>
       <div class="f1"  @click="handleChange2" :class="{active:cur==1}">上新</div>
       <div class="f1" @click="handleChange3" :class="{active:cur==2}">拍豆数 <img class="action" :src="action" alt=""></div>
    </div>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list">
        <ul class="listUl" v-for="(item,index) in shopBanner" :key="index">
          <li class="listUl-li" @click="handleDetails">
            <img :src="item.img" alt="" class="shopImg">
            <div class="cont-index">
              <h4 class="h4">{{item.title}}</h4>
              <div class="shi">市场价： <span style="text-decoration: line-through">￥5899.00</span></div>
              <div class="price">{{item.mou}}<span class="yan"> 拍豆</span></div>
              <div class="tip">
                <div class="shi">库存: <span>￥{{item.mou}}</span></div>
                <div class="statu"><van-button  size="normal" type="primary" color="#EF0F0F">兑换</van-button></div>
              </div>
            </div>
          </li>
        </ul>
       </div>
      </van-list>
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
        mou: 419.25}, {img: 'https://gw.alicdn.com/bao/upload/TB13QLZioT1gK0jSZFrXXcNCXXa.png',
        title: 'eos/伊欧诗滋润保湿补水润唇球唇膜女睡眠补水淡化唇纹日夜组合',
        mou: 95.00}, {img: 'https://imgservice2.suning.cn/uimg1/b2c/image/P5VFHFvu1olPGT-dUr3S5Q.jpg_400w_400h_4e',
        title: '欧莱雅复颜抗皱紧致护肤套装(水130ml+乳110ml+赠品水65ml*2',
        mou: 329.00}, {img: 'https://imgservice4.suning.cn/uimg1/b2c/image/y9uz91xHsaQ8c9pRyLq_rA.jpg_400w_400h_4e',
        title: '谜尚（MISSHA）弹力网格粉凝霜23号（无暇版）14g（BB霜气垫粉底滋润遮瑕保湿）正品保证',
        mou: 119.00}],
      action: '../assets/action1.png',
      cur: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
    },
    handleDetails () {
      this.$router.push('/buybeansDetails')
    },
    handleChange1 () {
      this.cur = 0
    },
    handleChange2 () {
      this.cur = 1
    },
    handleChange3 () {
      this.cur = 2
      this.action = '../../assets/action1.png'
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
  }
}
.active{
  color:#EF0F0F;
}
 .list{
  padding: .3rem ;
    .listUl-li{
     display: flex;
     padding: .3rem;
     background: #fff;
     margin-bottom: 10px;
     .shopImg{
       width: 3.2rem;
       height: 3.2rem;
       margin-right: .25rem;
        img {
         width: 100%;
         height: 100%;
      }
     }
     .cont-index{
       .h4{
         font-size: .38rem;
         color: #404040;
         font-weight: 400;
         line-height: 1.3;
         margin: .1rem 0 .25rem 0;
          overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
       }
       .shi{
            display: inline-block;
            font-size: .25rem;
            font-weight: normal;
            color: #B3B3B3;
            border-radius: 10px;
          }
       .price{
          color: #EF0F0F;
          font-size: .48rem;
          font-weight: bold;
          margin-bottom: 10px;
          .yan{
            font-weight: 400;
            font-size: .15rem;
          }
       }
       .tip{
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
           margin-top: -.2rem;
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
.van-button--normal{
  padding: 0 .5rem;
  border-radius: 5px;
  height: .9rem;
  line-height: .9rem;
}
.van-nav-bar__title{
   color: #404040;
}
</style>

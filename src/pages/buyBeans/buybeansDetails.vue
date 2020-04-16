<template>
  <div class="page">
    <van-nav-bar title="详情" left-text="" left-arrow fixed @click-left="onClickLeft" >
     <!-- <van-icon name="search" slot="right" /> -->
   </van-nav-bar>
  <van-swipe @change="onChange" :auto="3000" class="banner">
  <van-swipe-item v-for="(item,index) in img" :key="index">
          <img :src="item" :alt="item">
  </van-swipe-item>
  <div class="custom-indicator" slot="indicator">
    {{ current + 1 }}/4
    </div>
  </van-swipe>
  <!-- 标题 -->
  <div class="pai">
      <div class="price">1000 <span class="yen"> 拍豆</span></div>
      <div class="text-index">
        <div class="">
          市场价: <span style="text-decoration: line-through">￥1552.25</span>
        </div>
        <div class="count">库存 : 100</div>
      </div>
    </div>
  <div class="text">
    <div class="title">樱花吊坠925纯银项链女简约日韩国锁骨链小众轻奢 学生配饰</div>
  </div>
  <!-- 详情 -->
  <div class="cont">
   <van-divider :style="{ color: '#404040', borderColor: '#CCCCCC', padding: '0 16px',fontSize:'.35rem' }">商品详情</van-divider>
   <div class="tetCont">品牌: Swarovski/施华洛世奇 <br> 产品名称：樱花吊坠  <br> 货号: 5286137  <br> 材质：S925纯银  <br> 介绍：荷花玛瑙手链,3D硬金足金999转运珠黄金绿玛瑙手串女款首饰,金莱缘品牌,足金 ,图案-植物花卉。
   </div>
  </div>
  <div class="img">
    <img src="https://img.alicdn.com/tfs/TB1BavQjxz1gK0jSZSgXXavwpXa-520-280.jpg_q90_.webp" alt="" srcset="">
  </div>
  <div class="btn" @click="payMent">立即购买</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: ['https://img.alicdn.com/tfs/TB1BavQjxz1gK0jSZSgXXavwpXa-520-280.jpg_q90_.webp', 'https://img.alicdn.com/simba/img/TB1RxiWiKbviK0jSZFNSuuApXXa.jpg', 'https://img.alicdn.com/simba/img/TB1fyqujQY2gK0jSZFgSuw5OFXa.jpg'],
      current: 0
    }
  },
  methods: {
    payMent () {
      this.$router.push('/convert')
    },
    onClickLeft () {
      this.$router.go(-1)
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

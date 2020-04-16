<template>
  <div>
    <!-- 导航底部 -->
    <div >
      <van-tabbar v-model="active" route>
  <van-tabbar-item   replace to="/">
    <span>首页</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? require('@/assets/tab1Active.png'): require('@/assets/tab1.png')"
    >
  </van-tabbar-item>
  <van-tabbar-item icon="search"  replace to="/shop">
    <span>商城</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? require('@/assets/tab2Active.png'): require('@/assets/tab2.png')"
    >
  </van-tabbar-item>
  <van-tabbar-item icon="setting-o"  replace to="/auctionShop">
    <span>竞购</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? require('@/assets/tab3Active.png'): require('@/assets/tab3.png')"
    >
  </van-tabbar-item>
  <van-tabbar-item icon="setting-o"  replace to="/my">
    <span>我的</span>
    <img
      slot="icon"
      slot-scope="props"
      :src="props.active ? require('@/assets/tab4Active.png'): require('@/assets/tab4.png')"
    >
  </van-tabbar-item>
</van-tabbar>
    <!-- <mt-tabbar v-model="selected" fixed class="nav-bar">
    <mt-tab-item id="home">
      <img slot="icon" :src="[selected == 'home' ? require('@/assets/tab1Active.png'): require('@/assets/tab1.png')]">
      首页
    </mt-tab-item>
    <mt-tab-item id="shop">
      <img slot="icon" :src="[selected == 'shop' ? require('@/assets/tab2Active.png'): require('@/assets/tab2.png')]">
       商城
    </mt-tab-item>
     <mt-tab-item id="auctionShop">
      <img slot="icon" :src="[selected == 'auctionShop' ? require('@/assets/tab3Active.png'): require('@/assets/tab3.png')]">
       竞拍
     </mt-tab-item>
     <mt-tab-item id="my">
      <img slot="icon" :src="[selected == 'my' ? require('@/assets/tab4Active.png'): require('@/assets/tab4.png')]">
      我的
     </mt-tab-item>
      </mt-tabbar> -->
    </div>

  </div>
</template>

<script>
export default {
  name: 'BottomTab',
  data () {
    return {
      active: 0
    }
  }

}
</script>

<style lang="less" scoped>
 .nav-bar {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: space-around;
    background: #fff;
    font-size: 16px;
    img{
      width: .8rem;
      height: .8rem;
    }
  }
  .van-tabbar-item--active{
    color: #EF0F0F;
  }
  .van-tabbar{
    height: 1.3rem;
  }
  .van-tabbar-item__icon img{
    width: .5rem;
    height: .5rem;
  }
</style>

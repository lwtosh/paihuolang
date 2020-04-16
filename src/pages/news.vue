<template>
  <div>
    <van-nav-bar title="资讯" left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar>
    <van-tabs v-model="activeName" animated swipeable background="#f5f5f5" title-active-color="#EF0F0F" @change="onClickTab">
   <van-tab :title="item.headerName" :name='item.id'  v-for="item in newList" :key='item.id' >
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="err" v-if="newInfo.length == 0">
          <img src="~@/assets/err2.png" class="err" alt="" >
          <p>还没有数据哦~</p>
        </div>
      <ul class="list" >
      <li @click="newDeatils(item.id)" v-for="item in newInfo" :key='item.id'>
        <img :src="item.img" alt="">
        <van-cell :title="item.title"/>
      </li>
    </ul>
      </van-pull-refresh>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
// import sdk from './sdk'
// import Vue from 'vue'
export default {
  data () {
    return {
      activeName: 0,
      isLoading: false,
      newInfo: '',
      newList: ''
    }
  },
  created () {
    this.dataList()
    // var url = location.href
    // // eslint-disable-next-line no-unused-var
    // var obj = {
    //   title: '拍货郎-资讯', // 分享标题
    //   desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
    //   linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/news' + '&inviteCode=' + Vue.cookie.get('inviteCode'), // 分享链接
    //   img: 'https://h5.paihuo11.cn/phlShop/logo.png'// 分享内容显示的图片
    // }
    // sdk.getJSSDK(url, obj)
  },
  methods: {
    dataList () {
      this.$http({
        url: this.$http.adornUrl('/h5/information/getHeader'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.newList = data.data
          this.goodsCategory(this.newList[0].id)
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    goodsCategory (headerId) {
      this.$http({
        url: this.$http.adornUrl('/information/getNews'),
        method: 'get',
        params: {headerId: headerId}
      }).then(({data}) => {
        this.newInfo = data.data.content
      })
    },
    newDeatils (id) {
      this.$router.push({path: '/newsDetails', query: {id: id}})
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    onClickTab (name) {
      this.goodsCategory(name)
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs{
  margin-top: 1.1rem
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
 .err{
    margin: 1rem auto 0;
    text-align: center;
    img{
      width: 60%;
    }
  }
.list{
  padding: .2rem .3rem;
  height: ceil(100-20vh);
  li{
    margin-bottom: 15px;
    border-radius: 10px;
    img{
      width: 100%;
      height: 3.3rem;
    }
  }
}
</style>

<template>
  <div>
    <!-- <van-nav-bar
      title="我的徒弟"
      left-text=""
      left-arrow
      fixed
      @click-left="onClickLeft"
    >
    </van-nav-bar> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="暂无数据"
          @load="onLoad"
        >
          <div class="list">
            <ul
              class="listUl"
              v-for="(item,index) in shopBanner"
              :key="index"
            >
              <li class="listUl-li">
                <div class="useravr">
                  <img :src="item.avatar" alt="">
                </div>
                <div class="user">
                  <div class="user-left">
                    <div class="name">{{item.nickName}}(ID:{{item.id}})</div>
                    <div class="tel">手机号:{{item.phone}}</div>
                  </div>
                    <div class="user-right" v-if='item.status == 1'>已激活</div>
                    <div class="user-right" v-if='item.status == 0' style='color:#EF0F0F'>待激活</div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import Vue from 'vue'
// import sdk from '../sdk'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      shopBanner: [],
      inviteCode: ''
    }
  },
  mounted () {
  },
  created () {
    if (Vue.cookie.get('inviteCode')) {
      this.inviteCode = Vue.cookie.get('inviteCode')
    }
    this.list()
  },
  methods: {
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/fetchMyTeamUsers'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.shopBanner = data.data.content
        } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
          Vue.cookie.delete('token')
          Vue.cookie.delete('userId')
          var url = 'https://h5.paihuo11.cn/phlShop/index.html#/my'
          var auth = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
          var incode = '&inviteCode=' + this.inviteCode
          location.href = auth + encodeURIComponent(url) + incode
        } else {
          this.$toast(data.message)
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    onLoad () {
      this.list()
      setTimeout(() => {
        this.loading = false
        // eslint-disable-next-line no-self-compare
        if (this.shopBanner.length >= this.shopBanner.length) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar .van-icon {
  color: #404040;
  font-size: 0.55rem;
}
.van-nav-bar {
  height: 1.17rem;
  line-height: 1.17rem;

}
.van-nav-bar__title {
  color: #404040;
}
.main {
  // margin-top: 1.2rem;
}
.list {
  padding: 0.3rem;
  .listUl-li {
    padding: 0.3rem 0.3rem;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    .useravr{
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .user{
      margin-left: .3rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      .user-left{
        .name{
          font-size: .32rem
        }
        .tel{
          font-size: .3rem;
          color: #999;
        }
      }
      .user-right{
        color: #999;
      }
    }
  }
}
.van-button--small{
  border-radius: 3px;
}
</style>

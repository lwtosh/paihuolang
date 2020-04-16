<template>
    <div class="next" >
        <div class="show" v-if="isActive" @click="hide">
           <div class="share">
            <img class="fenxiang" :src="require('@/assets/shareArr.png')" alt="">
            <p>点击浏览器中打开</p>
        </div>
        </div>
        <div class="img_div">
            <img :src="require('@/assets/logo.png')" alt="">
        </div>
        <a class="downBtn iosBtn"  :href="iosUrl" ref="menuItem">
            <img :src="require('@/assets/ios.png')" /><span>iphone版下载</span>
        </a>
        <a class="downBtn androidBtn"  :href="androidUrl"  @click="androidBtn" ref="menuItem1">
            <img :src="require('@/assets/android.png')" /><span>android版下载</span>
        </a>
        <p class="p">iphone下载完成后需添加信任，具体操作：设置-通用-设备管理-选择信任</p>
        <p class="p">android版需要在默认浏览器中打开下载</p>
    </div>
</template>
<script>
// import sdk from './sdk'
export default {
  data () {
    return {
      androidUrl: null,
      iosUrl: null,
      isActive: ''
    }
  },
  created () {
    this.$http({
      url: this.$http.adornUrl('/h5/login/getDownloadUrl'),
      method: 'get'
    }).then(({data}) => {
      if (data.code === 'ok') {
        this.androidUrl = data.data.androidUrl
        this.iosUrl = data.data.iosUrl
      }
    })
    // var url = location.href
    // var obj = {
    //   title: '拍货郎', // 分享标题
    //   desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
    //   linkurl: 'http://h5.paihuo11.cn/phlShop/index.html', // 分享链接
    //   img: 'https://h5.paihuo11.cn/phlShop/logo.png'// 分享内容显示的图片
    // }
    // sdk.getJSSDK(url, obj)
    this.androidBtn()
    this.iosBtn()
  },
  mounted () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('micromessenger')) {
      this.isActive = true
    } else {
      this.isActive = false
    }
  },
  methods: {
    hide () {
      this.isActive = false
    },
    iosBtn () {
      // window.location.href = 'patpathappy://'
    },
    androidBtn () {
      // window.location.href = 'patpathappy://'
    }
  }
}
</script>
<style scoped>
  @import 'd.css'
</style>

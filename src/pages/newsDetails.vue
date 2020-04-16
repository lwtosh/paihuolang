<template>
  <div class="page">
    <div class="input_video" v-if="newInfo.video">
    <video-player  class="video-player vjs-custom-skin"
                   ref="videoPlayer"
                   :playsinline="true"
                   :options="playerOptions"
    ></video-player>
    </div>
    <div  v-if="newInfo.video">
      <h2 class="h2 " style=" text-align: left;">{{newInfo.title}}</h2>
      <p class="index"  style=" text-align: left;">{{newInfo.publishTime }}</p>
    </div>
    <div v-else>
      <h2 class="h2">{{newInfo.title}}</h2>
      <p class="index">{{newInfo.keyWord}} | {{newInfo.publishTime }}</p>
    </div>

      <div class="cont" v-html="newInfo.content">
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import sdk from './sdk'
export default {
  data () {
    return {
      playerOptions: '',
      newInfo: ''
    }
  },
  created () {
    this.handlenewInfo()
    var url = location.href
    // eslint-disable-next-line no-unused-var
    var obj = {
      title: this.newInfo.title, // 分享标题
      desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
      linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/newsDetails?id=' + this.$route.query.id + encodeURIComponent(location.href) + '&inviteCode=' + Vue.cookie.get('inviteCode'), // 分享链接
      img: 'https://h5.paihuo11.cn/phlShop/logo.png'// 分享内容显示的图片
    }
    sdk.getJSSDK(url, obj)
  },
  updated () { // 生命周期函数
    document.getElementsByClassName('p').find('p').css('font-size', '.8rem', 'text-indent', '2em')
    document.getElementsByClassName('p').find('span').css('font-size', '.8rem')
    document.getElementsByClassName('body').css('margin', '0', 'height', '100%')
    document.getElementsByClassName('img').css('width', '100%', 'height', '100%')
  },
  methods: {
    handlenewInfo () {
      this.$http({
        url: this.$http.adornUrl('/h5/information/getNews'),
        method: 'get',
        params: {id: this.$route.query.id}
      }).then(({data}) => {
        this.newInfo = data.data
        this.newInfo.publishTime = this.timeStamp2String(data.data.publishTime)
        this.playerOptions = {
          playbackRates: [ 0.5, 1.0, 1.5, 2.0 ], // 可选择的播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [ {
            type: 'video/mp4',
            src: this.newInfo.video// url地址
          } ],
          poster: '', // 你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 全屏按钮
          }
        }
      })
    },
    // 时间戳转换日期
    timeStamp2String (time) {
      var datetime = new Date()
      datetime.setTime(time)
      var year = datetime.getFullYear()
      var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      return year + '-' + month + '-' + date
    }
  }
}
</script>

<style lang="less" scoped>
.page{
  width: 100%;
  height: 100vh;
  background: #fff;
}
.h2{
  padding-top: .4rem;
  text-align: center;
  font-size: .42rem;
  line-height: 2;
  font-weight: 400;
}
.index{
  text-align: center;
  color: #B3B3B3;
  font-size: .29rem;
}
.cont{
  padding: .3rem .4rem;
  font-size: .32rem;
  line-height: 1.5;
  // text-indent: 2em;
}

.input_video{
        width: 100%;
        margin: 0 auto;
    }
    video{
      width: 100%;
    }
.vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level {
    background-color: #EF0F0F;
}
</style>
  <style scope>
p>>>img{
  width: 100%;
  height: 100%;
}
</style>

import wx from 'weixin-js-sdk'
import axios from 'axios'
const jsApiList = ['onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']

function getJSSDK (url, dataForWeixin) {
  axios.post('//api.paihuo11.cn/h5/personal/shareWechat?url=' + encodeURIComponent(url)).then(data => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxebee31498d1213df', // 必填，公众号的唯一标识
      timestamp: data.data.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.data.data.nonceStr, // 必填，生成签名的随机串
      signature: data.data.data.signature, // 必填，签名
      jsApiList: jsApiList // 必填，需要使用的JS接口列表
    })
    wx.ready(function () {
      wx.onMenuShareAppMessage({
        title: dataForWeixin.title || '拍货郎',
        desc: dataForWeixin.desc || '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        link: dataForWeixin.linkurl || 'http://h5.paihuo11.cn/phlShop/index.html',
        imgUrl: dataForWeixin.img || 'https://h5.paihuo11.cn/phlShop/logo.png',
        trigger: function trigger (res) { },
        success: function success (res) {
          // alert('已分享')
        },
        cancel: function cancel (res) {
          // console.log('已取消')
        },
        fail: function fail (res) {
          // alert(JSON.stringify(res))
        }
      })
      // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareTimeline({
        title: dataForWeixin.title || '拍货郎',
        desc: dataForWeixin.desc || '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
        link: dataForWeixin.linkurl || 'http://h5.paihuo11.cn/phlShop/index.html',
        imgUrl: dataForWeixin.img || 'https://h5.paihuo11.cn/phlShop/logo.png',
        trigger: function trigger (res) {
          // alert('用户点击分享到朋友圈');
        },
        success: function success (res) {
          // alert('已分享')
        },
        cancel: function cancel (res) {
          // alert('已取消');
        },
        fail: function fail (res) {
          // alert(JSON.stringify(res))
        }
      })
      // 2.3 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      // wx.updateTimelineShareData({
      //   title: dataForWeixin.title || '拍货郎',
      //   desc: dataForWeixin.desc || '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
      //   link: dataForWeixin.linkurl || 'http://h5.paihuo11.cn/phlShop/index.html',
      //   imgUrl: dataForWeixin.img || 'https://h5.paihuo11.cn/phlShop/logo.png',
      //   trigger: function trigger (res) {
      //     // alert('用户点击分享到朋友圈');
      //   },
      //   success: function success (res) {
      //     // alert('已分享')
      //   },
      //   cancel: function cancel (res) {
      //     // alert('已取消');
      //   },
      //   fail: function fail (res) {
      //     // alert(JSON.stringify(res))
      //   }
      // })
      // 2.4 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
      // wx.updateAppMessageShareData({
      //   title: dataForWeixin.title || '拍货郎',
      //   desc: dataForWeixin.desc || '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
      //   link: dataForWeixin.linkurl || 'http://h5.paihuo11.cn/phlShop/index.html',
      //   imgUrl: dataForWeixin.img || 'https://h5.paihuo11.cn/phlShop/logo.png',
      //   trigger: function trigger (res) {
      //     // alert('用户点击分享到朋友圈');
      //   },
      //   success: function success (res) {
      //     // alert('已分享')
      //   },
      //   cancel: function cancel (res) {
      //     // alert('已取消');
      //   },
      //   fail: function fail (res) {
      //     // alert(JSON.stringify(res))
      //   }
      // })
    })
    wx.error(function (res) {
      // alert('微信验证失败')
    })
  })
}

export default {
  // 获取JSSDK
  getJSSDK: getJSSDK
}

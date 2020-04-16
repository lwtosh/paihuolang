<template>
   <div class="app">
    <div class="teet" >{{msg}}</div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      param: {},
      msg: ' '
    }
  },
  created () {
    this.param = this.$route.query
    this.$cookie.set('id', this.param.id)
    this.$cookie.set('fromUrl', this.param.fromUrl)
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('micromessenger')) {
      this.$cookie.set('platform', 'WXWEB')
    } else {
      this.$cookie.set('platform', 'WEB')
    }
    this.$http({
      url: this.$http.adornUrl('/h5/login/fetchLoginRespBySessionKey'),
      method: 'get',
      params: {
        sessionKey: this.param.sessionKey
      }
    }).then(({data}) => {
      if (data.code === 'ok') {
        this.msg = data.message

        if (data.data.isBindMobile === true) {
          this.$cookie.set('token', data.data.token)
          this.$cookie.set('userId', data.data.userId)
          location.href = decodeURIComponent(this.param.fromUrl)
        }
        if (data.data.isNew === true) {
          this.$cookie.set('wxLoginId ', data.data.wxLoginId)
          location.href = '//h5.paihuo11.cn/phlShop/index.html#/register?inviteCode=' + this.param.inviteCode
        }
      } else if (data.code === 'U46') {
        history.go(-1)
      } else {
        this.msg = data.message
      }
    })
  }

}
</script>
<style scoped>
.app{
  margin: 80px auto;
}
.teet{
   font-size: 22px;
   font-size: #404040;
   text-align: center;
}
</style>

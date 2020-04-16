<template>
    <div class="app">
      <!-- <van-nav-bar title="登录" left-text="" left-arrow fixed @click-left="onClickLeft" /> -->
      <div class="img_div" style="height:rem;padding: .6rem 0 .6rem .6rem;border-radius:0px">
           <p class="bind">绑定手机号</p>
           <p class="text">为了你的账户安全，社交账户必须绑定手机号</p>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <div class="box">
             <el-form-item prop="mobile" class="p2" style="margin:auto;margin-bottom:16px;width:90%;"><img class="mt4" :src="require('@/assets/phone.png')">
                <el-input
                    class="pl40"
                    placeholder="请输入手机号码"
                    :maxlength="11"
                    v-model="ruleForm.mobile">
                </el-input>
            </el-form-item>
            <el-form-item prop="verifycode" style="margin:auto;margin-bottom:16px;width:90%;">
              <img class="mt4" :src="require('@/assets/login.png')">
                <el-input
                    class="pl40 verifycode"
                    placeholder="请输入验证码"
                    v-model="ruleForm.verifycode">
                <el-button class="bb" slot="suffix" @click="getVerifycode" type="danger">{{ verifyCodeNotes }}</el-button>
                </el-input>
            </el-form-item>

            <el-form-item prop="inviteCode" style="margin:auto;width:90%;" v-if='isCancel === true'>
                <img class="mt4" :src="require('@/assets/iconfonttuijianren.png')">
                <el-input
                    class="pl40"
                    placeholder="推荐码(必填)"
                    v-model="ruleForm.inviteCode">
                </el-input>
            </el-form-item>
            <el-form-item prop="inviteCode" style="margin:auto;width:90%;" v-if='isCancel === false'>
                <img class="mt4" :src="require('@/assets/iconfonttuijianren.png')">
                <el-input
                    class="pl40"
                    placeholder="推荐码(必填)"
                    v-model="ruleForm.inviteCode" readonly="readonly" >
                </el-input>{{this.$route.query.invitecod}}
            </el-form-item>
          </div>
            <el-form-item class="p10">
              <el-row>
                <el-button @click="submitForm" type="danger" class="registerBTN">登录</el-button>
              </el-row>
            </el-form-item>
            <el-form-item class="lt" style="margin:auto;width:80%;">
                <el-checkbox class="Iagree" v-model="checked"></el-checkbox><span class="gray">我已阅读并同意</span><span class="red" @click="dialogShow" >《用户协议和隐私政策》</span>
                <el-row class="text-center">
                    <router-link to="/download" class="login">APP下载链接</router-link>
               </el-row>
            </el-form-item>
        </el-form>
        <Dialog v-if="visible" ref="dialog" :dialogHidden='dialogHidden'></Dialog>
    </div>
</template>
<script>
import Vue from 'vue'
import Dialog from './dialog.vue'
import {
  validPhone,
  validVerifycode } from './validate.js'

export default {
  data () {
    return {
      visible: false,
      checked: true,
      isCancel: '',
      ruleForm: {
        mobile: null,
        inviteCode: '',
        wxLoginId: Vue.cookie.get('wxLoginId'),
        loginChannel: '',
        verifycode: null
      },
      rules: {
        mobile: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        verifycode: [
          { required: true, validator: validVerifycode, trigger: 'blur' }
        ]
      },
      phoneOK: false, // 当用户输入手机号才能点击获取验证码
      verifyCodeNotes: '获取验证码',
      flag: true
    }
  },
  components: {
    Dialog
  },
  watch: {
    'ruleForm.mobile': {
      handler (newValue, oldValue) {
        const reg = /^(13[0-9]|14[4579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (reg.test(newValue)) {
          this.phoneOK = true
          this.$http({
            url: this.$http.adornUrl('/h5/login/fetchMobileIsBind'),
            method: 'get',
            params: {mobile: newValue}
          }).then(({data}) => {
            if (data && data.code === 'ok') {
              if (data.data.bindInviteCode === false) {
                this.isCancel = true
              }
            } else {
              this.isCancel = ''
              this.$toast(data.message)
            }
          })
        } else {
          this.phoneOK = false
        }
      },
      deep: true
    }
  },
  created () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('micromessenger')) {
      this.$cookie.set('platform', 'WXWEB')
      this.loginChannel = 'WXWEB'
    } else {
      this.$cookie.set('platform', 'WEB')
      this.loginChannel = 'WEB'
      this.$cookie.set('fromUrl', this.$route.query.fromUrl)
    }
    if (this.$route.query.inviteCode !== '' || this.$route.query.inviteCode !== undefined || this.$route.query.inviteCode !== null) {
      this.ruleForm.inviteCode = this.$route.query.inviteCode
    }
  },
  methods: {
    dialogHidden () {
      this.visible = false
    },
    dialogShow () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dialog.init()
      })
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.checked) {
          this.$http({
            url: this.$http.adornUrl('/h5/login/loginByMobile'),
            method: 'post',
            params: this.ruleForm
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.$cookie.set('token', data.data.token)
              this.$cookie.set('userId', data.data.userId)
              // 在这里跳转到下个页面
              location.href = decodeURIComponent(Vue.cookie.get('fromUrl'))
            } else if (data.code === 'U33') {
              var url = 'https://h5.paihuo11.cn/phlShop/index.html'
              location.href = '//api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(url)
            } else {
              this.$toast(data.message)
            }
          })
        }
      })
    },
    getVerifycode () {
      if (this.phoneOK && this.flag) {
        this.flag = false
        this.$http({
          url: this.$http.adornUrl('/h5/login/sendVerifyCode'),
          method: 'post',
          params: {
            mobile: this.ruleForm.mobile
          }
        }).then(({data}) => {
          if (data.code === 'ok') {
            let num = 60
            this.verifyCodeNotes = num + '秒后重新获取验证码'
            let timer = setInterval(() => {
              num--
              this.verifyCodeNotes = num + '秒后重新获取验证码'
              if (num <= 0) {
                clearInterval(timer)
                this.verifyCodeNotes = '重新获取验证码'
                this.flag = true
              }
            }, 1000)
          } else {
            this.$toast(data.message)
            this.verifyCodeNotes = '重新获取验证码'
            this.flag = true
          }
        }).catch(() => {
          this.$message.error('错误')
          this.verifyCodeNotes = '重新获取验证码'
          this.flag = true
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
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

<style scoped>
  @import './style.css'
</style>

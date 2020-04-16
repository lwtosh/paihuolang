<template>
    <div class="app">
      <van-dialog v-model="show" transition closeOnClickOverlay title="登录" confirm-button-text=' ' confirm-button-color='#EF0F0F' @close='hh'>
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

            <el-form-item prop="inviteCode" style="margin:auto;width:90%;">
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
        </el-form>
        </van-dialog>
    </div>
</template>
<script>
// import Vue from 'vue'

import {
  validPhone,
  validVerifycode } from './validate.js'
import Vue from 'vue'
export default {
  inject: ['reload'],
  data () {
    return {
      checked: true,
      show: true,
      ruleForm: {
        mobile: null,
        inviteCode: Vue.cookie.get('inviteCode') ? Vue.cookie.get('inviteCode') : 'system',
        wxLoginId: Vue.cookie.get('wxLoginId'),
        loginChannel: Vue.cookie.get('platform'),
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
  watch: {
    'ruleForm.mobile': {
      handler (newValue, oldValue) {
        const reg = /^(13[0-9]|14[4579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (reg.test(newValue)) {
          this.phoneOK = true
        } else {
          this.phoneOK = false
        }
      },
      deep: true
    },
    'show': {
      handler (newValue, oldValue) {
        if (newValue === false) {
          location.reload()
        }
      },
      deep: true
    }
  },
  created () {
    // console.log(this.$router)
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('micromessenger')) {
      this.$cookie.set('platform ', 'WXWEB')
    } else {
      this.$cookie.set('platform ', 'WEB')
    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid && this.checked) {
          this.$http({
            url: this.$http.adornUrl('/h5/login/loginByMobile'),
            method: 'post',
            params: this.ruleForm
          }).then(({data}) => {
            if (data.message === '该手机号已经被绑定') {
              this.$cookie.set('token ', data.data.token)
              this.$cookie.set('userId ', data.data.userId)
              this.$message({
                message: '该手机号已经被绑定',
                type: 'warning',
                duration: 1500,
                onClose: () => {
                  // 在这里跳转到下个页面
                  this.$router.go(-1)
                }

              })
            } else if (data && data.code === 'ok') {
              this.$cookie.set('token ', data.data.token)
              this.$cookie.set('userId ', data.data.userId)
              this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1500,
                offsetTop: 300,
                onClose: () => {
                  // 在这里跳转到下个页面
                  this.$router.go(-1)
                }
              })
            } else if (data.message === '微信授权已超时，请重新授权登录~') {
              this.$message({
                message: '微信授权已超时，请重新授权登录~',
                type: 'success',
                duration: 1500,
                offsetTop: 300,
                onClose: () => {
                  window.location.href = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + location.href
                }
              })
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    hh () {
      // console.log(this.show)
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
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500
          })
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
            this.$message.error('服务器错误')
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

<style scoped>
  @import './style.css'
</style>

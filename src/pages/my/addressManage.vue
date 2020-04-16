<template>
  <div>
    <!-- <van-nav-bar title="管理收货地址" left-text="" left-arrow fixed @click-left="onClickLeft" >
    </van-nav-bar> -->
    <div class="list">
      <van-radio-group v-model="radio"  @change="isDetails(radio)">
      <ul v-for="item in addInfo" :key="item.id">
        <li>
          <div class="user">{{item.consignee}}  {{item.phone}}</div>
          <div class="address"><span v-if="item.isDefault == 1">默认</span>{{item.province}}{{item.county}}{{item.city}}{{item.address}}</div>
          <div class="moren">
             <van-radio checked-color="#EF0F0F" :name='item.id' checked ="true">设为默认地址</van-radio>
             <div class="right">
               <span class="btn" @click="edit(item)">编辑</span>
               <span class="btn" @click="del(item.id)">删除</span>
             </div>
          </div>
        </li>
      </ul>
      </van-radio-group>
      <div class="new" @click="add">新增收获地址</div>
    </div>
    <van-popup @close='close' v-model="show" closeable position="bottom" :style="{ height: '100%' ,background:'#f5f5f5'}">
      <addOrEdit v-if="show" @hidden='show=false' :mode='mode' :dataInfo='dataInfo'></addOrEdit>
    </van-popup>
  </div>
</template>
<script>
import addOrEdit from './addOrEdit'
export default {
  data () {
    return {
      radio: '',
      show: false,
      dataInfo: {},
      addInfo: [],
      mode: 'insert'
    }
  },
  watch: {
    radio (newval) {
    }
  },
  created () {
    this.list()
  },
  components: {
    addOrEdit
  },
  methods: {
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/fetchUserAddressList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.addInfo = data.data
          const defaultData = data.data.find(item => item.isDefault === 1)
          this.radio = defaultData.id
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.push('/addressManage')
    },
    isDetails (id) {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/updateUserAddressDefault'),
        method: 'post',
        params: {id: id, isDefault: 1}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.list()
        } else {
          this.$toast(data.message)
        }
      })
    },
    // 新增
    add () {
      this.mode = 'insert'
      this.show = true
    },
    // 编辑
    edit (item) {
      this.mode = 'edit'
      this.dataInfo = item
      this.show = true
    },
    close () {
      this.dataInfo = {}
      this.list()
      // location.reload()
    },
    del (id) {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要删除该地址吗？'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/h5/personal/delUserAddress'),
          method: 'post',
          params: {id: id}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.list()
          } else {
            this.$toast(data.message)
          }
        })
      }).catch(() => {
        // on cancel
      })
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
.list{
 padding: .35rem;
//  margin-top: 1.1rem;
 li{
   padding: .25rem .2rem;
   background: #fff;
   border-radius: 10px;
   margin-bottom: 10px;
   .user{
     font-size: .37rem;
     margin-bottom: .2rem;
   }
   .address{
     font-size: .32rem;
     color: #999;
     padding-bottom: 10px;
     border-bottom:1px solid #f5f5f5;
       span{
           display: inline-block;
           width: 1rem;
           line-height: 1.4;
           text-align: center;
           color: #fff;
           font-size: .28rem;
           background: #EF0F0F;
           border-radius: 12px;
           margin-right: 5px;
         }
   }
   .moren{
     display: flex;
     justify-content: space-between;
     margin-top: .25rem;
     .right{
       .btn{
         display: inline-block;
         width: 1.47rem;
         line-height: .6rem;
         font-size: .32rem;
         color: #737373;
         border-radius: 5px;
         border:1px solid #999;
         text-align: center;
         margin-left: 10px;
       }
     }
   }
 }
 .new{
   height: 1.12rem;
   line-height: 1.12rem;
   width:92%;
   text-align: center;
   color: #fff;
   background: #EF0F0F;
   border-radius: 10px;
   font-size: .37rem;
   position: fixed;
   bottom: 1rem;
   box-shadow: 1px 5px 5px #ef0f0f82;
 }
}
</style>

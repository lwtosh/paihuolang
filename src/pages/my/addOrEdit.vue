<template>
  <div>
     <van-cell-group>
         <van-field v-model="addInfo.consignee"  label="收货人"  placeholder="请输入收货人姓名"/>
         <van-field v-model="addInfo.phone"  label="手机号" type='tel' maxlength='11' placeholder="请输入收货人联系电话"/>
         <div @click="ares" class="ares">
           <p class="label">所在的</p>
           <p class="orgen">{{addInfo.orgen || '请选择省市区'}}</p>
           </div>
         <van-field v-model="addInfo.address"  label="详细地址" placeholder="如道路、门牌号、小区 楼栋号 单元室等"/>
         <van-field v-model="addInfo.postcode"  label="邮    编" type='tel'  maxlength='6' placeholder="请输入邮政编码"/>
      </van-cell-group>
      <div class="new1" @click="onSave">保存并使用</div>
      <van-popup v-model="show1" position="bottom" :style="{ height: '35%' }">
       <van-area
        :area-list="areaList"
        :columns-num="3"
        @confirm="onAddrConfirm"
        @cancel="onAddrCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import AreaList from './area'
export default {
  props: ['dataInfo', 'mode'],
  data () {
    return {
      show1: false,
      areaList: AreaList,
      addInfo: {
        orgen: '请选择省市区',
        phone: '',
        isDefault: '',
        address: '',
        province: '',
        city: '',
        county: '',
        consignee: '',
        postcode: ''
      }
    }
  },
  created () {
    this.addInfo = this.dataInfo
    if (this.mode === 'insert') {
      this.addInfo.orgen = ''
      this.addInfo.phone = ''
      this.addInfo.address = ''
      this.addInfo.consignee = ''
      this.addInfo.postcode = ''
    } else {
      this.addInfo.orgen = this.dataInfo.province + this.dataInfo.county + this.dataInfo.city
    }
  },
  methods: {
    onAddrConfirm (val) {
      this.show1 = false
      this.addInfo.orgen = val[0].name + ' ' + val[1].name + ' ' + val[2].name
      this.addInfo.county = val[1].name
      this.addInfo.province = val[0].name
      this.addInfo.city = val[2].name
    },
    onAddrCancel () {
      this.show1 = false
    },
    ares () {
      this.show1 = true
    },
    onSave () {
      if (this.addInfo.consignee === '') {
        this.$toast('请输入名字')
      } else if (this.addInfo.phone.toString().length < 11) {
        this.$toast('请输入正确电话号码')
      } else if (this.addInfo.orgen === '') {
        this.$toast('请输入所在地')
      } else if (this.addInfo.address === '') {
        this.$toast('请输入详细地址')
      } else if (this.addInfo.postcode.toString().length < 6) {
        this.$toast('请输入邮政编码')
      } else {
        if (this.mode === 'insert') {
          this.$http({
            url: this.$http.adornUrl('/h5/personal/addUserAddress'),
            method: 'post',
            params: this.addInfo
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.$emit('hidden')
              // this.list()
            } else {
              this.$toast(data.message)
            }
          })
        } else {
          this.$http({
            url: this.$http.adornUrl('/h5/personal/updateUserAddress'),
            method: 'post',
            params: this.addInfo
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.$emit('hidden')
            } else {
              this.$toast(data.message)
            }
          })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.van-cell-group{
  margin-top: 1rem
}
.van-cell-group,.van-cell{
  background: #f5f5f5;
}
.new1{
   height: 1.12rem;
   line-height: 1.12rem;
   width:92%;
   margin: auto;
   text-align: center;
   color: #fff;
   background: #EF0F0F;
   border-radius: 10px;
   font-size: .37rem;
   margin-top: 1rem;
   box-shadow: 1px 5px 5px #ef0f0f82;
 }
 .ares{
   height: 1.3rem;
   line-height: 1.3rem;
   display: flex;
   border-bottom: 1px solid #f5f5f5;
   font-size: .34rem;
   .label{
     text-align: left;
     padding-left: .5rem;
     width: 30%;
   }
   .orgen{
     width: 91%;
   }
 }
</style>

<template>
  <div>
    <!-- <van-nav-bar title="我的收货地址" left-arrow fixed @click-left="onClickLeft">
    </van-nav-bar> -->
    <div class="setion">
      <ul>
        <van-radio-group v-model="radio" v-for="item in addInfo1" :key="item.id" @click.native="onClickSele(item)">
        <li>
            <van-radio :name="item.id" checked-color="#EF0F0F">
              <div class="text">
              <div class="user">{{item.consignee}}  {{item.phone}}</div>
              <div class="address"><span v-if="item.isDefault == 1">默认</span>{{item.province}}{{item.county}}{{item.city}}{{item.address}}</div>
            </div>
            </van-radio>
        </li>
        </van-radio-group>
      </ul>
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
      dataInfo: {},
      show: false,
      mode: 'insert',
      addInfo1: ''
    }
  },
  components: {
    addOrEdit
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/fetchUserAddressList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.addInfo1 = data.data
        } else {
          this.$toast(data.message)
        }
      })
    },
    onClickSele (item) {
      if (this.$route.query.mode === 'pay') {
        this.$router.replace({path: '/payment', query: {...this.$route.query, item1: item}})
      } else {
        this.$router.replace({path: '/convert', query: {...this.$route.query, item1: item}})
      }
    },
    // 新增
    add () {
      this.mode = 'insert'
      this.show = true
    },
    close () {
      this.dataInfo = {}
      this.list()
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
.van-nav-bar__text{
  color: #EF0F0F;
}
.van-radio__icon .van-icon{
  width: 1em;
  height: 1em;
}
.van-button--danger{
  box-shadow: 1px 5px 5px #ef0f0f82;
}

.add{
  margin-top:1rem;
}
.setion{
  padding:0 .4rem;
  // margin-top: 1rem;
   li{
     display: flex;
     justify-content: flex-start;
     padding: .35rem 0;
     border-bottom: 1px solid #E6E6E6;
     .text{
       .user{
         font-size: .37rem;
         line-height: 2;
       }
       .address{
         font-size: .32rem;
         color: #999;
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
     }

   }
   li:last-child{
      border-bottom: none;
   }
   .new{
   height: 1.12rem;
   line-height: 1.12rem;
   width:92%;
   margin: auto;
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

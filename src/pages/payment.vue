<template>
  <div>
  <!-- <van-nav-bar title="提货" left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar> -->
   <div class="cont">
     <div class="contact" @click="handleadd">
       <van-icon name="location"  class="icon-lo"/>
       <div class="contactVal" v-if="addresssInfo == undefined">
         <div style="color:#404040;margin-top: .2rem;">请添加收货地址</div>
       </div>
       <div class="contactVal" v-else>
         <div style="color:#404040;">{{addresssInfo.consignee}}   {{addresssInfo.phone}}</div>
         <div class="color:#999">{{addresssInfo.province}}{{addresssInfo.county}}{{addresssInfo.city}}{{addresssInfo.address}}</div>
       </div>
       <van-icon name="arrow" class="icon-lo arr"/>
     </div>
     <div class="card">
       <img :src="dataInfo.goodsCoverImg" alt="" class="cardImg">
       <!-- <img v-else :src="dataInfo.goods.goodsCoverImg" alt="" class="cardImg"> -->
       <div class="card-index">
          <div class="title">{{dataInfo.goodsName}}</div>
          <!-- <div class="title" v-else>{{dataInfo.goods.goodsName}}</div> -->
          <div v-if="dataInfo.orderType == 3">
           <div class="price" >
            <span class="yen">￥</span>{{dataInfo.orderPrice}}+{{dataInfo.orderEquity}}<span class="tet">金币</span>
           </div>
          </div>
          <div class="price" v-if="dataInfo.orderType == 1"><span class="tet">已消耗拍豆：</span>{{dataInfo.orderLePoint }}</div>
          <div class="price" v-if="dataInfo.orderType ==4"><span class="yen">￥</span>{{dataInfo.orderPrice}}</div>
          <div class="price" v-if="dataInfo.salePrice"><span class="yen">￥</span>{{dataInfo.salePrice}}</div>
          <div v-if="dataInfo.orderType == 0">
            <div class="price1" style="color: #999">起拍价：￥{{dataInfo.totalPrice}}</div>
            <div class="price1">成交价：￥{{dataInfo.totalPrice}}</div>
          </div >
          <div class="price1" style="line-height:2.5" v-if="dataInfo.orderType == 2">
            第{{dataInfo.treasurePeriodId}}期中奖奖品</div>
          <div class="x">X1</div>
       </div>
     </div>
     <!-- <div class="total" v-if="dataInfo.orderType == 3">共1件商品,已消耗{{dataInfo.orderEquity}}金币</div> -->
     <div class="total" v-if="dataInfo.orderType == 1">共1件商品,已消耗拍豆 {{dataInfo.orderLePoint}}</div>
     <div class="total" v-if="dataInfo.orderType == 0">共1件商品,已付款￥{{dataInfo.totalPrice}}</div>
     <div class="total" v-if="dataInfo.orderType ==2">共1件商品,已支付款￥0.00</div>
    </div>
     <div class="btnPay" @click="confirm">确认提货
     </div>
     <van-dialog v-model="show" title="温馨提示" show-cancel-button @confirm="onClickConfirm">
     <p style="text-align:center;padding:.2rem 0;">确定要提货吗？</p>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      show: false,
      addresssInfo: '',
      curUrl: '',
      dataInfo: {
        orderType: '',
        goodsCoverImg: '',
        goodsName: '',
        treasurePeriodId: '',
        totalPrice: '',
        orderLePoint: '',
        salePrice: '',
        orderPrice: '',
        orderEquity: '',
        orderId: '',
        id: ''
      }
    }
  },
  mounted () {
    this.curUrl = this.$route.query.curUrl
    this.dataInfo.orderType = this.$route.query.orderType
    this.dataInfo.id = this.$route.query.id
    this.dataInfo.goodsCoverImg = this.$route.query.goodsCoverImg
    this.dataInfo.goodsName = this.$route.query.goodsName
    this.dataInfo.treasurePeriodId = this.$route.query.treasurePeriodId
    this.dataInfo.totalPrice = this.$route.query.totalPrice
    this.dataInfo.salePrice = this.$route.query.salePrice
    this.dataInfo.orderPrice = this.$route.query.orderPrice
    this.dataInfo.orderEquity = this.$route.query.orderEquity
    this.dataInfo.orderLePoint = this.$route.query.orderLePoint
    this.dataInfo.orderId = this.$route.query.orderId
  },
  created () {
    this.addresssInfo = this.$route.query.item1
    this.list()
  },
  methods: {
    list () {
      if (this.addresssInfo === '' || this.addresssInfo === null || this.addresssInfo === undefined) {
        this.$http({
          url: this.$http.adornUrl('/h5/personal/fetchUserDefaultAddress'),
          method: 'get'
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.addresssInfo = data.data
          } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
            var url = this.curUrl
            Vue.cookie.delete('token')
            Vue.cookie.delete('userId')
            var auth = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
            var incode = '&inviteCode=' + Vue.cookie.get('inviteCode')
            location.href = auth + encodeURIComponent(url) + incode
          } else {
          }
        })
      }
    },
    onClickLeft () {
      location.href = this.curUrl
      this.$route.go(-1)
    },
    confirm () {
      this.show = true
    },
    onClickConfirm () {
      this.$http({
        url: this.$http.adornUrl('/h5/order/pickOrder'),
        method: 'post',
        params: {orderId: this.dataInfo.orderId ? this.dataInfo.orderId : this.dataInfo.id, addressId: this.addresssInfo.addressId ? this.addresssInfo.addressId : this.addresssInfo.id, payMethod: 'BALANCE', status: 2}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.$toast('提货成功')
          this.$router.go(-1)
        } else if (data.code === 'M07') {
          this.$toast({
            content: '该订单不能提货'
          })
        } else {
          this.$toast(data.message)
        }
      })
    },
    handleadd () {
      this.$router.push({path: '/address', query: {...this.$route.query, mode: 'pay'}})
    },
    agree () {}
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
  background: #f5f5f5;
}
.van-nav-bar__title{
   color: #404040;
}
.van-cell__title{
  margin-left: .6rem;
  position: relative;
}
.iconPay{
  position: absolute;
  left: 0;
  width: .6rem;
  height: .6rem;
  z-index: 999;
}
.cont{
  width: 90%;
  margin: auto;
  background: #fff;
  // margin-top: 1.5rem;
  border-radius: 10px;
  padding: 0 10px;
}
.contact{
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: .45rem;
    overflow: hidden;
    color: #404040;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    .contactVal{
    position: relative;
    overflow: hidden;
    color: #969799;
    flex: 1;
    font-size: .34rem;
    vertical-align: middle;
   }
   .icon-lo{
    min-width: 1em;
    height: 24px;
    font-size: .6rem;
    line-height: 24px;
    margin-right: 5px;
    color: #EF0F0F;
    margin-top: 10px;
    }
   .arr{
     color: #999999;
     font-size: 16px;
   }
}
.contact::before{
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: .1rem;
  width: 100%;
  margin: auto;
  background: repeating-linear-gradient(-45deg,#EF0F0F 0,#EF0F0F 20%,transparent 0,transparent 25%,#EF0F0F 0,#EF0F0F 45%,transparent 0,transparent 50%);
  background: -webkit-repeating-linear-gradient(-45deg,#EF0F0F 0,#EF0F0F 20%,transparent 0,transparent 25%,#EF0F0F 0,#EF0F0F 45%,transparent 0,transparent 50%);
  background-size: 2.1rem;
}

.card{
  padding: .3rem 0;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .cardImg{
    width: 2.4rem;
    height: 2.4rem;
    margin-right: .15rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .card-index{
    width: 75%;
    position: relative;
    .title{
      font-size: .38rem;
         color: #404040;
         margin-top: 10px;
         font-weight: 400;
         line-height: 1.5;
          overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
    }
    .price{
        color: #EF0F0F;
        font-size: .48rem;
        font-weight: 400;
        // margin-top: 0rem;
        .yen{
          font-weight: 400;
          display: inline-block;
          font-size: .2rem;
        }
         .x{
      position: absolute;
      right: .2rem;
      top:.8rem;
      color: #EF0F0F;
      font-size: .2rem;
    }
    }
    .price1{
      line-height: 1.5;
      font-size: .32rem;
       color: #EF0F0F;
    }
    .x{
      position: absolute;
      right: .2rem;
      top:.8rem;
      color: #EF0F0F;
      font-size: .2rem;
    }
  }
}
.total{
  color: #404040;
  font-size: .32rem;
  text-align: right;
  height: 1.12rem;
  line-height: 1.12rem
}
.total2{
  text-align: right;
}
.tet{
  color: #404040;
  font-size: .3rem
}
.shi{
  color: #999;
  line-height: 2
}
.btnPay{
  position: fixed;
   bottom: 1rem;
   left: 50%;
   margin-left: -45%;
   width: 90%;
   border-radius: 5px;
  height: 1.2rem;
  line-height: 1.2rem;
  color: #fff;
  text-align: center;
  font-size: .4rem;
  background: #EF0F0F;
  box-shadow: 1px 5px 5px #ef0f0f82;

}

</style>

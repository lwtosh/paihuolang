<template>
  <div>
    <!-- <van-nav-bar
      title="寄卖"
      left-text=""
      left-arrow
      fixed
      @click-left="onClickLeft"
    >
    </van-nav-bar> -->
     <div class="cell" v-if="this.dataList.goods">
       <div class="item">
         <div class="desc">商品名称</div>
         <div class="name">{{dataList.goods.goodsName}}</div>
       </div>
       <div class="item">
         <div class="desc">市场价</div>
         <div class="name">￥{{dataList.goods.marketPrice}}</div>
       </div>
       <div class="item">
         <div class="desc">寄卖价</div>
         <div class="name"><input type="text" class="input" v-model="val"></div>
       </div>
       <div class="new" @click="add">确认寄卖</div>
     </div>
     <div class="cell" v-else>
       <div class="item">
         <div class="desc">商品名称</div>
         <div class="name">{{dataList.goodsVo.goodsName}}</div>
       </div>
       <div class="item">
         <div class="desc">市场价</div>
         <div class="name">￥{{dataList.goodsVo.marketPrice}}</div>
       </div>
       <div class="item">
         <div class="desc">寄卖价</div>
         <div class="name"><input type="text" class="input" v-model="val"></div>
       </div>
       <div class="new" @click="add">确认寄卖</div>
     </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      val: '',
      dataList: ''
    }
  },
  created () {
    this.dataList = this.$route.query.item
    this.val = this.$route.query.item.salePrice
  },
  methods: {
    add () {
      if (this.val === '') {
        this.$toast('请填写寄卖价')
      }
      if (this.dataList.salePrice == null) {
        this.$http({
          url: this.$http.adornUrl('/h5/mall/entrustSaleGoods'),
          method: 'post',
          params: {orderId: this.dataList.id, salePrice: this.val}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.$toast('成功')
            this.$router.replace('/mySale')
          } else {
            this.$toast(data.message)
          }
        })
      } else {
        this.$http({
          url: this.$http.adornUrl('/h5/mall/editEntrustSale'),
          method: 'post',
          params: {id: this.dataList.id, salePrice: this.val}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.$toast('修改成功')
            this.$router.replace('/mySale')
          } else {
            this.$toast(data.message)
          }
        })
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.van-nav-bar .van-icon {
  color: #404040;
  font-size: 0.55rem;
}
.van-nav-bar {
  height: 1.17rem;
  line-height: 1.17rem;

}
.van-nav-bar__title {
  color: #404040;
}
.cell{
  // margin-top: 1.2rem;
  padding: .4rem;
  font-size: .34rem;
  .item{
    display: flex;
    height: 1rem;
    line-height: 1rem;
    .desc{
      width: 20%;
    }
    .name{
      width: 80%;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      .input{
        height: .6rem;
        background: transparent;
        outline: none;
        border:1px solid #BFBFBF;
        border-radius: 3px;
      }
    }
  }
}
.new{
   height: 1.12rem;
   line-height: 1.12rem;
   width:100%;
   text-align: center;
   color: #fff;
   margin-top: 1rem;
   background: #EF0F0F;
   border-radius: 10px;
   font-size: .37rem;
  //  position: fixed;
  //  bottom: 1rem;
  //  left: 4%;
   box-shadow: 1px 5px 5px #ef0f0f82;
 }
</style>

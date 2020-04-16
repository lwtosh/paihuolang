<template>
  <div>
    <!-- <van-nav-bar
      title="我的寄卖"
      left-text=""
      left-arrow
      fixed
      @click-left="onClickLeft"
    >
    </van-nav-bar> -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div class="main">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="暂无数据"
          @load="onLoad"
        >
          <div class="list">
            <ul
              class="listUl"
              v-for="(item) in shopBanner"
              :key="item.id"
            >
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                    订单号 {{item.orderNo}}</div>
                  <div class="order-text" v-if="item.status == -1">已下线</div>
                  <div class="order-text" v-if="item.status == 1">已上线</div>
                  <div class="order-text" v-if="item.status == 0">未上线</div>
                  <div class="order-text" v-if="item.status == 3">已寄卖</div>
                  <div class="order-text" v-if="item.status == 2">寄卖中</div>
                </div>
                <div class="cont">
                  <img
                    :src="item.goodsVo.goodsCoverImg"
                    alt=""
                    class="shopImg"
                  >
                  <div class="cont-index">
                    <h4 class="h4">{{item.goodsVo.goodsName}}</h4>
                    <div>
                      <div class="cash">
                        市场价: <span style="text-decoration:line-through">￥{{item.goodsVo.marketPrice}}</span>
                      </div>
                      <div class="price"><span class="yen">￥</span>{{item.salePrice}}</div>
                    </div>

                  </div>
                </div>
                <div class="foot">
                   <div class="time" v-if="item.status !== 3" >寄卖时间 {{item.publishTime}}</div>
                   <!-- <div class="time">下架时间 2019-09-10 20:15:34</div>-->
                   <div class="time" v-if="item.status == 3">卖出时间 {{item.payTime}}</div>
                   <!-- <div class="time">售出竞拍订单号:10201907171435000001554 <br> 托管时间 2019-09-10 20:15:34</div> -->
                  <div class="btn">
                    <van-button color="#EF0F0F" size="small" @click="handleEdit(item)" v-if="item.status == 0"  plain style="margin-left:.2rem">修改</van-button>
                    <van-button color="#EF0F0F" size="small" @click="handleGood(item)" v-if="item.status == 0"  style="margin-left:.2rem">提货</van-button>
                    <van-button color="#EF0F0F" size="small" @click="handleDel(item.id)" v-if="item.status == 1" style="margin-left:.2rem">下架</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
     </div>
    </van-pull-refresh>
  </div>

</template>
<script>
// import sdk from '../sdk'
import Vue from 'vue'
export default {
  data () {
    return {
      active: 2,
      loading: false,
      finished: false,
      show: false,
      isLoading: false,
      time: 30 * 60 * 60 * 1000,
      shopBanner: []
    }
  },
  mounted () {
    this.active = this.$route.query.active
  },
  created () {
    this.list()
  },
  methods: {
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/mall/fetchUserEntrustSaleList'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          for (let i = 0; i < data.data.content.length; i++) {
            data.data.content[i].publishTime = this.timeStamp2String(data.data.content[i].publishTime)
            data.data.content[i].payTime = this.timeStamp2String(data.data.content[i].payTime)
          }
          this.shopBanner = data.data.content
        } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
          Vue.cookie.delete('token')
          Vue.cookie.delete('userId')
          var url = 'https://h5.paihuo11.cn/phlShop/index.html#/my'
          var auth = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
          var incode = '&inviteCode=' + Vue.cookie.get('inviteCode')
          location.href = auth + encodeURIComponent(url) + incode
        } else {
          this.$toast(data.message)
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onRefresh () {
      this.list()
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    handleGood (item) {
      this.$router.replace({path: '/payment', query: {id: item.id, goodsName: item.goodsVo.goodsName, goodsCoverImg: item.goodsVo.goodsCoverImg, orderPrice: item.orderPrice, orderNo: item.orderNo, orderType: item.orderType, treasurePeriodId: item.treasurePeriodId, totalPrice: item.totalPrice, orderLePoint: item.orderLePoint, orderEquity: item.orderEquity, orderId: item.orderId, salePrice: item.salePrice}})
    },
    handleEdit (item) {
      this.$router.push({path: '/selaEdit', query: {item: item}})
    },
    handleDel (id) {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要下架该商品吗？'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/h5/mall/offline'),
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
    },
    // 时间戳转换日期
    timeStamp2String (time) {
      var datetime = new Date()
      datetime.setTime(time)
      var year = datetime.getFullYear()
      var month = datetime.getMonth() + 1 < 10 ? '0' + (datetime.getMonth() + 1) : datetime.getMonth() + 1
      var date = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
      var hour = datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
      var minute = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes()
      var second = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds()
      return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    },
    onLoad () {
      this.list()
      //   // 异步更新数据
      setTimeout(() => {
        // for (let i = 0; i < this.shopBanner.length; i++) {
        //   this.shopBanner.push(this.shopBanner.length + 1)
        // }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        // eslint-disable-next-line no-self-compare
        if (this.shopBanner.length >= this.shopBanner.length) {
          this.finished = true
        }
      }, 500)
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
.main {
  // margin-top: 1.2rem;
}
.order {
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.29rem;
  .number {
    color: #999;
  }
  .order-text {
    color: #ef0f0f;
    font-size: 0.32rem;
  }
}
.list {
  padding: 0.3rem;
  .listUl-li {
    padding: 0.3rem 0.3rem 0 0.3rem;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
    .cont {
      display: flex;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: .1rem;
      .shopImg {
        width: 2.4rem;
        height: 2.4rem;
        margin-right: 0.25rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cont-index {
        .h4 {
          font-size: 0.38rem;
          color: #404040;
          font-weight: 400;
          line-height: 1.3;
          margin: 0.1rem 0 0.25rem 0;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .cash {
          font-size: 0.3rem;
          color: #999;
        }
        .price {
          color: #ef0f0f;
          font-size: 0.48rem;
          font-weight: bold;
          margin-bottom: 10px;
          .yen {
            font-weight: 400;
            font-size: 0.25rem;
          }
          .fu {
            font-weight: 400;
            font-size: 0.3rem;
            color: #404040;
          }
        }
      }
    }
    .foot {
      height: 1.2rem;
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .time {
        font-size: 0.29rem;
        line-height: 1.2rem;
        color: #999;
      }
    }
  }
}
.van-button--small{
  border-radius: 3px;
}
</style>

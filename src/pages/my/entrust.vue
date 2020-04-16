<template>
  <div>
    <!-- <van-nav-bar
      title="我的托管"
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
      <van-tabs v-model="active" sticky swipeable background="#f5f5f5"  @change="onClick">
      <van-tab :title="item.name"  v-for="item in lists" :key='item.id' :name="item.id">
        <div class="err" v-if="shopBanner.length == 0">
          <img src="../../assets/err2.png" class="err" alt="" >
          <!-- <p>还没有数据哦~</p> -->
        </div>
          <div class="list" v-else>
            <ul
              class="listUl"
              v-for="(item,index) in shopBanner"
              :key="index"
            >
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                    订单号 {{item.orderNo}}</div>
                  <div class="order-text" v-if="item.turnStatus  == 1">托管中</div>
                  <!-- <div class="order-text" v-else-if="item.turnStatus  == 2">待托管</div> -->
                  <div class="order-text" v-else-if="item.turnStatus  == 4">已售出</div>
                   <div class="order-text" v-else>拍卖中</div>
                </div>
                <div class="cont">
                  <img
                    :src="item.goods.goodsCoverImg"
                    alt=""
                    class="shopImg"
                  >
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div>
                      <div class="cash" v-if='item.orderType == 0'>
                        起拍价: ￥{{item.startPrice}}
                      </div>
                      <div class="price"  v-if='item.turnStatus  == 4'><span class="fu1">市场价:</span><span class="yen">￥</span>{{item.goods.marketPrice  }}</div>
                      <div class="price"  v-if='item.orderType == 0'><span class="fu1">起拍价:</span><span class="yen">￥</span>{{item.startPrice }}</div>
                      <div class="price"  v-if='item.orderType == 0'><span >成交价：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.orderType == 1'><span class="fu">已消耗拍豆：</span>{{item.orderLePoint }}</div>
                      <div class="price"><span style="font-size: 0.3rem;">委托倒计时: {{item.turnCountdownDays}}天</span></div>
                    </div>

                  </div>
                </div>
                <div class="foot">
                   <div class="time" style="margin-top:.1rem;line-height:1.5" v-if="item.turnStatus  == 4">
                     <p>售出竞拍订单号：{{item.turnOrderNo}}</p>  <p>售出时间 ：{{item.turnSuccessTime}}</p>  </div>
                   <div class="time" v-else >托管时间 {{item.payTime}}</div>
                  <div class="btn">
                    <van-button color="#EF0F0F" size="small" v-if="item.turnStatus == 1" @click="handleGood(item)" style="margin-left:.2rem">提货</van-button>
                    <!-- <van-button color="#EF0F0F" size="small" v-if="item.turnStatus == 1"  @click="handleAccelerate(item.id)" style="margin-left:.2rem">加速</van-button> -->
                  </div>
                </div>
              </li>
            </ul>
          </div>
          </van-tab>
         </van-tabs>
        </van-list>
      </div>
    </van-pull-refresh>
    <!-- <van-popup v-model="show">
      <div class="up">加速排名</div>
      <div class="desc">
        加速提升你的转拍速度（排在第一位）， 本次加速将消耗你{{speedScore}}积分。
      </div>
      <div class="btns">
        <div class="cecal" @click="cecal">取消</div>
        <div class="com" @click="com">确认加速</div>
      </div>

    </van-popup> -->
  </div>
</template>
<script>
import Vue from 'vue'
// import sdk from '../sdk'
export default {
  data () {
    return {
      active: 0,
      loading: false,
      finished: false,
      isLoading: false,
      show: false,
      speedScore: '',
      id: '',
      type: '2',
      time: 30 * 60 * 60 * 1000,
      lists: [{id: '2', name: '托管中'}, {id: '3', name: '已售出'}],
      shopBanner: []
    }
  },
  created () {
    this.list(this.type)
  },
  methods: {
    list (type) {
      this.$http({
        url: this.$http.adornUrl('/h5/order/fetchUserTurnOrderList'),
        method: 'get',
        params: {type: type}
      }).then(({data}) => {
        if (data.code === 'ok') {
          for (let i = 0; i < data.data.content.length; i++) {
            data.data.content[i].operTime = this.timeStamp2String(data.data.content[i].operTime)
            data.data.content[i].payTime = this.timeStamp2String(data.data.content[i].payTime)
            data.data.content[i].turnSuccessTime = this.timeStamp2String(data.data.content[i].turnSuccessTime)
          }
          this.shopBanner = data.data.content
        } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
          Vue.cookie.delete('token')
          Vue.cookie.delete('userId')
          var url = 'https://h5.paihuo11.cn/phlShop/index.html#/my'
          var auth = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
          var incode = '&inviteCode=' + this.$route.query.inviteCode
          location.href = auth + encodeURIComponent(url) + incode
        } else {
          this.$toast(data.message)
        }
      })
      this.$http({
        url: this.$http.adornUrl('/h5/home/fetchSysConfig'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.speedScore = data.data.speedScore
        } else {
          this.$toast(data.message)
        }
      })
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    onClick (name, title) {
      this.type = name
      this.list(name)
    },
    onRefresh () {
      this.list(this.type)
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    handleGood (item) {
      this.$router.push({path: '/payment', query: {id: item.id, goodsName: item.goods.goodsName, goodsCoverImg: item.goods.goodsCoverImg, orderPrice: item.orderPrice, orderNo: item.orderNo, orderType: item.orderType, treasurePeriodId: item.treasurePeriodId, totalPrice: item.totalPrice, orderLePoint: item.orderLePoint, orderEquity: item.orderEquity, orderId: item.orderId, salePrice: item.salePrice, curUrl: location.href}})
    },
    handleAccelerate (id) {
      this.show = true
      this.id = id
    },
    cecal () {
      this.show = false
    },
    com () {
      this.$http({
        url: this.$http.adornUrl('/h5/personal/speedup'),
        method: 'post',
        params: {orderId: this.id}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.show = false
          this.$toast('恭喜你加速成功')
        } else {
          this.$toast(data.message)
        }
      })
      this.show = false
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
      this.list(this.type)
      //   // 异步更新数据
      setTimeout(() => {
        //     for (let i = 0; i < 10; i++) {
        //       this.list.push(this.list.length + 1);
        //     }
        //     // 加载状态结束
        this.loading = false
        //     // 数据全部加载完成
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
.van-toast{
  background-color:#fff;
  color: #EF0F0F;
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
.err{
    margin: 1rem auto 0;
    text-align: center;
    img{
      width: 60%;
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
          font-size: 0.4rem;
          font-weight: bold;
          // margin-bottom: 10px;
          .yen {
            font-weight: 400;
            font-size: 0.25rem;
          }
          .fu {
            font-weight: 400;
            font-size: 0.3rem;
            color: #404040;
          }
          .fu1{
            font-weight: 400;
            font-size: 0.3rem;
            color: #999;
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
.van-popup{
  border-radius: 5px;
}
.up{
  height: 1.1rem;
  line-height: 1.1rem;
  background:#EF0F0F;
  text-align: center;
  color: #fff;
  font-size: .37rem;
  font-weight: bold;
}
.desc{
  padding: 1.18rem 1rem;
  background: #fff;
  text-align: center;
  font-size: .34rem;
  width: 6.5rem;
  line-height: 1.5
}
.btns{
  display: flex;
  height: 0.9rem;
  line-height: .9rem;
  font-size: .34rem;
  text-align: center;
  .cecal{
    width: 50%;
    color: #808080;
    background: #F5F5F5;
  }
  .com{
    width: 50%;
    color: #F5F5F5;
    background: #EF0F0F;
  }
}
.van-button--small{
  border-radius: 3px;
}
</style>

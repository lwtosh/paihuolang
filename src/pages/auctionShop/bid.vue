<template>
  <div>
    <van-nav-bar title="出价详情" left-text="" left-arrow fixed @click-left="onClickLeft">
       <van-icon name="wap-home-o" slot="left"/>
    </van-nav-bar>
    <div class="main">
      <div class="hander">
        <div class="card" v-if='dataList.status == 9'>
          <div class="list">
            <img :src="dataList.goods.goodsCoverImg" alt="" class="proImg">
            <div class="proText">
              <div class="title">{{dataList.goods.goodsName}}</div>
              <div><span class="pro-index">起拍价：￥{{dataList.startPrice}}</span> <span class="pro-index">市场价：￥{{dataList.goods.marketPrice}}</span></div>
            </div>
          </div>
          <div class="no">
            <div class="nos">场次编号：{{dataList.id}}</div>
            <div class="statu" v-if='dataList.status == 9 && nextOperTimeFalg == false' style="margin-top: -.5rem">
              <img class="shijian" src="../../assets/shijian.png" alt="">
              <p>竞拍中</p>
              </div>
               <div class="statu" v-else>
              <div style="color:#fff;margin-top: -.3rem;"> <img class="shijian" src="../../assets/shijian.png" alt=""> 距结束</div>
            <van-count-down v-if='dataList.nextOperTime > 0' :time="dataList.nextOperTime * 1000" class="time" millisecond  format="HH:mm:ss"  @finish="finished" style="color:#fff">
                   <template v-slot="timeData">
                      <span class="item" style="background-color:#fff;color:#EF0F0F">{{timeData.hours >= '10' ? timeData.hours: '0'+timeData.hours}}</span>:
                      <span class="item" style="background-color:#fff;color:#EF0F0F">{{timeData.minutes >= '10' ? timeData.minutes: '0'+timeData.minutes}}</span>:
                      <span class="item" style="background-color:#fff;color:#EF0F0F">{{timeData.seconds >= '10' ? timeData.seconds: '0'+timeData.seconds}}</span>
                    </template>
                </van-count-down>
               </div>
          </div>
          <div class="row">
            <div class="c-1" style="text-align: left;">
              <span class="yen" >￥</span>
              <span class="qian">{{dataList.lastBidPrice?dataList.lastBidPrice : dataList.startPrice}} </span>
              <span class="cur">当前价</span>
            </div>
            <div class="c-1">
              <span class="cur">￥</span>
              <span class="qian1">{{dataList.nextBlockMoney? dataList.nextBlockMoney:dataList.depositRate}} </span>
              <span class="cur">保证金</span>
            </div>
            <div class="c-1">
              <span class="cur">￥</span>
              <span class="qian1">{{dataList.bidPlusPrice}} </span>
              <span class="cur">加价幅度</span>
            </div>
          </div>
        </div>
        <div class="card1" v-else>
          <div class="list">
            <img :src="dataList.goods.goodsCoverImg" alt="" class="proImg">
            <div class="proText">
              <div class="title">{{dataList.goods.goodsName}}</div>
              <div><span class="pro-index">起拍价：￥{{dataList.startPrice}}</span> <span class="pro-index">市场价：￥{{dataList.goods.marketPrice}}</span></div>
            </div>
          </div>
          <div class="no">
            <div class="nos" style="color:#333">场次编号：{{dataList.id}}</div>
            <div class="statu" v-if='dataList.status == 7' style="color:#F03131"><img class="shijian" src="../../assets/shijian.png" alt=""> 已结束</div>
            <div class="statu" v-else>
                <div style="color:#EF0F0F;margin-top: -.3rem;"> <img class="shijian" src="../../assets/shijian.png" alt=""> 距开始</div>
                <van-count-down :time="dataList.nextOperTime * 1000" class="time" millisecond  format="HH:mm:ss"   @finish="finished">
                   <template v-slot="timeData">
                      <span class="item" v:if='timeData.days > 0'>{{timeData.hours + timeData.days* 24}}</span>:
                      <span class="item" v:else>{{timeData.hours >= '10' ? timeData.hours:'0'+ timeData.hours}}</span>:
                      <span class="item">{{timeData.minutes >= '10' ? timeData.minutes: '0'+timeData.minutes}}</span>:
                      <span class="item">{{timeData.seconds >= '10' ? timeData.seconds: '0'+timeData.seconds}}</span>
                    </template>
                </van-count-down>
              </div>
          </div>
          <div class="row">
            <div class="c-1" style="text-align: left;">
              <span class="yen" style="color:#EF0F0F">￥</span>
              <span class="qian" style="color:#EF0F0F">{{dataList.lastBidPrice?dataList.lastBidPrice : dataList.startPrice}} </span>
              <span class="cur" style="color:#333">当前价</span>
            </div>
            <div class="c-1">
              <span class="cur" style="color:#333">￥</span>
              <span class="qian1" style="color:#333">{{nextBlockMoney ? nextBlockMoney : dataList.nextBlockMoney}} </span>
              <span class="cur" style="color:#333">保证金</span>
            </div>
            <div class="c-1">
              <span class="cur" style="color:#333">￥</span>
              <span class="qian1" style="color:#333">{{dataList.bidPlusPrice}} </span>
              <span class="cur" style="color:#333">加价幅度</span>
            </div>
          </div>
        </div>
      </div>
      <div class="jinbi" v-if="jinbiFalg">
        <div class="jinbiUser">
          <div class="arv"><img src="" alt=""></div>
          <div class="names">{{names}}</div>
        </div>
        <div class="jinbiNum">最后参与{{jinbiNum}}个金币</div>
      </div>
      <div class="record">
        <div class="biaoti"> <img class="bidImg" src="../../assets/bid.png" alt="">出价记录</div>
          <ul class="recordList">
            <li v-for="item in dataList1 " :key="item.id">
              <div class="name">{{item.bidUser.nickName}} <p class="time1">{{item.bidTime || item.messageTime}}</p></div>
              <div class="out" v-if='dataList1[0].invokeId == item.invokeId'>领先</div>
              <div class="out" v-else style="color:#999">出局</div>
              <div class="bid">出价<span v-if="item.realCrit === 4">X4</span> <span v-if="item.realCrit === 2">X2</span>￥{{item.bidPrice}}</div>
              <div class="baoji">
                <div class="baoji4" v-if='isBaoji == true'>
                  <img class="userImg" v-if='item.bidUser.avatar' :src="item.bidUser.avatar" alt="">
                  <img class="userImg"  v-else :src="require('@/assets/ara.png')" alt="">
                <div class="baojiUser">
                  <div class="nikeName">{{item.bidUser.nickName}}</div>
                  <div class="chujia">出价x4 成功出价</div>
                </div>
                <img class="xNum" src="../../assets/x4.png" alt="">
                </div>
                <div class="baoji2" v-if='isBaoji2 == true'>
                <img class="userImg" v-if='item.bidUser.avatar' :src="item.bidUser.avatar" alt="">
                <img class="userImg" v-else :src="require('@/assets/ara.png')" alt="">
                <div class="baojiUser">
                  <div class="nikeName">{{item.bidUser.nickName}}</div>
                  <div class="chujia">出价x2 成功出价</div>
                </div>
                 <img class="xNum" src="../../assets/x2.png" alt="">
                </div>
              </div>
            </li>
          </ul>

      </div>
    </div>
    <div class="btn" @click="onClickDwon">下载app参与出价</div>
    <van-overlay :show="showRuset">
      <div class="res">
        <div class="resBg">
          <img class="resImg" v:if='avatarUrl' :src="avatarUrl" alt="">
          <img class="resImg" v:else :src="require('@/assets/ara.png')" alt="">
          <div class="resName" v:if="uid == userId">恭喜您竞购成功</div>
          <div class="resName" v:else>恭喜“{{nickname}}”竞购成功</div>
          <div class="resBox">
            <img class="resBox-left" :src="dataList.goods.goodsCoverImg" alt="">
            <div class="resBox-right">
              <div class="tl">{{dataList.goods.goodsName}}</div>
              <div class="mon">成交价:￥{{bidPrice}}</div>
            </div>
          </div>
        </div>
        <div class="close"  @click="showRuset = false"><img src="../../assets/close.png" alt=""></div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
// import login from '../login'
import Vue from 'vue'
import mqtt from 'mqtt'
import sdk from '../sdk'
export default {
  data () {
    return {
      dataList: '',
      dataList1: '',
      dataList2: [],
      fromList: '',
      isBid: '',
      names: '',
      nextOperTimeFalg: false,
      jinbiNum: '',
      jinbiFalg: false,
      falg: false,
      roundId: '',
      uid: '',
      bidPrice: '',
      nickname: '',
      avatarUrl: '',
      isOut: true,
      nextBlockMoney: '',
      showRuset: false,
      endShow: false,
      isBaoji: false,
      userId: '',
      isBaoji2: false,
      s: 1,
      client: {},
      // MQTT连接的配置
      options: {
        // protocolVersion: 4,
        clean: false,
        // reconnectPeriod: 500, // 1000毫秒，两次重新连接之间的间隔
        // connectTimeout: 500, // 1000毫秒，两次重新连接之间的间隔
        resubscribe: true, // 如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
        // cleanSession: true,
        clientId: '',
        password: '',
        username: ''
      },
      time: ''
    }
  },
  created () {
    this.list()
    if (this.$route.query.inviteCode) {
      this.$cookie.set('inviteCode ', this.$route.query.inviteCode)
    }
    this.userId = Vue.cookie.get('userId')
    if (Vue.cookie.get('userId') === '' || Vue.cookie.get('userId') === null) {
      this.$router.push('/register')
    }
    var url = location.href
    var obj = {
      title: this.dataList.goods.goodsName, // 分享标题
      desc: '直供货源、品质保证、拍的多、赚的多、买的多、返的多',
      linkurl: 'http://h5.paihuo11.cn/phlShop/index.html#/bid?id=' + this.$route.query.id + '&inviteCode=' + Vue.cookie.get('inviteCode') ? Vue.cookie.get('inviteCode') : 'system', // 分享链接
      img: this.dataList.goods.goodsCoverImg// 分享内容显示的图片
    }
    sdk.getJSSDK(url, obj)
  },
  mounted () {
    if (window.performance.navigation.type === 1) {
    } else {
      this.falg = true
    }
  },
  methods: {
    list () {
      this.$http({
        url: this.$http.adornUrl('/h5/round/fetchLatestByRoundRule'),
        method: 'get',
        params: {roundRuleId: this.$route.query.id}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.dataList = data.data
          document.title = this.dataList.goods.goodsName
          // 竞拍记录
          if (this.dataList) {
            this.$http({
              url: this.$http.adornUrl('/h5/round/fetchRoundBidPriceRecords'),
              method: 'get',
              params: {auctionLineId: this.$route.query.id, roundId: this.dataList.id}
            }).then(({data}) => {
              for (let i = 0; i < data.data.content.length; i++) {
                data.data.content[i].bidTime = this.timeStamp2String(data.data.content[i].bidTime)
              }
              this.dataList1 = data.data.content
            })
            this.$http({
              url: this.$http.adornUrl('/h5/round/enterAuctionRoom'),
              method: 'post',
              params: {roundRuleId: this.$route.query.id, password: ''}
            }).then(({data}) => {
              if (data.code === 'ok') {
                this.options.password = data.data.password
                this.options.username = data.data.userName
                this.options.chatNo = data.data.chatNo
                this.options.clientId = data.data.clientId
                this.launch()
              } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
                Vue.cookie.delete('token')
                Vue.cookie.delete('userId')
                var url = location.href
                window.location.href = 'http://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl=' + encodeURIComponent(url) + '&inviteCode=' + Vue.cookie.get('inviteCode')
              } else {
              }
            })
          }
        } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
        } else {

        }
      })
    },
    finished () {
      setTimeout(() => {
        this.list()
      }, 1000)
    },
    onClickClose () {
      this.showRuset = false
    },
    // 接收消息
    launch () {
      var client
      client = mqtt('wss://wss.paihuo11.cn/mqtt', this.options)
      client.on('connect', function () {
        client.subscribe('auction/' + this.options.chatNo)
        // console.log('auction/' + this.options.chatNo)
      })
      client.on('message', (topic, message) => {
        this.fromList = JSON.parse([message].join(': '))

        this.nextBlockMoney = this.fromList.data.nextBlockMoney
        //  聊天和出价
        if (this.fromList.type === 'AUCTION_PRICE_SUCCESS' && this.fromList.data.roundId === this.dataList.id) {
          this.s = 1
          this.dataList.lastBidPrice = this.fromList.data.bidPrice
          if (this.fromList.data.modifyEndTime === true) {
            this.dataList.nextOperTime = this.fromList.data.nextOperTime
            this.dataList.id = this.fromList.data.roundId
            this.nextOperTimeFalg = true
          }
          this.dataList1.unshift({realCrit: this.fromList.data.crit, bidPrice: this.fromList.data.bidPrice, invokeId: this.fromList.messageId, bidUser: {nickName: this.fromList.data.bidUser.nickname, avatar: this.fromList.data.bidUser.avatarUrl}, messageTime: this.timeStamp2String(this.fromList.messageTime)})
        }
        // console.log(this.fromList)
        // console.log('====================================')
        // console.log(this.dataList1)
        //  暴击
        if (this.fromList.data.crit === 2) {
          this.isBaoji2 = true
        } setTimeout(() => {
          this.isBaoji2 = false
        }, 1000)
        if (this.fromList.data.crit === 4) {
          this.isBaoji = true
        } setTimeout(() => {
          this.isBaoji = false
        }, 1000)
        if (this.fromList.type === 'AUCTION_END' && this.s === 1) {
          this.bidPrice = this.fromList.data.bidPrice
          this.roundId = this.fromList.data.roundId
          this.nickname = this.fromList.data.bidUser.nickname
          this.avatarUrl = this.fromList.data.bidUser.avatarUrl
          this.uid = this.fromList.data.bidUser.uid
          this.s = 2
          setTimeout(() => {
            this.list()
            location.href = location.href
          }, 2000)
          this.showRuset = true
          // client.end()
        }
      })
      // 断开发起重连
      client.on('reconnect', () => {
        // client.on('connect', function () {
        client.subscribe('auction/' + this.options.chatNo)
        // })
      })
      // 链接异常处理
      client.on('error', () => {
        client.subscribe('auction/' + this.options.chatNo)
        // client.on('connect', function () {
        //   client.subscribe('auction/' + this.options.chatNo)
        // })
      })
      if (this.endShow === true) {
        // console.log(this.endShow)
        client.end()
      }
    },
    onClickLeft () {
      if (this.falg) {
        this.$router.push('/auctionShop')
      } else {
        this.$router.push('/auctionShop')
      }
    },
    onClickDwon () {
      this.$router.push('/download')
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
    }
  },
  beforeRouteLeave (to, form, next) {
    this.endShow = true
    next()
  },
  beforeDestroy () { this.endShow = true }
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
.van-hairline--bottom::after{
  border-bottom-width:0px
}
.main{
  margin-top: 1rem;
}
.card1{
  background:#F0F0F0;
}
.hander{
  padding: .3rem .45rem ;
  background: #FFF;
  .card,.card1{
    background:linear-gradient(0deg,rgba(239,15,15,1) 0%,rgba(255,89,89,1) 100%);
    // background: #F0F0F0;
    border-radius: 10px;
    padding: .3rem .3rem .05rem .3rem;
    .list{
      background: #fff;
      padding: .3rem;
      display: flex;
      border-radius: 5px;
      justify-content: space-between;
      .proImg{
        width: 1.3rem;
        height: 1.2rem;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .proText{
        width: 80%;
        text-align: left;
        .title{
          font-size: .32rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .pro-index{
          display: inline-block;
          font-size: .25rem;
          margin-top: 10px;
          margin-right: .2rem;
        }
      }
    }
    .no{
      display: flex;
      justify-content: space-between;
      font-size: .32rem;
      margin-top: .6rem;
      color: #fff;
      .statu{
          // margin-top: .3rem;
          text-align: right;
          color: #fff;
          .shijian{
            width: 20%;
            display: inline-block;
            vertical-align:-2px;
          }
      }
    }
    .row{
      display: flex;
      justify-content: space-between;
      text-align: center;
      margin-top: 10px;
      height: 1rem;
      line-height: 1rem;
      .yen{
        color: #fff;
        font-size: .32rem;
      }
      .qian{
        font-weight: 500;
        font-size: .48rem;
        color: #fff;
      }
      .qian1{
        font-weight: 500;
         font-size: .48rem;
        color: #fff;
      }
      .cur{
        font-size: .28rem;
        color: #fff
      }
    }
  }
  .card1{
  background:#F0F0F0;
}
}
.jinbi{
  background: #fff;
  padding: .25rem .3rem;
   margin-top: 10px;
   display: flex;
   line-height: 3;
   justify-content: space-between;
   .jinbiUser{
     width: 60%;
     display: flex;
     .arv{
       width: 1rem;
       height: 1rem;
       border-radius: 50%;
       margin-right: 25rpx;
       img{
         width: 100%;
         height: 100%;
       }
     }
     .names{
       font-size: .38rem;
       color: #404040;
     }
   }
   .jinbiNum{
     width:241rpx;
     height:68rpx;
     background:rgba(255,242,242,1);
     border-radius:34rpx;
     color: #F21B1B;
     font-size: .32rem
   }
}
.record{
  margin-top: 10px;
  background: #fff;
  min-height: 60vh;
  padding: 0.2rem 0.3rem;
  margin-bottom: 1rem;
  .biaoti{
   line-height: .5rem;
   font-size: .34rem;
   font-weight: bold;
   .bidImg{
     width: 4%;
   }
  }
  .recordList{
    position: relative;
    li{
      display: flex;
      justify-content: space-between;
      height: 1.4rem;
      line-height: 1.4rem;
      font-size: .31rem;
      border-bottom: 1px solid #F5F5F5;
      color: #EF0F0F;
      .name{
       color: #404040;
        .time1{
          color: #B3B3B3;
          font-size: .28rem;
          margin-top: -10px;
          line-height:0rem;
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }

}
.baoji{
  position: absolute;
  top:20%;
  left:50%;
  margin-left: -3.5rem;
  width: 7rem;
  z-index: 99;
  line-height: 1.2;
}
.baoji4,.baoji2{
  border-radius: 30px;
  background: #F03131;
  display: flex;
  height: 1.5rem;
  margin-bottom: .2rem;
  .userImg{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    vertical-align: -5px;
    margin: .25rem 0 0 .2rem;
  }
  .baojiUser{
    padding: .4rem .5rem .2rem .2rem;
    .nikeName{
      font-size: .3rem;
      color: #fff;
    }
    .chujia{
      font-size: .25rem;
      color: #FFDC3E;
    }
  }
  .xNum{
    width: 1.6rem;
    height: .6rem;
    margin-top: .5rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.baoji2{
  background: #FF8226;
}
.res{
  margin-top: 3.5rem;
  width: 95%;
  .resBg{
    width: 100%;
    height: 8.3rem;
    text-align: center;
    background: url('../../assets/actionSs.png') no-repeat;
    background-size: 100%;
    .resImg{
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      margin-top: 3.7rem
    }
    .resName{
      color: #fff;
      font-size: .32rem;
      line-height: 2
    }
    .resBox{
      display: flex;
      width: 4.2rem;
      height: 1.2rem;
      border-radius: 5px;
      padding: .2rem;
      background: #FA5151;
      margin:.3rem auto 0;
      .resBox-left{
        width: 1rem;
        height: 1rem;
        margin-top: .1rem
      }
      .resBox-right{
       color: #fff;
       text-align: left;
       margin-left: .2rem;
       margin-top: .2rem;
       overflow : hidden;
       text-overflow: ellipsis;
        white-space: nowrap;
       }
    }
  }
  .close{
    text-align: center;
    margin: auto;
    margin-top: .6rem;
    width: 1rem;
    img{
      width: 80%;
    }
  }
}
.btn{
   position: fixed;
   bottom: 0;
   width: 100%;
   background: #EF1010;
   height: 1.12rem;
   line-height: 1.12rem;
   color: #fff;
   font-size: .37rem;
   text-align: center
  }
  .time{
    color: #F52A6A;
    margin-top: 5px;
  }
  .item {
  display: inline-block;
  width: .4rem;
  margin-right: 2px;
  color: #fff;
  font-size: .3rem;
  text-align: center;
  border-radius:5px;
  background-color: #EF0F0F;
}
.err{
    margin: 1rem auto 0;
    text-align: center;
    img{
      width: 60%;
    }
  }
.c-1{
  position: relative;
}
.c-1::after{
  position: absolute;
  content: "";
  width: 1px;
  height: .4rem;
  background: #ccc;
  top: 35%;
  right: -10px;
}
.c-1:last-child::after{
  width: 0;
}
</style>

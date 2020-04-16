<template>
  <div>
  <!-- <van-nav-bar title="确认付款" left-text="" left-arrow fixed @click-left="onClickLeft" >
   </van-nav-bar> -->
   <div class="cont">
     <!-- 联系人卡片 -->
     <div class="contact" @click="onClickadd">
       <van-icon name="location"  class="icon-lo"/>
       <div class="contactVal" v-if="addresssInfo.id === 0">
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
       <div class="card-index">
          <div class="title">{{dataInfo.goodsName}}</div>
          <div class="price" v-if='dataInfo.orderPrice'><span class="yen">￥</span>{{dataInfo.orderPrice}}</div>
          <div class="price" v-else><span class="yen">￥</span>{{dataInfo.salePrice ? dataInfo.salePrice:dataInfo.money}}</div>
          <div class="price" v-if="dataInfo.orderType === 1">{{dataInfo.orderLePoint}}<span class="yen">拍豆</span></div>
          <div class="x">X1</div>
       </div>
     </div>
     <!-- 寄卖 -->
     <div class="total" v-if="dataInfo.orderType === 4">共1件商品,总计支付￥{{dataInfo.orderPrice}}</div>
     <div class="total" v-if="dataInfo.type === 3">共1件商品,总计支付￥{{dataInfo.money}}</div>
      <div class="yun" v-if="dataInfo.type === 3">运费：¥{{dataInfo.postage}}</div>
     <div class="total" v-if="dataInfo.salePrice">共1件商品,总计支付￥{{dataInfo.salePrice ? dataInfo.salePrice: dataInfo.money}}</div>
     <!-- 拍豆 -->
     <van-radio-group v-model="radio1" class="cell1" v-if='dataInfo.orderType==0'>
       <div class="chuli">处理方式：</div>
       <div class="left">
         <van-radio name="2" checked-color="#EF0F0F" style="margin-right:1rem;margin-left:.3rem">提货</van-radio>
         <van-radio name="3" checked-color="#EF0F0F">托管</van-radio>
       </div>
     </van-radio-group>
     <!-- <div class="total total2">实际消耗拍豆:1000 <span style="color:#999">(可用拍豆:1200)</span> </div> -->
     <!-- 金币换购-->
     <!-- <div class="total total2">实际付款:￥99.00+298金币<span style="color:#999">(可用金币不足)</span> </div> -->
    </div>
     <div class="mode" v-if="showradio3">
       <!-- <div class="modeTitle">选择支付方式</div> -->
       <van-radio-group v-model="radio3">
         <van-cell-group>
           <div style="position: relative;">
             <!-- <img :src="require('@/assets/pay1.png')" class="iconPay" > -->
             <van-cell v-for="item in costEquit" :key='item' :title="item.name" clickable @click="radio3 = item.id">
              <van-radio slot="right-icon" :name="item.id" checked-color="#EF0F0F" />
            </van-cell>
           </div>
          </van-cell-group>
         </van-radio-group>
     </div>
     <!-- 支付方式 金币换购现金加金币/寄卖结算-->
     <div class="mode">
       <div class="modeTitle">选择支付方式</div>
       <van-radio-group v-model="radio">
         <van-cell-group>
           <div style="position: relative;">
             <img :src="require('@/assets/pay1.png')" class="iconPay" >
             <van-cell :title="money" clickable @click="radio = '1'">
              <van-radio slot="right-icon" name="1" checked-color="#EF0F0F" />
            </van-cell>
           </div>
           <div style="position: relative;">
             <img :src="lists.iconUrl" class="iconPay" >
              <van-cell :title='lists.payName' clickable @click="radio = '2'">
                <van-radio slot="right-icon" name="2"  checked-color="#EF0F0F"/>
              </van-cell>
           </div>
          </van-cell-group>
         </van-radio-group>
     </div>
     <!-- 寄卖 -->
     <div class="btnPay">
       <div class="fuTotal">实付总额:
         <span class="mun" v-if="dataInfo.orderType === 1">{{dataInfo.orderLePoint}}拍豆 + {{costEquit}}金币</span>
         <span class="mun" v-if="dataInfo.orderPrice">￥{{dataInfo.orderPrice}} <span v-if="costEquit > 0">+ {{costEquit}}金币</span> </span>
         <span class="mun" v-else> ￥{{dataInfo.salePrice ? dataInfo.salePrice: parseInt(dataInfo.money) + parseInt(dataInfo.postage) }}</span>
        </div>
        <!-- 竞拍 -->
       <van-button class="fu"  v-if='dataInfo.orderType==1' @click="hanleFalse">确认兑换</van-button>
       <van-button class="fu"  v-if='dataInfo.orderType==0' @click="confirm" :disabled='disabled'>确认付款</van-button>
       <!-- 寄卖/直购 -->
       <van-button class="fu" v-else @click="confirm1" :disabled='disabled'>确认付款</van-button>
     </div>
     <van-popup v-model="show" round  close-icon="close" closeable position="bottom" :style="{ height: '35%' }">
       <h4 class="agr-tl">用户托管协议</h4>
       <div class="text">
          <p style="text-indent: 2em;">根据《中华人民共和国合同法》、《中华人民共和国拍卖法》、《中国拍卖行业通则》等国家法律、规范性文件等相关规章制度及广东拍货郎网络科技有限公司拍卖规则，就委托人委托拍卖物品暂时托管给拍卖人并委托拍卖人对委托拍卖标的在广东拍货郎网络科技有限公司（拍货郎APP）进行公开线上拍卖事宜，明确双方责任义务，本着平等、自愿、公平和诚实守信的原则，经协商一致，签订本协议。</p>
          <p style="text-align: center">第一章 拍卖物品托管</p>
          <p style="text-indent: 2em;">第一条  拍卖人接受托管的前置条件</p>
          <p style="text-indent: 2em;">委托人应保证对委托暂保管拍卖物品拥有合法的无争议的所有权及处分权。</p>
          <p style="text-indent: 2em;">第二条 双方权利与义务</p>
          <p style="text-indent: 2em;">1、委托人保证对委托暂保管拍卖物品拥有合法的无争议的所有权，且不存在何权利瑕疵。</p>
          <p style="text-indent: 2em;">2、委托人保证在本协议项下所提供的任何信息、资料是真实、合法、准确、完整的，不存在虚假记载、误导性陈述或重大遗漏。</p>
          <p style="text-indent: 2em;">3、委托人保证遵守《拍卖法》《拍卖监督管理办法》等相关法律、法规、政策及广东拍货郎网络科技有限公司拍卖规则。</p>
          <p style="text-indent: 2em;">4、拍卖人在受托暂保管拍卖物品期间只提供本协议约定范围内的服务。</p>
          <p style="text-indent: 2em;">5、拍卖人在接受委托拍卖物品暂保管时，按照委托人提交的托管订单核对货物及单据（型号、订单号、数量、质量），核对拍卖物品入库。</p>
          <p style="text-indent: 2em;">6、拍卖人必须保证选用的仓库具备防雨、防火、防潮的基本功能。</p>
          <p style="text-indent: 2em;">7、拍卖人对拍卖物品暂保管期间，因保管不善原因导致的暂保管拍卖物品的损坏、短缺、丢失，拍卖人承担保管责任。</p>
          <p style="text-indent: 2em;">8、拍卖人每月对暂保管拍卖物品进行盘点和对账。</p>
          <p style="text-indent: 2em;">第三条  托管费用标准及托管期限：</p>
          <p style="text-indent: 2em;">1、拍卖人对委托暂保管的拍卖物品，给予三十天的免费暂保管期。</p>
          <p style="text-indent: 2em;">2、超出三十天免费保管期限，需要在仓库继续保管的，将会被收取仓储保管费，月仓储保管费的收费标准是拍卖物品价值的2%。</p>
          <p style="text-indent: 2em;">3、托管拍卖物品最长托管期为三个月，如超出最长托管期限，则停止托管，本协议自动终止，委托方应自行提货。需要继续托管的，经双方协商同意，可重新办理托管手续。</p>
          <p style="text-indent: 2em;">4、本条所指期限起算日为委托人勾选本协议，将拍卖物品提交并委托拍卖人处理之日起算，托管期限包含拍卖过程。</p>
          <p style="text-indent: 2em;">第四条    释义：</p>
          <p style="text-indent: 2em;">甲方（拍卖人）暂保管方：广东拍货郎网络科技有限公司</p>
          <p style="text-indent: 2em;">乙方（委托人）拍卖物品所有权人：委托拍卖物品暂保管的委托人</p>
          <p style="text-align: center">第二章  委托拍卖</p>
          <p style="text-indent: 2em;">第一条 委托人自愿就拥有合法所有权及处置权的拍卖物品委托拍卖人依法公开线上拍卖。拍卖物名称、品种规格（编号）、数量、质量： 见在线托管订单详情</p>
          <p style="text-indent: 2em;">拍卖物品存放地：委托暂保管至广东拍货郎网络科技有限公司指定仓库</p>
          <p style="text-indent: 2em;">第二条 拍卖物的交接方式：物流</p>
          <p style="text-indent: 2em;">第三条 拍卖物的底价：委托方可在法律允许的情况下自行确定拍卖物的底价（保留价）或者授权拍卖方（拍卖人）按照市场规则设定拍卖物的底价（保留价）。委托人自行确定拍卖物底价（保留价）的以委托人的书面确定为准。</p>
          <p style="text-indent: 2em;">第四条 拍卖方式：线上公开固定加价式拍卖</p>
          <p style="text-indent: 2em;">第五条 拍卖期限：根据委托人提出委托拍卖请求的时间，由平台按照时间优先原则进行线上拍卖时间排期。</p>
          <p style="text-indent: 2em;">第六条 双方的权利和义务：</p>
          <p style="text-indent: 2em;">1、委托人保证对拍卖物拥有无争议的所有权及处分权，并向拍卖方提供有关的证明文件和拍卖物的详尽资料。必要时，拍卖方可随时向委托方要求提供咨询，委托方不得拒绝。</p>
          <p style="text-indent: 2em;">2、委托方可在法律允许的情况下书面方式确定拍卖物的底价（保留价）;拍卖方不得以低于该底价（保留价）的价格进行拍卖，但因此而造成不能成交的，由委托方承担责任。</p>
          <p style="text-indent: 2em;">3、委托人允许拍卖人将拍卖物品在拍拍乐APP进行公开线上拍卖 ，若该拍卖物品未成交（流拍或拍中方竞购成功未付款），拍卖人可继续为委托人安排上拍，但拍卖人无义务保证拍卖物品成交，在拍卖成交前，委托人可以随时终止对该拍卖物品的委托拍卖行为，提走拍卖物品。</p>
          <p style="text-indent: 2em;">4、委托人在交付拍卖物时，应向拍卖人指出其知道或应当知道的拍卖物瑕疵。否则，由此造成的后果由委托人负责。</p>
          <p style="text-indent: 2em;">5、委托人按成交总金额的25%向拍卖人支付佣金;该款项由拍卖人从拍卖所得价款中收取扣除。</p>
          <p style="text-indent: 2em;">6、拍卖人应对拍卖物的底价保密，不得委托或代理他人参加竞价。</p>
          <p style="text-indent: 2em;">7、拍卖过程结束，如拍卖成交，拍卖方在收齐全部应收款项后，应于七日内，在扣除佣金及代扣税金后，将拍卖所得一次性付给委托人。</p>
          <p style="text-indent: 2em;">8、对需要征税的拍卖物，由委托人缴付税金;经税务机关同意， 税金可以从拍卖所得价款中取得。</p>
          <p style="text-indent: 2em;">第七条 合同履行产生纠纷时，双方同意由广东广州仲裁委员会仲裁。</p>
          <p style="text-indent: 2em;">第八条通知和送达</p>
          <p style="text-indent: 2em;">1、根据本合同甲方向乙方发出的全部通知以及双方的文件往来及与本合同有关的通知和要求等，必须用书面形式，除通过拍拍乐APP进行推送外，还可按本条第2款确定的通讯方式采用快递、电邮等方式传递。采用快递送达的，按本条第2款约定的地址邮寄成功即视为送达，快递被退回的，退回之日为送达之日。</p>
          <p style="text-indent: 2em;">2、乙方通讯地址如下：</p>
          <p style="text-indent: 4em;">乙方地址：</p>
          <p style="text-indent: 4em;">联系电话：</p>
          <p style="text-indent: 4em;">电子邮箱：</p>
          <p style="text-indent: 2em;">3、乙方变更通知或通讯地址，应自变更之日起7日内，以书面形式通知对方；否则，由未通知方承担由此而引起的相关责任。</p>
          <p style="text-indent: 2em;">4、本送达方式适用于司法送达。</p>
          <p style="text-indent: 2em;">第九条委托人在勾选后即代表同意，表明委托人已清晰明确本协议内容，同认可本协议全部。</p>
       </div>
       <div class="check">
         <van-checkbox v-model="checked" shape="square" checked-color="#EF0F0F"> 我已阅读并同意<span style="color:#EF0F0F">《用户托管协议》</span></van-checkbox>
       </div>
      <div class="btn" @click="agree">同意协议并兑换</div>
     </van-popup>
     <van-action-sheet v-model="show1" title="确认支付金额" :style="{ height: '5.8rem' }">
     <div class='box-pay' style="text-align: center;margin-bottom: 30rpx;font-size:.58rem">
        <span class='tet'>￥</span> {{dataInfo.salePrice || parseInt(dataInfo.money) + parseInt(dataInfo.postage) }}</div>
      <div class='item-1'>订单号：
        <span class='tet'>{{orderNo}}</span>
      </div>
      <div class='item-1' style="margin-bottom: 50rpx;">支付方式：
        <span class='tet' v-if="radio == 1">余额支付</span>
        <span class='tet' v-if="radio == 2">微信支付</span>
      </div>
    <div class='btn-agement' @click='payment'>支付</div>
    </van-action-sheet>
    <van-action-sheet v-model="show3" title="确认支付金额" :style="{ height: '5.8rem' }">
     <div class='box-pay' style="text-align: center;margin-bottom: 30rpx;font-size:.58rem">
        <span class='tet'>￥</span> {{dataInfo.orderPrice}}</div>
      <div class='item-1'>订单号：
        <span class='tet'>{{dataInfo.orderNo}}</span>
      </div>
      <div class='item-1' style="margin-bottom: 50rpx;">支付方式：
        <span class='tet' v-if="radio == 1">余额支付</span>
        <span class='tet' v-if="radio == 2">微信支付</span>
      </div>
    <div class='btn-agement' @click='payment'>支付</div>
    </van-action-sheet>
  </div>
</template>

<script>
import Vue from 'vue'
import wx from 'weixin-js-sdk'
import sdk from './sdk'
export default {
  data () {
    return {
      radio: '',
      radio1: '',
      radio3: '',
      showradio3: false,
      addresssInfo: {id: 0},
      lists: {},
      dataInfo: {
        goodsName: '',
        id: '',
        goodsCoverImg: '',
        money: '',
        salePrice: '',
        postage: 0,
        publishTime: '',
        orderPrice: '',
        orderNo: '',
        orderType: '',
        goodsId: '',
        type: ''
      },
      payList: '',
      show: false,
      disabled: false,
      costEquit: '',
      show3: false,
      shareUserId: '0',
      show1: false,
      orderId: '',
      curUrl: '',
      checked: true,
      orderNo: '',
      msgShow1: false,
      money: '余额'
    }
  },
  created () {
    this.dataInfo.goodsName = this.$route.query.goodsName
    this.dataInfo.id = this.$route.query.id
    this.dataInfo.goodsId = this.$route.query.goodsId
    this.dataInfo.goodsCoverImg = this.$route.query.goodsCoverImg
    this.dataInfo.money = this.$route.query.money
    this.dataInfo.type = this.$route.query.type
    this.dataInfo.publishTime = this.$route.query.publishTime
    this.dataInfo.orderNo = this.$route.query.orderNo
    this.dataInfo.orderPrice = this.$route.query.orderPrice
    this.dataInfo.orderType = this.$route.query.orderType
    if (this.$route.query.postage) {
      this.dataInfo.postage = this.$route.query.postage
    }
    if (this.$route.query.addressContact) {
      this.addresssInfo.consignee = this.$route.query.addressContact
      this.addresssInfo.phone = this.$route.query.addressPhone
      this.addresssInfo.province = this.$route.query.address
      this.addresssInfo.id = this.$route.query.addressId
    }

    this.curUrl = this.$route.query.curUrl
    if (Vue.cookie.get('shareUserId')) {
      this.shareUserId = Vue.cookie.get('shareUserId')
    }
    if (this.$route.query.item1) {
      this.addresssInfo = this.$route.query.item1
    }
    this.list()
    sdk.getJSSDK(location.href, '')
  },
  methods: {
    onClickLeft () {
      location.href = this.curUrl
    },
    // 换地址
    onClickadd () {
      this.$router.push({path: '/address', query: this.$route.query, mode: 'con'})
    },
    list () {
      // 判断地址是否为空
      if (this.addresssInfo.id === 0) {
        this.$http({
          url: this.$http.adornUrl('/h5/personal/fetchUserDefaultAddress'),
          method: 'get'
        }).then(({data}) => {
          if (data.code === 'ok') {
            if (data.data) {
              this.addresssInfo = data.data
            }
          } else if (data.code === 'B19' || data.code === 'UNDEFINED') {
          } else {
            this.$toast(data.message)
          }
        })
      }
      this.$http({
        url: this.$http.adornUrl('/h5/pay/fetchPayConfigs'),
        method: 'get',
        params: {payType: 'MALL_ORDER_MONEY'}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.lists = data.data[0]
        } else {
          this.$toast(data.message)
        }
      })
      // 获取用户当前金额
      this.$http({
        url: this.$http.adornUrl('/h5/personal/getAccountByUid'),
        method: 'get'
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.money = '余额(当前余额￥' + data.data.money.toFixed(2) + ')'
        } else if (data.code === 'B19') {
          var url = this.curUrl
          Vue.cookie.delete('token')
          Vue.cookie.delete('userId')
          var auth = 'https://api.paihuo11.cn/to/toAuth?type=redirect&fromUrl='
          var incode = '&inviteCode=' + Vue.cookie.get('inviteCode')
          location.href = auth + encodeURIComponent(url) + incode
        } else {
          this.$toast(data.message)
        }
      })
    },
    // 寄卖/直购付款
    confirm1 () {
      if (!this.addresssInfo || this.addresssInfo.id === 0) {
        this.$toast('你还没有填地址哦~')
      } else if (this.radio === '') {
        this.$toast('请选择支付方式')
      } else if (this.radio === '2') {
        this.payWhat()
      } else if (this.radio === '1') {
        if (this.dataInfo.type === 2 || this.dataInfo.type === '2') {
          this.$http({
            url: this.$http.adornUrl('/h5/mall/createDpOrder'),
            method: 'post',
            params: {id: this.dataInfo.id, addressId: this.addresssInfo.id, money: this.dataInfo.money, shareUserId: this.shareUserId}
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.orderNo = data.data.orderNo
              this.orderId = data.data.id
              this.show1 = true
            } else if (data.code === 'M72') {
              this.$toast({
                content: '该商品已售出'
              })
            } else {
              this.$toast(data.message)
            }
          })
        } else if (this.dataInfo.publishTime) {
          this.$http({
            url: this.$http.adornUrl('/h5/mall/createEntrustSaleOrder'),
            method: 'post',
            params: {id: this.dataInfo.id, addressId: this.addresssInfo.id}
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.orderNo = data.data.orderNo
              this.orderId = data.data.id
              this.show1 = true
            } else {
              this.$toast(data.message)
            }
          })
        } else if (this.dataInfo.type === 3) {
          this.$http({
            url: this.$http.adornUrl('/h5/welfare/createWelfareOrder'),
            method: 'post',
            params: {id: this.dataInfo.id, addressId: this.addresssInfo.id}
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.orderNo = data.data.orderNo
              this.orderId = data.data.id
              this.show1 = true
            } else {
              this.$toast(data.message)
            }
          })
        } else {
          this.$http({
            url: this.$http.adornUrl('/h5/order/payOrder'),
            method: 'post',
            params: {orderId: this.dataInfo.id, addressId: this.addresssInfo.id, payMethod: 'BALANCE', status: this.radio1 ? this.radio1 : 0}
          }).then(({data}) => {
            if (data.code === 'ok') {
              this.$router.replace('/pay')
            } else {
              this.$toast(data.message)
            }
          })
        }
      }
    },
    // 竞拍
    confirm () {
      if (!this.addresssInfo || this.addresssInfo.id === 0) {
        this.$toast('你还没有填地址哦~')
      } else if (this.radio === '') {
        this.$toast('请选择支付方式')
      } else if (this.radio1 === '') {
        this.$toast('请选择处理方式')
      } else if (this.radio1 === '2') {
        // this.show3 = true
        this.hanleCostEquit()
        this.showradio3 = true
      } else if (this.radio === '2') {
        this.payWhat()
      } else {
        this.show = true
      }
    },
    hanleFalse () {
      this.show3 = true
    },
    hanleCostEquit () {
      this.$http({
        url: this.$http.adornUrl('/h5/order/fetchTurnDelayConfig'),
        method: 'get',
        params: {goodsId: this.dataInfo.goodsId}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.costEquit = data.data.costEquit
        } else {
          this.$toast(data.message)
        }
      })
    },
    payment () {
      this.$http({
        url: this.$http.adornUrl('/h5/order/payOrder'),
        method: 'post',
        params: {orderId: this.orderId ? this.orderId : this.dataInfo.id, addressId: this.addresssInfo.id, payMethod: 'BALANCE', status: this.radio1 ? this.radio1 : 0}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.$router.replace('/pay')
        } else {
          this.$toast(data.message)
        }
      })
    },
    payWhat () {
      this.disabled = true
      if (this.dataInfo.type === 2) {
        this.$http({
          url: this.$http.adornUrl('/h5/mall/createDpOrder'),
          method: 'post',
          params: {id: this.dataInfo.id, addressId: this.addresssInfo.id, money: this.dataInfo.money, shareUserId: this.shareUserId}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.orderNo = data.data.orderNo
            this.orderId = data.data.id
            this.weixin()
          }
        })
      } else if (this.dataInfo.orderNo) {
        this.weixin()
      } else if (this.dataInfo.type === 3) {
        this.$http({
          url: this.$http.adornUrl('/h5/welfare/createWelfareOrder'),
          method: 'post',
          params: {id: this.dataInfo.id, addressId: this.addresssInfo.id, money: this.dataInfo.money, shareUserId: this.shareUserId}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.orderNo = data.data.orderNo
            this.orderId = data.data.id
            this.weixin()
          }
        })
      } else {
        this.$http({
          url: this.$http.adornUrl('/h5/mall/createEntrustSaleOrder'),
          method: 'post',
          params: {id: this.dataInfo.id, addressId: this.addresssInfo.id}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.orderNo = data.data.orderNo
            this.orderId = data.data.id
            this.weixin()
          }
        })
      }
    },
    weixin () {
      this.$http({
        url: this.$http.adornUrl('/h5/order/payOrder'),
        method: 'post',
        params: {orderId: this.orderId ? this.orderId : this.dataInfo.id, addressId: this.addresssInfo.id, payMethod: this.lists.payMethod, status: this.radio1 ? this.radio1 : 0}
      }).then(({data}) => {
        if (data.code === 'ok') {
          wx.ready(function () {
            wx.chooseWXPay({
              appId: data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
              timestamp: data.data.timeStamp, // 必填，生成签名的时间戳
              nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
              signType: data.data.signType,
              package: data.data.package,
              paySign: data.data.paySign,
              success: function (res) {
                this.disabled = false
                location.href = 'http://h5.paihuo11.cn/phlShop/index.html#/pay'
              },
              complete: function (res) {
              },
              cancel: function (res) {
                this.disabled = false
              },
              fail: function (res) {
                this.disabled = false
              }
            })
          })
        } else {
          this.$toast(data.message)
        }
      })
      if (this.disabled === true) {
        setTimeout(() => {
          this.disabled = false
        }, 5000)
      }
    },
    agree () {
      if (this.checked === false) {
        this.$toast('请同意本协议')
      } else {
        this.show = false
        this.$http({
          url: this.$http.adornUrl('/h5/order/payOrder'),
          method: 'post',
          params: {orderId: this.dataInfo.id, addressId: this.addresssInfo.id, payMethod: 'BALANCE', status: 3}
        }).then(({data}) => {
          if (data.code === 'ok') {
            this.$router.replace('/pay')
          } else if (data.code === 'M72') {
            this.$toast({
              content: '该商品已售出'
            })
          } else {
            this.$toast(data.message)
          }
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
  background: #f5f5f5;
}
.van-nav-bar__title{
   color: #404040;
}
.van-cell__title{
  margin-left: .75rem;
  position: relative;
}
.iconPay{
  position: absolute;
  left: 0;
  top:.3rem;
  width: .6rem;
  height: .6rem;
  z-index: 999;
}
.cont{
  width: 90%;
  margin: auto;
  background: #fff;
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
        margin-top: .1rem;
        .yen,.fu{
          font-weight: 400;
          display: inline-block;
          font-size: .2rem;
        }
        .fu{
          color: #404040
        }
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
  text-align: left;
}
.yun{
  font-size: .3rem;
  color: #B3B3B3;
  text-align: right
}
.mode{
  width: 90%;
  background: #fff;
  margin: auto;
  color: #404040;
  margin-top: .3rem;
  padding: .3rem 10px;
  border-radius: 10px;
  .modeTitle{
    font-size: .34rem;
  }
  .van-cell{
     padding: 0;
     height: 1.2rem;
     line-height: 1.2rem;
    //  position: relative;
  }
  [class*=van-hairline]::after{
    border:none
  }
}
.cell1{
  color: #404040;
  font-size: .32rem;
  height: 1.17rem;
  line-height: 1.17rem;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
  .left{
    display: flex;
  }
}
.footer{
   width: 90%;
   position: fixed;
   bottom: 0;
   left: 50%;
   margin-left: -45%;
   p{
     color: #EF0F0F;
     font-size: .29rem;
     margin-bottom: 10px;
   }
   .btnPay1{
     height: 1.2rem;
     line-height: 1.2rem;
     display: flex;
     justify-content: space-between;
  .fuTotal{
    width: 45.5%;
    background: #999;
    font-size: .26rem;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    .mun{
      color: #EF0F0F;
      font-size: .3rem;
    }
  }
  .fu{
    width: 45.5%;
    background: #EF0F0F;
    font-size: .37rem;
    border-radius: 6px;
    text-align: center;
    color: #fff;
  }
}
}
.btnPay{
  position: fixed;
   bottom: 0;
   width: 100%;
  height: 1.2rem;
  line-height: 1.2rem;
  display: flex;
  justify-content: space-between;
  .fuTotal{
    width: 50%;
    background: #fff;
    font-size: .26rem;
    color: #404040;
    text-align: center;
    .mun{
      color: #EF0F0F;
      font-size: .3rem;
    }
  }
  .fu{
    width: 50%;
    background: #EF0F0F;
    font-size: .37rem;
    text-align: center;
    color: #fff;
  }
}
.item-1{
  font-size: .32rem;
  color: #808080;
  line-height: 3;
  padding: 0 .5rem;
  border-bottom: 1px solid #F5F5F5
}
.tet{
  color: #808080;
  font-size: .32rem;
}
.btn-agement{
  background:#EF0F0F;
  color: #fff;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 999;
  line-height: 1.2rem;
  font-size: .34rem;
}
.van-radio__icon--round .van-icon,.van-radio__icon .van-icon{
  background-color: #999;
  color: #fff;
}
.btn{
  position: fixed;
  bottom: 0;
  height: 1.2rem;
  width: 100%;
  text-align: center;
  line-height: 1.2rem;
  background: #EF0F0F;
  color: #fff;
  font-size: .4rem;
}
.agr-tl{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .37rem;
}
.text{
  height: 3.37rem;
  overflow-y: scroll;
  padding:0 .49rem;
  font-size: .32rem;
  color: #404040;

}
.van-checkbox{
  display: inline-flex;
}
.van-checkbox__icon{
  display: inline-block;
  height:0;
}
.check{
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: .29rem;
  font-weight:500;
  margin-bottom: 1.2rem
}
.van-popup__close-icon{
  font-size: 30px;
}
</style>

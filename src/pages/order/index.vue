<template>
  <div>
    <!-- <van-nav-bar
      title="我的订单"
      left-text=""
      left-arrow
      fixed
      @click-left="onClickLeft"
    >
    </van-nav-bar> -->
    <van-tabs
      v-model="active"
      swipeable
      animated
      @change="onClick"
      sticky
      class="tabs"
      background="#f5f5f5"
      :swipe-threshold="5"
    >
      <van-tab title="全部"  name=" ">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="暂无数据"
          @load="onLoad"
        >
          <div class="list">
            <div class="err" v-if="shopBanner.length == 0">
              <img src="../../assets/err2.png" class="err" alt="" >
              <p>还没有数据哦~</p>
            </div>
            <ul class="listUl"  v-for="(item,index) in shopBanner"  :key="index">
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                    <span class="iconBg" v-if='item.orderType == 0'>竞拍</span>
                    <span class="iconBg dou" v-if='item.orderType == 1'>拍豆</span>
                        <span class="iconBg bi" v-if='item.orderType == 3'>金币</span>
                    <span class="iconBg shang" v-if='item.orderType == 5'>商城</span>
                        <span class="iconBg zhong" v-if='item.orderType == 2'>中奖</span>
                        <span class="iconBg ji" v-if='item.orderType == 4'>寄卖</span>
                        <span class="iconBg hui" v-if='item.orderType == 6'></span>
                    订单号 {{item.orderNo}}</div>
                  <div class="order-text" v-if='item.status == 0'>待付款</div>
                  <div class="order-text" v-if='item.pickStatus == 2'>待收货</div>
                      <div class="order-text" v-if='item.pickStatus == 1 '>待收货</div>
                      <div class="order-text" v-if='item.status == 1 && item.orderType !== 3'>待收货</div>
                      <div class="order-text" v-if='item.status == 4'>违约</div>
                      <div class="order-text" v-if='item.status == 5'>已完成</div>
                      <div class="order-text" v-if='item.status == -1'>已取消</div>
                      <div class="order-text" v-if='item.entrustStatus  == 2'>寄卖成功</div>
                      <div class="order-text" v-if='item.status == 3'>已托管</div>
                      <div class="order-text" v-if='item.entrustStatus == 1 && item.logisticsName == null'>寄卖中</div>
                </div>
                <div class="cont">
                  <img  :src="item.goods.goodsCoverImg" alt=""  class="shopImg">
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div class="x">X1</div>
                    <div >
                      <div class="cash" v-if='item.status == 0 &&item.orderType == 0'>
                        成交价：￥{{item.totalPrice}} &nbsp;&nbsp;&nbsp; 已付押金:￥{{item.blockMoney}}
                      </div>
                      <div class="cash" v-if='item.status == 4'>
                        成交价: <span>￥{{item.totalPrice}}</span>
                      </div>
                      <div class="price" v-if='item.status === 0 && item.orderEquity == 0 && item.orderLePoint == 0'><span class="fu" >待付款：</span><span class="yen">￥</span>{{item.orderPrice}}</div>
                      <div class="price" v-if='(item.status === 1 || item.status === 3 || item.status === 2 || item.status === 5) && (item.orderType !== 1 || item.orderType !== 3)   && (item.payPrice > 0 && item.orderEquity === 0)'><span class="fu" >已支付：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.status == -1 && item.orderEquity == 0 && item.orderLePoint == 0'><span class="fu" >待支付：</span><span class="yen">￥</span>{{item.orderPrice}}</div>
                      <div class="price" v-if='item.orderType == 3 && !item.totalPrice'><span class="fu" >已消耗金币：</span>{{item.orderEquity }}</div>
                      <div class="price" v-if='item.orderType == 1'><span class="fu">已消耗拍豆：</span>{{item.orderLePoint }}</div>
                      <div class="price" v-if='item.orderType == 3 && item.orderEquity > 0 && item.totalPrice > 0'><span class="yen">￥</span>{{item.totalPrice}}<span style="color:#999" class="yen"> + </span>{{item.orderEquity}}<span style="color:#999" class="yen"> 金币</span></div>
                      <div class="price" v-if='item.status == 4'><span class="fu">违约金：</span><span class="yen">￥</span>{{item.blockMoney}}</div>
                      <div class="price" v-if='item.orderType == 2' style="font-size:.34rem">第{{item.mallExtendId}}期中奖奖品</div>
                      <div class="price" v-if='item.status == 6 && item.orderEquity == 0 && item.orderType !== 2'><span class="yen">￥</span>{{item.totalPrice}}</div>
                    </div>
                    </div>
                </div>
                <div class="foot">
                  <div v-if="item.surplusPayTime > 0">
                    <van-count-down
                      class="time"
                      :time="item.surplusPayTime * 1000"
                       millisecond
                      format="付款剩余时间 HH:mm:ss"
                    />
                  </div>
                  <div class="time" v-if="item.status == -1">取消时间 {{item.operTime}}</div>
                  <div class="time" v-if="item.logisticsCode">发货时间 {{item.dispatchTime}}</div>
                  <div class="time" v-if="item.status == 3 && item.turnStatus !== 0">托管时间 {{item.payTime}}</div>
                  <div class="time" v-if="item.status === 6 && item.operTime !== null">寄卖时间 {{item.operTime}}</div>
                  <div class="time" v-if="item.status == 5">完成时间 {{item.updateTime}}</div>
                  <div class="time" v-if="item.status == 1 || item.status == 2 && item.logisticsCode == null && item.payTime !== null">提交时间  {{item.payTime}}</div>
                  <div class="time" v-if="item.status == 4">违约时间  {{item.operTime}}</div>
                  <div class="btn">
                    <van-button color="#999" v-if="item.logisticsCode !== null &&(item.status == 2 || item.pickStatus==3)" plain size="small" @click="handleCheck(item)">查看物流</van-button>
                    <van-button color="#EF0F0F" v-if="item.logisticsCode !== null && item.pickStatus !==3"  @click="handleQueren(item.id, '')" size="small" style="margin-left:.2rem">确认收货</van-button>
                    <van-button color="#EF0F0F" v-if="item.status == 0" @click="onClickPay(item)" size="small" style="margin-left:.2rem">付款</van-button>
                    <van-button color="#EF0F0F" v-if="(item.status !== 6 && item.status !== -1 && item.status !== 0) && (item.entrustStatus == 6 || item.orderType == 2 )" size="small" style="margin-left:.2rem" @click="onClickJimai(item)">寄卖</van-button>
                    <van-button color="#EF0F0F" v-if="(item.status !== 6 && item.status !== -1 && item.status !== 0 ) && (item.entrustStatus == 6|| item.orderType == 2 ) " size="small" style="margin-left:.2rem"  @click="onClickGoods(item)">提货</van-button>
                    <van-button color="#EF0F0F" v-if="item.status == 3 || item.status == 6" size="small" style="margin-left:.2rem"  @click="hanleCheck(item.status)">查看详情</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待付款" name="0">
        <van-pull-refresh v-model="isLoading1" @refresh="onRefresh1">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
           <div class="err" v-if="shopBanner.length == 0">
              <img src="../../assets/err2.png" class="err" alt="" >
              <p>还没有数据哦~</p>
             </div>
            <div class="list" v-else>
            <ul class="listUl" v-for="(item,index) in shopBanner" :key="index">
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                   <span class="iconBg" v-if='item.orderType == 0'>竞拍</span>
                    <span class="iconBg dou" v-if='item.orderType == 1'>拍豆</span>
                        <span class="iconBg bi" v-if='item.orderType == 3'>金币</span>
                    <span class="iconBg shang" v-if='item.orderType == 5'>商城</span>
                        <span class="iconBg zhong" v-if='item.orderType == 2'>中奖</span>
                        <span class="iconBg ji" v-if='item.orderType == 4'>寄卖</span>
                        <span class="iconBg hui" v-if='item.orderType == 6'></span>
                    订单号 {{item.orderNo}}</div>
                  <div class="order-text">待付款</div>
                </div>
                <div class="cont">
                  <img  :src="item.goods.goodsCoverImg" alt=""  class="shopImg">
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div class="x">X1</div>
                    <!-- 竞拍未付款 -->
                    <div>
                      <div class="cash" v-if='item.status == 0 && item.orderType == 0'>
                        成交价：￥{{item.totalPrice}} &nbsp;&nbsp;&nbsp; 已付押金:￥{{item.blockMoney}}
                      </div>
                      <div class="price" v-if='item.status == 0 && item.orderEquity == 0 && item.orderLePoint == 0'><span class="fu">待付款：</span><span class="yen">￥</span>{{item.orderPrice}}</div>
                      <div class="price" v-if='item.status == 1'><span class="fu" >已付款：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.orderType == 3  && !item.totalPrice'><span class="fu" >已消耗金币：</span>{{item.orderEquity }}</div>
                      <div class="price" v-if='item.orderType == 3 && item.orderEquity > 0 && item.totalPrice > 0'><span class="yen">￥</span>{{item.totalPrice}}<span style="color:#999" class="yen"> + </span>{{item.orderEquity}}<span style="color:#999" class="yen"> 金币</span></div>
                      <div class="price" v-if='item.orderType == 1'><span class="fu" >已消耗拍豆：</span>{{item.orderLePoint }}</div>
                    </div>
                     <!-- 寄卖 -->
                    <div  v-if='item.status == 6'>
                      <div class="cash">
                        市场价: <span style="text-decoration:line-through">￥{{item.goods.marketPrice }}</span>
                      </div>
                      <div class="price"><span class="fu">待付款：</span><span class="yen">￥</span>{{item.mou}}</div>
                    </div>

                  </div>
                </div>
                <div class="foot">
                  <div>
                    <van-count-down
                      class="time"
                      :time="item.surplusPayTime * 1000"
                       millisecond
                      format="付款剩余时间 HH:mm:ss"
                    />
                  </div>
                  <div class="btn">
                    <van-button color="#EF0F0F" size="small" style="margin-left:.2rem"  @click="onClickPay(item)">付款</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="待收货" name="2">
        <van-pull-refresh v-model="isLoading2" @refresh="onRefresh2">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list">
            <ul
              class="listUl"
              v-for="(item,index) in shopBanner"
              :key="index"
            >
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                    <span class="iconBg" v-if='item.orderType == 0'>竞拍</span>
                    <span class="iconBg dou" v-if='item.orderType == 1'>拍豆</span>
                        <span class="iconBg bi" v-if='item.orderType == 3'>金币</span>
                    <span class="iconBg shang" v-if='item.orderType == 5'>商城</span>
                        <span class="iconBg zhong" v-if='item.orderType == 2'>中奖</span>
                        <span class="iconBg ji" v-if='item.orderType == 4'>寄卖</span>
                        <span class="iconBg hui" v-if='item.orderType == 6'></span>
                        订单号 {{item.orderNo }}</div>
                      <div class="order-text">待收货</div>
                </div>
                <div class="cont">
                  <img  :src="item.goods.goodsCoverImg" alt=""  class="shopImg">
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div class="x">X1</div>
                    <!-- 竞拍未付款 -->
                    <div>
                      <div class="cash" v-if='item.status == 0'>
                        成交价：￥1800 &nbsp;&nbsp;&nbsp; 已付押金:￥200
                      </div>
                      <div class="cash" v-if='item.status == 0'>
                        市场价: <span style="text-decoration:line-through">￥{{item.goods.marketPrice }}</span>
                      </div>
                      <div class="price" v-if='item.status == 0'><span class="fu" >待付款：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.status == 1 || item.payPrice'><span class="fu">已付款：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.orderType == 3'><span class="fu" >已消耗金币：</span>{{item.orderEquity }}</div>
                      <div class="price" v-if='item.orderType == 1'><span class="fu">已消耗拍豆：</span>{{item.orderLePoint }}</div>
                    </div>
                     <!-- 寄卖 -->
                    <div v-if='item.status == 6'>
                      <div class="cash">
                        市场价: <span style="text-decoration:line-through">￥{{item.goods.marketPrice }}</span>
                      </div>
                      <div class="price"><span class="fu">待付款：</span><span class="yen">￥</span>{{item.mou}}</div>
                    </div>

                  </div>
                </div>
                <div class="foot">
                  <div class="time" v-if="item.logisticsCode">发货时间 {{item.dispatchTime}}</div>
                  <div class="time" v-else>提交时间 {{item.payTime}}</div>
                  <div class="btn" v-if="item.logisticsCode">
                    <van-button color="#999"  @click="handleCheck(item)" plain size="small">查看物流</van-button>
                    <van-button color="#EF0F0F" size="small" @click="handleQueren(item.id,2)" style="margin-left:.2rem">确认收货</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
       </van-pull-refresh>
      </van-tab>
      <!-- 已完成 -->
      <van-tab title="已完成" name="5">
        <van-pull-refresh v-model="isLoading3" @refresh="onRefresh3">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list">
            <ul
              class="listUl"
              v-for="(item,index) in shopBanner"
              :key="index"
            >
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                  <span class="iconBg" v-if='item.orderType == 0'>竞拍</span>
                    <span class="iconBg dou" v-if='item.orderType == 1'>拍豆</span>
                        <span class="iconBg bi" v-if='item.orderType == 3'>金币</span>
                    <span class="iconBg shang" v-if='item.orderType == 5'>商城</span>
                        <span class="iconBg zhong" v-if='item.orderType == 2'>中奖</span>
                        <span class="iconBg ji" v-if='item.orderType == 4'>寄卖</span>
                        <span class="iconBg hui" v-if='item.orderType == 6'></span>
                    订单号  {{item.orderNo}}</div>
                      <div class="order-text">已完成</div>
                </div>
                <div class="cont">
                  <img  :src="item.goods.goodsCoverImg" alt=""  class="shopImg">
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div class="x">X1</div>
                    <!-- 竞拍未付款 -->
                    <div>
                      <div class="cash" v-if='item.status == 1'>
                        市场价: <span style="text-decoration:line-through">￥ {{item.goods.marketPrice }}</span>
                      </div>
                      <div class="price" v-if='item.status == 1 || item.status == 5 && item.orderType !== 1'><span class="fu">已支付：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                      <div class="price" v-if='item.orderType == 3'><span class="fu">已消耗金币：</span>{{item.orderEquity }}</div>
                      <div class="price" v-if='item.orderType == 1'><span class="fu">已消耗拍豆：</span>{{item.orderLePoint }}</div>
                    </div>
                     <!-- 寄卖 -->
                    <div v-if='item.status == 6'>
                      <div class="cash">
                        市场价: <span style="text-decoration:line-through">￥{{item.goods.marketPrice }}</span>
                      </div>
                      <div class="price"><span class="fu">已支付：</span><span class="yen">￥</span>{{item.payPrice}}</div>
                    </div>

                  </div>
                </div>
                <div class="foot">
                    <div class="time">完成时间 {{item.updateTime}}</div>
                  <div class="btn">
                    <van-button color="#999" plain @click="handleCheck(item)" size="small">查看物流</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="违约" name="4">
        <van-pull-refresh v-model="isLoading4" @refresh="onRefresh4">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list">
            <ul
              class="listUl"
              v-for="(item,index) in shopBanner"
              :key="index"
            >
              <li class="listUl-li">
                <div class="order">
                  <div class="number">
                    <span class="iconBg" v-if='item.orderType == 0'>竞拍</span>
                    <span class="iconBg dou" v-if='item.orderType == 1'>拍豆</span>
                        <span class="iconBg bi" v-if='item.orderType == 3'>金币</span>
                    <span class="iconBg shang" v-if='item.orderType == 5'>商城</span>
                        <span class="iconBg zhong" v-if='item.orderType == 2'>中奖</span>
                        <span class="iconBg ji" v-if='item.orderType == 4'>寄卖</span>
                        <span class="iconBg hui" v-if='item.orderType == 6'></span>
                       订单号 {{item.orderNo}}</div>
                      <div class="order-text">违约</div>
                </div>
                <div class="cont">
                  <img  :src="item.goods.goodsCoverImg" alt=""  class="shopImg">
                  <div class="cont-index">
                    <h4 class="h4">{{item.goods.goodsName}}</h4>
                    <div class="x">X1</div>
                    <!-- 竞拍未付款 -->

                      <div class="price" v-if='item.orderLePoint'><span class="fu">已消耗拍豆：</span>{{item.mou}}</div>
                      <div v-else>
                      <div class="cash">
                        成交价: ￥{{item.totalPrice}}
                      </div>
                      <div class="price"><span class="fu">违约金：</span><span class="yen">￥</span>{{item.blockMoney}}</div>
                    </div>
                  </div>
                </div>
                <div class="foot">
                  <div class="time">违约时间 : {{item.operTime}}</div>
                  <div class="btn">
                    <van-button color="#999" v-if="item.logisticsCode !== null && item.status == 5" @click="handleCheck(item)" plain size="small">查看物流</van-button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

   <van-popup v-model="show" round position="bottom" :style="{ height: '60%' }">
    <div class='div'>
      <div class="box-tl">物流详情</div>
      <div class='g_con'>
        <div class='topExpress'>
          <div class='topExpress-right'>
            <div class='topExpress-right-top'>{{orderInfo2.logisticsName}} ：{{orderInfo2.logisticsNo}}</div>
            <div class='hg'>
              <div class='shouhuo'>收货地址 ：</div>
              <div class='le'>
                <div class='topExpress-right-middle'>
                  {{orderInfo2.addressContact}} {{orderInfo2.addressPhone }}</div>
                <div class='topExpress-right-bottom'>{{orderInfo2.address}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div scroll-y="true" class='expressRecord' v-if='orderInfo1.length == 0'>
          <div class='expressRecord-single-close'>
            <div class='expressRecord-single-noReach-online-top-close'>
              <div class='dot-closing'></div>
              <div class='online-bottoming'></div>
            </div>
            <div class='expressRecord-text'>
              <div class='expressRecord-status'></div>
              <div class='expressRecord-status-addressing'>{{dataInfos2[0].remark}}</div>
            </div>
            <div class='expressRecord-date'>
              <div class='expressRecord-date-text'>
                {{dataInfos2[0].occurTime[1]}}
              </div>
              <div class='expressRecord-date-time'>
                {{dataInfos2[0].occurTime[0]}}
              </div>
            </div>
          </div>
          <div v-for="item in orderInfo3" :key="item.id">
            <div class='expressRecord-single-close'>
              <div class='expressRecord-single-noReach-online-top-close'>
                <div class='online-top-close'></div>
                <div class='dot-close'></div>
                <div class='online-bottom'></div>
              </div>
              <div class='expressRecord-text'>
                <div class='expressRecord-status-address'>{{item.remark}}</div>
              </div>
              <div class='expressRecord-date'>
                <div class='expressRecord-date-text'>
                  {{item.occurTime[1]}}
                </div>
                <div class='expressRecord-date-time'>
                  {{item.occurTime[0]}}
                </div>
              </div>
            </div>
          </div>
          <div class='expressRecord-single-close'>
            <div class='expressRecord-single-noReach-online-top-close'>
              <div class='online-top-close'></div>
              <div class='dot-close'></div>
              <div class='online-bottom-start'></div>
            </div>
            <div class='expressRecord-text'>
              <div class='expressRecord-status'></div>
              <div class='expressRecord-status-address'>{{(orderInfo1[orderInfo1.length-1].remark)}}</div>
            </div>
            <div class='expressRecord-date'>
              <div class='expressRecord-date-text'>
                {{(orderInfo1[orderInfo1.length-1].occurTime[1])}}
              </div>
              <div class='expressRecord-date-time'>
                {{(orderInfo1[orderInfo1.length-1].occurTime[0])}}
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
   </van-popup>
    <van-dialog v-model="showConfirm" title="温馨提示" show-cancel-button @confirm="onClickConfirm">
     <p style="text-align:center;padding:.2rem 0">确定要收货吗？</p>
    </van-dialog>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  data () {
    return {
      active: '',
      loading: false,
      finished: false,
      show: false,
      showConfirm: false,
      show1: false,
      isLoading: false,
      isLoading1: false,
      isLoading2: false,
      isLoading3: false,
      isLoading4: false,
      orderInfo1: [],
      timer: '',
      status: '',
      idCon: '',
      orderInfo2: {},
      orderInfo3: [],
      time: '',
      surplusPayTime: '',
      shopBanner: []
    }
  },
  mounted () {
    this.active = this.$route.query.active
  },
  created () {
    if (this.$route.query.active) {
      this.fromList(this.$route.query.active)
    } else {
      this.fromList(this.status)
    }
  },
  methods: {
    fromList (status) {
      this.$http({
        url: this.$http.adornUrl('/h5/order/fetchUserOrders'),
        method: 'get',
        params: {status: status}
      }).then(({data}) => {
        if (data.code === 'ok') {
          for (let i = 0; i < data.data.content.length; i++) {
            data.data.content[i].operTime = this.timeStamp2String(data.data.content[i].operTime)
            data.data.content[i].payTime = this.timeStamp2String(data.data.content[i].payTime)
            data.data.content[i].dispatchTime = this.timeStamp2String(data.data.content[i].dispatchTime)
            data.data.content[i].updateTime = this.timeStamp2String(data.data.content[i].updateTime)
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
    onClickPay (item) {
      this.$router.push({path: '/convert', query: {id: item.id, goodsId: item.goods.goodsId, goodsName: item.goods.goodsName, goodsCoverImg: item.goods.goodsCoverImg, orderPrice: item.orderPrice, orderNo: item.orderNo, orderType: item.orderType, addressPhone: item.addressPhone, addressContact: item.addressContact, address: item.address, addressId: item.addressId, curUrl: location.href}})
    },
    onClick (name, title) {
      if (title === '待付款') {
        this.fromList('0')
      } else if (title === '待收货') {
        this.fromList('2')
      } else if (title === '已完成') {
        this.fromList('5')
      } else if (title === '违约') {
        this.fromList('4')
      } else {
        this.fromList(name)
      }
    },
    onClickJimai (item) {
      this.$router.push({path: '/selaEdit', query: {item: item}})
    },
    onClickGoods (item) {
      this.$router.push({path: '/payment', query: {id: item.id, goodsName: item.goods.goodsName, goodsCoverImg: item.goods.goodsCoverImg, orderPrice: item.orderPrice, orderNo: item.orderNo, orderType: item.orderType, treasurePeriodId: item.treasurePeriodId, totalPrice: item.totalPrice, orderLePoint: item.orderLePoint, orderEquity: item.orderEquity, orderId: item.orderId, salePrice: item.salePrice, curUrl: location.href}})
    },
    // 确认收货
    handleQueren (id, m) {
      this.showConfirm = true
      this.idCon = id
      this.status = m
    },
    onClickConfirm () {
      this.$http({
        url: this.$http.adornUrl('/h5/order/completeOrder'),
        method: 'post',
        params: {orderId: this.idCon}
      }).then(({data}) => {
        if (data.code === 'ok') {
          this.fromList(this.status)
        } else {
          this.$toast(data.message)
        }
      })
    },
    // 查看
    hanleCheck (status) {
      if (status === 6) {
        this.$router.push('/mySale')
      }
      if (status === 3) {
        this.$router.push('/entrust')
      }
    },
    onRefresh () {
      this.fromList(this.status)
      setTimeout(() => {
        this.isLoading = false
      }, 500)
    },
    onRefresh1 () {
      this.fromList('0')
      setTimeout(() => {
        this.isLoading1 = false
      }, 500)
    },
    onRefresh2 () {
      this.fromList('2')
      setTimeout(() => {
        this.isLoading2 = false
      }, 500)
    },
    onRefresh3 () {
      this.fromList('5')
      setTimeout(() => {
        this.isLoading3 = false
      }, 500)
    },
    onRefresh4 () {
      this.fromList('4')
      setTimeout(() => {
        this.isLoading4 = false
      }, 500)
    },
    // 查看物流
    handleCheck (item) {
      this.$http({
        url: this.$http.adornUrl('/h5/order/fetchOrderLogisticsDetails'),
        method: 'get',
        params: {orderId: item.id}
      }).then(({data}) => {
        if (data.code === 'ok') {
          if (data.data) {
            for (var i = 0; i < data.data.length; i++) {
              data.data[i].occurTime = this.timeStamp2String(data.data[i].occurTime).split(' ')
            }
            this.orderInfo1 = data.data
            this.orderInfo3 = data.data.slice(1, -1)
          }
          this.orderInfo2 = item
        } else {
          this.$toast(data.message)
        }
      })
      this.show = true
    },
    onLoad () {
      setTimeout(() => {
        // this.fromList(status, this.page + 1)
        this.loading = false
        // eslint-disable-next-line no-self-compare
        if (this.shopBanner.length >= this.shopBanner.length) {
          this.finished = true
        }
      }, 500)
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
    count (time) {
      var h = Math.floor(time / 3600) < 10 ? '0' + Math.floor(time / 3600) : Math.floor(time / 3600)
      var min = Math.floor(time / 60) < 10 ? '0' + Math.floor(time / 60) : Math.floor(time / 60)
      var s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60)
      return h + ': ' + min + ':' + s
    }
  }
}
</script>
<style lang="less" scoped>
 .err{
    margin: 1rem auto 0;
    text-align: center;
    img{
      width: 60%;
    }
  }
.order {
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.29rem;
  .number {
    color: #999;
    .iconBg {
      width: 0.55rem;
      height: 0.6rem;
      font-size: 0.24rem;
      color: #fff1f5;
      text-align: center;
      background: url(../../assets/orderIcon3.png) no-repeat;
      background-size: 100% 100%;
    }
    .dou{
       background: url(../../assets/orderIcon4.png) no-repeat;
       background-size: 100% 100%;
    }
    .bi{
       background: url(../../assets/orderIcon2.png) no-repeat;
       background-size: 100% 100%;
    }
    .shang{
       background: url(../../assets/orderIcon5.png) no-repeat;
       background-size: 100% 100%;
    }
    .ji{
       background: url(../../assets/orderIcon1.png) no-repeat;
       background-size: 100% 100%;
    }
    .zhong{
       background: url(../../assets/orderIcon6.png) no-repeat;
       background-size: 100% 100%;
    }
    .hui{
       display: inline-block;
       background: url(../../assets/orderIcon7.png) no-repeat;
       background-size: 100%;
       vertical-align: -.3rem;
    }
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
        position: relative;
        width: 80%;
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
        .x{
          position: absolute;
          right: 5px;
          top:1rem;
          color: #EF0F0F;
          font-size: .3rem;
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
.g_con {
  width: 100vw;
  overflow-x: hidden;
}

.topExpress {
  width: 90%;
  height: 2rem;
  background: #fff;
  margin: 10px auto;
  display: flex;
  border-bottom:1px solid #E6E6E6;
}

.topExpress-right {
  font-size: .32rem;
  color: #333;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: flex-start;
  padding: .2rem 0;
}

.topExpress-right-middle {
  font-size: .32rem;
}

.topExpress-right-bottom {
  font-size: .32rem;
  color: #999999;
  margin-top: 5px;
}

.expressRecord {
  width: 90%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  margin: 0 auto;
  border-radius: 10px;
}

.expressRecord-getAddress {
  width: 90%;
  margin: auto;
  font-size: .32rem;
  color: #999;
  display: flex;
}

.expressRecord-top {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.getAddress-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #999;
  font-size: 18px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 80px;
}

.getAddress-text {
  margin-left: 20px;
}

.noReach-online-top-close {
  width: 1px;
  height: 1rem;
  background: #d7d7d7;
  margin-left: 95px;
}

.expressRecord-single-close {
  width: 100%;
  max-height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}
.shouhuo{
    float: left;
}
.le{
  display: inline-block;
}
.expressRecord-single-noReach-online-top-close {
  display: flex;
  flex-direction: column;
}

.online-top-closing {
  width: 1px;
  height: 1rem;
  background: #d7d7d7;
  margin-left: 2rem;
}

.online-top-close {
  width: 1px;
  height: 1rem;
  background: #999;
  margin-left: 2rem;
}

.dot-closing {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: 1.9rem;
  margin-top: 6px;
  margin-bottom: 6px;
  background: #EF0F0F;
}

.dot-close {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left:1.9rem;
  margin-top: 6px;
  margin-bottom: 6px;
  background: #999;
}

.online-bottom,.online-bottoming {
  width: 1px;
  height: 0px;
  background: #999;
  margin-left: 2rem;
}
.online-bottoming{
  height: 1rem;
   margin-left: 2rem;
}

.online-bottom-start {
  width: 1px;
  height: 1rem;
  margin-left: 2rem;
}

.expressRecord-text {
  margin-left: .3rem;
  // width: 38%;
}

.expressRecord-statusing {
  font-size: .34rem;
  color: #333;
}

.expressRecord-status-addressing {
  font-size: .3rem;
  color: #333;
}

.expressRecord-status {
  font-size: .34rem;
  color: #999;
}

.expressRecord-status-address {
  font-size: 22rpx;
  color: #999;
}

.expressRecord-dating {
  position: absolute;
  height: 100%;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #333;
}

.expressRecord-date {
  position: absolute;
  height: 100%;
  left: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #999;
}

.expressRecord-date-text {
  font-size: .32rem;
}

.expressRecord-date-time {
  font-size: .25rem;
}
.box-tl{
  line-height: 3;
  font-size: .34rem;
  text-align: center;
  color: #fff;
  background:#EF0F0F;
}
.van-button--small{
  border-radius: 3px;
}
</style>

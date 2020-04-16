import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'
import payment from '@/pages/payment'
import pay from '@/pages/pay'
import convert from '@/pages/convert'
import shop from '@/pages/shop'
import shopDetails from '@/pages/shop/shopDetails'
import sale from '@/pages/sale'
import my from '@/pages/my'
import register from '@/pages/register'
import download from '@/pages/download'
import mySale from '@/pages/my/mySale'
import entrust from '@/pages/my/entrust'
import selaEdit from '@/pages/my/selaEdit'
import addressManage from '@/pages/my/addressManage'
import addOrEdit from '@/pages/my/addOrEdit'
import address from '@/pages/my/address'
import apprentice from '@/pages/my/apprentice'
import member from '@/pages/member'
import order from '@/pages/order'
import goldCoin from '@/pages/goldCoin'
import buyBeans from '@/pages/buyBeans'
import receive from '@/pages/receive'
import auctionShop from '@/pages/auctionShop'
import bid from '@/pages/auctionShop/bid'
import goldcoinDetails from '@/pages/goldCoin/goldcoinDetails'
import buybeansDetails from '@/pages/buyBeans/buybeansDetails'
import actionDetails from '@/pages/auctionShop/actionDetails'
import saleDetails from '@/pages/sale/saleDetails'
import receiveDetails from '@/pages/receive/receiveDetails'
import red from '@/pages/red'
import news from '@/pages/news'
import loginpro from '@/pages/loginpro'
import newsDetails from '@/pages/newsDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      meta: {
        title: '拍货郎' }
    },
    {
      path: '/payment',
      component: payment,
      meta: {
        title: '付款' }
    },
    {
      path: '/newsDetails',
      name: newsDetails,
      component: newsDetails,
      meta: {
        title: '资讯详情' }
    },
    {
      path: '/news',
      component: news,
      meta: {
        title: '拍货郎资讯' }
    },
    {
      path: '/auctionShop',
      component: auctionShop,
      meta: {
        title: '热卖竞拍' }
    },
    {
      path: '/pay',
      component: pay,
      meta: {
        title: '支付成功' }
    },
    {
      path: '/convert',
      component: convert,
      meta: {
        title: '结算' }
    },
    {
      path: '/shop',
      component: shop,
      meta: {
        title: '商城' }
    },
    {
      path: '/shopDetails',
      component: shopDetails,
      meta: {
        title: '商城详情' }
    },
    {
      path: '/receive',
      component: receive,
      meta: {
        title: '拍货郎' }
    },
    {
      path: '/receiveDetails',
      component: receiveDetails,
      meta: {
        title: '商品详情' }
    },
    {
      path: '/sale',
      component: sale,
      meta: {
        title: '寄卖商城' }
    },
    {
      path: '/my',
      component: my,
      meta: {
        title: '我的中心' }
    },
    {
      path: '/red',
      component: red,
      meta: {
        title: '瓜分红包' }
    },
    {
      path: '/order',
      component: order,
      meta: {
        title: '订单' }
    },
    {
      path: '/goldCoin',
      component: goldCoin,
      meta: {
        title: '金币商城' }
    },
    {
      path: '/buyBeans',
      component: buyBeans,
      meta: {
        title: '拍豆商城' }
    },
    {
      path: '/goldcoinDetails',
      component: goldcoinDetails,
      meta: {
        title: '金币商城详情' }
    },
    {
      path: '/buybeansDetails',
      component: buybeansDetails,
      meta: {
        title: '拍豆商城详情' }
    },
    {
      path: '/saleDetails',
      component: saleDetails,
      meta: {
        title: '寄卖商城详情' }
    },
    {
      path: '/auctionShop',
      component: auctionShop,
      meta: {
        title: '竞拍商城' }
    },
    {
      path: '/actionDetails',
      component: actionDetails,
      meta: {
        title: '竞拍商城详情' }
    },
    {
      path: '/bid',
      component: bid,
      meta: {
        title: '出价' }
    },
    {
      path: '/mySale',
      component: mySale,
      meta: {
        title: '我的寄卖' }
    },
    {
      path: '/apprentice',
      component: apprentice,
      meta: {
        title: '我的徒弟' }
    },
    {
      path: '/selaEdit',
      component: selaEdit,
      meta: {
        title: '寄卖修改' }
    },
    {
      path: '/entrust',
      component: entrust,
      meta: {
        title: '我的托管' }
    },
    {
      path: '/addressManage',
      component: addressManage,
      meta: {
        title: '管理收货地址' }
    },
    {
      path: '/address',
      component: address,
      meta: {
        title: '我的收货地址' }
    },
    {
      path: '/addOrEdit',
      component: addOrEdit,
      meta: {
        title: '添加收货地址' }
    },
    {
      path: '/member',
      component: member,
      meta: {
        title: '黑卡会员' }
    },
    {
      path: '/register',
      component: register,
      meta: {
        title: '登录' }
    },
    {
      path: '/download',
      component: download,
      meta: {
        title: '拍货郎下载' }
    },
    {
      path: '/loginpro',
      component: loginpro,
      meta: {
        title: '正在登录' }
    }
  ]
})

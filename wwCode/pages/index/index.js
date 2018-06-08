//index.js
//获取应用实例
const app = getApp()
const burstingData = require('../data/bursting.js');
const navData = require('../data/nav.js');
const loveList = require('../data/love.js');
Page({
  data: {
    motto: 'Tronker',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    top: '84rpx',
    imgUrls: [
      'http://img.tea7.com/0091747_0.png?x-oss-process=image/resize,w_720/quality,q_60',
      'http://img.tea7.com/0047844_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60',
      'http://img.tea7.com/0048429_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular:true,
    img: [
      'http://img.tea7.com/0048133_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60',
      'http://img.tea7.com/0017244_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60',
      'http://img.tea7.com/0049319_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60',
      'http://img.tea7.com/0017249_0.jpeg?x-oss-process=image/resize,w_720/quality,q_60'
    ],
    bursting:[],
    navList:[],
    loveList:[]
  },
  ToSearch: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  notouchme: function(){
    wx.showModal({
      title: '提示',
      content: '接口还没写别点我哦',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toDetail: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })

  },
  bindViewTap1: function() {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  //滚动事件发生
  onPageScroll: function() {
    this.setData({
      top: "0rpx"
    })
  },
  onLoad: function () {
    var _that = this;
    _that.setData({
      bursting: burstingData.bursting
    })
    _that.setData({
      navList: navData.navList
    })
    _that.setData({
      loveList: loveList.loveList
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

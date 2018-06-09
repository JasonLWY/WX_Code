// pages/detail/detail.js

const detailData = require('../data/detail.js');
const shopList = require('../data/shop.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:[],
    imgs:[],
    // indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    imgUrl: ['http://imgcon.tea7.com/6365948644527491413086708.jpg',
              'http://imgcon.tea7.com/6365948644838432649771252.jpg',
              'http://imgcon.tea7.com/6365948644743119081929333.jpg',
              'http://imgcon.tea7.com/6365948644564991942272144.jpg'  
            ],

    shopList:[]        
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _that = this;
      _that.setData({
        detail: detailData.detail,
        imgs: detailData.detail[0].PictureUrl,
        shopList: shopList.shopLis
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
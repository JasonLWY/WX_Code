// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    list: [{'show': false}],
    indicatorDots: false,
    autoplay: false,
    count:1,
    interval: 5000,
    isTrue : false,
    Allprice:70,
    color: 'grey',
    duration: 1000,
    list2: [{ iconcc:false}],
    flag:true,
    listss:[
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_300', price: 70, title: '黄山毛峰' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title:'碧螺春'},
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      { img: 'http://img.tea7.com/0052268_0.jpeg?x-oss-process=image/resize,w_500', price: 110, title: '碧螺春' },
      
    ]
  },
  bindViewTap3 : function() {
    wx.switchTab({
      url: '../news/news'
    })
  },
  showItem:function() {
    var that = this;
    var flag = that.data.list[0].show;
    that.data.list[0].show = !flag;
    var newList = that.data.list;
    that.setData({
      list: newList
    })
  },
  delete1 : function(){
    wx.showModal({
      title: '提示',
      content: '傻逼别点我-接口还没写呢，不给删',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定-接口还没写呢')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  addCount1:function(){
    wx.showModal({
      title: '提示',
      content: '傻逼别点我-接口还没写呢',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定-接口还没写呢')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  addCount : function() {
    var that = this;
    var newCount = that.data.count +1
    var newAllprice = newCount * 70
    // console.log(newCount)
    that.setData({
      count: newCount,
      Allprice: newAllprice
    })      
  },
  reduceCount : function() {
   var that = this;
   var newCount = that.data.count -1; 
   var nowAllprice = 70 * newCount
   if (newCount < 1) {
    //  newCount = 1;
     wx.showModal({
       title: '温馨提示',
       content: '您是否要删除该购物项',
       success: function (res) {
         if (res.confirm) {
          //  console.log('用户点击确定')
           newCount = that.data.count;
           // 在这里操作setStorage，删除要删除数据项.
           that.setData({
             count: 0,
             Allprice: 0
           })
           console.log(newCount);
         } else if (res.cancel) { 
           console.log('用户点击取消')
         }
       }
     })
    }else{
     that.setData({
       count: newCount,
       Allprice: nowAllprice
     })
    }
  //  console.log(newCount)

  },
  changColor: function(event) {
    var that = this;
    // console.log("dianwo");
    // console.log(that.data.isTrue);
    console.log(event.currentTarget)
    var flag = that.data.isTrue;
    if(flag === false) {
      that.setData({
        color:'grey',
        isTrue:true
      })
    }else {
      that.setData({
        color:'green',
        isTrue:false
      })
    }

  },
  click1: function() {
    var that = this;
    console.log("asdasd");
    if (that.data.list2[0].iconcc == false){
      that.setData({
        'list2[0].iconcc': true
      }) 
    }else {
      that.setData({
        'list2[0].iconcc': false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    function sum() {
       //遍历购物车所有选项 forEach 遍历累加所有的单价 
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoCtx = wx.createVideoContext('myVideo')
  },
  onChange: function (e) {
    console.log(e.detail)
  },
  onScale: function (e) {
    console.log(e.detail)
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
  
  },
    play() {
    this.videoCtx.play()
  },
  pause() {
    this.videoCtx.pause()
  }
})
//引入
var newsData = require("../data/newsdata.js");

Page({
  data:{
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    circular:true,
    useData:[]
  },

  //onLoad是生命周期函数
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    //this.setData可以让view重绘
    this.setData({
      useData:newsData.initData
    })
  },

  //跳转详情页
  goNewsDetail:function(event){
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid='+ newsId
    })
  }
})

// 低耦合，高内聚
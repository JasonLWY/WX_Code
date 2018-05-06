var newsData = require("../../data/newsdata.js");

Page({
  data:{
    isPlayer:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData(newsData.initData[options.newsid])
    this.setData({
      newsid:options.newsid
    })

   //测试本地存储

    // wx.setStorageSync('key', 'value')
    // console.log(wx.getStorageSync('key'));
    // wx.removeStorageSync('key');
    // wx.clearStorageSync();

    //收藏存储数据格式
    /**
     * 
     * 一定要注意：我们读取或者存储，都是在操作整体
     * 
     * var newsCollect = {
     *  0:true,
     *  1:false,
     *  2:true
     * }
     * 
     */
    
    
    //第一次进入的时候判断是否存在本地存储以及是否收藏
    var newsCollect = wx.getStorageSync('newsCollect');
    //如果newsCollect存在，则代表以前收藏过或者是以前取消过收藏
    if(newsCollect){
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected:newCollect
      })
    }else{
      //第一次进入，根本不存在数据
      var newsCollect = {};
      //我把当前唯一id扔到newsCollect对象中，然后默认指定false
      newsCollect[options.newsid] = false;
      //扔到本地存储中去
      wx.setStorageSync('newsCollect', newsCollect);  
    }

  },
  collectTap:function(event){
    //注意：newsCollect所有数据的集合
    var newsCollect = wx.getStorageSync('newsCollect');
    //注意：newCollect是当前一条数据
    var newCollect = newsCollect[this.data.newsid];
    //点击的时候，如果收藏则取消，如果未收藏则收藏
    newCollect = !newCollect;
    //更新到本地存储中
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync('newsCollect',newsCollect);
    //更新视图
    this.setData({
      //修改collected
      collected:newsCollect[this.data.newsid]
    })

    wx.showToast({
      title:newsCollect[this.data.newsid] ? "收藏成功" : "取消收藏",
      icon: 'success',
      duration: 800,
      mask:true
    })

  },
  
  onShowTap:function(event){
    /**
     * 
      wx.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
     * 
     */
     wx.showActionSheet({
      itemList: ['分享到微信', '分享到微博', '分享到QQ'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },

  onShareAppMessage: function () {
    return {
      title: newsData.initData[this.data.newsid].title,
      path: '/pages/news/news-detail/news-detail'
    }
  },

  playerMusicTap:function(event){
    var that = this;
    //播放音乐应该判断当前音乐是否在播放
    wx.getBackgroundAudioPlayerState({
       success: function(res) {
         var status = res.status;
         if(status != 1){
          //没有在播放
          wx.playBackgroundAudio({
              dataUrl: newsData.initData[that.data.newsid].music.url,
              title:newsData.initData[that.data.newsid].music.title,
              coverImgUrl: newsData.initData[that.data.newsid].music.coverImg
          })
          that.setData({
            isPlayer:true
          })
         }else{
            wx.pauseBackgroundAudio();
            that.setData({
              isPlayer:false
            })
         }
       }
    })
  }
  
})
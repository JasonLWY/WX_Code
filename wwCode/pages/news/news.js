Page({
  data: {
    logs: []
  },
  notouchme: function () {
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
  onLoad: function () {
    console.log("我加载好了！！！");
  }
})
// pages/movie/movie.js

var app = getApp();
var utils = require("../util/utils.js");

Page({
  data: {
    comingSoon: [],
    inTheaters: [],
    Top250: [],
    searchData:[],
    containerShow: true,
    searchPanelShow: false,
    currentTime:0,
    tempTime:0
  },
  onLoad: function (options) {
    // 定义三种类型数据的url地址
    var inTheaters = app.globalUrl.doubanUrl + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoon = app.globalUrl.doubanUrl + "/v2/movie/coming_soon?start=0&count=3";
    var Top250 = app.globalUrl.doubanUrl + "/v2/movie/top250?start=0&count=3";

    //调用网络请求函数  相当于ajax

    this.http(inTheaters, this.callback, "inTheaters", "正在热映");
    this.http(comingSoon, this.callback, "comingSoon", "即将上映");
    this.http(Top250, this.callback, "Top250", "排行榜");
    wx.showNavigationBarLoading();
  },


  /**
   * url: 请求地址
   * callback：数据回调函数
   * category：请求的数据类型
   * categoryName：类型的标题
   */
  http: function (url, callback, category, categoryName) {
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        callback(res.data, category, categoryName)
      }
    })
  },

  callback: function (res, category, categoryName) {
    //处理数据  数据的过滤存储
    /**
     * 1.大图
     * 2.标题
     * 3.星星
     * 4.评分
     * 5.id
     * 
     * 评星：
     * 10 20 30 40 50
     * 
     * [1,0,0,0,0]
     * 
     * [1,1,1,0,0]
     * 
     */

    //存储各类型的数据
    var movies = [];
    //遍历网络请求数据
    for (var idx in res.subjects) {
      var subject = res.subjects[idx];
      //将页面所需要的数据筛选出来放入到对象temp中
      var temp = {
        title: utils.cutTitleString(subject.title, 0, 6),
        coverageUrl: subject.images.large,
        star: utils.convertToStarsArray(subject.rating.stars),
        average: subject.rating.average,
        movieid: subject.id
      }
      //将对象放入到数组中
      movies.push(temp);
    }

    //问题：因为类型不同
    var readyData = {};
    //注意：key不一样
    readyData[category] = {
      categoryName: categoryName,
      movies: movies
    }
    
    /** 
     * 
     * readyData={
     *  comingSoon: {},
        inTheaters: {},
        Top250: {},
        searchData:{}
     * }
     * 
    */

    //更新数据
    // if(this.data.currentTime){
    this.setData(readyData);
    // }
    wx.hideNavigationBarLoading();
  },
  //跳转到更多页面
  movieMoreTap: function (event) {
    var categoryName = event.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: 'movie-more/movie-more?categoryname=' + categoryName
    })
  },

  goMovieDetail: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?movieid=' + movieId
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  onBindBlur: function (event) {
    var time = new Date().getTime();

    // this.setData({
    //   tempTime:this.data.currentTime
    // })
    //网络请求
    //获取用户输入信息
    var text = event.detail.value;
    //确定url
    var searchUrl = app.globalUrl.doubanUrl+"/v2/movie/search?q="+text;
    this.http(searchUrl,this.callback,"searchData","");
    wx.showNavigationBarLoading();
  },

  onCancelImgTap: function (event) {
    this.setData({
      // searchData:[],
      containerShow: true,
      searchPanelShow: false
    })
  }
  /**
   * 1.每次点击onBindBlur都回生成一个时间戳  1   2 
   * 2.通过中间值做对比
   * 3.最后时间戳为准
   */

})
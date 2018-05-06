var app = getApp();
var utils = require("../../util/utils.js");

Page({
  data:{
    movies:[],
    totalCount:0,
    totalMovies:[],
    isEmpty:true
  },
  onLoad:function(options){
    var categoryName = options.categoryname;
    this.setData({
      categoryName:categoryName
    })

    var publicUrl = app.globalUrl.doubanUrl;
    var allUrl = "";
    switch(options.categoryname){
      case "正在热映":
        allUrl = publicUrl+"/v2/movie/in_theaters";
        break;
      case "即将上映":
        allUrl = publicUrl+"/v2/movie/coming_soon";
        break;
      case "排行榜":
        allUrl = publicUrl+"/v2/movie/top250";
        break;
    }
    this.setData({
      allUrl:allUrl
    })
    //进行网络请求数据
    utils.http(allUrl,this.callback);
    wx.showNavigationBarLoading();
  },

  //下拉刷新
  onPullDownRefresh:function(){
    var refreshUrl = this.data.allUrl;
    this.data.totalMovies = [];
    this.data.isEmpty = true;
    utils.http(refreshUrl,this.callback);
  },


    //上拉加载
  onReachBottom:function(event){
    //上拉刷新的url需要变化 1：start：0   2：start：20   3：start：40  count=20
    var nextUrl = this.data.allUrl+"?start="+this.data.totalCount+"&count=20";
    utils.http(nextUrl,this.callback);
    wx.showNavigationBarLoading();
  },

  callback:function(res){
     //存储各类型的数据
    var movies = [];
    //遍历网络请求数据
    for(var idx in res.subjects){
      var subject = res.subjects[idx];
      //将页面所需要的数据筛选出来放入到对象temp中
      var temp = {
        title : utils.cutTitleString(subject.title,0,6),
        coverageUrl: subject.images.large,
        star:utils.convertToStarsArray(subject.rating.stars),
        average:subject.rating.average,
        movieid:subject.id
      }
      //将对象放入到数组中
      movies.push(temp);
    }
    var totalMovies = [];
    /**
     * concat:合并数组
     * 是不是第一次进入：第一次进入是不需要累加的
     * 
     * 非第一次进入的时候累加
     */
    if(!this.data.isEmpty){
      //非第一次进入    以前更新到data中的movies+刚刚获取的movies
      totalMovies = this.data.movies.concat(movies);
    }else{
      //非第一次进入
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies:totalMovies
    })
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
  },

  //设置导航条
  onReady:function(){
    wx.setNavigationBarTitle({
      title: this.data.categoryName
    })
  },

  goMovieDetail:function(event){
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?movieid='+movieId
    })
  }

})
var app = getApp();
var utils = require("../../util/utils.js");

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var movieId = options.movieid
    //url地址
    var detailMovieUrl = app.globalUrl.doubanUrl + "/v2/movie/subject/" + movieId;
    utils.http(detailMovieUrl, this.callback);
  },

  callback: function (data) {
    /*
          1.电影图片：movieImg
          2.制片国家/地区：country
          3.电影名称：title
          4.繁体名称：original_title
          5.想看人数：wish_count
          6.短评数量：commentCount
          7.年代：year
          8.电影类型：generes
          9.评星：stars
          10.评分：score
          11.导演:director
          12.主演：casts
          13.主演信息：castsInfo
          14.简介：summary
      */
    //在整理数据之前，需要对字段进行判断，因为有些字段可能没有
    if (!data) {
      return;
    }

    //处理一下导演
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }

    var temp = {
      movieImg: data.images.large,
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres,
      stars: utils.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastsString(data.casts),
      summary: data.summary
    }
    console.log(temp);
    this.setData({
      movie: temp
    })
    wx.setNavigationBarTitle({
      title: utils.cutTitleString(this.data.movie.title,0,6)
    })
  }
})
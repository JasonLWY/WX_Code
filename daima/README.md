# 代码介绍

> 代码思路引入 https://code.it919.cn/2017/11/wx-nba-application/

## 网路请求

 > 网络请求使用小程序的 wx.request+ promise+bluebird 对接口请求方法进行封装,一些列出的代码属于项目的核心代码
utils目录下的fetch.js文件所对应的方法

 ```
       const Promise = require("./bluebird"); //为了兼容问题
        /**
         * 网络请求API接口
         * @param  {String} api    api 根地址
         * @param  {String} path   请求路径
         * @param  {Objece} params 参数
         */
        module.exports = function(api, path, params) {
            wx.showLoading({
                title: "加载中"
            });
            console.log(`${api}/${path}`);
            console.log(params);
            return new Promise((resolve, reject) => {
                wx.request({
                    url: `${api}/${path}`,
                    data: Object.assign({}, params), //如果这里需要合并签名时间戳参数时候可以这么写
                    header: { "Content-Type": "json" },
                    success: function(res) {
                        resolve(res);
                        wx.hideLoading();
                    },
                    fail: function(err) {
                        wx.hideLoading();
                        reject(err);
                          }
                      });
                  });
              };
  ```
  
#### 接口设置
  
  ```
        const fetch = require("./fetch");
        const API_DOMAIN = "https://api.xxx.cn/api";
        /**
         * @param  {String} 接口地址   
         * @param  {Objece} params 接口参数参数
         */
        function fetchApi(api, params) {
            return fetch(API_DOMAIN, api, params);
        }
        //NBA比赛直播
        function nab_schedule(params) {
            return fetchApi("Nba/schedule", params).then(res => res.data);
        }
        //直播室信息
        function live_detail(params) {
            return fetchApi("Nba/live_detail", params).then(res => res.data);
        }
        //直播内容
        function live_content(params) {
            return fetchApi("Nba/live_content", params).then(res => res.data);
        }
        //球员技术统计
        function technical_statistics(params) {
            return fetchApi("Nba/technical_statistics", params).then(res => res.data);
        }
        //球员详情
        function player_detail(params) {
            return fetchApi("Nba/player_detail", params).then(res => res.data);
        }
        //联盟排名
        function team_rank(params) {
            return fetchApi("Nba/team_rank", params).then(res => res.data);
        }
        //球队信息
        function team_info(params) {
            return fetchApi("Nba/team_info", params).then(res => res.data);
        }
        //球队阵容
        function Lineup(params) {
            return fetchApi("Nba/Lineup", params).then(res => res.data);
        }
        //新闻详情
        function news_info(params) {
            return fetchApi("Nba/news_info", params).then(res => res.data);
        }
        //NBA 新闻快讯
        function news_list(params) {
            return fetchApi("Nba/new_list", params).then(res => res.data);
        }
        //NBA新闻评论
        function news_comments(params) {
            return fetchApi("Nba/news_comments", params).then(res => res.data);
        }
        //关于我
        function website(params) {
            return fetchApi("Nba/website", params).then(res => res.data);
        }
        module.exports = {
            nab_schedule,
            live_detail,
            live_content,
            technical_statistics,
            player_detail,
            team_rank,
            team_info,
            Lineup,
            news_info,
            news_comments,
            news_list,
            website
        };
  ```
### 数据渲染
  
  ```
      //获取应用实例  
      var app = getApp();
      Page({
          data: {
              list: [],
              footer: 0  //footer 底部导航栏切换高亮所要用到的值
          },
          onLoad: function() {
              this.nab_schedule("") //初始化数据
          },
          //ajax 列表请求
          nab_schedule: function(param) {
              var that = this;
              var params = {
                  date: param
              };
              app.api.nab_schedule(params)
                  .then(res => {
                      that.setData({
                          list: res.data.data
                      });
                  })
                  .catch(e => {
                      console.error(e)
                  });
          },
          //选择日期变化请求数据
          selectDate: function(e) {
              this.nab_schedule(e.target.dataset.time);
          },
          //  点击日期组件确定事件  
          bindDateChange: function(e) {
              this.nab_schedule(e.detail.value);
          }
      })
      ////
      新闻详情页面渲染使用到了wxParse，能搞方便的解决渲染HTML转wxml的问题模板页面用import导入、渲染HTML
       <import src="../wxParse/wxParse.wxml" />
        <view class="wxParse">
          <template is="wxParse" data="{{wxParseData:article.nodes}}" />
        </view>
      </view>
  
  ```
> 在接口请求成功时候对res.body进行一个操作处理，使用起来也比较简单

 ```
    onLoad: function (e) {
     var data = {
       docid: e.docid || "D230QPOC0005877U"
     }
     var that = this;
     app.api.news_info(data)
       .then(res => {
         console.log(res);
         that.setData({
           item: res.data
         });
         that.news_comments(data);
         if(res.data && res.data.img.length!=0){
            var replaceStr = "<img src=" + (res.data.img[0])['src'] + ">";
            res.data.body = res.data.body.replace("<!--IMG#0-->", replaceStr);
         }
         WxParse.wxParse('article', 'html', res.data.body, that, 5);

       })
       .catch(e => {
         console.error(e)
         var article = "文章已经删除";
         WxParse.wxParse('article', 'html', article, that, 5);
       });
     }
 ```
#### 小程序内置的图片查看放大组件wx.previewImage，使用该方法可以实现图片放大预览效果功能
  
  ```
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  ```

  
  
  
  
  
  
  
  
  

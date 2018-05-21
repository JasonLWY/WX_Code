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

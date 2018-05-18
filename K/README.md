# 框架API内容归纳

 ### 目录结构 
 
  > 小程序包含一个描述整体程序的 app 和多个描述各自页面的 page,一个小程序主体部分由三个文件组成，必须放在项目的根目录，如下：
  
  | 文件 | 必填 | 用处 |
  | ------------- |:-------------:| -----:|
  | app.js | yes | 小程序逻辑 |
  | app.json | yes | 小程序公共设置 |
  | app.wxss | no | 小程序公共样式 |

  > 一个小程序页面由四个文件组成，分别是：
  
  | 文件类型 | 必填 | 用处 |
  | ------------- |:-------------:| -----:|
  | wxml | yes | 页面结构 |
  | wxss | no  | 页面样式表 |
  | json | no  | 页面配置 |
  | jsss | yes | 页面逻辑 |
  
#### 注意：为了方便开发者减少配置项，描述页面的四个文件必须具有相同的路径与文件名

### 配置
 > app.json文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。
   以下是一个包含了所有配置选项的 app.json ：
    
 ```
     {
       "pages": [
         "pages/index/index",
         "pages/logs/index"
       ],
       "window": {
         "navigationBarTitleText": "Demo"
       },
       "tabBar": {
         "list": [{
           "pagePath": "pages/index/index",
           "text": "首页"
         }, {
           "pagePath": "pages/logs/logs",
           "text": "日志"
         }]
       },
       "networkTimeout": {
         "request": 10000,
         "downloadFile": 10000
       },
       "debug": true
     }
 ```
    
 | 属性 | 类型 | 必填 | 描述 |
 | -------- | -------- | -------- | -------- |
 | pages | String Array | yes | 设置页面路径 |
 | window | Object | no | 设置默认页面的窗口表现 |
 | tabBar | Object | no | 设置底部tab的表现 |
 | networkTimeout | Object | no | 设置网络超时时间 |
 | dbug | Boolean | no | 设置是否开启debug |
   
   
   
      
##### pages(app.json里面的pages配置)
 > 接受一个数组，每一项都是字符串，来指定小程序由哪些页面组成。每一项代表对应页面的【路径+文件名】信息，数组的第一项代表小程序的初始页面。小程序        中新增/减少页面，都需要对 pages 数组进行修改。
      
 ```
     "pages":[
        "pages/index/index",
        "pages/logs/logs",
        "pages/news/news"
        ]
```
     
##### window
 > 用于设置小程序的状态栏、导航条、标题、窗口背景色。
    
 | 属性 | 类型 | 默认值 | 描述 |
 | -------- | :--------: | :--------: | --------: |
 | navigationBarBackgroundColor | 十六进制颜色值 | #000000 | 导航栏背景颜色，如"#000000" |
 | navigationBarTextStyle | String | white | 导航栏标题颜色，仅支持 black/white |
 | navigationBarTitleText | String |  | 	导航栏标题文字内容 |
 | navigationStyle | String | default | 导航栏样式，仅支持 default/custom。custom 模式可自定义导航栏，只保留右上角胶囊状的按钮 |
 | backgroundColor | HexColor | #ffffff | 窗口的背景色 |
 | backgroundTextStyle | String | dark | 下拉 loading 的样式，仅支持 dark/light |
 | .... | ....  | .... | 具体看官网文档 |
   
###### 注：navigationStyle 只在 app.json 中生效。开启 custom 后，低版本客户端需要做好兼容。开发者工具基础库版本切到 1.7.0（不代表最低版本，    只供调试用） 可方便切到旧视觉
   
   ```
    {
     "window":{
       "navigationBarBackgroundColor": "#ffffff",
       "navigationBarTextStyle": "black",
       "navigationBarTitleText": "微信接口功能演示",
       "backgroundColor": "#eeeeee",
       "backgroundTextStyle": "light"
        }
      }
   ```
  
##### tabBar
  
 > 如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对      应页面
   
###### tip 
   
 1. 当设置 position 为 top 时，将不会显示 icon
 2. tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
   
 | 属性 | 类型 | 必填 | 描述 |
 | -------- | :--------: | :--------: | --------: |
 | color | 16进制颜色 | y | tab 上的文字默认颜色 |
 | selectedColor | HexColor | y | tab 上的文字选中时的颜色 |
 | list | String | y | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab |
 | position | string | n | 可选值 bottom、top |
 | ..... | ..... | ..... | 详细看官网 |
    
 > 其中 list 接受一个数组，数组中的每个项都是一个对象，其属性值如下：  
   
 | pagePath | String | yes | 页面路径，必须在 pages 中先定义 |
 | -------- | :--------: | :--------: | --------: |
 | text | String | y | tab 上按钮文字 |
    
 ![sd](https://mp.weixin.qq.com/debug/wxadoc/dev/image/tabbar.png?t=2018516) 
    
##### page.json
    > 每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置。 页面的配置比app.json全局配置简单得多，只是设置 app.json 中的 window 配置项的内容，页面中配置项会覆盖 app.json 的 window 中相同的配置项。页面的.json只能设置 window 相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键，如：
    
    ```
    {
     "navigationBarBackgroundColor": "#ffffff",
     "navigationBarTextStyle": "black",
     "navigationBarTitleText": "微信接口功能演示",
     "backgroundColor": "#eeeeee",
     "backgroundTextStyle": "light"
     }
    ```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  

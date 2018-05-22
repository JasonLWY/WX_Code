## 视图容器

 1. view
 ##### 视图容器 
   
 | 属性名 | 类型 | 默认值 | 说明 |
 | ----- | ----- | ----- | ----- |
 | hover-class | String | none | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 |
 | hover-stop-propagation	| Boolean | false | 指定是否阻止本节点的祖先节点出现点击态 |
 | hover-start-time | Number | 50 | 按住后多久出现点击态，单位毫秒	 |
 | hover-stay-time	| N | 50 | 手指松开后点击态保留时间，单位毫秒 |
    
   ```
     <view class="section">
      <view class="section__title">flex-direction: row</view>
      <view class="flex-wrp" style="flex-direction:row;">
        <view class="flex-item bc_green">1</view>
        <view class="flex-item bc_red">2</view>
        <view class="flex-item bc_blue">3</view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">flex-direction: column</view>
      <view class="flex-wrp" style="height: 300px;flex-direction:column;">
        <view class="flex-item bc_green">1</view>
        <view class="flex-item bc_red">2</view>
        <view class="flex-item bc_blue">3</view>
      </view>
    </view>
   
   ```
   -  如果需要使用滚动视图，请使用 scroll-view
    
 2. scrollview
 
 ##### 可滚动视图区域
 | 属性名 | 类型 | 默认值 | 说明 |
 | ----- | ----- | ----- | ----- |
 | scroll-x | Boolean | false | 允许横向滚动 |
 | .....	| .... | .... | 其他特性看官网https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html |
 
 - 使用竖向滚动时，需要给<scroll-view/>一个固定高度，通过 WXSS 设置 height。
 
 ```
   <view class="section">
      <view class="section__title">vertical scroll</view>
      <scroll-view scroll-y style="height: 200px;" bindscrolltoupper="upper"
        bindscrolltolower="lower" bindscroll="scroll" scroll-into-view="{{toView}}" scroll-top="{{scrollTop}}">
        <view id="green" class="scroll-view-item bc_green"></view>
        <view id="red"  class="scroll-view-item bc_red"></view>
        <view id="yellow" class="scroll-view-item bc_yellow"></view>
        <view id="blue" class="scroll-view-item bc_blue"></view>
      </scroll-view>

      <view class="btn-area">
        <button size="mini" bindtap="tap">click me to scroll into view </button>
        <button size="mini" bindtap="tapMove">click me to scroll</button>
      </view>
    </view>
    <view class="section section_gap">
      <view class="section__title">horizontal scroll</view>
      <scroll-view class="scroll-view_H" scroll-x style="width: 100%">
        <view id="green" class="scroll-view-item_H bc_green"></view>
        <view id="red"  class="scroll-view-item_H bc_red"></view>
        <view id="yellow" class="scroll-view-item_H bc_yellow"></view>
        <view id="blue" class="scroll-view-item_H bc_blue"></view>
      </scroll-view>
    </view>
 ```
 
 ```
    var order = ['red', 'yellow', 'blue', 'green', 'red']
    Page({
      data: {
        toView: 'red',
        scrollTop: 100
      },
      upper: function(e) {
        console.log(e)
      },
      lower: function(e) {
        console.log(e)
      },
      scroll: function(e) {
        console.log(e)
      },
      tap: function(e) {
        for (var i = 0; i < order.length; ++i) {
          if (order[i] === this.data.toView) {
            this.setData({
              toView: order[i + 1]
            })
            break
          }
        }
      },
      tapMove: function(e) {
        this.setData({
          scrollTop: this.data.scrollTop + 10
        })
      }
    })
 ```
 - tip: 请勿在 scroll-view 中使用 textarea、map、canvas、video 组件
 - tip: scroll-into-view 的优先级高于 scroll-top
 - tip: 在滚动 scroll-view 时会阻止页面回弹，所以在 scroll-view 中滚动，是无法触发 onPullDownRefresh
 - tip: 若要使用下拉刷新，请使用页面的滚动，而不是 scroll-view ，这样也能通过点击顶部状态栏回到页面顶部
 
 3. swiper
 ##### 滑块视图容器
 | 属性名 | 类型 | 默认值 | 说明 |
 | ----- | ----- | ----- | ----- |
 | indicator-dots | Boolean | false | 是否显示面板指示点	 |
 | .....	| .... | .... | 其他特性看官网https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html |
 
 ###### 从 1.4.0 开始，change事件返回detail中包含一个source字段，表示导致变更的原因，可能值如下：
  - autoplay 自动播放导致swiper变化
  - touch 用户划动引起swiper变化；
  - 其他原因将用空字符串表示
 
 - 其中只可放置<swiper-item/>组件，否则会导致未定义的行为。
 
 ###### swiper-item
  - 仅可放置在<swiper/>组件中，宽高自动设置为100%。
  
 ```
    <swiper indicator-dots="{{indicatorDots}}"
    autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">
    <block wx:for="{{imgUrls}}">
      <swiper-item>
        <image src="{{item}}" class="slide-image" width="355" height="150"/>
      </swiper-item>
    </block>
  </swiper>
  <button bindtap="changeIndicatorDots"> indicator-dots </button>
  <button bindtap="changeAutoplay"> autoplay </button>
  <slider bindchange="intervalChange" show-value min="500" max="2000"/> interval
  <slider bindchange="durationChange" show-value min="1000" max="10000"/> duration
 ```
 
 ```
  Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
       ],
       indicatorDots: false,
       autoplay: false,
       interval: 5000,
       duration: 1000
     },
     changeIndicatorDots: function(e) {
       this.setData({
         indicatorDots: !this.data.indicatorDots
       })
     },
     changeAutoplay: function(e) {
       this.setData({
         autoplay: !this.data.autoplay
       })
     },
     intervalChange: function(e) {
       this.setData({
         interval: e.detail.value
       })
     },
     durationChange: function(e) {
       this.setData({
         duration: e.detail.value
       })
     }
   })
 ```
 
 -  如果在 bindchange 的事件回调函数中使用 setData 改变 current 值，则有可能导致 setData 被不停地调用，因而通常情况下请在改变 current 值前检测 source 字段来判断是否是由于用户触摸引起
 
 4. movable-view
 > 可移动的视图容器，在页面中可以拖拽滑动
 
 - movable-view必须在<movable-area/>组件中，并且必须是直接子节点，否则不能移动。
 5. cover-view
 
 > 覆盖在原生组件之上的文本视图，可覆盖的原生组件包括map、video、canvas、camera，只支持嵌套cover-view、cover-image。
 
 -少用
 ###### cover-image
 
 - 覆盖在原生组件之上的图片视图，可覆盖的原生组件同cover-view，支持嵌套在cover-view里。
 
 -少用
 
 
 
 
 

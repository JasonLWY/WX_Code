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
 | .....	| .... | .... | 其他特性看官网 |
 
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
 
 4. movable-view
 
 5. cover-view
 
 
 

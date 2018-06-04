# data操作
#### wxml

```
    <view class="container">
      <view wx:for="{{list}}" wx:key="this" style="padding: 10px 0;border-bottom: 1px solid #ddd;">
          <view>
              {{index+1}}、{{item.name}}
          </view>
          <view class="textright font12" style="color: #2A53CD;">
               <text bindtap="remove" data-index="{{index}}" class="marlr10">删除</text>   
               <text bindtap="edit" data-index="{{index}}" >修改</text>
          </view>
      </view>
      <button class="martop20" bindtap="add_before">
          向前插入数组
      </button>
      <button class="martop20" bindtap="add_after">
          向后插入数组
      </button>
      <button class="martop20" bindtap="clear">
          清空数组
      </button>
      </view>
```
#### wxss
```
    .userinfo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .userinfo-avatar {
      width: 128rpx;
      height: 128rpx;
      margin: 20rpx;
      border-radius: 50%;
    }

    .userinfo-nickname {
      color: #aaa;
    }

    .usermotto {
      margin-top: 200px;
    }
```
#### index.js
```
    //index.js
    //获取应用实例
      var app = getApp()
      Page({
        data: {
              list:[{
                      id:1,
                      name:'应季鲜果',
                      count:1
              },{
                      id:2,
                      name:'精致糕点',
                      count:6
              },{
                      id:3,
                      name:'全球美食烘培原料',
                      count:12
              },{
                      id:4,
                      name:'无辣不欢生猛海鲜',
                      count:5
              }]
        },
        //向前增加数据
        add_before:function (){
            //要增加的数组
            var newarray = [{
                    id:6,
                    name:'向前增加数据--'+new Date().getTime() ,
                    count:89
            }];
              this.data.list = newarray.concat(this.data.list);
            this.setData({
                'list':    this.data.list
            });
        },
        //向后增加数据
        add_after:function (){

                //要增加的数组
            var newarray = [{
                    id:5,
                    name:'向后增加数据--'+new Date().getTime() ,
                    count:89
            }];
            this.setData({
                'list':this.data.list.concat(newarray)
            });
        },
        //删除
        remove:function (e){

            var dataset = e.target.dataset;
            var Index = dataset.index; //拿到是第几个数组

            this.data.list.splice(Index,1);

            this.setData({
                list:this.data.list
            });
        },
        //修改
        edit:function (e){
            var dataset = e.target.dataset;
            var Index = dataset.index; //拿到是第几个数组
            this.data.list[Index].name = '修改了内容'+new Date().getTime();

            this.setData({
                list:this.data.list
            });
        },
        //清空
        clear:function (){

            this.setData({
                list:[]
            });
        }
      })
```




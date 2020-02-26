# sticky

粘性布局组件。Sticky 组件与 CSS 中 `position: sticky` 属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

## 属性列表

| 属性       | 类型        | 默认值 | 必填 | 说明                                                      |
| ---------- | ----------- | ------ | ---- | --------------------------------------------------------- |
| offset-top | Number      | 0      | 否   | 吸顶时与顶部的距离，单位px                                |
| z-index    | Number      | 99     | 否   | 吸顶时的 z-index                                          |
| container  | function    | null   | 否   | 一个函数，返回容器对应的 NodesRef 节点                    |
| disabled   | Boolean     | false  | 否   | 是否禁用                                                  |
| bindscroll | eventhandle |        | 否   | 滚动时触发，{scrollTop: 距离顶部位置, isFixed: 是否吸顶 } |

### 示例代码

{% minicode('oz1sQqm77Gfs') %}

### 代码演示

#### 吸顶距离
通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离

```html
<mp-sticky offset-top="32">
  <button size="mini" type="primary" style="margin-left: 115px; background-color: #1989fa">吸顶距离</button>
</mp-sticky>
```

#### 指定容器

通过 `container` 属性可以指定组件的容器，页面滚动时，组件会始终保持在容器范围内，当组件即将超出容器底部时，会返回原位置。

```html
<view id="container" style="height: 250px; background-color: #E0E0E0;">
  <view style="height: 100px; background-color: #FFFF99;"></view>
  <mp-sticky container="{{container}}" offset-top="64">
    <button size="mini" type="primary" style="margin-left: 215px; background-color: #ff976a">指定容器</button>
  </mp-sticky>
</view>
```
```js
Page({
  data: {
    container: null
  },

  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select('#container')
    })
  }
})
```
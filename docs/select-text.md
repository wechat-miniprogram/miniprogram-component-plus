# select-text

可选文本组件。该组件有两种使用模式：长按出现选区，与浏览器默认效果一致；长按出现复制按钮，点击复制拷贝全部内容至剪贴板，常见于聊天对话框等场景。

需注意的时，为实现点击其它区域隐藏复制按钮，开发者可在页面最外层监听 `tap` 事件，并将 `evt` 对象赋值给 `on-document-tap`。

### 示例代码

{% minicode('O5zWgRmV7zfR') %}

## 属性列表

| 属性            | 类型    | 默认值  | 必填 | 说明                   |
| --------------- | ------- | ------- | ---- | ---------------------- |
| value           | String  |         | 是   | 文本组件内容           |
| space           | String  |         | 否   | 显示连续空格           |
| decode          | Boolean | false   | 否   | 是否解码               |
| show-copy-btn   | Boolean | false   | 否   | 长按显示复制按钮       |
| z-index         | Number  | 99      | 否   | 复制按钮的层级         |
| active-bg-color | String  | #DEDEDE | 否   | 长按复制时文本区背景色 |
| on-document-tap | Object  | 否      | 否   | 页面监听事件           |



#### space 的合法值

| 属性 | 类型                   |
| ---- | ---------------------- |
| ensp | 中文字符空格一半大小   |
| emsp | 中文字符空格大小       |
| nbsp | 根据字体设置的空格大小 |

### 代码演示

```html
<view bind:tap="handleTap">
  <view class="demo-block">
    <block wx:for="{{arr}}" wx:key="placement">
      <view class="list-item">
        <mp-select-text 
          show-copy-btn 
          placement="{{item.placement}}" 
          value="{{item.value}}" 
          data-id="{{index}}" 
          on-document-tap="{{evt}}"
        >
        </mp-select-text>
      </view>
    </block>
    <view class="list-item">
      <mp-select-text value="默认的长按效果与浏览器一致"></mp-select-text>
    </view>
  </view>
</view>
```

```js
Page({
  data: {
    arr: [{
      value: '长按，上侧复制',
      placement: 'top'
    },
    {
      value: '长按，右侧复制',
      placement: 'right'
    },
    {
      value: '长按，左侧复制',
      placement: 'left'
    },
    {
      value: '长按，下侧复制',
      placement: 'bottom'
    }]
  },

  handleTap(e) {
    this.setData({ evt: e })
  }
})
```
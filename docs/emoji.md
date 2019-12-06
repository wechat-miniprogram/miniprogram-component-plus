# emoji

微信表情组件。

## 效果示例

![alt emoji](./img/emoji.png#width:300px)

## 属性列表

| 属性            | 类型        | 默认值 | 必填 | 说明                             |
| --------------- | ----------- | ------ | ---- | -------------------------------- |
| height          | number      | 290    | 否   | 表情盘高度                       |
| show-del        | boolean     | true   | 否   | 是否显示删除按钮                 |
| show-history    | boolean     | true   | 否   | 是否显示最近使用                 |
| bindinsertemoji | eventhandle |        | 否   | 插入表情，e.detail={emotionName} |
| binddelemoji    | eventhandle |        | 否   | 点击删除按钮                     |

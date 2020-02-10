# vtabs

纵向选项卡组件。

## 属性列表

| 属性                 | 类型    | 默认值  | 必填 | 说明                   |
| -------------------- | ------- | ------- | ---- | ---------------------- |
| vtabs                | Array   | []      | 是   | 数据项格式为 `{title}` |
| tabBarClass          | String  |         | 否   | 选项卡样式             |
| activeClass          | String  |         | 否   | 选中项样式             |
| tabLineColor         | String  | #ff0000 | 否   | 选中项侧划线颜色       |
| tabInactiveTextColor | String  | #000000 | 否   | 未选中项字体颜色       |
| tabActiveTextColor   | String  | #ff0000 | 否   | 选中项字体颜色         |
| tabInactiveBgColor   | String  | #eeeeee | 否   | 未选中项背景色         |
| tabActiveBgColor     | String  | #ffffff | 否   | 选中项背景色           |
| activeTab            | Number  | 0       | 否   | 激活 tab 索引          |
| animation            | Boolean | true    | 否   | 是否开启动画           |

### 示例代码

{% minicode('SG4tK2mD77f7') %}
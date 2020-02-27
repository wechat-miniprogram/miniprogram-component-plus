# vtabs

纵向选项卡组件，需与 `<vtabs-content>` 组件结合使用。

## 属性列表

| 属性                 | 类型        | 默认值  | 必填 | 说明                                              |
| -------------------- | ----------- | ------- | ---- | ------------------------------------------------- |
| vtabs                | Array       | []      | 是   | 数据项格式为 `{title}`                            |
| active-tab            | Number      | 0       | 否   | 激活 tab 索引                                     |
| tab-bar-class          | String      |         | 否   | 选项卡样式                                        |
| active-class          | String      |         | 否   | 选中项样式                                        |
| tab-line-color         | String      | #ff0000 | 否   | 选中项侧划线颜色                                  |
| tab-inactive-text-color | String      | #000000 | 否   | 未选中项字体颜色                                  |
| tab-active-text-color   | String      | #ff0000 | 否   | 选中项字体颜色                                    |
| tab-inactive-bg-color   | String      | #eeeeee | 否   | 未选中项背景色                                    |
| tab-active-bg-color     | String      | #ffffff | 否   | 选中项背景色                                      |
| animation            | Boolean     | true    | 否   | 是否开启动画                                      |
| bindtabclick         | eventhandle |         | 否   | 点击 tab 时触发，e.detail={index}                 |
| bindchange           | eventhandle |         | 否   | 内容区域滚动导致 tab 变化时触发, e.detail={index} |

## vtabs-content

纵向选项卡内容。

| 属性     | 类型   | 默认值 | 必填 | 说明                      |
| -------- | ------ | ------ | ---- | ------------------------- |
| tab-index | Number | 0      | 是   | vtabs 数据索引（从0开始） |

### 示例代码

{% minicode('SG4tK2mD77f7') %}
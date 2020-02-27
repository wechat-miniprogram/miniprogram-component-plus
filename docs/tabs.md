# tabs

选项卡组件。

## 属性列表

| 属性                 | 类型        | 默认值  | 必填 | 说明                                              |
| -------------------- | ----------- | ------- | ---- | ------------------------------------------------- |
| tabs                 | Array       | []      | 是   | 数据项格式为 `{title}`                            |
| tab-class             | String      |         | 否   | 选项卡样式                                        |
| swiper-class          | String      |         | 否   | 内容区域 swiper 的样式                            |
| active-class          | String      |         | 否   | 选中项样式                                        |
| tab-underline-color    | String      | #07c160 | 否   | 选中项下划线颜色                                  |
| tab-active-text-color   | String      | #000000 | 否   | 选中项字体颜色                                    |
| tab-inactive-text-color | String      | #000000 | 否   | 未选中项字体颜色                                  |
| tab-background-color   | String      | #ffffff | 否   | 选项卡背景颜色                                    |
| active-tab            | Number      | 0       | 否   | 激活 tab 索引                                     |
| duration             | Number      | 500     | 否   | 内容区域切换时长                                  |
| bindtabclick         | eventhandle |         | 否   | 点击 tab 时触发，e.detail={index}                 |
| bindchange           | eventhandle |         | 否   | 内容区域滚动导致 tab 变化时触发, e.detail={index} |

### 注意事项
 - 内容区域采用 `<swiper>`进行滚动，超出部分将被隐藏，需设置 `swiperClass` 的高度与子元素一致。
 - 内容区域子元素需指定 `slot=tab-content-index`，其中 index 为选项卡的下标（从0开始）。

### 示例代码

{% minicode('7JZHVmm27QeD') %}
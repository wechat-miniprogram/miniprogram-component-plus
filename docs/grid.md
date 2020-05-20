# row/col 组件

按照栅格化布局思路，再加上响应式布局的特性，提供了 row/col 两个基础布局组件，用来帮助开发者快速适配多屏应用。

核心概念是将整个屏幕宽度分为 **24** 单位，每个单位的大小，由当前屏幕尺寸决定的。例如 375px 的屏幕宽度，那么 1 unit = 375/24 px.

## row 组件属性

默认无

## col 组件属性

| 属性             | 类型        | 默认值  | 必填 | 说明                             |
| ---------------- | ----------- | ------- | ---- | -------------------------------- |
| span           | number      |    24     | 否   | 当前 col 所占屏幕宽度的份数|
| offset           | number      | 0     | 否   | 距 row 左侧偏移margin 距离|
| push           | number      | 0     | 否   | 距左侧偏移的单位距离|
| pull           | number      | 0     | 否   | 距右侧偏移的单位距离|
| xs           | `number\|Object<span,offset>`     |      | 否   | 当屏幕 < 768px 时，对应显示的网格规则。例如 xs="{{2}}" 或 xs="{{ {{span:24, offset: 0}} }}"|
| sm           | `number\|Object<span,offset>`      |      | 否   | 当屏幕 >= 768px, <992px，对应显示的网格规则。|
| md           | `number\|Object<span,offset>`      |      | 否   | 当屏幕 >= 992px, <1200px，对应显示的网格规则。|
| lg           | `number\|Object<span,offset>`      |      | 否   | 当屏幕 >= 1200px, <1920px 时，对应显示的网格规则。|
| xl           | `number\|Object<span,offset>`      |      | 否   | 当屏幕 >= 1920px 时，对应显示的网格规则。|


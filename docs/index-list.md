# index-list

索引列表组件，可实现类似通讯录效果。组件内节点将被添加到列表上方。

列表支持多选。如果将```selecting```属性置为```true```，列表就会进入可选择状态,。如果将```selecting```属性置为```false```，列表就会退出可选择状态，同时发送```bindselect```事件。

## 属性列表

| 属性       | 类型             | 默认值  | 必填 | 说明                                                 |
| ---------- | ---------------- | ------ | ---- | --------------------------------------------------- |
| list       | Array\<listItem> | []     | 是   | 列表数据                                             |
| vibrated   | boolean          | true   | 否   | 索引上滑动时是否产生振动，仅 iOS 生效                  |
| selecting  | boolean          | false  | 否   | 列表是否为可选择状态                                  |
| bindchoose | eventhandle      |        | 否   | 单击列表项, e.detail={item:subItem}                  |
| bindselect | eventhandle      |        | 否   | 列表退出选择状态, e.detail={selected:Array\<subItem>} |

### listItem 对象的属性列表

| 属性     | 类型            | 说明         |
| -------- | --------------- | ------------ |
| alpha    | string          | 首字母（大写） |
| subItems | Array\<subItem> | 子元素集合   |

### subItem 对象的属性列表

| 属性     | 类型   | 必填 | 说明          |
| -------- | ------- | -- | ------------ |
| name     | string  | 是 | 名称          |
| selected | boolean | 否 | 是否已经被选择 |
| disabled | boolean | 否 | 是否可以被选择 |

### 注意事项

1. demo 中省市信息由腾讯位置服务获取，开发者需替换QQMapKey为自身小程序绑定的key。

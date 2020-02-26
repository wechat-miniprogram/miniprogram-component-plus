# index-list

索引列表组件，可实现类似通讯录效果。组件内节点将被添加到列表上方。

## 属性列表

| 属性       | 类型            | 默认值 | 必填 | 说明                                  |
| ---------- | --------------- | ------ | ---- | ------------------------------------- |
| list       | Array<listItem> | []     | 是   | 列表数据                              |
| vibrated   | boolean         | true   | 否   | 索引上滑动时是否产生振动，仅 iOS 生效 |
| bindchoose | eventhandle     |      |   否   | 选择列表项, e.detail={name}           |

### listItem 属性列表

| 属性     | 类型           | 说明         |
| -------- | -------------- | ------------ |
| alpha    | string         | 首字母(大写) |
| subItems | Array<subItem> | 子元素集合   |

### subItem 属性列表

| 属性 | 类型   | 说明 |
| ---- | ------ | ---- |
| name | string | 名称 |

### 注意事项

1. demo 中省市信息由腾讯位置服务获取，开发者需替换QQMapKey为自身小程序绑定的key。

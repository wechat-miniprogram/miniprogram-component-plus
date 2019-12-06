# 小程序拓展组件库

拓展组件是对小程序内置组件能力的补充，包括一些常见的功能组件，持续补充中。如果业务中有比较通用的场景，欢迎大家在页面反馈中提需求。

## 如何使用

以 video-swiper 组件为例，进行说明。

### 1. 引入组件
```
npm i @miniprogram-component-plus/video-swiper --save
```

### 2. 开发者工具构建 npm，勾选“使用 npm 模块”，参考 [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)


### 3. 页面 json 文件中加入 usingComponents 字段
```
{
  "usingComponents": {
    "mp-video-swiper": "@miniprogram-component-plus/video-swiper"
  }
}
```

### 4. 页面 wxml 中使用该组件
```
<mp-video-swiper video-list="{{list}}"></mp-video-swiper>
```

## 修改组件内部样式
每个组件可以设置 `ext-class` 这个属性，该属性提供设置在组件 WXML 顶部元素的 class，组件的 `addGlobalClass的options`  都设置为true，所以可以在页面设置 wxss 样式来覆盖组件的内部样式。需要注意的是，如果要覆盖组件内部样式，必须 wxss 的样式选择器的优先级比组件内部样式优先级高。 `addGlobalClass` 在基础库2.2.3开始支持。
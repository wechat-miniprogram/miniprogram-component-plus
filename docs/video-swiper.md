# video-swiper

视频滑动切换组件，可实现类似微视无限视频列表效果。

## 效果示例

![alt video-swiper](./img/video-swiper.png#width:300px)

## 使用说明

video-list 的长度应当不低于 3 个，当滚动到首项或者尾项后，会进入循环。通过 setData 更改 video-list，会直接追加到之前的视频源中。可监听 bindchange 事件获取当前滚动到那一个视频，activeId 为视频源的唯一 id。

## 属性列表

| 属性               | 类型                   | 默认值  | 必填 | 说明                                                                       |
| ------------------ | ---------------------- | ------- | ---- | -------------------------------------------------------------------------- |
| duration           | number                 | 500     | 否   | 滑动动画时长                                                               |
| easing-function    | string                 | default | 否   | 切换缓动动画类型                                                           |
| loop               | boolean                | true    | 否   | 是否循环播放                                                               |
| video-list         | Array<VideoSwiperItem> | []      | true | 视频源                                                                     |
| bindchange         | eventhandle            | 否      |      | 滑动切换完成时触发, e.detail={activeId}                                    |
| bindplay           | eventhandle            | 否      |      | 开始/继续播放时触发, e.detail={activeId}                                   |
| bindpause          | eventhandle            | 否      |      | 暂停播放时触发, e.detail={activeId}                                        |
| bindended          | eventhandle            | 否      |      | 播放到末尾时触发, e.detail={activeId}                                      |
| bindtimeupdate     | eventhandle            | 否      |      | 播放进度变化时触发，event.detail = {currentTime, duration, activeId}       |
| bindwaiting        | eventhandle            | 否      |      | 视频出现缓冲时触发, e.detail={activeId}                                    |
| binderror          | eventhandle            | 否      |      | 视频播放出错时触发, e.detail={activeId}                                    |
| bindprogress       | eventhandle            | 否      |      | 加载进度变化时触发，只支持一段加载。event.detail={buffered, activeId}      |
| bindloadedmetadata | eventhandle            | 否      |      | 视频元数据加载完成时触发。event.detail={width, height, duration, activeId} |

### VideoSwiperItem 属性列表

| 属性      | 说明                                                |
| --------- | --------------------------------------------------- |
| id        | 每个视频源的唯一 id                                 |
| url       | 视频播放地址                                        |
| objectFit | 当视频大小与 video 容器大小不一致时，视频的表现形式 |

### objectFit 的合法值

| 属性    | 说明 |
| ------- | ---- |
| contain | 包含 |
| fill    | 填充 |
| cover   | 覆盖 |

### easing-function 的合法值

| 属性           | 说明         |
| -------------- | ------------ |
| default        | 默认缓动函数 |
| linear         | 线性动画     |
| easeInCubic    | 缓入动画     |
| easeOutCubic   | 缓出动画     |
| easeInOutCubic | 缓入缓出动画 |

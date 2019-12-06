## 弹幕库
canvas 实现的弹幕组件库
![image.png](/uploads/2253A113AF8A46598995CCA4EA11F55A/image.png)

### 使用
```
import Barrage from 'barrage'
const barrage = new Barrage(canvas, {
  font: '16px sans-serif',
  duration: 3,
  lineHeight:2,
  mode: 'overlap'
})

barrage.open()
const data = mockData(200)
barrage.addData(data)
this.timer = setInterval(() => {
  const data = mockData(200)
  barrage.addData(data)
}, 4000)
```

### 配置

#### Barrage 默认配置
```
{
  font: '10px sans-serif', // 字体
  fillStyle: '#000000', // 全局字体颜色
  alpha: 0.75, // 全局透明度
  duration: 5, // 屏幕停留时长
  lineHeight: 1.2, // 弹幕行高
  padding: [10, 0, 10, 0], // 弹幕区留白
  tunnelMaxNum: 10, // 隧道最大缓冲长度，值越大，新的弹幕更新越慢
  maxLength: 20, // 弹幕最大长度
  safeArea: 4, // 相邻弹幕的安全间隔
  mode: 'overlap', // 弹幕模式，overlap(重叠 )  separate(不重叠)
  range: [0, 1], // 弹幕垂直显示范围，支持两个值。[0,1]表示弹幕整个随机分布，
  tunnelShow: false // 显示轨道线
}
```

#### 弹幕数据配置
```
{
  fillStyle: '#000000', // 默认黑色
  content: '', // 弹幕内容
  images: [] // 
}

// 弹幕图片结构
{
  image, // 图片资源
  dWidth, // 绘制宽度
  dHeight, // 绘制高度
  position // 显示位置，弹幕开头(head)、结尾(tail)
  gap // 与弹幕文字的距离，默认4
}
```

### 接口
```
barrage.open() // 开启弹幕功能
barrage.close() // 关闭弹幕功能，清空弹幕
barrage.pause() // 暂停弹幕
barrage.play() // 播放弹幕
barrage.addData() // 添加弹幕数据
barrage.setRange() // 设置垂直方向显示范围
barrage.setFont() // 设置全局字体
barrage.setAlpha() // 设置全局透明度
barrage.showTunnel() // 显示弹幕轨道
barrage.hideTunnel() // 隐藏弹幕轨道
```

### 实现原理
![图片.](/uploads/C6CC193BD06849799A1511F5F35436CA/图片.)

角色划分： barrage（控制中心）、tunnel（弹幕轨道）、bullet（弹幕）

任务划分：控制中心负责划分轨道和添加数据、轨道负责每条弹幕的发送和存储-

#### 初始化

1. 根据字体大小和行高，确定轨道高度、数量
2. 创建轨道对象，存储至tunnels（全部轨道）、enableTunnels（可用轨道）、idleTunnels（空闲轨道）

#### 弹幕加入逻辑

轨道采用双队列存储，nextQueue（待发送队列）和 activeQueue（发送中队列）
nextQueue 默认最大长度 maxNum 为10， maxNum 越大，弹幕更新的越慢（旧的弹幕太多了）

![image.png](/uploads/DBC8C739F01A4B30BCDDBAA915888E6B/image.png)

#### 弹幕发送逻辑

对于每个轨道，每帧动画中遍历 activeQueue 中的弹幕，改变文字位置即可。主要逻辑如下：
```
animate() {
    if (this.disabled) return
    // 无正在发送弹幕，添加一条
    const nextQueue = this.nextQueue
    const activeQueue = this.activeQueue
    if (!this.sending && nextQueue.length > 0) {
      const bullet = nextQueue.shift()
      activeQueue.push(bullet)
      this.freeNum++
      this.sending = true
      this.barrage.addIdleTunnel(this.tunnelId)
    }
    
    if (activeQueue.length > 0) {
      activeQueue.forEach(bullet => bullet.move())
      const head = activeQueue[0]
      const tail = activeQueue[activeQueue.length - 1]
      // 队首移出屏幕
      if (head.x + head.textWidth< 0) {
        activeQueue.shift()
      }
      // 队尾离开超过安全区
      if (tail.x + tail.textWidth + this.safeArea < this.width) {
        this.sending = false
      }
    }
}
```
#### 无碰撞弹幕
若每条轨道弹幕的速度均一致，则不会发生碰撞，弹幕的速度 = 移动距离 / 设定的周期。

overlap 模式：同一行中，弹幕可能重叠，字数多的弹幕移动快，字数少的移动慢
separate 模式：同一行中，每条弹幕以相同速度移动。

两种模式的不同在于移动距离的计算， overlap 模式中 移动距离 = 画布宽度 + 弹幕宽度

#### 高分屏字体模糊

与设备像素比 devicePixelRatio 有关。解决方法是画布宽高 * ratio，然后 ctx.scale(ratio, ratio) 倍即可。

### 增强功能（看需求再开发）
1. 允许弹幕有不同的大小，难点在于避免重叠
2. 点击弹时暂停，设置点赞+1等





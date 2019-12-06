import emojiData from './emoji_data'
import emojiPanelData from './emoji_panel_data'


// padding & size 跟 less 文件对应
const PADDING = 15
const EMOTION_SIZE = 40

const emotionMap = {}
const emotionNames = []

emojiData.forEach(item => {
  emotionMap[item.id] = item
  emotionNames.push(item.cn)
})
const emotions = [] // 对应顺序的表情名称
emojiPanelData.forEach(id => emotions.push(emotionMap[id]))


Component({
  options: {
    addGlobalClass: true,
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  properties: {
    showDel: {
      type: Boolean,
      value: true
    },
    showHistory: {
      type: Boolean,
      value: true
    },
    height: {
      type: Number,
      value: 290
    }
  },
  data: {
    emojiPicture: 'http://q1b7ehu5b.bkt.clouddn.com/emoji-sprite-2.png',
    history: [],
    emotions,
    extraPadding: 0,
    _perLine: 0,
  },
  lifetimes: {
    attached() {
      const data: any = this.data
      const areaWidth = wx.getSystemInfoSync().windowWidth
      data._perLine = Math.floor((areaWidth - PADDING * 2) / EMOTION_SIZE)
      const extraPadding = Math.floor((areaWidth - PADDING * 2 - data._perLine * EMOTION_SIZE) / 2)
      this.setData({extraPadding})
    },
  },
  methods: {
    insertEmoji(evt) {
      const data: any = this.data
      const idx = evt.currentTarget.dataset.idx
      const emotionName = data.emotions[idx].cn
      this.LRUCache(data.history, data._perLine, idx)  
      this.setData({history: data.history})
      this.triggerEvent('insertemoji', {emotionName: emotionName})
    },
    deleteEmoji(evt) {
      this.triggerEvent('delemoji')
    },
    LRUCache(arr: any[], limit: number, data: any) {
      const idx = arr.indexOf(data)
      if (idx >= 0) {
        arr.splice(idx, 1)
        arr.unshift(data)
      } else if (arr.length < limit) {
        arr.push(data)
      } else if (arr.length === limit) {
        arr[limit - 1] = data
      } 
    }
  }
})


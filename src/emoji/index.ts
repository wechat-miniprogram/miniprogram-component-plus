import emojiData from './emoji_data'
import emojiPanelData from './emoji_panel_data'
import {parseEmoji} from './parser'

// size 跟 less 文件对应
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
    styleIsolation: 'page-shared',
    addGlobalClass: true,
    pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
  },
  properties: {
    padding: {
      type: Number,
      value: 15
    },

    backgroundColor: {
      type: String,
      value: '#EDEDED'
    },

    showSend: {
      type: Boolean,
      value: true
    },

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
      value: 300
    },

    source: {
      type: String,
      value: ''
    }
  },

  data: {
    history: [],
    emotions,
    extraPadding: 0,
    perLine: 0
  },

  lifetimes: {
    attached() {
      const padding = this.data.padding
      const systemInfo = wx.getSystemInfoSync()
      const areaWidth = systemInfo.windowWidth
      // 这里的 45 为虚拟的表情宽度
      const perLine = Math.floor((areaWidth - padding * 2) / 45)
      const extraPadding = Math.floor((areaWidth - padding * 2 - perLine * EMOTION_SIZE) / (perLine - 1))
      this.setData({
        perLine,
        extraPadding,
        hasSafeBottom: systemInfo.model.indexOf('iPhone X') >= 0
      })
    },
  },
  
  methods: {
    getEmojiNames() {
      return emotionNames
    },

    parseEmoji,

    insertEmoji(evt) {
      const data = this.data
      const idx = evt.currentTarget.dataset.idx
      const emotionName = data.emotions[idx].cn
      this.LRUCache(data.history, data.perLine, idx)  
      this.setData({history: data.history})
      this.triggerEvent('insertemoji', {emotionName: emotionName})
    },

    deleteEmoji() {
      this.triggerEvent('delemoji')
    },

    send() {
      this.triggerEvent('send')
    },

    LRUCache(arr, limit, data) {
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

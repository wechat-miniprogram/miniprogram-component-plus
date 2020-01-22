Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    vtabs: {type: Array, value: []}, // 数据项格式为 `{title, anchor}`
    tabBarClass: {type: String, value: ''}, // tabBar 样式
    activeClass: {type: String, value: ''}, // tabBar 选中项样式
    tabBarLineColor: {type: String, value: '#ff0000'}, // tabBar 侧划线颜色
    tabBarInactiveTextColor: {type: String, value: '#000000'}, // tabBar 非激活 Tab 文字颜色
    tabBarActiveTextColor: {type: String, value: '#ff0000'}, // tabBar 激活 Tab 文字颜色
    tabBarInactiveBgColor: {type: String, value: '#eeeeee'}, // tabBar 非激活状态背景色
    tabBarActiveBgColor: {type: String, value: '#ffffff'}, // tabBar 激活状态背景色
    activeTab: {type: Number, value: 0}, // 当前激活tab
    animation: {type: Boolean, value: true}, // 选项卡滚动时是否带动画

  },
  data: {
    currentView: 0,
    _heightRecords: []
  },

  observers: {
    activeTab: function(activeTab) {
      this.scrollTabBar(activeTab)
    }
  },

  lifetimes: {
    attached() {
      setTimeout(() => {
        this.calculateHeight()

      }, 3000)      
    }
  },

  methods: {
    calculateHeight() {
      const query = this.createSelectorQuery()
      query.selectAll('.weui-vtabs-content>>>.weui-vtabs-content__item').boundingClientRect((rects) => {
          const _heightRecords = []
          let temp = 0
          for (const rect of rects) {
            const height = rect.height + temp
            _heightRecords.push(height)
            temp = height
          }
          console.log('_heightRecords', rects)
          this.data._heightRecords = _heightRecords
      }).exec()
    },

    scrollTabBar(index) {
      const len = this.data.vtabs.length
      if (len === 0) return

      let currentView = index < 6 ? 0 : index - 5
      if (currentView >= len) currentView = len - 1
      this.setData({currentView})
    },

    handleTabClick(e) {
      const index = e.currentTarget.dataset.index
      this.setData({activeTab: index})
      this.triggerEvent('tabclick', {index})
    },

    handleContentScroll(e) {
      const scrollTop = e.detail.scrollTop
      // console.log('scrollTop', scrollTop)
    }
  }
})
  

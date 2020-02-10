Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    vtabs: {type: Array, value: []}, // 数据项格式为 `{title}`
    tabBarClass: {type: String, value: ''}, // tabBar 样式
    activeClass: {type: String, value: ''}, // tabBar 选中项样式
    tabLineColor: {type: String, value: '#ff0000'}, // tabBar 侧划线颜色
    tabInactiveTextColor: {type: String, value: '#000000'}, // tabBar 非激活 Tab 文字颜色
    tabActiveTextColor: {type: String, value: '#ff0000'}, // tabBar 激活 Tab 文字颜色
    tabInactiveBgColor: {type: String, value: '#eeeeee'}, // tabBar 非激活状态背景色
    tabActiveBgColor: {type: String, value: '#ffffff'}, // tabBar 激活状态背景色
    activeTab: {type: Number, value: 0}, // 当前激活tab
    animation: {type: Boolean, value: true}, // 内容区域滚动时是否带动画

  },
  data: {
    currentView: 0,
    contentScrollTop: 0,
    _heightRecords: [],
    _contentHeight: {},
  },

  observers: {
    activeTab: function(activeTab) {
      this.scrollTabBar(activeTab)
    }
  },

  relations: {
    '../vtabs-content/index': {
      type: 'child', // 关联的目标节点应为子节点
      linked: function(target) {
        target.calcHeight((rect) => {
          this.data._contentHeight[target.data.tabIndex] = rect.height
          if (this._calcHeightTimer) {
            clearTimeout(this._calcHeightTimer)
          }

          this._calcHeightTimer = setTimeout(() => {this.calcHeight()}, 100)
        })
      },
      unlinked: function(target) {
        delete this.data._contentHeight[target.data.tabIndex]
      }
    }
  },

  lifetimes: {
    attached() {
      
    }
  },

  methods: {
    calcHeight() {
      const length = this.data.vtabs.length
      const _contentHeight = this.data._contentHeight
      const _heightRecords = []
      let temp = 0
      for (let i = 0; i < length; i++) {
        _heightRecords[i] = temp + (_contentHeight[i] || 0)
        temp =  _heightRecords[i]
      }
      this.data._heightRecords = _heightRecords
      // console.log('_heightRecords', _heightRecords)
    },

    scrollTabBar(index) {
      const len = this.data.vtabs.length
      if (len === 0) return

      let currentView = index < 6 ? 0 : index - 5
      if (currentView >= len) currentView = len - 1
      this.setData({currentView})
    },

    handleTabClick(e) {
      const _heightRecords = this.data._heightRecords
      const index = e.currentTarget.dataset.index
      const contentScrollTop = _heightRecords[index - 1] || 0
      this.triggerEvent('tabclick', {index})
      this.setData({
        activeTab: index,
        contentScrollTop
      })
    },

    handleContentScroll(e) {
      const _heightRecords = this.data._heightRecords
      if (_heightRecords.length === 0) return

      const length = this.data.vtabs.length
      const scrollTop = e.detail.scrollTop
      let index = 0

      if (scrollTop >= _heightRecords[0]) {
        for (let i = 1; i < length; i++) {
          if (scrollTop >= _heightRecords[i - 1] && scrollTop < _heightRecords[i]) {
            index = i
            break
          }
        }
      }
      if (index !== this.data.activeTab) {
        this.triggerEvent('change', {index})
        this.setData({activeTab: index})
      }
    }
  }
})
  

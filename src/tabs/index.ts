Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  properties: {
    tabs: {type: Array, value: []},
    tabClass: {type: String, value: ''}, // tabbar的自定义样式class
    activeClass: {type: String, value: ''}, // 选中选项卡样式
    tabUnderlineColor: {type: String, value: '#108ee9'}, // 选中选项卡下划线颜色
    tabActiveTextColor: {type: String, value: '#108ee9'}, // 选中选项卡字体颜色
    tabInactiveTextColor: {type: String, value: '#333333'}, // 未选中选项卡字体颜色
    tabBackgroundColor: {type: String, value: '#ffffff'}, // 选项卡背景颜色
    activeTab: {type: Number, value: 0}, // 当前激活tab
    swipeable : {type: Boolean, value: true}, // 内容区域是否可滑动
    animation: {type: Boolean, value: false}, // 选项卡滚动时是否带动画
    duration: {type: Number, value: 500}, // 内容区域切换时长

  },
  data: {
    currentView: 0
  },

  observers: {
    activeTab: function(activeTab) {
      const len = this.data.tabs.length
      if (len === 0) return

      let currentView = activeTab - 1
      if (currentView < 0) currentView = 0
      if (currentView > len - 1) currentView = len - 1
      this.setData({currentView})
    }
  },

  lifetimes: {
    created() {
      
    }
  },

  methods: {
    handleTabClick(e) {
      const index = e.currentTarget.dataset.index
      this.setData({activeTab: index})
      this.triggerEvent('tabclick', {index})
    },

    handleSwiperChange(e) {
      const index = e.detail.current
      this.setData({activeTab: index})
      this.triggerEvent('change', {index})
    }
  }
})
  

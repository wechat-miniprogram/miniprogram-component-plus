Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabs: {type: Array, value: []}, // 数据项格式为 `{title}`
    tabClass: {type: String, value: ''}, // 选项卡样式
    swiperClass: {type: String, value: ''}, // 内容区域swiper的样式
    activeClass: {type: String, value: ''}, // 选中选项卡样式
    tabUnderlineColor: {type: String, value: '#07c160'}, // 选中选项卡下划线颜色
    tabActiveTextColor: {type: String, value: '#000000'}, // 选中选项卡字体颜色
    tabInactiveTextColor: {type: String, value: '#000000'}, // 未选中选项卡字体颜色
    tabBackgroundColor: {type: String, value: '#ffffff'}, // 选项卡背景颜色
    activeTab: {type: Number, value: 0}, // 当前激活tab
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
  

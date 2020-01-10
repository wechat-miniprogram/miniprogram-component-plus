Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  properties: {
    tabs: {type: Array, value: []},
    tabClass: {type: String, value: ''},
    activeClass: {type: String, value: ''},
    tabUnderlineColor: {type: String, value: ''},
    tabActiveTextColor: {type: String, value: ''},
    tabInactiveTextColor: {type: String, value: ''},
    tabBackgroundColor: {type: String, value: ''},
    activeTab: {type: Number, value: 0},
    swipeable : {type: Boolean, value: true},
    animation: {type: Boolean, value: false},

  },
  data: {
  },
  lifetimes: {
    created() {
      
    }
  },
  methods: {
  }
})
  

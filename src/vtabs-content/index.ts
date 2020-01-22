Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    tabIndex: {
      type: Number,
      value: 0
    }
  }
})
  

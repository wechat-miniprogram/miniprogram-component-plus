Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
  },
  properties: {
    space: {
      type: String,
      value: ''
    },

    decode: {
      type: Boolean,
      value: false
    }

  }
})
  

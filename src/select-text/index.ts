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
    },

    placement: {
      type: String,
      value: 'top'
    },

    showCopyBtn: {
      type: Boolean,
      value: false
    },

    value: {
      type: String,
      value: ''
    }
  },
  data: {
    showToolTip: false
  },
  methods: {
    handleLongPress() {
      if (!this.data.showCopyBtn) return

      this.setData({
        showToolTip: true
      })
    },

    handleCopy() {
      this.setData({
        showToolTip: false
      })
      this.triggerEvent('copy', {
        value: this.data.value
      })
    }
  }
})
  

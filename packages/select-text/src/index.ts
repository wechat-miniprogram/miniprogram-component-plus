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
    },

    zIndex: {
      type: Number,
      value: 99
    },

    activeBgColor: {
      type: String,
      value: '#DEDEDE'
    },

    onDocumentTap: {
      type: Object,
      value: {}
    }

  },

  observers: {
    onDocumentTap: function() {
      this.setData({
        showToolTip: false
      })
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
      wx.setClipboardData({
        data: this.data.value
      })
      this.triggerEvent('copy', {})
    },
    
    stopPropagation(e) {

    }
  }
})
  

Page({
  data: {
    arr: [{
      value: '长按，上侧复制',
      placement: 'top'
    },
    {
      value: '长按，右侧复制',
      placement: 'right'
    },
    {
      value: '长按，左侧复制',
      placement: 'left'
    },
    {
      value: '长按，下侧复制',
      placement: 'bottom'
    }]
  },

  handleTap(e) {
    this.setData({ evt: e })
  }
})

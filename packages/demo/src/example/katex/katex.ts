Page({
  data: {
    formula: `f(\\relax{x}) = \\int_{-\\infty}^\\infty
      f(\\hat\\xi),e^{2 \\pi i \\xi x}
      \\,d\\xi`,
    errorMessage: '',
  },
  onInput(e) {
    this.setData({
      formula: e.detail.value,
    })
  },
  onRenderSuccess() {
    this.setData({
      errorMessage: '',
    })
  },
  onRenderError(e) {
    this.setData({
      errorMessage: e.detail.message
    })
  }
});

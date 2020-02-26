module.exports = Behavior({
  methods: {
    getRect(selector) {
      return new Promise((resolve, reject) => {
        this.createSelectorQuery()
          .select(selector)
          .boundingClientRect(rect => {
            if (rect) {
              resolve(rect)
            } else {
              reject(new Error(`can not find selector: ${selector}`))
            }
          }).exec()
      })
    },

    getAllRects(selector) {
      return new Promise((resolve, reject) => {
        this.createSelectorQuery()
          .selectAll(selector)
          .boundingClientRect(rects => {
            if (rects && rects.lenght > 0) {
              resolve(rects)
            } else {
              reject(new Error(`can not find selector: ${selector}`))
            }
          }).exec()
      })
    }
  }
})

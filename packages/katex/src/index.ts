import katex from 'katex'

Component({
  properties: {
      formula: {
          type: String,
          value: '',
          observer: '_onFormulaChange'
      },
      extClass: {
          type: String,
          value: '',
      }
  },
  data: {
      katexHtml: '',
  },
  methods: {
      _onFormulaChange(formula) {
          try {
              const htmlTree = [katex.__renderToHTMLTree(formula, { output: 'html' })]

              const resolveHtmlTree = (htmlTree) => {
                  if (typeof htmlTree !== 'object') return
                  htmlTree.forEach(htmlNode => {
                      htmlNode.classes.push('span')
                      resolveHtmlTree(htmlNode.children)
                  })
              }
              resolveHtmlTree(htmlTree)

              this.setData({
                  katexHtml: htmlTree[0].toMarkup()
              })
              this.triggerEvent('render-success')
          } catch (e) {
              this.triggerEvent('render-error', e)
          }
      }
  }
})

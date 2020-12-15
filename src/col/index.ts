Component({
    properties: {
      span: {
        type: Number,
        value: 24
      },
      offset: {
        type: Number,
        value: 0
      },
      push: {
        type: Number,
        value: -1
      },
      pull: {
        type: Number,
        value: -1
      },
      xs: {
        type: Number,
        optionalTypes: [Object],
        value: -1
      }, // span, offset
      sm: {
        type: Number,
        optionalTypes: [Object],
        value: -1
      },
      md: {
        type: Number,
        optionalTypes: [Object],
        value: -1
      },
      lg: {
        type: Number,
        optionalTypes: [Object],
        value: -1
      },
      xl: {
        type: Number,
        optionalTypes: [Object],
        value: -1
      },
    },
    data: {
      classList: ['weui-col'],
      gutter: 0,
      paddingLeft: 0,
      paddingRight: 0
    },
    relations: {
      "../row/index": {
        type: 'parent',
        linked(target) {
          this.data.gutter = Number(target.data.gutter)
          
          this.updateGutter()
        },
        linkChanged(target) {
          this.data.gutter = Number(target.data.gutter)
          this.updateGutter()
        }
      }
    },
    attached() {
      this.updateCol()
    },
    methods: {
      updateCol() {
        const classList = ['weui-col']
        let paddingLeft , paddingRight = 0

        classList.push(`weui-col-${this.data.span}`)
        classList.push(`weui-col-offset-${this.data.offset}`)

        if(this.data.gutter) {
          paddingLeft = this.data.gutter / 2 + 'px'
          paddingRight = paddingLeft
        }

        if(this.data.push !== -1) {
          this.data.push && classList.push(`weui-col-push-${this.data.push}`)
        }
        if(this.data.pull !== -1) {
          this.data.pull && classList.push(`weui-col-pull-${this.data.pull}`)
        }

        // 针对不同 screen 设置
        this.screenSizeSet('xs',classList)
        this.screenSizeSet('sm',classList)
        this.screenSizeSet('md',classList)
        this.screenSizeSet('lg',classList)
        this.screenSizeSet('xl',classList)
        return this.setData({
          classList,
          // paddingLeft,
          // paddingRight
        })
      },
      updateGutter() {
        let paddingLeft , paddingRight = 0
        if(this.data.gutter) {
          paddingLeft = this.data.gutter / 2 + 'px'
          paddingRight = paddingLeft
        }
        this.setData({
          paddingLeft,
          paddingRight
        })
      },
      // 只针对 xs, sm, md 几个
      screenSizeSet(screen,classList) {
        if( typeof this.data[screen] === 'number' && this.data[screen] !== -1) {
          classList.push(`weui-col-${screen}-${this.data[screen]}`)
        } else if (typeof this.data[screen] === 'object') {
          typeof this.data[screen].offset === 'number' && classList.push(`weui-col-${screen}-offset-${this.data[screen].offset}`)
          typeof this.data[screen].push === 'number' && classList.push(`weui-col-${screen}-push-${this.data[screen].push}`)
          typeof this.data[screen].pull === 'number' && classList.push(`weui-col-${screen}-pull-${this.data[screen].pull}`)
          typeof this.data[screen].span === 'number' && classList.push(`weui-col-${screen}-${this.data[screen].span}`)
        }
      }
    }
  })
  
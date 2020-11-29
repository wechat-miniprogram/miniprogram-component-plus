const selectQuery = require('../behaviors/selectQuery')
const target = '.weui-sticky'

Component({
  options: {
    addGlobalClass: true,
    // 指定所有 _ 开头的数据字段为纯数据字段
    pureDataPattern: /^_/,
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  behaviors: [selectQuery],
  properties: {
    offsetTop: {
      type: Number,
      value: 0
    },
    zIndex: {
      type: Number,
      value: 99
    },
    disabled: {
      type: Boolean,
      value: false,
    },
    container: {
      type: null
    }
  },
  data: {
    fixed: false,
    height: 0,
    _attached: false,
    _containerHeight: 0,
  },

  observers: {
    disabled: function(newVal) {
      if (!this.data._attached) return
      newVal ? this.disconnectObserver() : this.initObserver()
    },

    container: function(newVal) {
      if (typeof newVal !== 'function' || !this.data.height) return
      this.observerContainer()
    },

    offsetTop: function(newVal){
      if(typeof newVal !== 'number' || !this.data._attached) return
      this.initObserver()
    }
    
  },

  lifetimes: {
    attached() {
      this.data._attached = true
      if (!this.data.disabled) this.initObserver()
    },

    detached() {
      this.data._attached = false
      this.disconnectObserver()
    }

  },

  methods: {
    getContainerRect () {
      const nodesRef = this.data.container()
      return new Promise(resolve => nodesRef.boundingClientRect(resolve).exec())
    },

    initObserver() {
      this.disconnectObserver()
      this.getRect(target).then(rect => {
        this.setData({
          height: rect.height
        })
        this.observerContent()
        this.observerContainer()
      })
    },
    
    disconnectObserver(observerName) {
      if (observerName) {
        const observer = this[observerName]
        observer && observer.disconnect()
      } else {
        this.contentObserver && this.contentObserver.disconnect()
        this.containerObserver && this.containerObserver.disconnect()
      }
    },

    observerContent() {
      const {offsetTop} = this.data
      this.disconnectObserver('contentObserver')

      const contentObserver = this.createIntersectionObserver({
        thresholds: [1],
        initialRatio: 1
      })
      contentObserver.relativeToViewport({
        top: -offsetTop
      })
      contentObserver.observe(target, res => {
        if (this.data.disabled) return
        this.setFixed(res.boundingClientRect.top)
      })
      this.contentObserver = contentObserver
    },

    observerContainer() {
      const {container, height, offsetTop} = this.data
      if (typeof container !== 'function') return

      this.disconnectObserver('containerObserver')
      this.getContainerRect().then(rect => {
        this.getRect(target).then(contentRect => {
          const _contentTop = contentRect.top
          const _containerTop = rect.top
          const _containerHeight = rect.height
          const _relativeTop = _contentTop - _containerTop
          const containerObserver = this.createIntersectionObserver({
            thresholds: [1],
            initialRatio: 1
          })
          containerObserver.relativeToViewport({
            top: _containerHeight - height - offsetTop - _relativeTop
          })
          containerObserver.observe(target, (res) => {
            if (this.data.disabled) return
            this.setFixed(res.boundingClientRect.top);
          })
          this.data._relativeTop = _relativeTop
          this.data._containerHeight = _containerHeight
          this.containerObserver = containerObserver
        })
      })
    },

    setFixed(top) {
      const {height, _containerHeight, _relativeTop, offsetTop} = this.data
      const fixed = _containerHeight && height
        ? (top >= height + offsetTop + _relativeTop - _containerHeight) && (top < offsetTop)
        : top < offsetTop
      this.triggerEvent('scroll', {
        scrollTop: top,
        isFixed: fixed
      })

      this.setData({fixed})
    }
  }
})
  

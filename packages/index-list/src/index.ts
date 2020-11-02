const throttle = function(func, wait, options) {
    let context; let args; let result
    let timeout = null
    // 上次执行时间点
    let previous = 0
    if (!options) options = {}
    // 延迟执行函数
    const later = function() {
      // 若设定了开始边界不执行选项，上次执行时间始终为0
      previous = options.leading === false ? 0 : Date.now()
      timeout = null
      result = func.apply(context, args)
      if (!timeout) context = args = null
    }
    return function() {
      const now = Date.now()
      // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
      if (!previous && options.leading === false) previous = now
      // 延迟执行时间间隔
      const remaining = wait - (now - previous)
      context = this
      args = arguments
      // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
      // remaining大于时间窗口wait，表示客户端系统时间被调整过
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout)
        timeout = null
        previous = now
        result = func.apply(context, args)
        if (!timeout) context = args = null
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
      return result
    }
}

Component({
    options: {
        addGlobalClass: true,
        pureDataPattern: /^_/ // 指定所有 _ 开头的数据字段为纯数据字段
    },
    properties: {
        list: {
            type: Array,
            value: [],
            observer: function(newVal) {
                if (newVal.length === 0) return
                const data: any = this.data
                const alphabet = data.list.map(item => item.alpha)
                this.setData({
                    alphabet, 
                    current: alphabet[0]
                }, () => {
                    this.computedSize()
                })
            }

        },
        vibrated: {
            type: Boolean,
            value: true
        }
        
    },
    data: {
        windowHeight: 612,
        current: 'A',
        intoView: '',
        touching: false,
        alphabet: [],
        _tops: [],
        _anchorItemH: 0,
        _anchorItemW: 0,
        _anchorTop: 0,
        _listUpperBound: 0
    },
    lifetimes: {
        created() {
         
        },
        attached() {
            this.__scrollTo = throttle(this._scrollTo, 100, {})
            this.__onScroll = throttle(this._onScroll, 100, {})
            const {windowHeight} = wx.getSystemInfoSync()
            this.setData({windowHeight})
        }
    },
    methods: {
        choose(e) {
            const item = e.target.dataset.item
            this.triggerEvent('choose', {item})
        },
        scrollTo(e) {
            this.__scrollTo(e)
        },

        _scrollTo(e) {
            const data: any = this.data
            const clientY = e.changedTouches[0].clientY
            const index = Math.floor((clientY - data._anchorTop) / data._anchorItemH)
            const current = data.alphabet[index]

            this.setData({current, intoView: current, touching: true})
            // 振动效果
            if (data.vibrated) wx.vibrateShort()
        },

        computedSize() {
            const data: any = this.data
             // 计算列表每个区块的高度等信息
            const query = this.createSelectorQuery()
            query.selectAll('.index_list_item').boundingClientRect(rects => {
                const result: any = rects
                data._tops = result.map(item => item.top)
            }).exec()
            // 计算右侧字母栏小区块的高度等信息
            query.select('.anchor-list').boundingClientRect(rect => {
                data._anchorItemH = rect.height / data.alphabet.length
                data._anchorItemW = rect.width
                data._anchorTop = rect.top
            }).exec()
            // 计算滚动区域的上边界
            query.select('.page-select-index').boundingClientRect(rect => {
                data._listUpperBound = rect.top
            })
        },

        // throttle 的延迟
        removeTouching() {
            setTimeout(() => {
                this.setData({touching: false})
            }, 150)
        },

        onScroll(e) {
            this.__onScroll(e)
        },

        _onScroll(e) {
            const data: any = this.data
            const {_tops, alphabet} = data
            const scrollTop = e.detail.scrollTop
            let current = ''
            if (scrollTop < _tops[0]) {
                current = alphabet[0]
            } else {
                for (let i = 0, len = _tops.length; i < len - 1; i++) {
                    if (scrollTop >= _tops[i] && scrollTop < _tops[i + 1]) {
                        current = alphabet[i]
                    }
                }
            }
           
            if (!current) current = alphabet[alphabet.length - 1]
            this.setData({current})
        }
    }
})

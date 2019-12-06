const emojiNames = '[微笑]|[撇嘴]|[色]|[发呆]|[得意]|[流泪]|[害羞]|[闭嘴]|[睡]|[大哭]|[尴尬]|[发怒]|[调皮]|[呲牙]|[惊讶]|[难过]|[酷]|[冷汗]|[抓狂]|[吐]|[偷笑]|[愉快]|[白眼]|[傲慢]|[饥饿]|[困]|[惊恐]|[流汗]|[憨笑]|[悠闲]|[奋斗]|[咒骂]|[疑问]|[嘘]|[晕]|[疯了]|[衰]|[骷髅]|[敲打]|[再见]|[擦汗]|[抠鼻]|[鼓掌]|[糗大了]|[坏笑]|[左哼哼]|[右哼哼]|[哈欠]|[鄙视]|[委屈]|[快哭了]|[阴险]|[亲亲]|[吓]|[可怜]|[菜刀]|[西瓜]|[啤酒]|[篮球]|[乒乓]|[咖啡]|[饭]|[猪头]|[玫瑰]|[凋谢]|[嘴唇]|[爱心]|[心碎]|[蛋糕]|[闪电]|[炸弹]|[刀]|[足球]|[瓢虫]|[便便]|[月亮]|[太阳]|[礼物]|[拥抱]|[强]|[弱]|[握手]|[胜利]|[抱拳]|[勾引]|[拳头]|[差劲]|[爱你]|[NO]|[OK]|[爱情]|[飞吻]|[跳跳]|[发抖]|[怄火]|[转圈]|[磕头]|[回头]|[跳绳]|[投降]|[激动]|[乱舞]|[献吻]|[左太极]|[右太极]|[嘿哈]|[捂脸]|[奸笑]|[机智]|[皱眉]|[耶]|[茶]|[红包]|[蜡烛]|[福]|[鸡]|[笑脸]|[生病]|[破涕为笑]|[吐舌]|[脸红]|[恐惧]|[失望]|[无语]|[鬼魂]|[合十]|[强壮]|[庆祝]|[礼物]|[囧]|[再见]|[抱拳]|[皱眉]'.split('|')

Page({
  data: {
    functionShow: false,
    emojiShow: false,
    comment: '',
    focus: false,
    cursor: 0,
    _keyboardShow: false
  },
  hideAllPanel() {
    this.setData({
      functionShow: false,
      emojiShow: false
    })
  },
  showEmoji() {
    this.setData({
      functionShow: false,
      emojiShow: this.data._keyboardShow || !this.data.emojiShow
    })
  },
  showFunction() {
    this.setData({
      functionShow: this.data._keyboardShow || !this.data.functionShow,
      emojiShow: false
    })
  },
  chooseImage() {},
  onFocus() {
    this.data._keyboardShow = true
    this.hideAllPanel()
  },
  onBlur(e) {
    this.data._keyboardShow = false
    this.data.cursor = e.detail.cursor || 0
  },
  onInput(e) {
    const value = e.detail.value
    this.data.comment = value
  },
  onConfirm() {},
  insertEmoji(evt) {
    const emotionName = evt.detail.emotionName
    const { cursor, comment } = this.data
    const newComment =
      comment.slice(0, cursor) + emotionName + comment.slice(cursor)
    this.setData({
      comment: newComment,
      cursor: cursor + emotionName.length
    })
  },
  deleteEmoji: function() {
    const pos = this.data.cursor
    const comment = this.data.comment
    let result = '',
      cursor = 0

    let emojiLen = 6
    let startPos = pos - emojiLen
    if (startPos < 0) {
      startPos = 0
      emojiLen = pos
    }
    const str = comment.slice(startPos, pos)
    const matchs = str.match(/\[([\u4e00-\u9fa5\w]+)\]$/g)
    // 删除表情
    if (matchs) {
      const rawName = matchs[0]
      const left = emojiLen - rawName.length
      if (emojiNames.indexOf(rawName) >= 0) {
        const replace = str.replace(rawName, '')
        result = comment.slice(0, startPos) + replace + comment.slice(pos)
        cursor = startPos + left
      }
      // 删除字符
    } else {
      let endPos = pos - 1
      if (endPos < 0) endPos = 0
      const prefix = comment.slice(0, endPos)
      const suffix = comment.slice(pos)
      result = prefix + suffix
      cursor = endPos
    }
    this.setData({
      comment: result,
      cursor: cursor
    })
  }
})

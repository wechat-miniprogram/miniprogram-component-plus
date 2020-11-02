const urls = [
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video14e1eea.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video24e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video34e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video44e1eeb.mov',
  'https://res.wx.qq.com/wxaliveplayer/htdocs/video54e1eeb.mov',
]

const videoList = urls.map((url, index) => ({
  id: index + 1,
  url,
  objectFit: 'contain'
}))
Page({
  data: {
    videoList,
  },

  onPlay() {},

  onPause() {
    //  console.log('pause', e.detail.activeId)
  },

  onEnded() {},

  onError() {},

  onWaiting() {},

  onTimeUpdate() {},

  onProgress() {},

  onLoadedMetaData(e) {
    console.log('LoadedMetaData', e)
  },
})

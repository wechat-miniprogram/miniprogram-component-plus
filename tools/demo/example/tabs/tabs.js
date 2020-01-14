Page({
  data: {
    tabs: [],
    activeTab: 0,
    swipeable: true
  },

  onLoad() {
    const titles = ['首页', '外卖', '商超生鲜', '购物', '美食饮品', '生活服务', '休闲娱乐', '出行']
    const tabs = titles.map(item => ({title: item}))
    this.setData({tabs})
  },

})

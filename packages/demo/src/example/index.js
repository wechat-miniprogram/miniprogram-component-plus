import feedback from './images/icon_nav_feedback.png'
import form from './images/icon_nav_form.png'
import nav from './images/icon_nav_nav.png'
import search from './images/icon_nav_search.png'
import special from './images/icon_nav_special.png'
import widget from './images/icon_nav_widget.png'
import zIndex from './images/icon_nav_z-index.png'

Page({
  data: {
    list: [
      {
        id: 'widget',
        name: '业务相关',
        open: false,
        pages: [
          'video-swiper',
          'emoji',
          'index-list',
          'tabs',
          'vtabs',
          'sticky',
          'select-text',
          'katex',
        ],
      },
    ],
    images: {
      feedback,
      form,
      nav,
      search,
      special,
      widget,
      'z-index': zIndex,
    },
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list,
    })
  },
})

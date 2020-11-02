import vtabsContent from './vtabs-content'
import vtabs from '../vtabs'

Component({
  behaviors: [vtabsContent],
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },

  properties: {
    tabIndex: {
      type: Number,
      value: 0,
    },
  },

  relations: {
    'vtabs': {
      target: vtabs,
      type: "parent", // 关联的目标节点应为父节点
    },
  },

  lifetimes: {
    attached() {},
  },

  methods: {
    calcHeight(callback) {
      const query = this.createSelectorQuery();
      query
        .select(".weui-vtabs-content__item")
        .boundingClientRect((rect) => {
          callback && callback(rect);
        })
        .exec();
    },
  },
});

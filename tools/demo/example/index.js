Page({
    data: {
        list: [
            {
                id: 'widget',
                name: '业务相关',
                open: false,
                pages: ['video-swiper', 'emoji', 'index-list']
            }
        ]
    },
    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
    }
});

// component/create/create.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    albumName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInput(e) {
      this.setData({
        albumName: e.detail.value
      })
    },
    create(e) {
      const name = (this.data.albumName || '').trim();
      if(name === ''){
        wx.showToast({
          title: '请输入相册名字',
        })
      }else{
        this.triggerEvent('addAlbum', {name});
      }
    },
    goBack() {
      this.triggerEvent('goBack');
    }
  }
})

import SERVER from '../../server/index.js'

Page({
  //初始数据
  data: {
    albums: [],
    fc: SERVER.fc,
    hidden: true
  },
  
  //页面首次加载
  onShow () {
    this.getAlbums();
  },
  
  getAlbums () {
    wx.showLoading({
      title: 'loading',
    })
    SERVER.getAlbums().then((res) => {
      this.setData({
        albums: res.data.data
      })
      wx.hideLoading()
    })
  },
  //显示创建相册组件
  create () {
    this.setData({hidden: false});
  },
  
  //添加相册
  addAlbum (e) {
    SERVER.addAlbum(e.detail.name).then((res) => {
      this.getAlbums();
    });
    this.setData({hidden: true});
  },
  
  //返回
  goBack () {
    this.setData({hidden: true});
  },
  
  //点击开始
  touchStart (e) {
    console.log(1)
    this.start = e.timeStamp;
  },

  //点击结束
  touchEnd (e) {
    if(e.timeStamp - this.start > 350){
      this.askDelete(e);
    }else{
      this.toDetail(e);
    }
  },

  //进入相册详情页面
  toDetail (e) {
    let {id, name} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../pics/pics?id=${id}&name=${name}`,
    })
  },
  
  //询问是否删除相册
  askDelete (e) {
    wx.showModal({
      title: '删除相册',
      content: '你确定要删除该相册吗',
    }).then(res => {
      if(res.confirm){
        this.deleteAlbum(e);
      }
    })
  },

  //删除相册
  deleteAlbum (e) {
    let id = e.currentTarget.dataset.id;
    SERVER.deleteAlbum(id).then(res => {
      this.getAlbums();
    })
  }
})
import SERVER from '../../server/index.js'
import {formatTime} from '../../utils/util.js'

Page({

  data: {
    id: '',
    name: '相册',
    fc: SERVER.fc,
    pics: [],
    nums: 0
  },

  onLoad: function (options) {
    //获取相册id和name
    const {id, name} = options;
    this.setData({id, name});
    wx.setNavigationBarTitle({
      title: this.data.name,
    })
    this.getPics();
  },
  
  //获取照片
  getPics () {
    wx.showLoading({
      title: 'loading',
    })
    SERVER.getPhotos(this.data.id).then((res) => {
      const {nums, data} = res.data.data;
      let pics = nums ? this.sort(data) : [];
      this.setData({pics, nums, fc: nums ? pics[0][0].url : SERVER.fc})
      wx.hideLoading();
    })
  },
  
  //格式化照片时间
  sort (data=[]) {
    let flag,
        result = [];
    data.forEach((item) => {
      let cur = formatTime(new Date(item.created));
      item.created = cur;
      let index = result.length
      if(cur !== flag){
        flag = cur;
      }else{
        index -= 1;
      }
      result[index] = result[index] || [];
      result[index].push(item);
    })
    return result;
  },

  //上传照片
  upload () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }).then(res => {
      wx.showLoading({
        title: '上传中...',
        mask: true
      })
      SERVER.addPhoto({
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          id: this.data.id
        }
      }).then(res => {
        wx.hideLoading();
        this.getPics();
      })
    })
  },

  //点击预览高清大图
  previewImage (e) {
    let cur = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [cur],
      current: cur
    })
  },
  
  //点击开始
  touchStart (e) {
    this.start = e.timeStamp;
  },

  //点击结束
  touchEnd (e) {
    if(e.timeStamp - this.start > 350) {
      this.askDelete(e);
    } else{
      this.previewImage(e);
    }
  },

  //询问是否删除照片
  askDelete (e) {
    wx.showModal({
      title: '删除照片',
      content: '你确定要删除该照片吗',
    }).then(res => {
      if(res.confirm){
        this.deletePhoto(e);
      }
    })
  },

  //删除照片
  deletePhoto (e) {
    let id = e.currentTarget.dataset.id;
    SERVER.deletePhoto(id).then(res => {
      this.getPics();
    })
  }
})
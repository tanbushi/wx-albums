const HOST = 'https://www.badlc.xyz:8001';
const api = {
  login: '/login',
  getUserInfo: '/getUserInfo',
  updateUserInfo: '/updateUserInfo',
  getAlbums: '/getAlbums',
  addAlbum: '/addAlbum',
  addPhoto: '/addPhoto',
  getPhotos: '/getPhotos',
  deletePhoto: '/deletePhoto',
  deleteAlbum: '/deleteAlbum'
}

const HTTP = (URL, options, fn='request') => {
  let sessionKey = wx.getStorageSync('sessionKey') || '',
      url = HOST + URL;
  return new Promise((resolve, reject) => {
    wx[fn]({
      ...options,
      url,
      header: {
        'x-session': sessionKey
      }
    }).then((res) => {
      resolve(res);
    })
  })
}

const server = {
  fc: '../../assets/fengmian.png',
  login (code) {
    return HTTP(api.login, {data: {code}});
  },
  getUserInfo () {
    return HTTP(api.getUserInfo, {method: 'get'});
  },
  updateUserInfo (data) {
    return HTTP(api.updateUserInfo, {method: 'put', data})
  },
  getAlbums () {
    return HTTP(api.getAlbums, {method: 'get'});
  },
  addAlbum (name) {
    return HTTP(api.addAlbum, {method: 'post', data: {name}});
  },
  getPhotos (id) {
    return HTTP(`${api.getPhotos}/${id}`)
  },
  addPhoto (opt) {
    return HTTP(api.addPhoto, opt, 'uploadFile')
  },
  deletePhoto (id) {
    return HTTP(`${api.deletePhoto}/${id}`, {method: 'delete'})
  },
  deleteAlbum (id) {
    return HTTP(`${api.deleteAlbum}/${id}`, {method: 'delete'})
  }
}

module.exports = server;
import connect from '../../utils/connect.js'
import server from '../../server/index.js'
//获取应用实例
const app = getApp()
const mapStateToData = (state) => {
  return {
    userInfo: state.getUserInfo.userInfo || null
  }
}
Page(connect(mapStateToData)({
  getUserInfo: function(e) {
    let userInfo = e.detail.userInfo;
    app.Store.dispatch({
      type: 'UPDATE_USER',
      data: userInfo
    })
    server.updateUserInfo({
      name: userInfo.nickName,
      avatar: userInfo.avatarUrl
    })
  }
}))
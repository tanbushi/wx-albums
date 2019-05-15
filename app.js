import './utils/toPromise';
import server from './server/index.js'
import Store from './redux/index.js'

App({
  Store,
  onLaunch: function () {
    //获取sessionKey
    let sessionKey = wx.getStorageSync('sessionKey');
    if(!sessionKey){
      this.login();
    }else{
      this.getUserInfo();
    }
  },
  
  //用户登录
  login () {
    wx.login({
      complete: (res) => {
        let code = res.code;
        server.login(code).then((res) => {
          const {data} = res.data;
          wx.setStorageSync('sessionKey', data.sessionKey);
          this.getUserInfo();
        });
      }
    })
  },
  
  //获取用户信息
  getUserInfo () {
      server.getUserInfo().then((res) => {
        const {data} = res.data;
        Store.dispatch({
          type: 'MODIFY_USER',
          data
        })
      });
  }
})
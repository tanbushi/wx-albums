const init = {}

//设置用户信息的reducer函数
const getUserInfo = (state=init, action) => {
  switch(action.type){
    case 'MODIFY_USER' : return {...state, userInfo: action.data};
    case 'UPDATE_USER' : {
      let userInfo = Object.assign({}, state.userInfo);
      userInfo.name = action.data.nickName;
      userInfo.avatar = action.data.avatarUrl;
      return { ...state, userInfo };
    }
    default: return state;
  }
}

module.exports = getUserInfo;
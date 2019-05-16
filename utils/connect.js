let Store = getApp().Store;

module.exports = (mapStateToData = () => {}) => {
  let config = {
    Store,
    dispatch: Store.dispatch,
    destroy: null,
    observer () {
      const state = this.Store.getState();
      const newData = mapStateToData(state)
      wx.showLoading({
        title: 'loading',
      })
      this.setData(newData);
      wx.hideLoading()
    },
    onLoad () {
      super.onLoad();
      this.destroy = this.Store.subscribe(this.observer);
      this.observer();
    },
    onUnload () {
      super.onUnload();
      this.destroy();
    },
    onShow () {
      super.onShow();
      if(!this.destroy){
        this.destroy = this.Store.subscribe(this.observer);
        this.observer();
      }
    },
    onHide () {
      super.onHide();
      this.destroy();
      delete this.destroy;
    }
  }
  return (options = {}) => {
    Object.setPrototypeOf(config, {
      onLoad(){},
      onUnload(){},
      onShow(){},
      onHide(){},
      ...options
    })
    return config;
  }
}
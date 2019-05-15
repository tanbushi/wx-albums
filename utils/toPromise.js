let wxKeys = ["request", "login", "uploadFile", "chooseImage", "checkSession", "getSetting", "openSetting", "showModal", "getUserInfo", "scanCode"];

wxKeys.forEach((key) => {
    let fn = wx[key];
    Object.defineProperty(wx, key, {
      get () {
        return (options) => {
          return new Promise ((resolve, reject) => {
            options.success = (res) => {
              resolve(res);
            }
            options.fail = (res) => {
              reject(res);
            }
            fn(options);
          })
        }
      }
    })
})
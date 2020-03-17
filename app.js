//app.js
const loginApi = require("./api/login.js")
const storageKey = require("./constants/storageKey.js")

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        loginApi.info().then(res => {
          if(res.data.code === 0){
            if (this.globalData.loginCallback) {
              this.globalData.loginCallback(true)
            }
            this.globalData.isLogin = true;
          }else{
            if (wx.getStorageSync(storageKey.IS_REMEMBER)){
              loginApi.login(wx.getStorageSync(storageKey.USER_NAME), wx.getStorageSync(storageKey.PASSWORD), true).then(res => {
                if (res.data.code == 0) {
                  this.globalData.avatar = res.data.data.avatar
                  this.globalData.userName = res.data.data.userName
                  if (this.globalData.loginCallback) {
                    this.globalData.loginCallback(true)
                  }
                  this.globalData.isLogin = true;
                } else {
                  wx.showToast({
                    title: '登录状态已失效，请重新登录',
                    icon:"none"
                  })
                  wx.clearStorage()
                }
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogin:false,
    loginCallback:null,
    avatar:"",
    userName:""
  }
})
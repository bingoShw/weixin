// pages/my/my.js
const app = getApp()
const userApi = require("../../api/user.js")
const storageKey = require("../../constants/storageKey.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    loginName:"",
    userName:"",
    password:"",
    rememberMe:false,
    avatar:"",
    name:"",
    isRemember: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //是否是登录状态
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: true,
        avatar:app.globalData.avatar,
        userName:app.globalData.userName
      })
    } else {
      //1.没有登录
      //2.加载顺序不同没有反应过来
        app.globalData.loginCallback = (isLogin) => {
          this.setData({
            isLogin
          })
        }
    }
  },
  // 获取用户名
  getUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 获取密码
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录
  login: function (e) {
    userApi.login(this.data.userName, this.data.password,this.data.rememberMe).then(res => {
      if(res.data.code === 0){
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        // 登录动画
        // const animation = wx.createAnimation({
        //   duration: 3000,
        //   delay: 0,
        //   timingFunction: "ease",
        // })
        // animation.opacity(0).step({ duration: 3000 })
        // this.setData({
        //   ani: animation.export()
        // })
        // setTimeout(() => {
          this.setData({
            isLogin: true,
            avatar: res.data.data.avatar,
            userName: res.data.data.userName,
            loginName: res.data.data.loginName,
          })
        // },2000)
        if (this.data.isRemember) {
          wx.setStorage({
            key: storageKey.USER_NAME,
            data: this.data.loginName,
          })
          wx.setStorage({
            key: storageKey.PASSWORD,
            data: this.data.password,
          })
          wx.setStorage({
            key: storageKey.IS_REMEMBER,
            data: true,
          })
          app.globalData.isLogin = true;
        } else {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          wx.setStorage({
            key: storageKey.IS_REMEMBER,
            data: false,
          })
          app.globalData.isLogin = false
        }
      }else{
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
      }
    })
  },
  // 修改个人信息
  update:function(e){
    wx.navigateTo({
      url: '/pages/update/update',
    })
  },
  // 查看个人信息
  look:function(e){
    wx.navigateTo({
      url: '/pages/info/info',
    })
  },
  // 退出
  logout:function(e){
    userApi.logout().then(res => {
      if(res.data.code === 0){
        return
      }else{
        // const animationTwo = wx.createAnimation({
        //   duration: 3000,
        //   delay: 0,
        //   timingFunction: "ease",
        // })
        // animationTwo.opacity(1).step({ duration: 3000 })
        // this.setData({
        //   aniTwo: animationTwo.export()
        // })
        wx.removeStorageSync("loginCookies")
        // setTimeout(() => {
          this.setData({
            isLogin: false
          })
        // },2000)
        }
    })
  },
  // 记住账号密码
  onRememberChange:function(e){
    this.setData({
      isRemember: e.detail
    })
  },
  // 查看我的帖子
  lookPosts:function(e){
    wx.navigateTo({
      url: '/pages/myPosts/myPosts',
    })
  }
})
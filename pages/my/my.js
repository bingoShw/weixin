// pages/my/my.js
const app = getApp()
const loginApi = require("../../api/login.js")
const logoutApi = require("../../api/logout.js")
const storageKey = require("../../constants/storageKey.js")
// const postsApi = require("../../api/posts.js")

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
    if (app.globalData.isLogin) {
      this.setData({
        isLogin: true,
        avatar:app.globalData.avatar,
        userName:app.globalData.userName
      })
    } else {
      app.globalData.loginCallback = (isLogin) => {
        this.setData({
          isLogin
        })
      }
    }
  },
  // 登录
  login: function (e) {
    loginApi.login(this.data.userName, this.data.password,this.data.rememberMe).then(res => {
      if(res.data.code === 0){
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        this.setData({
          isLogin: true,
          avatar: res.data.data.avatar,
          userName: res.data.data.userName,
          loginName: res.data.data.loginName
        })
        if (this.data.isRemember) {
          // 保存用户名和密码
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
        } else {
          wx.setStorage({
            key: storageKey.IS_REMEMBER,
            data: false,
          })
        }
        app.globalData.isLogin = false
      }
    })
  },
  // 获取用户名
  getUserName:function(e){
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
    logoutApi.logout().then(res => {
      if(res.data.code === 0){
        return
      }else{
       wx.removeStorageSync("loginCookies")
        this.setData({
          isLogin: false
        })
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
  // lookPosts:function(e){
  //   postsApi.myPosts().then(res => {
  //     debugger
  //     if(res.data.code === 0){
  //      wx.navigateTo({
  //        url: '/',
  //      })
  //     }
  //   })
  // }
})
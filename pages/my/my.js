// pages/my/my.js
const app = getApp()
const loginApi = require("../../api/login.js")
const logoutApi = require("../../api/logout.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:"登录",
    isLogin:false,
    userName:"",
    password:"",
    rememberMe:false,
    avatar:"",
    name:""
  },
  // 登录
  login: function (e) {
    loginApi.login(this.data.userName,this.data.rememberMe,this.data.password).then(res => {
      if(res.data.code === 0){
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        this.setData({
          msg: "ok",
          isLogin: true,
          avatar: res.data.data.avatar,
          name: res.data.data.userName
        })
        if(res.cookies.join(";").includes("JSESSIONID")){
          wx.setStorageSync(
            "loginCookies",
            res.cookies.join(";")
          )
        }
        app.globalData.isLogin = true
      }else{
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
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
          msg: "登录",
          isLogin: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  //  wx.clearStorageSync()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/info/info.js
const userApi = require("../../api/user.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginName:"",
    userName: "",
    email: "",
    phonenumber: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userApi.info().then(res => {
      this.setData({
        userName: res.data.data.userName,
        email: res.data.data.email,
        phonenumber: res.data.data.phonenumber,
        loginName: res.data.data.loginName
      })
    })
  }
})
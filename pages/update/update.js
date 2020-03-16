// pages/update/update.js
const updateApi = require("../../api/update.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:"",
    email:"",
    phonenumber:""
  },
  getUserName: function (e) {
    this.setData({
      userName: e.detail
    })
  },
  getEmail: function (e) {
    this.setData({
      email: e.detail
    })
  },
  getPhonenumber: function (e) {
    this.setData({
      phonenumber: e.detail
    })
  },
  submit:function(e){
    const options = {
      userName: this.data.userName,
      email: this.data.email,
      phonenumber: this.data.phonenumber
    }
    updateApi.update(options).then(res => {
      if(res.data.code === 0){
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
      }
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        })
      },1000)
    })
  },
  cancel:function(e){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// pages/update/update.js
const userApi = require("../../api/user.js")

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
    userApi.update(options).then(res => {
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
  }
})
// pages/posts/posts.js
const app = getApp()
const postsApi = require("../../api/posts.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postsList:[],
    total: "",
    isFinish: false,
    isOk:false
  },
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/postsDetails/postsDetails?id=${id}`,
    })
  },
  // 添加帖子
  addPosts:function(e){
    if (app.globalData.isLogin ){
      wx.navigateTo({
        url: '/pages/addPosts/addPosts',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/my/my',
        })
      },1000)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    postsApi.getPosts().then(res => {
      this.setData({
        postsList:res.data.rows,
        isOk:true
      })
    })
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
    wx.showToast({
      title: 'loading....',
      icon: 'loading'
    }),
    postsApi.getPosts().then(res => {
      this.setData({
        postsList: res.data.rows,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    postsApi.getPosts().then(res => {
      this.setData({
        postsList: res.data.rows,
      })
      if (this.data.postsList.lenght == res.data.total) {
        this.setData({
          isFinish: true
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
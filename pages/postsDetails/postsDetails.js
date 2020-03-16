// pages/postsDetails/postsDetails.js
const detailsApi = require("../../api/postsDetails.js")
const commentApi = require("../../api/comment.js")
const commentListApi = require("../../api/commentList.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiele:"",
    avatar:"",
    userName:"",
    coverImgUrl:"",
    intro:"",
    message:"",
    postsId:"",
    commentList:""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    detailsApi.postsDetails(options.id).then(res => {
      this.setData({
        postsId:options.id,
        title: res.data.data.title,
        avatar: res.data.data.avatar,
        userName: res.data.data.userName,
        coverImgUrl:res.data.data.coverImgUrl,
        intro: res.data.data.intro
      })
    })
    commentListApi.commentList(options.id).then(res => {
      this.setData({
        commentList:res.data.rows
      })
    })
  },

  // 评论
  content:function(e){
    debugger
    this.setData({
      message: e.detail
    })
  },
  comment: function (e) {
    const postsId = this.data.postsId;
    const message = this.data.message
    commentApi.postsComment(postsId, message).then(res => {
      debugger
      if(res.data.code !== 0){
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000)
      }
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
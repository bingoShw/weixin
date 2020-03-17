// pages/postsDetails/postsDetails.js
const postsApi = require("../../api/posts.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
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
    postsApi.postsDetails(options.id).then(res => {
      this.setData({
        postsId:options.id,
        title: res.data.data.title,
        avatar: res.data.data.avatar,
        userName: res.data.data.userName,
        coverImgUrl:res.data.data.coverImgUrl,
        intro: res.data.data.intro
      })
    })
    postsApi.commentList(options.id).then(res => {
      this.setData({
        commentList:res.data.rows
      })
    })
  },

  // 评论
  content:function(e){
    this.setData({
      message: e.detail
    })
  },
  comment: function (e) {
    const postsId = this.data.postsId;
    const message = this.data.message
    postsApi.postsComment(postsId, message).then(res => {
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
      }else{
        wx.showToast({
          title: '评论成功',
          icon: 'success'
        })
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
    return{
      title:"帖子",
      imageUrl: this.data.coverImgUrl
    }
  }
})
// pages/myPosts/myPosts.js
const postSApi = require("../../api/posts.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPostsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    postSApi.myPosts().then(res => {
      this.setData({
        myPostsList: res.data.rows
      })
    })
  },
  // 帖子详情
  more:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/postsDetails/postsDetails?id=${id}`,
    })
  }
})
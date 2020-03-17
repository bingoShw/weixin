// pages/newsDetails/newsDetails.js
const newsApi = require("../../api/news.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    articleSource:"",
    content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    newsApi.newsDetails(options.id).then(res => {
      this.setData({
        title:res.data.data.title,
        articleSource: res.data.data.articleSource,
        content: res.data.data.content
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title:"新闻",
      imageUrl: "/assets/images/news1.png"
    }
  }
})
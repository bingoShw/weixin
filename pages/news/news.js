// pages/news/news.js
const newsApi = require("../../api/news.js")
const bannerApi = require("../../api/swiper.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    circular:true,
    list:[],
    bannerList:[],
    pageNum: 0,
    pageSize: 0,
    total:"",
    isFinish:false,
    isOk:false
  },
  toDetails: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/newsDetails/newsDetails?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    newsApi.getNews(1,10).then(res => {
      this.setData({
        list:res.data.rows,
        pageNum: 1,
        pageSize: 10,
        isOk:true
      })
    }),
      bannerApi.getBanner(1,5).then(res => {
        this.setData({
          bannerList:res.data.rows
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
    })
    newsApi.getNews(1,10).then(res => {
      this.setData({
        list: res.data.rows
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1,
      pageSize: this.data.pageSize
    }),
    newsApi.getNews(this.data.pageSize, this.data.pageSize).then(res => {
      var newList = this.data.list.concat(res.data.rows)
      this.setData({
        list: newList
      })
      if (this.data.list.lenght == res.data.total) {
        this.setData({
          isFinish:true
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
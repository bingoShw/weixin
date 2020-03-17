// pages/addPosts/addPosts.js
const postsApi = require("../../api/posts.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    fileList: [],
    categoryId:"",
    title:"",
    content:"",
    coverImgUrl:""
  },
  // 图片上传
  afterRead(event) {
    const {file} = event.detail;
    const cookies = wx.getStorageSync("loginCookies")
    var that = this
    wx.showToast({
      title: '正在上传...',
      icon: 'loading',
      mask: true,
      duration: 2000,
    })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://showme.myhope365.com/api/nos/upload/image',
      filePath: file.path,
      name: 'file',
      formData: { 
        fileUseForEnum:"BBS"
      },
      header: {
        "cookie": cookies
      },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = JSON.parse(res.data);
        fileList.push({ ...file, url: JSON.parse(res.data).url });
        that.setData({ 
          fileList,
          coverImgUrl:JSON.parse(res.data).url
        });
      }
    });
  },
  // 获取分类Id
  getCategoryId:function(e){
    this.setData({
      categoryId:e.currentTarget.dataset.id
    })
  },
  getTitle:function(e){
    this.setData({
      title: e.detail
    })
  },
  getContent: function (e) {
    this.setData({
      content: e.detail
    })
  },
  // 发布
  release:function(e){
    const options = {
      categoryId: this.data.categoryId,
      title: this.data.title,
      content: this.data.content,
      coverImgUrl: this.data.coverImgUrl
    }
    postsApi.addPosts(options).then(res => {
      if(res.data.code === 0){
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        wx.switchTab({
          url: '/pages/posts/posts',
        })
      }else{
        wx.showToast({
          title: res.data.msg,
          icon:"none"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    postsApi.category().then(res => {
      this.setData({
        categoryList: res.data.rows
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
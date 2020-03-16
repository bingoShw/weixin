const http = require("./http.js")

// 新闻列表
function getNews(pageNum, pageSize){
  return http.getPost({
    url: `/api/cms/article/open/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    data:{
      pageNum,
      pageSize
    }
  })
}

// 轮播图
function getBanner(pageNum, pageSize) {
  return http.getPost({
    url: `/api/cms/article/open/banner/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    data: {
      pageNum,
      pageSize
    }
  })
}

// 新闻详情
function newsDetails(articleId) {
  return http.getGet({
    url: `/api/cms/article/open/detail/${articleId}`,
    data: {
      articleId
    }
  })
}

module.exports = {
  getNews,
  getBanner,
  newsDetails
}
const http = require("./http.js")

function getNews(pageNum, pageSize){
  return http.getPost({
    url: `/api/cms/article/open/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    data:{
      pageNum,
      pageSize
    }
  })
}

module.exports = {
  getNews
}
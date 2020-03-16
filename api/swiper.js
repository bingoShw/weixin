const http = require("./http.js")

function getBanner(pageNum, pageSize){
  return http.getPost({
    url: `/api/cms/article/open/banner/list?pageNum=${pageNum}&pageSize=${pageSize}`,
    data: {
      pageNum,
      pageSize
    }
  })
}

module.exports = {
  getBanner
}
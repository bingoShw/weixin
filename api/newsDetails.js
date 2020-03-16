const http = require("./http.js")

function newsDetails(articleId) {
  return http.getGet({
    url: `/api/cms/article/open/detail/${articleId}`,
    data: {
      articleId
    }
  })
}

module.exports = {
  newsDetails
}
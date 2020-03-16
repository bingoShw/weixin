const http = require("./http.js")

function postsDetails(postsId) {
  return http.getGet({
    url: `/api/bbs/bbsPosts/open/detail/${postsId}`,
    data: {
      postsId
    }
  })
}

module.exports = {
  postsDetails
}
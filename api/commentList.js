const http = require("./http.js")

function commentList(postsId) {
  return http.getPost({
    url: `/api/bbs/bbsComment/open/list`,
    data: {
      postsId
      }
  })
}

module.exports = {
  commentList
}
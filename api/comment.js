const http = require("./http.js")

function postsComment(postsId,commentContent) {
  return http.getPost({
    url: `/api/bbs/bbsComment/site/add`,
    data: {
      postsId,
      commentContent
    }
  })
}

module.exports = {
  postsComment
}
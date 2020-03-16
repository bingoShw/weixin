const http = require("./http.js")

function getPosts() {
  return http.getPost({
    url: `/api/bbs/bbsPosts/open/list`
  })
}

module.exports = {
  getPosts
}
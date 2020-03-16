const http = require("./http.js")

function addPosts(options) {
  debugger
  return http.getPost({
    url: `/api/bbs/bbsPosts/site/add`,
    data: {
      ...options
    }
  })
}

module.exports = {
  addPosts
}
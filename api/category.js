const http = require("./http.js")

function category() {
  return http.getPost({
    url: `/api/bbs/bbsCategory/open/list`
  })
}

module.exports = {
  category
}
const http = require("./http.js")

function info() {
  return http.getGet({
    url: `/api/login-user/info`
  })
}

module.exports = {
  info
}
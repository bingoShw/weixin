const http = require("./http.js")

function logout() {
  return http.getGet({
    url: `/api/logout`
  })
}

module.exports = {
  logout
}
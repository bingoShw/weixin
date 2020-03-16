const http = require("./http.js")

function login(username,rememberMe,password) {
  return http.getPost({
    url: `/api/login`,
    data: {
      username,
      rememberMe,
      password
    }
  })
}

module.exports = {
  login
}
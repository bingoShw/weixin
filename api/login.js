const http = require("./http.js")

// 登录
function login(username, password, rememberMe) {
  return http.getPost({
    url: `/api/login`,
    data: {
      username,
      rememberMe,
      password
    }
  })
}

// 个人信息
function info() {
  return http.getGet({
    url: `/api/login-user/info`
  })
}

// 修改信息
function update(option) {
  return http.getPost({
    url: `/api/system/user/profile/update`,
    data: {
      ...option
    }
  })
}

module.exports = {
  login,
  info,
  update
}
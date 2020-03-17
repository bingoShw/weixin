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
  }).then(res => {
    if(res.data.code === 0){
      //把cookie数组转换成字符串
      const cookiesStr = (res.cookies.join(";"))
      //判断字符串里是否含有JSESSIONID，如果是就保存到storage中
      if (cookiesStr.includes("JSESSIONID")){
        wx.setStorageSync(
          "loginCookies",
          cookiesStr
        )
      }
    }
    return res
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

// 退出登录
function logout() {
  return http.getGet({
    url: `/api/logout`
  })
}

module.exports = {
  login,
  info,
  update,
  logout
}
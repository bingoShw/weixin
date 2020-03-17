function http(option){
  const cookies = wx.getStorageSync("loginCookies")
  if (option.url.startsWith("/api")){
    // option.url = "http://59.111.92.205:8088"+option.url
    option.url = "https://showme.myhope365.com" + option.url
  }
  return new Promise((resolve,reject) => {
    wx.request({
      ...option,
      header:{
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type":"application/x-www-form-urlencoded",
        "cookie":cookies,
        ...option.header
      },
      success(res){
        resolve(res)
      },
      fail(err){
        reject(err)
      }
    })
  })
}

function getPost(option){
  return http({
    ...option,
    method:"POST"
  })
}

function getGet(option){
  return http({
    ...option,
    method: "GET"
  })
}

module.exports = {
  http,
  getPost,
  getGet
}
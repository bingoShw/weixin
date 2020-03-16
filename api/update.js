const http = require("./http.js")

function update(option) {
  return http.getPost({
    url: `/api/system/user/profile/update`,
    data:{
      ...option
    }
  })
}

module.exports = {
  update
}
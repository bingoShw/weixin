const http = require("./http.js")

// 帖子列表
function getPosts() {
  return http.getPost({
    url: `/api/bbs/bbsPosts/open/list`
  })
}

// 创建帖子
function addPosts(options) {
  return http.getPost({
    url: `/api/bbs/bbsPosts/site/add`,
    data: {
      ...options
    }
  })
}

// 分类列表
function category() {
  return http.getPost({
    url: `/api/bbs/bbsCategory/open/list`
  })
}

// 帖子详情
function postsDetails(postsId) {
  return http.getGet({
    url: `/api/bbs/bbsPosts/open/detail/${postsId}`,
    data: {
      postsId
    }
  })
}

// 发表评论
function postsComment(postsId, commentContent) {
  return http.getPost({
    url: `/api/bbs/bbsComment/site/add`,
    data: {
      postsId,
      commentContent
    }
  })
}

// 评论列表
function commentList(postsId) {
  return http.getPost({
    url: `/api/bbs/bbsComment/open/list`,
    data: {
      postsId
    }
  })
}

// 我的帖子
function myPosts() {
  return http.getPost({
    url: `/api/bbs/bbsPosts/join/list`
  })
}

module.exports = {
  getPosts,
  addPosts,
  category,
  postsDetails,
  postsComment,
  commentList,
  myPosts
}
import axios, { AxiosError, AxiosResponse } from 'axios'
import cache from '@/utils/cache.js'
import 'core-js/shim'

const tagsUrl = '/api/tags/get'
const postsUrl = '/api/post/get/'
const postsByTagUrl = '/api/post/getByTag/'
const postAddUrl = '/api/post/add'
const updatePostByIDUrl = '/api/post/update/'
const loginUrl = '/api/login'
const authorizationCheckUrl = '/api/authorizationCheck'


axios.interceptors.response.use(res => res, err => {
  const statusCode = err.response.status
  // 根据返回的code值来做不同的处理（和后端约定）
  switch (statusCode) {
    case 401:
    location.href= '/#/login'
    break
  }
  return Promise.reject(err)
})

export function getPosts() {
  if (cache.has('postList')) {
    return Promise.resolve(cache.get('postList'))
  } else {
    return axios.get(postsUrl)
    .then(res => res.data)
    .then(arr => {
      cache.set('postList', arr)
      return arr
    })
  }
}

export function getPostByID(id) {
  return axios.get(postsUrl + id)
  .then(res => res.data[0])
}

export function getPostsByTag(tag) {
  if (cache.has("postByTag" + tag)) {
    return Promise.resolve(cache.get("postByTag" + tag))
  }
  return axios.get(postsByTagUrl + tag)
  .then(res => res.data)
  .then(raw => {
    cache.set("postByTag" + tag, raw)
    return raw
  })
}
export function login(userinfo) {
  return axios.post(loginUrl, userinfo)
}
export function authorizationCheck() {
  return axios.get(authorizationCheckUrl)
}

export function getTags() {
  if (cache.has("tags")) {
    return Promise.resolve(cache.get("tags"))
  }
  return axios.get(tagsUrl)
  .then(res => res.data)
  .then(data => {
    cache.set("tags", data.Tags)
    return data.Tags
  })
}

export function addPost(p) {
  return axios.post('/api/post/add', p)
}

export function updatePostByID(id, p) {
  return axios.post(updatePostByIDUrl + id, p)
} 

export default {
  addPost,
  updatePostByID,
  getPosts,
  getPostsByTag,
  getPostByID,
  getTags,
  login,
  authorizationCheck
}
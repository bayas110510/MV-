import request from '@/utils/request'

// 在线直播列表
export function fetchList(data) {
  return request({
    url: '/enroll/select',
    method: 'get',
    params: data
  })
}

// export function fetchArticle(id) {
//   return request({
//     url: '/article/detail',
//     method: 'get',
//     params: { id }
//   })
// }

// export function fetchPv(pv) {
//   return request({
//     url: '/article/pv',
//     method: 'get',
//     params: { pv }
//   })
// }

export function createArticle(data) {
  return request({
    url: '/enroll/create',
    method: 'post',
    data
  })
}


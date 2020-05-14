import request from '@/utils/request'

// 域名列表
export function fetchList(data) {
  return request({
    url: '/admin/domain/list',
    method: 'post',
    params: data
  })
}


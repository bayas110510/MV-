import request from '@/utils/request'

// 域名列表
export function fetchList(data) {
  return request({
    url: '/admin/domain1111/list',
    method: 'post',
    params: data
  })
}


import myRequest from '../request/index'

// 1.获取定位城市
export function getCityAll() {
  return myRequest.get({
    url: '/city/all'
  })
}

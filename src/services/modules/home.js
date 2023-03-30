import myRequest from '../request/index'

// 2.获取热门城市
export function getHotSuggests() {
  return myRequest.get({
    url: '/home/hotSuggests'
  })
}

import myRequest from '../request/index'

// 2.获取热门城市
export function getHotSuggests() {
  return myRequest.get({
    url: '/home/hotSuggests'
  })
}

// 3.获取首页推荐类别 categories
export function getCategories() {
  return myRequest.get({
    url: '/home/categories'
  })
}

// 4.获取首页房屋列表
export function getHomeHouseList(currentPage) {
  return myRequest.get({
    url: '/home/houselist',
    // get 请求要传params，post请求要传data
    params: {
      page: currentPage
    }
  })
}

import myRequest from '../request/index'

export function getDetailInfos(houseId) {
  return myRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}

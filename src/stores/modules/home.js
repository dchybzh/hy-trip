import { defineStore } from 'pinia'
import { getHotSuggests, getCategories, getHomeHouseList } from '@/services/index.js'

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],

    houseList: [],
    currentPage: 1
  }),
  actions: {
    // 1.获取热门建议
    async fetchgetHotSuggests() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data.data
    },
    // 2.获取首页推荐类别
    async fetchCategoriesData() {
      const res = await getCategories()
      // console.log(res.data)
      this.categories = res.data.data
    },
    // 3.获取首页房屋列表
    async fetchHomeHouseList() {
      const res = await getHomeHouseList(this.currentPage)
      // console.log(res)
      // 这里要把数据展开后追加进去，而不是追加整个数组因为会加载更多
      this.houseList.push(...res.data.data)
      this.currentPage++
    }
  }
})

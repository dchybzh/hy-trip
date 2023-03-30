import { defineStore } from 'pinia'
import { getHotSuggests } from '@/services/index.js'

export const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: []
  }),
  actions: {
    // 1.获取热门建议
    async fetchgetHotSuggests() {
      const res = await getHotSuggests()
      this.hotSuggests = res.data.data
    }
  }
})

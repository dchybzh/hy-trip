import { defineStore } from 'pinia'
import { getCityAll } from '@/services'

const useCityStore = defineStore('city', {
  state: () => ({
    allCities: {},

    currentCity: {
      cityName: '广州'
    } // 选中的城市
  }),
  actions: {
    async fetchAllCitiesData() {
      const res = await getCityAll()
      // console.log(res)
      this.allCities = res.data.data
    }
  }
})

export default useCityStore

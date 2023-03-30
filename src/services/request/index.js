import axios from 'axios'
import { BASE_URL, TIMEOUT } from './confnig'

class myRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config) {
    return this.instance({ ...config, method: 'get' })
  }

  post(config) {
    return this.instance({ ...config, method: 'post' })
  }
}

export default new myRequest(BASE_URL, TIMEOUT)

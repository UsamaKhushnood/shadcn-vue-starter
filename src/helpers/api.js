import fetchWrapper from './axios'

export default {
  get(endpoint, params) {
    return fetchWrapper.get(endpoint, params)
  },

  post(endpoint, params) {
    return fetchWrapper.post(endpoint, params)
  },

  delete(endpoint, params) {
    return fetchWrapper.delete(endpoint, params)
  }
}

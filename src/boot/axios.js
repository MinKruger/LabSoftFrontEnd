import axios from 'axios'

// import { handleErrors } from 'src/utils/api'

export default ({ Vue, router, store }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://52.55.79.223:5555',
    timeout: 180000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'Application/json'
    }
  })

  Vue.prototype.$axios.interceptors.request.use(
    request => {
      const token = localStorage.getItem('access_token')
      if (token) request.headers.Authorization = `Bearer ${token}`

      return request
    },
    error => {
      Vue.prototype.$q.loading.hide()

      return Promise.reject(error)
    }
  )

  Vue.prototype.$axios.interceptors.response.use(
    response => {
      return response
    },
    error => {
      // if (!error.config.ignoreErrorHandling) {
      //   return handleErrors(error, { router, store, axios, customErrorHandlers: error.config.customErrorHandlers })
      // }

      return Promise.reject(error)
    }
  )
}

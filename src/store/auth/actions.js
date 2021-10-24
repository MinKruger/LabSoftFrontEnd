import Vue from 'vue'
import { Notify } from 'quasar'

export async function attemptLogin ({ commit }, userCredentials) {
  const { data } = await Vue.prototype.$axios.post(
    'auth/login',
    userCredentials,
    {
      customErrorHandlers: {
        401: data => {
          Notify.create({
            type: 'alert',
            message: data.message
          })
        }
      }
    }
  )

  console.log(data)

  localStorage.setItem('access_token', data.token)

  // commit('setUser', data.user)

  return data
}

export async function logout ({ commit }) {
  const token = localStorage.getItem('access_token')

  if (token !== null) {
    localStorage.removeItem('access_token')

    await Vue.prototype.$axios
      .post('logout', null, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        ignoreErrorHandling: true
      })
      .catch(() => {})
  }

  commit('setUser', null)
}

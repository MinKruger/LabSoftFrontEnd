import Vue from 'vue'

export async function attemptLogin ({ commit }, userCredentials) {
  // TODO: ver rota correta no backend
  const { data } = await Vue.prototype.$axios.post('login', userCredentials, {
    customErrorHandlers: {
      401: data => {
        if (data.message) {
          Vue.prototype.$q.notify({
            type: 'alert',
            message: data.message
          })
        }
      }
    }
  })

  localStorage.setItem('access_token', data.access_token)

  commit('setUser', data.user)

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

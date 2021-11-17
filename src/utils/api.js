import Vue from 'vue'
import { Notify } from 'quasar'

export const handleErrors = async (
  error,
  { router, store, customErrorHandlers }
) => {
  if (!window.navigator?.onLine) {
    return Notify.create({
      type: 'warning',
      message: 'Sem conexão com a internet.'
    })
  }

  if (!error.response || typeof error.response !== 'object') {
    return Notify.create({
      type: 'warning',
      message: 'Problemas de conexão, por favor tente mais tarde.'
    })
  }

  const defaultErrorHandlers = {
    400: data => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message: data.message
      })
    },
    401: async (/* data */) => {
      await store.dispatch('auth/logout')

      Vue.prototype.$q.notify({
        type: 'warning',
        message: 'Sua sessão expirou, por favor faça novamente o login.'
      })
      await router.push({ name: 'Login' })
    },
    403: async (/* data */) => {
      await router.replace({ name: 'Login' })
      Vue.prototype.$q.notify({
        type: 'warning',
        message:
          'Você não possui permissões suficientes para realizar essa ação.'
      })
    },
    422: data => {
      const errors = Object.values(data.errors).flat()
      Vue.prototype.$q.notify({
        type: 'warning',
        message: errors.shift()
      })
    },
    429: (/* data */) => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message:
          'Você está realizando muitas ações em um curto período de tempo, por favor tente novamente mais tarde.'
      })
    },
    500: (/* data */) => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message:
          'Não foi possível realizar esta ação no momento. tente novamente mais tarde.'
      })
    },
    503: (/* data */) => {
      Vue.prototype.$q.notify({
        type: 'warning',
        message: 'Nós estamos em manutenção. Desculpe-nos pelo transtorno.'
      })
      // await router.push({ name: 'Maintenance' })
    }
  }

  const errorHandler = { ...defaultErrorHandlers }

  Object.assign(errorHandler, customErrorHandlers)

  const { status, data } = error.response

  return (
    (errorHandler[status] && (await errorHandler[status](data))) ||
    Promise.reject(error)
  )
}

export function getUser (state) {
  return state.user
}

export function isAuthenticated (state) {
  return !!state.user
}

export function isStudent (state) {
  return isAuthenticated(state) && state.user.permissao === 'aluno'
}

export function isAthletic (state) {
  return isAuthenticated(state) && state.user.permissao === 'atletica'
}

export function isDCE (state) {
  return isAuthenticated(state) && state.user.permissao.startsWith('dce')
}

export function getDceLevel (state) {
  return isDCE(state) ? parseInt(state.user.permissao.slice(-1)) : null
}

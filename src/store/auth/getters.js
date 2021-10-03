export function getUser (state) {
  return state.user
}

export function isActive (state) {
  return state.user && state.user.is_active
}

export function isAdmin (state) {
  return state.user && state.user.is_admin
}

export function isAssociate (state) {
  return state.user && state.user.is_partner
}

export function isEvaluator (state) {
  return state.user && state.user.is_evaluator
}

export function isMaster (state) {
  return state.user && state.user.is_master
}

export function isApp (state) {
  return isAssociate(state)
}

export function isDashboard (state) {
  return isAdmin(state) || isEvaluator(state)
}

export function isAuthenticated (state) {
  return Boolean(state.user)
}

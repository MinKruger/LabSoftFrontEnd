export function setLeftDrawerOpen (state, payload) {
  state.leftDrawerOpen = payload
}

export function toggleLeftDrawerOpen (state) {
  state.leftDrawerOpen = !state.leftDrawerOpen
}

export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_idToken (state, token) {
    state.jwt.idToken = token
  },
  SET_accessToken (state, token) {
    state.jwt.accessToken = token
  },
  SYNC_WALLETS (state, wallets) {
    state.wallets = wallets
  },
  ADD_WALLET (state, wallet) {
    state.wallets.push(wallet)
  },
  SET_activeWallet (state, wallet) {
    state.activeWallet = wallet
  },
  RESET_WALLET (state) {
    state.activeWallet = null
  },
  ADD_PERSON (state, person) {
    state.person = person
  }
}

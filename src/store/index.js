import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'


import account from './account'
import wallet from './wallet'
import nicknames from './nicknames'



export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      account,
      wallet,
      nicknames
    },
    strict: false
  })

  return Store
})

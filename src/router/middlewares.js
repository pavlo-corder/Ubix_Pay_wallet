import {useStore} from "vuex";
let $store = useStore()

function auth ({ next, store }) {

  let accounts = JSON.parse(localStorage.getItem('accounts'))

  if(accounts === null
    || accounts[0].blockchains.length === 0) {
    return next({ name: '' })
  }
  return next()
}

function account ({ next, store }) {


  let accounts = JSON.parse(localStorage.getItem('accounts'))

  if(accounts !== null && accounts.length > 0
    && accounts[0].password !== ''
    && accounts[0].blockchains.length > 0
    && accounts[0].blockchains[0].wallets.length > 0
  ) {
    return next({ name: "accounts" })
  }
  return next()
}

export {auth, account}

/*
export function someMutation (state) {
}
*/

import { decryptListWithAES, encryptListWithAES } from "src/helper/text-crypt"


export const updateWallets = (state, payload) => {

  let accounts = state.accounts
  let account = { ...accounts[state.key_account] }

  account.blockchains.map((item) => {
    if (item.label === account.current_blockchain.label) {
      item.wallets.push(payload)
    }
  })


  accounts[state.key_account] = account;
  Object.assign(state.account, decryptPhraseFromPayload(account))
  //
  console.log(state.account, 29)
  localStorage.setItem('accounts', JSON.stringify(accounts))
}

export const updateCurrentWallet = (state, payload) => {

  let accounts = state.accounts
  let account = { ...accounts[state.key_account] }

  account.current_wallet = payload

  accounts[state.key_account] = account
  Object.assign(state.account, decryptPhraseFromPayload(account))
  console.log(state.account, 37)
  localStorage.setItem('accounts', JSON.stringify(accounts))

}

export const updateCurrentBlockchain = (state, payload) => {
  let accounts = state.accounts
  let account = { ...accounts[state.key_account] }

  account.current_blockchain = payload

  account.blockchains.map((item) => {
    if (item.label === payload.label && item.wallets[0]) {
      account.current_wallet = item.wallets[0]
    } else {
      account.current_wallet = false
    }
  })

  // account.current_wallet = account.

  accounts[state.key_account] = account
  Object.assign(state.account, decryptListWithAES(account))
  console.log(account, 66)
  localStorage.setItem('accounts', JSON.stringify(accounts))

}

// export default function () {
//   return {
//     drawerState: true
//   }
// }




export const update = (state, payload) => {

  // let key_account = accounts.state().key_account

  // console.log('payload', payload )



  let accounts = state.accounts

  // console.log('state.key_account', state.key_account)
  // console.log('state.accounts', state.accounts)
  // console.log('state.account', accounts[state.key_account])

  if (!payload.id) {
    payload.id = new Date().getTime()
  }

  accounts[state.key_account] = encryptPhraseFromPayload(payload);

  localStorage.setItem('accounts', JSON.stringify(accounts))
  localStorage.setItem('key_account', state.key_account)

  console.log('103', payload);
  Object.assign(state.account, payload)
}

export const encryptPhraseFromPayload = (payload) => {
  const result = JSON.parse(JSON.stringify(payload))
  if (payload?.phrase?.length > 0) {
    result.phrase = encryptListWithAES(result.phrase, payload.password)
  }
  return result;
}

export const decryptPhraseFromPayload = (payload) => {
  const result = JSON.parse(JSON.stringify(payload))
  if (payload?.phrase?.length > 0) {
    result.phrase = decryptListWithAES(result.phrase, payload.password)
  }
  return result;
}
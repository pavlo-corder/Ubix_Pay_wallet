/*
export function someMutation (state) {
}
*/


export const updateWallets = (state, payload) => {

  let accounts = state.accounts
  let account = {...accounts[state.key_account]}

  account.blockchains.map((item) => {
    // console.log(item.label)
  //
  //     if(item.label === item.current_blockchain.label){
        console.log('payload.wallets', payload)
          item.wallets.push(payload)
      // }
  //
  })

  console.log(account)

  Object.assign(state.account, account)
  accounts[state.key_account] = account
  //
  localStorage.setItem('accounts', JSON.stringify(accounts))

}

export const updateCurrentWallet = (state, payload) => {

  let accounts = state.accounts
  let account = {...accounts[state.key_account]}

  account.current_wallet = payload

  Object.assign(state.account, account)
  accounts[state.key_account] = account
  //
  localStorage.setItem('accounts', JSON.stringify(accounts))

}

export const updateCurrentBlockchain = (state, payload) => {

  let accounts = state.accounts
  let account = {...accounts[state.key_account]}

  account.current_blockchain = payload

  account.blockchains.map((item) => {
    if(item.label === payload.label && item.wallets[0] ){
      account.current_wallet = item.wallets[0]
    }else{
      account.current_wallet = false
    }
  })

  // account.current_wallet = account.

  Object.assign(state.account, account)
  accounts[state.key_account] = account
  //
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

  console.log('state.key_account', state.key_account)
  console.log('state.accounts', state.accounts)
  console.log('state.account', accounts[state.key_account])

  if(!payload.id){
    payload.id = new Date().getTime()
  }

  accounts[state.key_account] = payload

  localStorage.setItem('accounts', JSON.stringify(accounts))
  localStorage.setItem('key_account', state.key_account)

  Object.assign(state.account, payload)


}


// export const updateNicknames = (state, payload) => {
//
//   let nicknames = [...state.nicknames]
//
//   console.log(nicknames)
//
//   let issetNickname = false
//
//   nicknames.map((nickname) => {
//     if(nickname.address === payload.address){
//       nickname.name = payload.name
//       issetNickname = true
//     }
//   })
//
//   if(!issetNickname){
//     nicknames.push(payload)
//   }
//
//   Object.assign(state.nicknames, nicknames)
//
//   localStorage.setItem('nicknames', JSON.stringify(nicknames))
//
// }

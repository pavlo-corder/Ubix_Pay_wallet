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
      if(item.label === payload.blockchain.label){
        console.log('payload.wallets', payload.wallet)
          item.wallets.push(payload.wallet)
      }
  //
  })

  console.log(account)

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

  console.log('payload', payload )

  Object.assign(state.account, payload)

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



}

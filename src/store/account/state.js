// export default function () {
//   return {
//     //
//   }
// }
export default function () {


  let keyAccount = localStorage.getItem('key_account')
  let accounts = JSON.parse(localStorage.getItem('accounts'))

  if(!keyAccount || !accounts || accounts.length === 0){
    keyAccount = 0
  }

  if(!accounts){
    accounts = []
  }

  let account = {
    phrase: [],
    confirmPhrase: false,
    password: "",
    name: "",
    details: "",
    blockchains: [
      {
        label:'ETH',
        value: 60,
        wallets: []
      }
    ]
  }

  if(keyAccount && accounts && accounts.length > 0){
    account = accounts[keyAccount]
  }

  console.log('account state', account)

  return {
    key_account: keyAccount,
    account: account,
    accounts: accounts
  }
}

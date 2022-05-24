// export default function () {
//   return {
//     //
//   }
// }
export default function () {

  let keyAccount = 0
  keyAccount = localStorage.getItem('key_account')
  let accounts = JSON.parse(localStorage.getItem('accounts'))



  if(keyAccount === null || keyAccount === '' || !keyAccount){
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



  if(keyAccount >= 0 && accounts && accounts.length > 0){
    account = accounts[keyAccount]
  }

  console.log('account state', account)

  return {
    key_account: keyAccount,
    account: account,
    accounts: accounts
  }
}


export default function () {


  let current_blockchain = {}

  let current_wallet = {
    label: '',
    name: '',
    numberWallet: 0,
    wallet: '',
    value: '',
    balance: 0
  }

  let account = null

  let wallets = []

  let key_account = localStorage.getItem('key_account')

  let accounts = JSON.parse(localStorage.getItem('accounts'))
  // let accounts = $store.getters['wallet/getAccountsGetter']

  if(accounts && accounts.length > 0){
    account = {...accounts[key_account]}
    current_wallet = {...account.current_wallet}
    current_blockchain = {...account.current_blockchain}
  }

  if(account){
    let blockchains = [...account.blockchains]
    let current_blockchain = {...account.current_blockchain}
    if(blockchains){
      blockchains.map((blockchain) => {
        if(blockchain.label === current_blockchain.label){
          wallets = [...blockchain.wallets]
        }
      })
    }
  }

  return {
    current_blockchain,
    current_wallet,
    wallets
  }
}

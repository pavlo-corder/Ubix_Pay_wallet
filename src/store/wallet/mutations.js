/*
export function someMutation (state) {
}
*/

import axios from "axios";

export const getBalance = (state) => {

  let current_wallet = {...state.current_wallet}

  console.log('current_wallet mutation start', current_wallet)
  console.log('state.current_wallet mutation start', state.current_wallet)


  axios.post(`${process.env.API}/blockchain/get_balance`, {
    wallet: state.current_wallet.wallet,
    blockchain: state.current_blockchain.label
  }).then((response) => {
    if (response.data.success) {

      current_wallet.balance = response.data.value.balance

      // Object.assign(rootState.account.account.current_wallet, current_wallet)
      // state.current_wallet = current_wallet
      Object.assign(state.current_wallet, current_wallet)

      console.log('state.current_wallet.balance', response.data.value.balance, state.current_wallet)

    }
  }).catch((error) => {
    console.error(error);
  })

}


export const getBalances = (state) => {
  // state.wallets
}

export const createWallet = (state, payload) => {

  axios.post(`${process.env.API}/blockchain/create_wallet`, payload)
    .then((response) => {
      console.log(response)
      if(response.status === 200 && response.data.success){

        let account = {...this.account}

        let name_wallet = `Wallet ${payload.count_wallets + 1}`

        let new_wallet = {
          label: name_wallet,
          name: name_wallet,
          balance: 0,
          numberWallet: payload.count_wallets,
          value: response.data.wallet,
          wallet: response.data.wallet
        }

        // let blockchains = [...this.account.blockchains]
        // //
        // console.log('blockchains', blockchains)

        // blockchains.map((item) => {
        //
        //   if(item.label === this.model_blockchain.label){
        //     console.log('new_wallet', new_wallet)
        //     this.updateWallets(new_wallet)
        //   }
        //
        // })

        // this.updateAccount(account)
        // this.updateCurrentWallet(new_wallet)
        // this.setData()
        // this.model_wallet = new_wallet
        // this.getBalance()

      }
    })
    .catch((error) => {
      console.error(error);
    })

}

export const updateCurrentWallet = (state, wallet) => {

  Object.assign(state.current_wallet, wallet)




  // let keyAccount = localStorage.getItem('key_account')
  // let accounts = JSON.parse(localStorage.getItem('accounts'))
  //
  // let account = {...accounts[keyAccount]}
  // let account = rootState.account.account
  //
  // account.current_blockchain = payload

  // account.blockchains.map((item) => {
  //   if(item.label === payload.label && item.wallets[0] ){
  //     account.current_wallet = item.wallets[0]
  //   }else{
  //     account.current_wallet = false
  //   }
  // })

  // account.current_wallet = account.

  // Object.assign(state.account, account)
  // accounts[keyAccount] = account
  //
  // localStorage.setItem('accounts', JSON.stringify(accounts))

}

export const updateCurrentBlockchain = (state, current_blockchain) => {

  Object.assign(state.current_blockchain, current_blockchain)

}

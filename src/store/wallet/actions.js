/*
export function someAction (context) {
}
*/

import axios from "axios";

export const getBalance = ({ commit, store, rootState }) => {
  //
  let account = {...rootState.account.account}

  let current_wallet = {...account.current_wallet}
  let current_blockchain = {...account.current_blockchain}
  //
  //
  console.log('account action', account)
  //
  //
  axios.post(`${process.env.API}/blockchain/get_balance`, {
    wallet: current_wallet.wallet,
    blockchain: current_blockchain.label
  }).then((response) => {
    if (response.data.success) {

      current_wallet.balance = response.data.value.balance

      account.current_wallet = current_wallet
      console.log(account)

      commit('account/update', account, {root: true})

      // Object.assign(rootState.account.account.current_wallet, current_wallet)
      // Object.assign(state.current_wallet, current_wallet)
      // console.log('state.current_wallet.balance', response.data.value.balance, state.current_wallet)

    }
  }).catch((error) => {
    console.error(error);
  })

  // commit('wallet/getBalance', payload)

}

export const updateCurrentWallet = ({ commit, rootState }, current_wallet) => {

  // console.log('updateCurrentWallet action start', current_wallet)

  let account = {...rootState.account.account}

  // console.log('account action start', account)

  account.current_wallet = current_wallet

  // console.log('account action finish', account)

  commit('account/update', account, {root: true})

  commit('updateCurrentWallet', current_wallet)

  commit('getBalance')

  // console.log('updateCurrentWallet action finish')

  // Object.assign(rootState.account.account.current_wallet, current_wallet)

}

export const createWallet = ({ commit, state, rootState }, dataCreateWallet) => {

  dataCreateWallet.count_wallets = state.count_wallets
  dataCreateWallet.create_number_wallet = state.count_wallets

  // console.log('dataCreateWallet', dataCreateWallet)

  axios.post(`${process.env. API}/blockchain/create_wallet`, dataCreateWallet)
    .then((response) => {
      // console.log(response)
      if(response.status === 200 && response.data.success){

        let account = {...rootState.account.account}

        console.log('rootState.account.account', rootState.account.account)

        account.blockchains.map((item) => {

          if(item.label === dataCreateWallet.blockchain.label){
            console.log('new_wallet', response.data.wallet)

            item.wallets.push(response.data.wallet)
            // this.updateWallets(response.data.wallet)
          }

        })

        //Делаем созданный кошелёк по умолчанию
        account.current_blockchain = account.blockchains[0]
        account.current_wallet = response.data.wallet

        //Обновляем аккаунт
        commit('account/update', account, {root: true})

        //Обновляем текущий кошелёк
        commit('updateCurrentBlockchain', account.current_blockchain )

        //Обновляем текущий кошелёк
        commit('updateCurrentWallet', account.current_wallet )

      }
    })
    .catch((error) => {
      console.error(error);
    })

}

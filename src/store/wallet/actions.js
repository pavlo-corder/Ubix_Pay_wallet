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

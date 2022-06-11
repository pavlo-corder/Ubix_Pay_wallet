/*
export function someMutation (state) {
}
*/

import axios from "axios";

export const getBalance = (state, payload) => {

  let current_wallet = {...state.current_wallet}

  axios.post(`${process.env.API}/blockchain/get_balance`, {
    wallet: state.current_wallet.wallet,
    blockchain: state.current_blockchain.label
  }).then((response) => {
    if (response.data.success) {

      current_wallet.balance = response.data.value.balance

      // Object.assign(rootState.account.account.current_wallet, current_wallet)
      // Object.assign(state.current_wallet, current_wallet)
      // console.log('state.current_wallet.balance', response.data.value.balance, state.current_wallet)

    }
  }).catch((error) => {
    console.error(error);
  })

}


export const getBalances = (state) => {
  // state.wallets
}

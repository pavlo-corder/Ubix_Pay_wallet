import axios from "axios";

export const updateCurrentWallet = ({ commit, rootState }, current_wallet) => {
  let account = { ...rootState.account.account }
  account.current_wallet = current_wallet
  commit('account/update', account, { root: true })
  commit('updateCurrentWallet', current_wallet)
  commit('getBalance')
}

export const createWallet = ({ commit, state, rootState }, dataCreateWallet) => {
  dataCreateWallet.count_wallets = state.count_wallets
  dataCreateWallet.create_number_wallet = state.count_wallets
  axios.post(`${process.env.API}/blockchain/create_wallet`, dataCreateWallet)
    .then((response) => {
      if (response.status === 200 && response.data.success) {
        let account = { ...rootState.account.account }
        console.log('rootState.account.account', rootState.account.account)
        account.blockchains.map((item) => {
          if (item.label === dataCreateWallet.blockchain.label) {
            console.log('new_wallet', response.data.wallet)
            item.wallets.push(response.data.wallet)
          }
        })
        account.current_blockchain = account.blockchains[0]
        account.current_wallet = response.data.wallet
        commit('account/update', account, { root: true })
        commit('updateCurrentBlockchain', account.current_blockchain)
        commit('updateCurrentWallet', account.current_wallet)
      }
    })
    .catch((error) => {
      console.error(error);
    })
}

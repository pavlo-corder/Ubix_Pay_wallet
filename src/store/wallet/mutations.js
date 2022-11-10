/*
export function someMutation (state) {
}
*/

import axios from "axios";

export const getBalance = (state) => {
  let current_wallet = { ...state.current_wallet };

  // console.log('current_wallet mutation start', current_wallet)

  getEtherBalance(state.current_wallet.wallet).then((balance) => {
    current_wallet.balance = balance;
    Object.assign(state.current_wallet, current_wallet);
  });
};

export const createWallet = (state, payload) => {
  axios
    .post(`${process.env.API}/blockchain/create_wallet`, payload)
    .then((response) => {
      console.log(response);
      if (response.status === 200 && response.data.success) {
        let account = { ...this.account };
        let name_wallet = `Wallet ${payload.count_wallets + 1}`;

        let new_wallet = {
          label: name_wallet,
          name: name_wallet,
          balance: 0,
          numberWallet: payload.count_wallets,
          value: response.data.wallet,
          wallet: response.data.wallet,
        };
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateCurrentWallet = (state, wallet) => {
  Object.assign(state.current_wallet, wallet);
};

export const updateCurrentBlockchain = (state, current_blockchain) => {
  Object.assign(state.current_blockchain, current_blockchain);
};

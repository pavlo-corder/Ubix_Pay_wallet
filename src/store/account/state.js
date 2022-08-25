// export default function () {
//   return {
//     //
//   }

import { decryptListWithAES, encryptListWithAES } from "src/helper/text-crypt"

// }
export default function () {
  let keyAccount = 0
  keyAccount = localStorage.getItem('key_account')
  let accounts = JSON.parse(localStorage.getItem('accounts'))

  if (keyAccount === null || keyAccount === '' || !keyAccount) {
    keyAccount = 0
  }

  if (!accounts) {
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
        label: 'ETH',
        value: 60,
        wallets: []
      },
      // {
      //   label:'BTC',
      //   value: 0,
      //   wallets: []
      // },
      // {
      //   label:'UBX',
      //   value: 713,
      //   wallets: []
      // }
    ],
    current_wallet: {
      label: '',
      name: '',
      numberWallet: 0,
      wallet: '',
      value: ''
    },
    current_blockchain: {
      label: 'ETH',
      value: 60,
      wallets: []
    },
    transaction: {
      blockchain_id: 0,
      number_wallet: 0,
      to: ''
    }
  }

  if (keyAccount >= 0 && accounts && accounts.length > 0) {
    account = accounts[keyAccount]
  }

  let current_wallet = { ...account.current_wallet }
  accounts.forEach(account => account.phrase = decryptListWithAES(account.phrase, account.password));

  return {
    key_account: keyAccount,
    account,
    accounts,
    current_wallet
  }
}

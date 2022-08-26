import { decryptListWithAES, decryptPhraseFromPayload, encryptListWithAES, encryptPhraseFromPayload } from 'src/helper/text-crypt'
import { getEtherBalance } from 'src/helper/ethers-interact'

const storeAccountWithEncryption = (accounts) => {
  const copiedAccounts = JSON.parse(JSON.stringify(accounts));
  copiedAccounts.map(account => {
    account.phrase = encryptListWithAES(account.phrase, account.password)
  });
  localStorage.setItem('accounts', JSON.stringify(copiedAccounts))
}

export default {
  namespaced: true,
  state: () => {
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
  },
  getters: {
    getAccounts(state) {
      return state.accounts;
    },
    getCurrentWallet(state) {
      return state.current_wallet;
    },
    getCurrentAccount(state) {
      return state.account;
    },
    getCurrentBlockchain(state) {
      return state.account.current_blockchain;
    },
    getCurrentWallets(state) {
      return state.account.blockchains
        .find(blockchain => blockchain.label === state.account.current_blockchain.label)
        .wallets;
    }
  },
  mutations: {
    updateWallets: (state, payload) => {
      let accounts = state.accounts
      let account = { ...accounts[state.key_account] }

      account.blockchains.map((item) => {
        if (item.label === account.current_blockchain.label) {
          item.wallets.push(payload)
        }
      })

      accounts[state.key_account] = account;
      Object.assign(state.account, decryptPhraseFromPayload(account))
      console.log(state.account, 29)
      storeAccountWithEncryption(accounts);
    },

    updateCurrentWallet: (state, payload) => {
      let accounts = state.accounts

      accounts[state.key_account].current_wallet = payload;
      state.current_wallet = payload;
      Object.assign(state.account, decryptPhraseFromPayload(accounts[state.key_account]))
      storeAccountWithEncryption(accounts);
    },

    updateCurrentBlockchain: (state, payload) => {
      let accounts = state.accounts
      let account = { ...accounts[state.key_account] }
      account.current_blockchain = payload
      account.blockchains.map((item) => {
        if (item.label === payload.label && item.wallets[0]) {
          account.current_wallet = item.wallets[0]
        } else {
          account.current_wallet = false
        }
      })

      accounts[state.key_account] = account
      console.log(account, 52)
      Object.assign(state.account, decryptPhraseFromPayload(account))
      console.log(account, 66)
      storeAccountWithEncryption(accounts);

    },


    update: (state, payload) => {
      let accounts = state.accounts
      if (!payload.id) {
        payload.id = new Date().getTime()
      }
      accounts[state.key_account] = encryptPhraseFromPayload(payload);
      storeAccountWithEncryption(accounts);
      localStorage.setItem('key_account', state.key_account)
      console.log('103', payload);
      Object.assign(state.account, payload)
    },

    setBalance: (state, { balance, label, wallet }) => {
      state.accounts.forEach(account => {
        console.log(account.current_wallet.wallet === wallet, wallet, balance)
        if (account.current_wallet.wallet === wallet)
          account.current_wallet.balance = balance;
        account.blockchains.forEach(blockchain => {
          if (blockchain.label === label) {
            blockchain.wallets.forEach((_wallet) => {
              if (_wallet.wallet === wallet)
                _wallet.balance = balance;
            })
          }
        })
      })
    }

  },
  actions: {
    updateAccount({ commit }, payload) {
      commit('account/update', payload)
    },
    async updateBalances({ getters, dispatch }, obj = { label: 'ETH' }) {
      const walletList = getters.getCurrentWallets.map(({ wallet }) => wallet)
      walletList.map(wallet => {
        dispatch('fetchBalance', { wallet, label: obj.label });
      })
    },
    async fetchBalance({ commit }, obj = { wallet, label: 'ETH' }) {
      const balance = await getEtherBalance(obj.wallet, obj.label);
      commit('setBalance', { ...obj, balance });
      return balance;
    }
  }
}

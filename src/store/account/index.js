import {
  decryptAnyWithAES,
  decryptListWithAES,
  decryptPhraseFromPayload,
  decryptWithAES,
  encryptAnyWithAES,
  encryptListWithAES,
  encryptPhraseFromPayload,
  encryptWithAES,
} from "src/helper/text-crypt";
import { getEtherBalance } from "src/helper/ethers-interact";
import { NULL_ADDRESS, UBIX_SECRECT } from "src/helper/constants";
import { getUbikiriBalanceApi } from "src/helper/ubx-interact";

export const storeAccountWithEncryption = (accounts) => {
  const copiedAccounts = JSON.parse(JSON.stringify(accounts));
  copiedAccounts.map((account) => {
    account.phrase = encryptListWithAES(account.phrase, account.password);
  });
  localStorage.setItem(
    "accounts",
    encryptAnyWithAES(JSON.stringify(copiedAccounts), UBIX_SECRECT)
  );
};

export const loadAccountWithEncryption = () => {
  try {
    const rawAccounts = localStorage.getItem("accounts");
    return JSON.parse(decryptAnyWithAES(rawAccounts, UBIX_SECRECT));
  } catch (error) {
    return null;
  }
};

export const decryptAccountsBySecret = () => {
  const rawAccounts = localStorage.getItem("accounts");
  if (rawAccounts === null) return null;
  return JSON.parse(decryptAnyWithAES(rawAccounts, UBIX_SECRECT));
};

export const decryptAccountsByPassword = (password) => {
  const rawAccounts = localStorage.getItem("accounts");
  return decryptAnyWithAES(rawAccounts, password);
};

export const lockAccountsWithPassword = (password) => {
  const rawAccounts = localStorage.getItem("accounts");
  localStorage.setItem("accounts", encryptAnyWithAES(rawAccounts, password));
};

export default {
  namespaced: true,
  state: () => {
    let keyAccount = 0;
    keyAccount = localStorage.getItem("key_account");
    let accounts = loadAccountWithEncryption();

    if (keyAccount === null || keyAccount === "" || !keyAccount) {
      keyAccount = 0;
    }

    if (!accounts) {
      accounts = [];
    }

    let account = {
      phrase: [],
      confirmPhrase: false,
      password: "",
      name: "",
      details: "",
      blockchains: [
        {
          label: "ETH",
          value: 60,
          tokens: [],
          wallets: [],
        },
        // {
        //   label:'BTC',
        //   value: 0,
        //   wallets: []
        // },
        {
          label: "UBX",
          value: 713,
          wallets: [],
        },
      ],
      current_wallet: {
        label: "",
        name: "",
        numberWallet: 0,
        wallet: "",
        value: "",
      },
      current_blockchain: {
        label: "ETH",
        value: 60,
        wallets: [],
        tokens: [],
      },
      transaction: {
        blockchain_id: 0,
        number_wallet: 0,
        to: "",
      },
    };

    if (keyAccount >= 0 && accounts && accounts.length > 0) {
      account = accounts[keyAccount];
    }

    let current_wallet = { ...account.current_wallet };
    accounts.forEach(
      (account) =>
        (account.phrase = decryptListWithAES(account.phrase, account.password))
    );
    return {
      key_account: keyAccount,
      account,
      accounts,
      current_wallet,
    };
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
    getBlockchains(state) {
      return state.account.blockchains;
    },
    getCurrentBlockchain(state) {
      return state.account.current_blockchain;
    },
    getCurrentTokens(state) {
      let customTokens =
        state.account.blockchains.find(
          (blockchain) =>
            blockchain.label === state.account.current_blockchain.label
        ).tokens || [];

      customTokens = JSON.parse(JSON.stringify(customTokens));

      if (state.account.current_blockchain.label === "ETH")
        customTokens.push({
          decimals: 18,
          name: "Ethereum",
          symbol: "ETH",
          balance: "0.0",
          wallet: true,
          type: "coin",
          networkLabel: "ETH",
          address: NULL_ADDRESS,
        });
      else if (state.account.current_blockchain.label === "UBX")
        customTokens.push({
          decimals: 0,
          name: "Ubix Network",
          symbol: "UBX",
          balance: "0.0",
          wallet: true,
          type: "coin",
          networkLabel: "UBX",
          address: NULL_ADDRESS,
        });
      return customTokens.reverse();
    },
    getCurrentWallets(state) {
      return state.account.blockchains.find(
        (blockchain) =>
          blockchain.label === state.account.current_blockchain.label
      ).wallets;
    },
  },
  mutations: {
    updateWallets: (state, payload) => {
      let accounts = state.accounts;
      let account = { ...accounts[state.key_account] };
      // console.log(account, state.key_account);

      account.blockchains.map((item) => {
        // console.log(item);
        if (item.label === payload.network) {
          item.wallets.push(payload);
        }
      });

      accounts[state.key_account] = account;
      Object.assign(state.account, decryptPhraseFromPayload(account));

      storeAccountWithEncryption(accounts);
    },

    updateCurrentWallet: (state, payload) => {
      let accounts = state.accounts;

      accounts[state.key_account].current_wallet = payload;
      state.current_wallet = payload;
      Object.assign(
        state.account,
        decryptPhraseFromPayload(accounts[state.key_account])
      );
      storeAccountWithEncryption(accounts);
    },

    updateCurrentBlockchain: (state, payload) => {
      let accounts = state.accounts;
      let account = { ...accounts[state.key_account] };
      account.current_blockchain = payload;
      account.blockchains.map((item) => {
        if (item.label === payload.label && item.wallets[0]) {
          account.current_wallet = item.wallets[0];
        } else {
          account.current_wallet = false;
        }
      });

      accounts[state.key_account] = account;
      Object.assign(state.account, decryptPhraseFromPayload(account));
      storeAccountWithEncryption(accounts);
    },

    update: (state, payload) => {
      let accounts = state.accounts;
      if (!payload.id) {
        payload.id = new Date().getTime();
      }
      accounts[state.key_account] = encryptPhraseFromPayload(payload);
      storeAccountWithEncryption(accounts);
      localStorage.setItem("key_account", state.key_account);
      Object.assign(state.account, payload);
    },

    setBalance: (state, { balance, label, wallet }) => {
      state.accounts.forEach((account) => {
        if (account.current_wallet.wallet === wallet)
          account.current_wallet.balance = balance;
        account.blockchains.forEach((blockchain) => {
          if (blockchain.label === label) {
            blockchain.wallets.forEach((_wallet) => {
              if (_wallet.wallet === wallet) {
                _wallet.balance = balance;
              }
            });
          }
        });
      });
    },

    addCustomToken: (state, { address, name, symbol, decimals, type }) => {
      if (address.length !== 42 || symbol.length === 0) return;
      const targetAccount = state.accounts[state.key_account];
      const networkLabel = targetAccount.current_blockchain.label;
      targetAccount.blockchains.forEach((blockchain) => {
        if (blockchain.label === networkLabel) {
          if (
            blockchain.tokens.findIndex(
              (item) => item.address === address && item.type === type
            ) >= 0
          ) {
            return;
          }
          blockchain.tokens.push({
            networkLabel,
            address,
            name,
            symbol,
            decimals,
            type,
          });
        }
      });
      storeAccountWithEncryption(state.accounts);
    },
    removeCustomToken: (state, { address, type }) => {
      if (address.length !== 42) return;
      const targetAccount = state.accounts[state.key_account];
      const networkLabel = targetAccount.current_blockchain.label;
      targetAccount.blockchains.forEach((blockchain) => {
        if (blockchain.label === networkLabel) {
          const splicedItem = blockchain.tokens.splice(
            blockchain.tokens.findIndex(
              (item) => item.address === address && item.type === type
            ),
            1
          );
        }
      });
      storeAccountWithEncryption(state.accounts);
    },

    lockAccounts: (state) => {
      if (state.accounts) {
        storeAccountWithEncryption(state.accounts);
        const targetAccount = state.accounts[state.key_account];
        lockAccountsWithPassword(targetAccount.password);
        state.accounts = [];
      }
    },
    unlockAccounts: (state, password) => {
      const rawAccounts = decryptAccountsByPassword(password);
      const accounts = decryptAnyWithAES(rawAccounts, UBIX_SECRECT);
      storeAccountWithEncryption(JSON.parse(accounts));
    },
  },
  actions: {
    updateAccount({ commit }, payload) {
      commit("account/update", payload);
    },
    async updateBalances({ getters, dispatch }, obj = { label: "ETH" }) {
      const walletList = getters.getCurrentWallets.map(({ wallet }) => wallet);
      walletList.map((wallet) => {
        dispatch("fetchBalance", {
          wallet,
          label: getters.getCurrentBlockchain.label,
        });
      });
    },
    async fetchBalance({ commit }, obj = { wallet, label: "ETH" }) {
      let balance;
      if (obj.label === "ETH")
        balance = await getEtherBalance(obj.wallet, obj.label);
      else if (obj.label === "UBX") {
        balance = await getUbikiriBalanceApi(obj.wallet);
      }

      commit("setBalance", { ...obj, balance });
      return balance;
    },
    async addCustomeToken(
      { commit },
      { address, name, symbol, decimals, logo = "", type = "erc20" }
    ) {
      commit("addCustomToken", { address, name, symbol, decimals, logo, type });
    },

    async removeCustomeToken({ commit }, { address, type = "erc20" }) {
      commit("removeCustomToken", { address, type });
    },

    lockAccount({ commit }) {
      commit("lockAccounts");
    },
    unlockAccount({ getters, commit }, password) {
      commit("unlockAccounts", password);
    },
  },
};

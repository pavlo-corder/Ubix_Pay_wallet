import { loadAccountWithEncryption } from "../account";

export default function () {
  let count_wallets = 0;
  let current_blockchain = {};
  let current_wallet = {
    label: "",
    name: "",
    numberWallet: 0,
    wallet: "",
    value: "",
    balance: 0,
  };
  let account = null;
  let wallets = [];
  let key_account = localStorage.getItem("key_account");
  let accounts = loadAccountWithEncryption();
  if (accounts && accounts.length > 0) {
    account = { ...accounts[key_account] };
    //Создаём данные текущего блокчейна
    current_blockchain = { ...account.current_blockchain };
    count_wallets = [...account.blockchains[0].wallets].length - 1;
    //Создаём текущий кошелёк
    current_wallet = { ...account.current_wallet };
    //Получаем баланс текущего кошелька
    // getEtherBalance(current_wallet.wallet).then(balance => {
    //   console.log(balance)
    //   current_wallet.balance = balance
    // })
  }
  if (account) {
    let blockchains = [...account.blockchains];
    let current_blockchain = { ...account.current_blockchain };
    if (blockchains) {
      blockchains.map((blockchain) => {
        if (blockchain.label === current_blockchain.label) {
          wallets = [...blockchain.wallets];
        }
      });
    }
  }
  return {
    current_blockchain,
    current_wallet,
    wallets,
    count_wallets,
  };
}

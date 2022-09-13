import {
  decryptAccountsBySecret,
  loadAccountWithEncryption,
} from "src/store/account";

function auth({ next, store }) {
  let accounts = loadAccountWithEncryption();

  if (accounts === null || accounts[0].blockchains.length === 0) {
    return next({ name: "" });
  }
  return next();
}

function lock({ next, store }) {
  try {
    const decrytedAccountsBySecret = decryptAccountsBySecret();
  } catch (error) {
    console.log(error);
    return next({ name: "locked" });
  }
  return next();
}
function unlock({ next, store }) {
  console.log("unlock");
  try {
    const decrytedAccountsBySecret = decryptAccountsBySecret();
    if (decrytedAccountsBySecret === null) return next({ name: "" });

    return next({ name: "accounts" });
  } catch (error) {
    console.log(error);
    return next();
  }
}

function account({ next, store }) {
  let accounts = loadAccountWithEncryption();
  console.log(accounts);

  if (
    accounts !== null &&
    accounts.length > 0 &&
    accounts[0].password !== "" &&
    accounts[0].blockchains.length > 0 &&
    accounts[0].blockchains[0].wallets.length > 0
  ) {
    console.log(1);
    return next({ name: "accounts" });
  }
  return next();
}

function accountAndLock({ next, store }) {
  let accounts = loadAccountWithEncryption();

  if (
    accounts !== null &&
    accounts.length > 0 &&
    accounts[0].password !== "" &&
    accounts[0].blockchains.length > 0 &&
    accounts[0].blockchains[0].wallets.length > 0
  ) {
    return next({ name: "accounts" });
  }

  try {
    const decrytedAccountsBySecret = decryptAccountsBySecret();
  } catch (error) {
    console.log(error);
    return next({ name: "locked" });
  }
  return next();
}

export { auth, account, lock, unlock, accountAndLock };

function auth({ next, store }) {
  let accounts = JSON.parse(localStorage.getItem("accounts"));

  if (accounts === null || accounts[0].blockchains.length === 0) {
    return next({ name: "" });
  }
  try {
    let test = JSON.parse(localStorage.getItem("test"));
    console.log(test);
  } catch (error) {
    console.log(error);
    return next({ name: "locked" });
  }
  return next();
}

function lock({ next, store }) {
  try {
    let test = JSON.parse(localStorage.getItem("test"));
    console.log(test);
  } catch (error) {
    console.log(error);
    return next({ name: "locked" });
  }
  return next();
}

function account({ next, store }) {
  let accounts = JSON.parse(localStorage.getItem("accounts"));

  if (
    accounts !== null &&
    accounts.length > 0 &&
    accounts[0].password !== "" &&
    accounts[0].blockchains.length > 0 &&
    accounts[0].blockchains[0].wallets.length > 0
  ) {
    return next({ name: "accounts" });
  }
  return next();
}

export { auth, account, lock };

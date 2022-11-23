import axios from "axios";
import { ethers } from "ethers";
import Transaction from "./transaction/transaction";

// export const UBIKIRI_API_URL = "https://explorer.ubikiri.com";
// export const UBIKIRI_API_URL = "https://test-explorer.ubikiri.com";
export const UBIKIRI_API_URL = process.env.URL_UBX;

// export const UBX_T10_FEE = process.env.UBX_T10_FEE;

export const getUbixTokenList = async () => {
  try {
    let response = await axios.get(`${UBIKIRI_API_URL}/api/token`);
    response = await response.data;
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUbixTokenBalances = async (address) => {
  try {
    let [tokenList, response] = await Promise.all([
      getUbixTokenList(),
      axios.get(`${UBIKIRI_API_URL}/api/token/balances/${address}`),
    ]);
    response = await response.data;
    response.forEach((token) => {
      const tokenData = tokenList.find((item) => (item.symbol == token.symbol));
      token.decimals = tokenData.decimals;
      token.name = tokenData.symbol;
      token.balance = parseInt(token.balance);
      token.wallet = true;
      token.type = "T10";
      token.networkLabel = "UBX";
    });
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getUbikiriBalanceApi = async (address) => {
  try {
    let response = await axios.get(`${UBIKIRI_API_URL}/api/Balance/${address}`);
    response = await response.data;
    return response.balance;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
export const getT10Token = async (symbol) => {
  try {
    let response = await axios.get(`${UBIKIRI_API_URL}/api/token/${symbol}`);
    response = await response.data;
    return response;
  } catch (error) {
    console.log(error);
    return {};
  }
};
export const getUTXOs = async (address) => {
  try {
    let response = await axios.get(`${UBIKIRI_API_URL}/api/unspent/${address}`);
    response = await response.data;
    return response.reverse();
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const findT10Token = async (address = "") => {
  try {
    let response = await axios.get(`${UBIKIRI_API_URL}/api/token`);
    response = await response.data;
    return response.find(
      (item) => item.contractAddress === address.substring(2)
    );
  } catch (error) {
    console.log(error);
    return 0;
  }
};

function calcFee(nInputUsed, bSingle, bSweep) {
  // одна подпись - 67
  // один инпут - 38 или 39 (если nOut больше 256 он будет занимать 2 байта!
  // один аутпут - 33
  const nEmptyTx = 6;

  // sweep - 1 получатель
  const nOutByteSize = bSweep ? 33 : 66;
  const nInSize = nInputUsed * 39;

  // 1 ключ на все?
  const nSigSize = bSingle ? 67 : nInputUsed * 67;

  const nFee =
    parseInt(
      (parseInt(process.env.UBX_TX_FEE) / 1024) *
      (nEmptyTx + nOutByteSize + nInSize + nSigSize + 2)
    ) + 1;

  return nFee;
}
export const submitSendUbxTransaction = async (
  currentWallet,
  receiver,
  amount,
  currentToken,
  gasEstimation = false
) => {
  let tx;
  if (currentToken.type === "coin") {
    const utxos = await getUTXOs(currentWallet.wallet);

    // return;
    tx = new Transaction();
    //   const contractCode = {
    //     method: 'transfer',
    //     arrArguments: [
    //         this._strSymbol,
    //         addressTo.toString('hex'),
    //         amount
    //     ]
    // };
    // tx.addInput(Buffer.from(currentWallet.wallet.slice(2), "hex"), 7);
    let totalInputAmount = 0;
    let inputCnt = 0;
    let enoughFee = true;
    while (totalInputAmount + calcFee(inputCnt, true, false) < amount) {
      tx.addInput(
        Buffer.from(utxos[inputCnt].hash, "hex"),
        utxos[inputCnt].nOut
      );
      totalInputAmount += utxos[inputCnt].amount;
      inputCnt++;

      if (inputCnt > utxos.length) {
        enoughFee = false;
        break;
      }
    }

    if (enoughFee === false) {
      if (gasEstimation) return 0;
      const errorMsg = "You don't have enough UBX to cost fee!";
      alert(errorMsg);
      return errorMsg;
    }
    if (gasEstimation) return calcFee(inputCnt, true, false);
    tx.addReceiver(amount, Buffer.from(stripPrefix(receiver), "hex"));
    const nFee = calcFee(inputCnt, true, false);

    if (totalInputAmount - amount - nFee !== 0) {
      tx.addReceiver(
        totalInputAmount - amount - nFee,
        Buffer.from(stripPrefix(currentWallet.wallet), "hex")
      );
    }
    tx.conciliumId = 1;

    tx.signForContract(currentWallet.privateKey);
  } else {
    tx = await formT10TransferTx(
      currentWallet,
      receiver,
      amount,
      currentToken,
      gasEstimation
    );
    if (gasEstimation) return tx;
  }
  console.log(tx);

  const txSig = tx.encode().toString("hex");

  const strAuth = Buffer.from(
    `${process.env.UBX_RPC_USER}:${process.env.UBX_RPC_PASS}`
  ).toString("base64");
  let response = await axios.post(
    process.env.URL_UBX_RPC,
    {
      jsonrpc: "2.0",
      method: "sendRawTx",
      params: {
        strTx: txSig,
      },
      id: 67,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${strAuth}`,
      },
    }
  );
  response = await response.data;
  if (response.error) {
    return response.error;
  }
};

function stripPrefix(strAddr) {
  return strAddr.startsWith("Ux") ? strAddr.slice(2) : strAddr;
}

const formT10TransferTx = async (
  currentWallet,
  addressTo,
  amount,
  currentToken,
  gasEstimation = false
) => {
  // const kp = this._cryptoBuilder(buffPk);

  const t10Token = await getT10Token(currentToken.symbol);
  const contractCode = {
    method: "transfer",
    arrArguments: [currentToken.symbol, stripPrefix(addressTo), amount],
  };

  const tx = Transaction.invokeContract(
    t10Token.contractAddress,
    contractCode,
    0,
    stripPrefix(currentWallet.wallet)
  );
  tx.conciliumId = 1;


  const utxos = await getUTXOs(currentWallet.wallet);

  const feeCall = parseInt(process.env.UBX_T10_FEE);

  let totalInputAmount = 0;
  let inputCnt = 0;
  let enoughFee = true;
  while (totalInputAmount < feeCall + calcFee(inputCnt, true, false)) {
    tx.addInput(Buffer.from(utxos[inputCnt].hash, "hex"), utxos[inputCnt].nOut);
    totalInputAmount += utxos[inputCnt].amount;
    inputCnt++;

    if (inputCnt > utxos.length) {
      enoughFee = false;
      break;
    }
  }

  if (enoughFee === false) {
    if (gasEstimation) return 0;
    alert("You don't have enough UBX to cost fee!");
    return;
  }

  if (gasEstimation) return feeCall + calcFee(inputCnt, true, false);

  tx.signForContract(currentWallet.privateKey);
  console.log(tx);
  tx.verify();

  return tx;
};

export const validateAddress = (address, label) => {
  return ethers.utils.isAddress(
    label === "UBX" ? address.replace("Ux", "0x") : address
  );
};

import axios from "axios";
import { UBX_MAX_FEE } from "./constants";
import Transaction from "./transaction/transaction";

// export const UBIKIRI_API_URL = "https://explorer.ubikiri.com";
export const UBIKIRI_API_URL = "https://test-explorer.ubikiri.com";

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
      const tokenData = tokenList.find((item) => (item.symbol = token.symbol));
      token.decimals = tokenData.decimals;
      token.name = tokenData.symbol;
      token.balance = parseInt(token.balance) / 10 ** tokenData.decimals;
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

export const _calcFee = (nInputUsed, bSingle, bSweep) => {
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
      (this._getTransferFee() / 1024) *
        (nEmptyTx + nOutByteSize + nInSize + nSigSize + 2)
    ) + 1;

  return nFee;
};
export const submitSendUbxTransaction = async (
  currentWallet,
  receiver,
  amount,
  currentToken
) => {
  const utxos = await getUTXOs(currentWallet.wallet);

  // return;
  const tx = new Transaction();
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
  while (totalInputAmount < amount) {
    tx.addInput(Buffer.from(utxos[inputCnt].hash, "hex"), inputCnt);
    totalInputAmount += utxos[inputCnt].amount;
    inputCnt++;
  }
  tx.addReceiver(amount, Buffer.from(receiver.slice(2), "hex"));
  tx.addReceiver(
    totalInputAmount - amount - UBX_MAX_FEE,
    Buffer.from(currentWallet.wallet.slice(2), "hex")
  );

  tx.signForContract(currentWallet.privateKey);
  const txSig = tx.encode().toString("hex");

  let response = await axios.post(
    "http://rpc-dv-1.ubikiri.com:18222",
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
        Authorization: "Basic Y2lsVGVzdDpkNDljMWQyNzM1NTM2YmFhNGRlMWNjNg==",
      },
    }
  );
  response = await response.data;
  if (response.error) {
    return response.error;
  }
};

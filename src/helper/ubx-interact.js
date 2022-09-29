import axios from "axios";
import Transaction from "./transaction/transaction";

// export const UBIKIRI_API_URL = "https://explorer.ubikiri.com";
export const UBIKIRI_API_URL = "https://test-explorer.ubikiri.com";

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
    return response;
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
  // tx.addInput(Buffer.from(currentWallet.wallet.slice(2), "hex"), 7);
  let totalInputAmount = 0,
    inputCnt = 0;
  while (totalInputAmount < amount) {
    tx.addInput(Buffer.from(utxos[inputCnt].hash, "hex"), 1);
    totalInputAmount += utxos[inputCnt].amount;
    inputCnt++;
  }
  tx.addReceiver(amount, Buffer.from(receiver.slice(2), "hex"));
  tx.addReceiver(
    totalInputAmount - amount - 4000,
    Buffer.from(currentWallet.wallet.slice(2), "hex")
  );

  tx.signForContract(currentWallet.privateKey);
  const txSig = tx.encode().toString("hex");

  const response = await axios.post(
    "http://rpc-dv-1.ubikiri.com:18222/",
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
};

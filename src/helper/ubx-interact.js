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

export const submitSendUbxTransaction = async (
  currentWallet,
  receiver,
  amount,
  currentToken
) => {
  const tx = new Transaction();
  tx.addReceiver(amount, receiver.slice(2));
  tx.signForContract(currentWallet.privateKey);
  console.log(receiver, amount, currentToken, currentWallet);
  const txSig = tx.getTxSignature();

  const response = await axios.post(
    "http://rpc-dv-1.ubikiri.com:18222/",
    {
      jsonrpc: "2.0",
      method: "getTx",
      params: {
        strTxHash:
          "d39f3149481ef09c633321af5e7535df24025c8ecfa6aebbfa986146db7830bc",
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

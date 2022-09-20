import axios from "axios";
import Transaction from "./transaction/transaction";

export const UBIKIRI_API_URL = "https://explorer.ubikiri.com";
// export const UBIKIRI_API_URL = "https://test-explorer.ubikiri.com";

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
  console.log(receiver, amount, currentToken, currentWallet);
  console.log(tx);
};

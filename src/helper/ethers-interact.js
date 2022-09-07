import axios from "axios";
import { Wallet, ethers } from "ethers";

import ERC20_ABI from "./abis/ERC20_ABI.json";
import ERC721_ABI from "./abis/ERC721_ABI.json";
import { NULL_ADDRESS } from "./constants";

const MAINNET = {
  RPC_URL: "https://rpc.ankr.com/eth",
  label: "ETH",
  chainId: 1,
};
const ROPSTEN_TESTNET = {
  RPC_URL: "https://rpc.ankr.com/eth_ropsten",
  label: "ETH",
  chainId: 3,
};
const GOERLI_TESTNET = {
  RPC_URL: "https://rpc.ankr.com/eth_goerli",
  label: "ETH",
  chainId: 420,
};
const SEPOLIA_TESTNET = {
  RPC_URL: "https://rpc.sepolia.org",
  label: "ETH",
  chainId: 11155111,
};
const CURRNET_NETWORK = SEPOLIA_TESTNET;

const mainnet_provider = new ethers.providers.JsonRpcProvider(
  CURRNET_NETWORK.RPC_URL
);

export const validationPhrase = (wordList) => {
  return ethers.utils.isValidMnemonic(wordList.join(" "));
};

export const createWalletFromMnenomic = (wordList, index = 0) => {
  const recoveredSigner = Wallet.fromMnemonic(
    wordList.join(" "),
    `m/44'/60'/0'/0/${index}`
  );
  const name_wallet = `Wallet ${index + 1}`;
  const privateKey = recoveredSigner._signingKey().privateKey;
  const address = recoveredSigner.address;
  return {
    label: name_wallet,
    name: name_wallet,
    balance: 0,
    numberWallet: index,
    value: address,
    wallet: address,
    privateKey,
  };
};

export const getEtherBalance = async (address) => {
  const balance = await mainnet_provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

export const getTokenBalance = async (token, address) => {
  if (token.type === "coin") return await mainnet_provider.getBalance(address);
  else {
    try {
      const erc20Contract = new ethers.Contract(
        token.address,
        ERC20_ABI,
        mainnet_provider
      );
      return await erc20Contract.balanceOf(address);
    } catch (error) {
      console.log(error);
      return 0;
    }
  }
};

export const getFeeData = async () => {
  return await mainnet_provider.getFeeData();
};

export const getEstimatedGas = async (tokenAddress, walletObj, to, amount) => {
  const signer = new Wallet(walletObj?.privateKey, mainnet_provider);
  if (tokenAddress === NULL_ADDRESS) {
    return 21000;
  } else {
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const gas = await contract.estimateGas.transfer(
      to,
      amount.toLocaleString("fullwide", { useGrouping: false })
    );
    return gas.toNumber();
  }
};

export const fetchEtherPrice = async () => {
  let response = await axios.get(
    "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=99C33Z32KHVZGRVCPXGF6CGJWZBACU6AUB"
  );
  response = await response.data;
  return response?.result?.ethusd;
};

export const fetchTokenInformation = async (address) => {
  address = ethers.utils.getAddress(address);
  try {
    const erc20Contract = new ethers.Contract(
      address,
      ERC20_ABI,
      mainnet_provider
    );
    const [name, symbol, decimals, type] = await Promise.all([
      erc20Contract.name(),
      erc20Contract.symbol(),
      erc20Contract.decimals(),
      "erc20",
    ]);
    return { address, name, symbol, decimals, type };
  } catch (error) {
    const erc721Contract = new ethers.Contract(
      address,
      ERC721_ABI,
      mainnet_provider
    );
    const [name, symbol, decimals, type] = await Promise.all([
      erc721Contract.name(),
      erc721Contract.symbol(),
      0,
      "erc721",
    ]);

    return { address, name, symbol, decimals, type };
  }
};

export const submitSendCoinTransaction = async (
  fromWallet,
  toWallet,
  amountCoin,
  token
) => {
  const [nonce, feeData] = await Promise.all([
    mainnet_provider.getTransactionCount(fromWallet.wallet),
    mainnet_provider.getFeeData(),
  ]);

  if (token.address === NULL_ADDRESS) {
    const tx = {
      type: 2,
      nonce: nonce,
      to: toWallet, // Address to send to
      maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
      maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
      value: amountCoin.toLocaleString("fullwide", { useGrouping: false }), // .01 ETH
      gasLimit: "21000", // basic transaction costs exactly 21000
      chainId: CURRNET_NETWORK.chainId,
    };
    const wallet = new ethers.Wallet(fromWallet.privateKey.toString("hex"));

    const signedTx = await wallet.signTransaction(tx);
    const submitedTx = await mainnet_provider.sendTransaction(signedTx);
    return submitedTx;
  } else {
    const signer = new Wallet(fromWallet?.privateKey, mainnet_provider);
    const contract = new ethers.Contract(token.address, ERC20_ABI, signer);
    const tx = await contract.transfer(
      toWallet,
      amountCoin.toLocaleString("fullwide", { useGrouping: false })
    );
    return tx;
  }
};

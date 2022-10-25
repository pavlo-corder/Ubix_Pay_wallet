import axios from "axios";
import { Wallet, ethers } from "ethers";

import ERC20_ABI from "./abis/ERC20_ABI.json";
import ERC721_ABI from "./abis/ERC721_ABI.json";
import { ETHERSCAN_KEY, NULL_ADDRESS } from "./constants";
import { getUbikiriBalanceApi } from "./ubx-interact";
import {
  getPublic,
  keyPairFromPrivate,
  ubxAddressFromPublicKey,
} from "./utils";

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

const NETWORKS = {
  'SEPOLIA_TESTNET': {
    RPC_URL: "https://rpc.sepolia.org",
    label: "ETH",
    chainId: 11155111,
  },
  'MAINNET': {
    RPC_URL: "https://rpc.ankr.com/eth",
    label: "ETH",
    chainId: 1,
  }
}

const CURRNET_NETWORK = NETWORKS[process.env.URL_ETH];

const mainnet_provider = new ethers.providers.JsonRpcProvider(
  CURRNET_NETWORK.RPC_URL
);

const etherscan_provider = new ethers.providers.EtherscanProvider(
  "homestead",
  ETHERSCAN_KEY
);

export const fetchTxHistory = async (token, address) => {
  address = address.toLowerCase();
  let response = [];
  if (token.symbol === "UBX") return [];
  if (token.type === "coin") {
    response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&page=1&address=${address}&sort=desc&apikey=${ETHERSCAN_KEY}`
    );

    response = await response.data;
    response = response?.result;
    response = response.filter((item) => item.input == "0x");

    response = response.map((item) => {
      return {
        type: item.to === address ? "received" : "sent",
        confirmed: item.txreceipt_status == 1,
        coin: token.symbol,
        amount: item.value / 10 ** token.decimals,
        timestamp: new Date(
          parseInt(item.timeStamp) * 1000
        ).toLocaleDateString(),
      };
    });
    const _dateSet = Array(...new Set(response.map((item) => item.timestamp)));
    response = _dateSet.map((date) => {
      return {
        timestamp: date,
        txns: response.filter((item) => item.timestamp === date),
      };
    });
  } else {
    response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${token.address}&address=${address}&page=1&sort=desc&apikey=${ETHERSCAN_KEY}`
    );
    response = await response.data;
    response = response.result;

    response = response.map((item) => {
      return {
        type: item.to === address ? "received" : "sent",
        confirmed: true,
        coin: token.symbol,
        amount: item.value / 10 ** token.decimals,
        timestamp: new Date(
          parseInt(item.timeStamp) * 1000
        ).toLocaleDateString(),
      };
    });
    const _dateSet = Array(...new Set(response.map((item) => item.timestamp)));
    response = _dateSet.map((date) => {
      return {
        timestamp: date,
        txns: response.filter((item) => item.timestamp === date),
      };
    });
    console.log(response);
  }

  return response;
};

export const validationPhrase = (wordList) => {
  return ethers.utils.isValidMnemonic(wordList.join(" "));
};

export const createWalletFromMnenomic = (wordList, index = 0, pathId = 60) => {
  const recoveredSigner = Wallet.fromMnemonic(
    wordList.join(" "),
    `m/44'/${pathId}'/0'/0/${index}`
  );
  const name_wallet = `Wallet ${index + 1}`;
  let privateKey = recoveredSigner._signingKey().privateKey;
  let address = recoveredSigner.address;
  // if wallet mode is not for EVM
  if (pathId !== 60) {
    privateKey = privateKey.slice(2);

    const keyPair = keyPairFromPrivate(privateKey);
    address = `Ux${ubxAddressFromPublicKey(getPublic(keyPair, true))}`;
  }
  return {
    label: name_wallet,
    name: name_wallet,
    balance: 0,
    numberWallet: index,
    value: address,
    wallet: address,
    privateKey,
    network: pathId === 60 ? "ETH" : "UBX",
  };
};

export const getEtherBalance = async (address) => {
  const balance = await mainnet_provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

export const getTokenBalance = async (token, address) => {
  if (token.symbol === "UBX") return await getUbikiriBalanceApi(address);
  if (address === undefined || address === null) return 0;
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

export const getFeeData = async (label = "ETH") => {
  // console.log(label);
  if (label === "UBX") return { maxFeePerGas: 1 };
  return await mainnet_provider.getFeeData();
};

export const getEstimatedGas = async (
  tokenAddress,
  walletObj,
  to,
  amount,
  label = "ETH"
) => {
  if (label === "UBX") {
    return 4000;
  }
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

export const fetchEtherPrice = async (label = "ETH") => {
  if (label === "UBX") {
    let [response, ethPrice] = await Promise.all([
      axios.post(
        "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
        {
          query:
            '{ token(id: "0xf5b5efc906513b4344ebabcf47a04901f99f09f3") { derivedETH } }',
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
      fetchEtherPrice(),
    ]);
    response = await response.data;
    return response.data.token.derivedETH * ethPrice;
  }
  let response = await axios.get(
    `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_KEY}`
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

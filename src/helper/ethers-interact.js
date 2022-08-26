import axios from "axios";
import { Wallet, ethers } from "ethers";

const MAINNET = {
    RPC_URL: "https://rpc.ankr.com/eth",
    chainId: 1
};
const ROPSTEN_TESTNET = {
    RPC_URL: "https://rpc.ankr.com/eth_ropsten",
    chainId: 3
};
const GOERLI_TESTNET = {
    RPC_URL: "https://rpc.ankr.com/eth_goerli",
    chainId: 420
};
const SEPOLIA_TESTNET = {
    RPC_URL: "https://rpc.sepolia.org",
    chainId: 11155111
};
const CURRNET_NETWORK = SEPOLIA_TESTNET;

const mainnet_provider = new ethers.providers.JsonRpcProvider(CURRNET_NETWORK.RPC_URL);

export const validationPhrase = (wordList) => {
    return ethers.utils.isValidMnemonic(wordList.join(' '));
}

export const createWalletFromMnenomic = (wordList, index = 0) => {
    const recoveredSigner = Wallet.fromMnemonic(wordList.join(' '), `m/44'/60'/0'/0/${index}`);
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
        privateKey
    }
}

export const getEtherBalance = async (address) => {
    const balance = await mainnet_provider.getBalance(address);
    return ethers.utils.formatEther(balance);
}

export const getFeeData = async () => {
    return await mainnet_provider.getFeeData();
}

export const fetchEtherPrice = async () => {
    let response = await axios.get('https://api.etherscan.io/api?module=stats&action=ethprice&apikey=99C33Z32KHVZGRVCPXGF6CGJWZBACU6AUB');
    response = await response.data;
    return response?.result?.ethusd;
}

export const submitSendCoinTransaction = async (fromWallet, toWallet, amountCoin) => {
    const [nonce, feeData] = await Promise.all([mainnet_provider.getTransactionCount(fromWallet.wallet),
    mainnet_provider.getFeeData()]);
    console.log(feeData);
    const tx = {
        type: 2,
        nonce: nonce,
        to: toWallet, // Address to send to
        maxPriorityFeePerGas: feeData["maxPriorityFeePerGas"], // Recommended maxPriorityFeePerGas
        maxFeePerGas: feeData["maxFeePerGas"], // Recommended maxFeePerGas
        value: ethers.utils.parseEther(amountCoin), // .01 ETH
        gasLimit: "21000", // basic transaction costs exactly 21000
        chainId: CURRNET_NETWORK.chainId
    };
    const wallet = new ethers.Wallet(fromWallet.privateKey.toString('hex'));

    const signedTx = await wallet.signTransaction(tx);
    const submitedTx = await mainnet_provider.sendTransaction(signedTx);;
    return submitedTx;
}
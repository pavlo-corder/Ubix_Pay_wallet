import { Wallet, ethers } from "ethers";

const MAINNET_RPC_URL = "https://rpc.ankr.com/eth";

const mainnet_provider = new ethers.providers.JsonRpcProvider(MAINNET_RPC_URL);

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
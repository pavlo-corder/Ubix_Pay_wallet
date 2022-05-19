const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const mnemonicPhrase = 'trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

// let provider = new HDWalletProvider({
//   mnemonic: {
//     phrase: mnemonicPhrase
//   },
//   providerOrUrl: "http://localhost:8545"
// });

let provider = new HDWalletProvider({
  mnemonic: mnemonicPhrase,
  providerOrUrl: "http://localhost:8545",
  numberOfAddresses: 1,
  shareNonce: true,
  derivationPath: "m/44'/0'/0'/0/"
});



// console.log(provider)

const web3 = new Web3(provider);
const w3prov = web3.setProvider(provider)

console.log('w3prov', w3prov)

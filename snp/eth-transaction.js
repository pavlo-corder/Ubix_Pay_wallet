const HDWalletProvider = require("@truffle/hdwallet-provider");

const mnemonicPhrase = 'trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

const kovanHttp = 'https://kovan.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const kovanWss = 'wss://kovan.infura.io/ws/v3/0e1c8d1f7b2d43f2842192eb6ec17567'

new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567", 2);

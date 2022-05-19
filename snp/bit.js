const Bip39 = require('bip39')
const Bitcoin = require('bitcoinjs-lib');
const BIP32Factory = require('bip32').default


const phrase='trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

// const seed = Bip39.mnemonicToSeedSync(phrase);
// const seed = Bip39.mnemonicToSeedSync(phrase);
const seed = Bip39.mnemonicToSeed(phrase);
console.log(seed)
const root = Bitcoin.HDNode.fromSeedBuffer(seed);
console.log(root)

// const bip32Root = Bip32.fromSeed(Buffer.from(seed, 'hex'));
// const bip32Root = BIP32Factory.fromSeed(Buffer.from(seed, 'hex'));
// console.log(bip32Root)
// console.log(BIP32)
// const root = BIP32Factory.fromSeed(seed, Bitcoin.networks.bitcoin);
// console.log(root)
// const branchKp = bip32Root.derivePath(this.getOption('m/44'/60'/0'/0'));
// const currentIdx = 0;
// const currentKeyPair = branchKp.derive(currentIdx);

//а потом скармливание приватника из currentKeyPair
// в account web3.js должен дать адрес 0x14Ae919A7928EB38327F1369744508beFAdfC436

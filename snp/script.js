const Web3 = require('web3')
// const web3 = new Web3('https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567')
// const web3 = new Web3('https://kovan.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567')


// const rpcURL = 'https://cloudflare-eth.com/'


let web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'));
// const web3 = new Web3('http://127.0.0.1:7545')

// const accounts = web3.eth.getAccounts(console.log)

// const address = '0x3c2247057d43e79cff79f4ce790ebde048f777ab'
// 63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9
const privatekey  = '63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9'
const wallet1 = '0xC49926C4124cEe1cbA0Ea94Ea31a6c12318df947'
const wallet2 = '0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559'


web3.eth.getBalance(wallet1, (err, wei) => {
  let balance = web3.utils.fromWei(wei, 'ether')
  console.log('getBalance1', balance)
})

web3.eth.getGasPrice((err, price) => {
  let priceGas = web3.utils.fromWei(price, 'ether')
  console.log(`Gas price: ${priceGas}`, price )

})


web3.eth.getBalance(wallet2, (err, wei) => {
  let balance = web3.utils.fromWei(wei, 'ether')
  console.log('getBalance2', balance)
})
const accounts = web3.eth.getAccounts().then(console.log)
const block = web3.eth.getBlockNumber().then(console.log)
// const accounts = web3.eth.getBlockNumber(console.log)

const send = async () => {
  const createTransaction = await web3.eth.accounts.signTransaction({
    from: wallet1,
    to: wallet2,
    value: web3.utils.toWei('0.0015', 'ether'),
    gas: 21000
  }, privatekey)

  const receipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction)

  console.log(`Transaction succesfull with hash: ${createTransaction.transactionHash}`)

  // if(createTransaction.transactionHash){
  //   return {
  //     success: true,
  //     hash: createTransaction.transactionHash
  //   }
  // }else{
  //   return {
  //     success: false
  //   }
  // }

}

// console.log(send())

// const Bip39 = require('bip39')
// const Bitcoin = require('bitcoinjs-lib');
// const BIP32Factory = require('bip32').default


// const phrase='trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

// const seed = Bip39.mnemonicToSeedSync(phrase);
// const seed = Bip39.mnemonicToSeedSync(phrase);
// const seed = Bip39.mnemonicToSeed(phrase);
// console.log(seed)
// const root = Bitcoin.HDNode.fromSeedBuffer(seed);
// console.log(root)

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

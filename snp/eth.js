
let Personal = require('web3-eth-personal');
let personal = new Personal(Personal.givenProvider || 'ws://localhost:8546');

const Web3 = require('web3')
const rpcURL = 'https://cloudflare-eth.com/'
const web3 = new Web3(rpcURL)
// web3.setProvider('ws://localhost:8546');

// console.log('web3.currentProvider', web3.currentProvider)

let Accounts = require('web3-eth-accounts');
let accounts = new Accounts('ws://localhost:8546');

// const bip39 = require('bip39')
const crypto = require('crypto')
const Bip39 = require("bip39");

// console.log('accounts', accounts)



const phrase='trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

const seed = Bip39.mnemonicToSeedSync(phrase);
console.log('seed', seed)
const rand = web3.utils.randomHex(16)
let randomBytes = crypto.randomBytes(16)

console.log('rand', rand)
// console.log('randomBytes', randomBytes.toString('hex'))
//
// // let mnemonic = bip39.entropyToMnemonic(rand)
// let mnemonic2 = bip39.entropyToMnemonic(randomBytes.toString('hex'))
//
// console.log( mnemonic2)




//====================================
//Создание аккаунта
const account = web3.eth.accounts.create([seed]);
// console.log('account',account)

// const person = web3.eth.personal.newAccount('!@superpassword').then(console.log)
// console.log('personal', person )
//====================================


//====================================
//Создание кошелька
// const wallet = web3.eth.accounts.wallet.create(2)
// console.log('wallet', wallet)
//====================================


//====================================
// Получение баланса
// // const address = '0x0c57852BE39e256ddCc753B719CCcc943CdF91fC'
const address = '0x3c2247057d43e79cff79f4ce790ebde048f777ab'
//
web3.eth.getBalance(address, (err, wei) => {
  let balance = web3.utils.fromWei(wei, 'ether')
  console.log('getBalance', balance)
})
//====================================

// Получение баланса=======================



// const accEncr = web3.eth.accounts.encrypt(account);
// console.log('accEncr', accEncr)

// const accountWallet = web3.eth.accounts.wallet;
// console.log('accountWallet',accountWallet)
//
// const message = web3.eth.accounts.hashMessage("Hello World")
//
// console.log('message', message)
//
// web3.eth.accounts.hashMessage(web3.utils.utf8ToHex("Hello World"))

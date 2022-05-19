const Web3 = require('web3')
const rpcURL = 'https://cloudflare-eth.com/'
const web3 = new Web3(rpcURL)

const bip39 = require('bip39')
const crypto = require('crypto')

// const address = '0x0c57852BE39e256ddCc753B719CCcc943CdF91fC'
const address = '0x3c2247057d43e79cff79f4ce790ebde048f777ab'

web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, 'ether')
  console.log('getBalance',balance)
})

const rand = web3.utils.randomHex(16)
let randomBytes = crypto.randomBytes(16)

console.log('rand', rand)
console.log('randomBytes', randomBytes.toString('hex'))

// let mnemonic = bip39.entropyToMnemonic(rand)
let mnemonic2 = bip39.entropyToMnemonic(randomBytes.toString('hex'))

console.log( mnemonic2)

const account = web3.eth.accounts.create(rand);
console.log('account',account)

const accEncr = web3.eth.accounts.encrypt(account.privateKey);
console.log('accEncr', accEncr)

// const accountWallet = web3.eth.accounts.wallet;
// console.log('accountWallet',accountWallet)
//
// const message = web3.eth.accounts.hashMessage("Hello World")
//
// console.log('message', message)
//
// web3.eth.accounts.hashMessage(web3.utils.utf8ToHex("Hello World"))

//Запуск узла эфира в терминале
// geth --ropsten --syncmode "light"

// const rpcURL = 'https://cloudflare-eth.com/'
// const rpcURL = 'https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const mntWsURL = 'wss://mainnet.infura.io/ws/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const mntURL = 'https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const rpcWsURL = 'wss://ropsten.infura.io/ws/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const rpcURL = 'https://ropsten.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const crypto = require('crypto')
const Bip39 = require("bip39");
let net = require('net');

const Web3EthPersonal = require('web3-eth-personal')
// let personal = new Web3EthPersonal('ws://localhost:8546')
let personal = new Web3EthPersonal(mntWsURL);

// console.log('personal', personal)

let Eth = require('web3-eth');
// var eth = new Eth(Eth.givenProvider || 'ws://localhost:8546');

const Web3 = require('web3')
// const web3 = new Web3('ws://localhost:8546')
// web3.setProvider('ws://localhost:8546')


let web3 = new Web3(new Web3.providers.HttpProvider(mntURL));
// let web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));
// let web3 = new Web3( '/Users/g/Library/Ethereum/ropsten/geth.ipc', net);

// console.log('web3.currentProvider', web3.currentProvider)
// console.log('web3.eth.currentProvider', web3.eth.currentProvider)
//



//====================================
// Получение баланса
// // const address = '0x0c57852BE39e256ddCc753B719CCcc943CdF91fC'
const address = '0x3c2247057d43e79cff79f4ce790ebde048f777ab'
//
web3.eth.getBalance(address, (err, wei) => {
  let balance = web3.utils.fromWei(wei, 'ether')
  console.log('getBalance', balance)
})
// web3.eth.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log)
// web3.eth.getBalance('0x7cacf18f931259c30a7194fa96ab3a44c38b3535').then(console.log)
//====================================





// console.log('personal', personal)
// eth.getAccounts(console.log);

// web3.setProvider('ws://localhost:8546');

// console.log('web3.currentProvider', web3.currentProvider)

// let Accounts = require('web3-eth-accounts')
// let accounts = new Accounts(rpcURL)
// console.log('accounts', accounts)




const phrase='trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

const seed = Bip39.mnemonicToSeedSync(phrase);
console.log('seed', seed)
//<Buffer 54 b1 9f a4 65 ad d6 98 3a 54 d9 b1 27 ff bb ed 88 53 19 81 fa 82 7b 4f 2e dc 52 2f 62 94 2a c7 10 ae 25 bc 6e d3 ba 75 63 e5 37 7d 16 25 23 a7 ff d1 ... 14 more bytes>

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
// const account = web3.eth.accounts.create(seed);
// console.log('account',account)
// const personal2 = web3.eth.personal.getAccounts((error, accounts) => {
//   console.log('accounts', accounts)
// })

// console.log('personal2', personal2)
// personal.newAccount('!@superpassword').then(console.log)

//====================================


//====================================
//Создание кошелька
// const wallet = web3.eth.accounts.wallet.create(2)
// console.log('wallet', wallet)
//====================================




// const accEncr = web3.eth.accounts.encrypt(account);
// console.log('accEncr', accEncr)

// const accountWallet = web3.eth.accounts.wallet;
// console.log('accountWallet',accountWallet)
//

//
// web3.eth.accounts.hashMessage(web3.utils.utf8ToHex("Hello World"))
// const account = async () => {
//    await web3.eth.personal.newAccount('password').then( (data)=>{
//      return data
//    });
// }

//      return data
//    });
// let account = web3.eth.personal.newAccount('password').then( (data) => {
//   console.log( data)
// })

// web3.eth.personal.newAccount('password', (err, data) => {
//   // console.log(err)
//   console.log('data',data)
// })
// web3.eth.getAccounts().then(console.log);
// web3.eth.personal.newAccount('!@superpassword')
//   .then(console.log);

// web3.eth.getAccounts()
//   .then(console.log)


// try {
//   const response = await fetch('https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567', {
//     method: 'POST', // или 'PUT'
//     body: JSON.stringify({
//       "jsonrpc":"2.0",
//       "method":"eth_getBalance",
//       "params": ["0xc94770007dda54cF92009BFF0dE90c06F603a09f", "latest"],"id":1}
//     ),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const json = await response.json();
//   console.log('Success:', JSON.stringify(json));
// } catch (error) {
//   console.error('Error:', error);
// }

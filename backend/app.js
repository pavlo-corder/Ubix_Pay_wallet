// import { createClient } from 'redis'
// const client = createClient()
// client.on('error', (err) => console.log('Redis Client Error', err))

let express = require('express')
const bodyParser = require("body-parser")
let cors = require('cors')
const HDWallet = require('ethereum-hdwallet')
let app = express()

let bip39 = require('bip39')
let crypto = require('crypto')

const rpcURL = 'https://cloudflare-eth.com/'
// const rpcURL = 'https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567'
const rpcWsURL = 'wss://mainnet.infura.io/ws/v3/0e1c8d1f7b2d43f2842192eb6ec17567'

const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));

let corsOptions = {
  origin: 'http://localhost:8080',
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const port = 3000

app.get('/mnemonic',  (req, res, next) => {
  let randomBytes = crypto.randomBytes(16)
  let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  res.json(mnemonic.split(' '))
})

app.post('/validation_phrase', (req, res) => {

  const mnemonicPhrase = req.body.mnemonic

  if(bip39.validateMnemonic(mnemonicPhrase)){
    res.json({'success': true})
  }else{
    res.json({'success': false})
  }

})

app.post('/get_balance', (req, res) => {

  const wallet = req.body.wallet

  if(!wallet){
    res.json({
      'success': false
    })
  }
  // const wallet = '0x3c2247057d43e79cff79f4ce790ebde048f777ab'
  // const wallet = '0x7cacf18f931259c30a7194fa96ab3a44c38b3535'
  // const wallet = '0x407d73d8a49eeb85d32cf465507dd71d507100c1'
  // const wallet = '0x0c57852BE39e256ddCc753B719CCcc943CdF91fC'
  web3.eth.getBalance(wallet, (err, wei) => {
  let balance = web3.utils.fromWei(wei, 'ether')
  // console.log('getBalance', balance)
    if(balance){
      res.json({
        'success': true,
        tokens: [
          {
            label: 'ETH',
            balance,
            wallet: wallet
          },
          {
            label: 'BTC',
            balance: 0,
            wallet: false
          },
          {
            label: 'UBX',
            balance: 0,
            wallet: false
          }
        ]

      })
    }else{
      res.json({
        'success': false
      })
    }
})
  // web3.eth.getBalance(wallet).then((balance) => {
  //   console.log(balance)
  //   if(balance){
  //     res.json({
  //       'success': true,
  //       tokens: [
  //         {
  //           label: 'ETH',
  //           balance: balance,
  //           wallet: wallet
  //         }
  //       ]
  //
  //     })
  //   }else{
  //       res.json({
  //         'success': false
  //       })
  //   }
  // })



  // if(bip39.validateMnemonic(mnemonicPhrase)){
  //   res.json({'success': true})
  // }else{
  //   res.json({
  //     'success': false
  //   })
  // }

})



app.post('/create_wallet', (req, res) => {

  // res.json({'success': true, body: req.body})
  const mnemonic = req.body.mnemonic

  const blockchain = req.body.blockchain
  const wallet_number = Number(req.body.wallet_number)

  const hdwallet = HDWallet.fromMnemonic(mnemonic)

  const wallet = `0x${hdwallet.derive(`m/44'/${blockchain.value}'/0'/0/${wallet_number}`).getAddress().toString('hex')}`

  if(wallet){
    res.json({'success': true, wallet: wallet})
  }else{
    res.json({'success': false})
  }

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


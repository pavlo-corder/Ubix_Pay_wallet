const bip39 = require("bip39");
const { ethers } = require("ethers");
const HDWallet = require("ethereum-hdwallet");
const HDKey = require('hdkey')
const {entropyToMnemonic} = require("bip39");

const INFURA_ID = '0e1c8d1f7b2d43f2842192eb6ec17567'
// const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)
// const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`)


const account1 = '0xC49926C4124cEe1cbA0Ea94Ea31a6c12318df947' // Your account address 1
const account2 = '0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559' // Your account address 2

const privateKey = '63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9' // Private key of account 1


exports.index = function(req, res, next) {
  res.send("It's route index")
}

exports.get_balance = async (req, res, next) => {

  let wallet = ''
  let blockchain = ''

  console.log(req.body.wallet)
  console.log(req.body.blockchain)

  if (req.body.wallet) {
    wallet = req.body.wallet
  }
  else {
    wallet = account1
  }

  if (req.body.blockchain) {
    blockchain = req.body.blockchain
  }

  if(blockchain === 'ETH'){

    const balance = await provider.getBalance(wallet)

    res.json({
      success: true,
      value:
        {
          label: 'ETH',
          balance: ethers.utils.formatEther(balance),
          wallet: wallet
        }
    })

  }

}

exports.get_balances = async (req, res, next) => {


  let blockchain = ''
  let walletsBody = []


  if (req.body.wallets) {
    walletsBody = req.body.wallets
  }

  if (req.body.blockchain) {
    blockchain = req.body.blockchain
  }


  let wallets = async () => {

    let wal = []
    walletsBody.map( async(wallet) => {

      let balance = await provider.getBalance(wallet.wallet)

      wallet.balance = ethers.utils.formatEther(balance)
      wal.push(wallet)
      // console.log(wallet.balance)
    })
    return wal
  }


  // const balance = await provider.getBalance(wallet)

  // res.send({
  //   'success': true,
  //   'label': 'ETH',
  //   'blockchain': 'ETH',
  //   'balance': ethers.utils.formatEther(balance)
  // })
  res.json({
    success: true,
    wallets: wallets
  })
}

exports.get_commission = async (req, res, next) => {
  const getGasPrice = await provider.getGasPrice()
  const getFeeData = await provider.getFeeData()
  // console.log(ethers.utils.formatEther(getGasPrice))
  // console.log(`getFeeData_gasPrice: ${ethers.utils.formatEther(getFeeData.gasPrice)}`)
  // console.log(`getFeeData_maxFeePerGas: ${ethers.utils.formatEther(getFeeData.maxFeePerGas)}`)
  // console.log(`getFeeData_maxPriorityFeePerGas: ${ethers.utils.formatEther(getFeeData.maxPriorityFeePerGas)}`)
  res.json({
    'success': true,
    'blockchain': 'ETH',
    'label': 'ETH',
    'price': ethers.utils.formatEther(getGasPrice),
    'gasPrice': ethers.utils.formatEther(getFeeData.gasPrice),
    'maxFeePerGas': ethers.utils.formatEther(getFeeData.maxFeePerGas),
    'maxPriorityFeePerGas': ethers.utils.formatEther(getFeeData.maxPriorityFeePerGas)
  })
}

exports.send_transaction = async (req, res, next) => {

  // const mnemonic = req.body.mnemonic

  const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
  const hdwallet = HDWallet.fromMnemonic(mnemonic)

  const wallet_provider = req.body.wallet_provider
  const wallet_number = req.body.wallet_number
  const wallet_to = req.body.wallet_to
  // const private_key = privateKey

  const private_key = hdwallet.derive(`m/44'/${wallet_provider}'/0'/0/${wallet_number}`).getPrivateKey().toString('hex')

  const wallet = new ethers.Wallet(private_key, provider)

  const tx = await wallet.sendTransaction({
    to: wallet_to,
    value: ethers.utils.parseEther("0.003")
  })

  await tx.wait()
  console.log(tx)

  if(tx){
    res.json({
      success: true,
      tx: tx
    })
  }else{
    res.json({
      success: false
    })
  }


}

exports.create_wallet = function(req, res, next) {

  // res.json({'success': true, body: req.body})
  const mnemonic = req.body.mnemonic
  const blockchain = req.body.blockchain
  const create_number_wallet = Number(req.body.create_number_wallet)

  const hdwallet = HDWallet.fromMnemonic(mnemonic)

  const HD = `m/44'/${blockchain.value}'/0'/0/${create_number_wallet}`

  const wallet = `0x${hdwallet.derive(HD).getAddress().toString('hex')}`

  // let hdkey = HDKey.fromMasterSeed(mnemonic)
  // let childkey = hdkey.derive("m/44'/60'/0'/0/1")
  //
  // // console.log(hdkey)
  // console.log(childkey.privateExtendedKey)
  // console.log(HDKey.fromExtendedKey(childkey.privateExtendedKey))

  if(wallet){
    res.json({'success': true, wallet: wallet})
  }else{
    res.json({'success': false})
  }

}

exports.get_keys = function(req, res, next) {

  // const mnemonic = req.body.mnemonic

  // const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
    const mnemonic2 = 'trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

  // const seed_b_1 = bip39.mnemonicToSeedSync(mnemonic);
  const seed_b_2 = bip39.mnemonicToSeedSync(mnemonic2);
  const hdwallet = HDWallet.fromMnemonic(mnemonic2)
  const privateKey = hdwallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex')

  // let seed_string_1 = seed_b_1.toString('hex')
  let seed_string_2 = seed_b_2.toString('hex')

  // console.log(seed.toString('hex'))

  // let seed = 'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542'
  //privateKey
  // f518cd551d2e0a3330b104cd1322d5f2aaec9984bc18761a61ea17e9b66f253d



  let wallet_hdpath = "m/44'/60'/0'/0/0";

  // let hdkey_1 = HDKey.fromMasterSeed(Buffer.from(seed_string_2, 'hex'))
  // let hdkey = HDKey.fromMasterSeed(mnemonic)
  // let hdwallet = HDWallet.fromMnemonic(mnemonic)
  let ew_hdkey = require('ethereumjs-wallet').hdkey;
  let hdwallet2 = ew_hdkey.fromMasterSeed(seed_string_2)
  console.log(hdwallet2.getWallet().getPrivateKey().toString('hex'))


  let wallet = hdwallet2.derivePath(wallet_hdpath).getWallet();
  console.log(wallet.getPrivateKey().toString('hex'))
  //
  // console.log(hdwallet2.privateKey.toString('hex'))
  // console.log(hdwallet2)

  // let childkey0 = hdkey.derive("m/44'/60'/0'/0/0")
  // let childkey1 = hdkey.derive("m/44'/60'/0'/0/1")
  // let childkey2 = hdkey.derive("m/44'/60'/0'/0/2")


  // let wallet = hdwallet2.derivePath(`m/44'/60'/0'/0/0`).getWallet();

  // console.log(childkey.privateExtendedKey)
  // console.log(childkey.publicExtendedKey)

  res.json({
    'success': true,
    // wallet: wallet,
    // ew_hdkey: ew_hdkey,

    // seed_string_1,
    // hdkey_1,
    // wallet,
    privateKey: privateKey
    // mnemonicWallet: ethers.Wallet.fromMnemonic(mnemonic),
    // privateKey: ethers.Wallet.fromMnemonic(mnemonic).privateKey,
    // keys: [
    //   {
    //     hd: "m/44'/60'/0'/0/0",
    //     childkey0: childkey0
    //   },
    //   {
    //     hd: "m/44'/60'/0'/0/1",
    //     childkey1: childkey1
    //   },
    //   {
    //     hd: "m/44'/60'/0'/0/2",
    //     childkey2: childkey2
    //   }
    // ]

  })

}

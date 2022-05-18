const HDWallet = require('ethereum-hdwallet')

const mnemonic = 'tag volcano eight thank tide danger coast health above argue embrace heavy'
const hdwallet = HDWallet.fromMnemonic(mnemonic)
console.log(`0x${hdwallet.derive(`m/44'/0'/0'/0/0`).getAddress().toString('hex')}`)
// BTH 0x718e0c266ad6e50a8111ca17a13a20479fe77c46

console.log(`0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`)
// ETH 0xc49926c4124cee1cba0ea94ea31a6c12318df947
console.log(`0x${hdwallet.derive(`m/44'/60'/0'/0/1`).getAddress().toString('hex')}`)
// ETH 0x8230645ac28a4edd1b0b53e7cd8019744e9dd559
console.log(`0x${hdwallet.derive(`m/44'/60'/1'/0/0`).getAddress().toString('hex')}`)
// ETH 0x6f8f46d4b86a623fd5d12a07847008e8fc7a9a53
console.log(`0x${hdwallet.derive(`m/44'/60'/2'/0/0`).getAddress().toString('hex')}`)
// ETH 0x21119e9de1e9e8c1aeecb8ba69138f082c7ce3c8
console.log(`0x${hdwallet.derive(`m/44'/60'/2'/0/1`).getAddress().toString('hex')}`)
// ETH 0x21119e9de1e9e8c1aeecb8ba69138f082c7ce3c8

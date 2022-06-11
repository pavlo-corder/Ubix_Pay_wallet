const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'trouble segment nice patrol say laundry lunch weasel royal motor midnight royal';

module.exports = {
  networks: {
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567")
      },
      network_id: 0
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567")
      },
      network_id: 3
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/0e1c8d1f7b2d43f2842192eb6ec17567")
      },
      network_id: 42
    },
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};

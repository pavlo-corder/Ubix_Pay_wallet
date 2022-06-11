const { ethers } = require("ethers");

const INFURA_ID = '0e1c8d1f7b2d43f2842192eb6ec17567'
const provider = new ethers.providers.JsonRpcProvider(`https://kovan.infura.io/v3/${INFURA_ID}`)

const account1 = '0xC49926C4124cEe1cbA0Ea94Ea31a6c12318df947' // Your account address 1
const account2 = '0x8230645aC28A4EdD1b0B53E7Cd8019744E9dD559' // Your account address 2

const privateKey1 = '63e21d10fd50155dbba0e7d3f7431a400b84b4c2ac1ee38872f82448fe3ecfb9' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)

const main = async () => {
  const senderBalanceBefore = await provider.getBalance(account1)
  const recieverBalanceBefore = await provider.getBalance(account2)
  const getGasPrice = await provider.getGasPrice()
  const getFeeData = await provider.getFeeData()



  console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
  console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}`)
  console.log(`getGasPrice: ${ethers.utils.formatEther(getGasPrice)}`)
  console.log(`getGasPrice2: ${ethers.utils.formatUnits(getGasPrice, "gwei")}`)
  console.log(`getFeeData_gasPrice: ${ethers.utils.formatEther(getFeeData.gasPrice)}`)
  console.log(`getFeeData_maxFeePerGas: ${ethers.utils.formatEther(getFeeData.maxFeePerGas)}`)
  console.log(`getFeeData_maxPriorityFeePerGas: ${ethers.utils.formatEther(getFeeData.maxPriorityFeePerGas)}`)
  // console.log(`getFeeData_gasPrice: ${ethers.utils.formatEther(getFeeData)}`)
  // console.log(`getFeeData2: ${ethers.utils.formatUnits(getFeeData, "gwei")}\n`)



  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.003")
  })

  await tx.wait()
  console.log(tx)

  const senderBalanceAfter = await provider.getBalance(account1)
  const recieverBalanceAfter = await provider.getBalance(account2)

  console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
  console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)
}

main()

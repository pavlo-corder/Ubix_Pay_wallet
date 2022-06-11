export default function () {

  let transactions = []

  let transactionsLocalStorage = JSON.parse(localStorage.getItem('transactions'))

  if(transactionsLocalStorage && transactionsLocalStorage.length > 0){
    transactions = transactionsLocalStorage
  }

  let transaction = {
    blockchain: "",
    to: "",
    value: 0,
    commission: 0,
    date: ''
  }

  return {
    transactions,
    transaction
  }
}

export default function () {

  let nickname = {
    address: "",
    blockchain: "",
    name: "",
    socialNetwork: false
  }

  let nicknames = []

  let nicknamesLocalStorage = JSON.parse(localStorage.getItem('nicknames'))

  if(nicknamesLocalStorage && nicknamesLocalStorage.length > 0){
    nicknames = nicknamesLocalStorage
  }

  return {
    nickname,
    nicknames
  }
}

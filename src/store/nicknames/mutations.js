/*
export function someMutation (state) {
}
*/

export const updateNicknames = (state, payload) => {

  let nicknames = [...state.nicknames]

  console.log(nicknames)

  let issetNickname = false

  nicknames.map((nickname) => {
    if(nickname.address === payload.address){
      nickname.name = payload.name
      issetNickname = true
    }
  })

  if(!issetNickname){
    nicknames.push(payload)
  }

  Object.assign(state.nicknames, nicknames)

  localStorage.setItem('nicknames', JSON.stringify(nicknames))

}


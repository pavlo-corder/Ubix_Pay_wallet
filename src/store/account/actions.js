/*
export function someAction (context) {
}
*/

export function updateAccount ({commit}, payload) {
  console.log('account update action', payload)

    commit('account/update', payload)

}

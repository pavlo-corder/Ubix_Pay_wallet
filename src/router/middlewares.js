export function auth ({ next, store }) {

  let accounts = JSON.parse(localStorage.getItem('accounts'))

  if(!accounts) {
    return next({ name: '' })
  }
  return next()
}

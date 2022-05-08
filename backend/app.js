let express = require('express')
let cors = require('cors')
let app = express()

let bip39 = require('bip39')
let crypto = require('crypto')


let corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const port = 3000

app.get('/mnemonic', cors(corsOptions),  (req, res, next) => {
  let randomBytes = crypto.randomBytes(16)
  let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  res.json(mnemonic.split(' '))
  // res.send(mnemonic)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


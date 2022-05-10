let express = require('express')
const bodyParser = require("body-parser");
let cors = require('cors')
let app = express()

let bip39 = require('bip39')
let crypto = require('crypto')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options("*", cors({ origin: 'http://localhost:8080', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "http://localhost:8080", optionsSuccessStatus: 200 }));

let corsOptions = {
  origin: 'http://localhost:8080',
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const port = 3000

app.get('/mnemonic',  (req, res, next) => {
  let randomBytes = crypto.randomBytes(16)
  let mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'))
  res.json(mnemonic.split(' '))
})

app.post('/validation_phrase',
  (req, res) => {

  const mnemonicPhrase = req.body.mnemonic

  if(bip39.validateMnemonic(mnemonicPhrase)){
    res.json({'success': true})
  }else{
    res.json({'success': false})
  }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


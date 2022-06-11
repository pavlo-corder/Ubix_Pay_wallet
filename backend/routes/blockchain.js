const express = require('express');
const router = express.Router();

const ControllerBlockchain = require('../controllers/ControllerBlockchain')

// Home page route.
router.get('/', ControllerBlockchain.index)
router.post('/get_balance', ControllerBlockchain.get_balance)
router.post('/get_balances', ControllerBlockchain.get_balances)
router.post('/get_commission', ControllerBlockchain.get_commission)
router.post('/send_transaction', ControllerBlockchain.send_transaction)
router.post('/create_wallet', ControllerBlockchain.create_wallet)
router.get('/get_keys', ControllerBlockchain.get_keys)



module.exports = router;

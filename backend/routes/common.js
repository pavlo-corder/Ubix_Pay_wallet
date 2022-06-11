const express = require('express');
const router = express.Router();

const ControllerCommon = require('../controllers/ControllerCommon')
const HDWallet = require("ethereum-hdwallet");

// Home page route.
router.get('/', ControllerCommon.index)

module.exports = router;

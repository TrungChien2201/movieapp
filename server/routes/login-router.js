const express = require('express')

const Loginctrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/login', Loginctrl.CreateLogin)
router.post('/register', Loginctrl.Register)
router.post('/forgot', Loginctrl.ForgotPassword)
router.delete('/delete-account/:id', Loginctrl.deleteAccount)
router.get('/get-account', Loginctrl.getAccount)
router.put('/edit-account', Loginctrl.editAccount)

module.exports = router

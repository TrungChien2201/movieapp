const express = require('express')

const Loginctrl = require('../controllers/login-ctrl')

const router = express.Router()

router.post('/login', Loginctrl.CreateLogin)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)

module.exports = router

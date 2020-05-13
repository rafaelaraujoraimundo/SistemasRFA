const express = require('express')
var router = express.Router();
const AuthController = require('../controllers/AuthController')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/excluir', AuthController.del_user)
router.get('/userall', AuthController.list_users)
router.post('/editar', AuthController.edit_user)
router.get('/user', AuthController.user_data)
router.use(AuthController.check_token)
module.exports = router

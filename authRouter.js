const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration', [
   check('username', 'name не може бути пустим').notEmpty(),
   check('password', 'Пароль має бути більше 4 символів і менше 10').isLength({min: 4, max: 10})
],  controller.registration)
router.post('/login', controller.login)
router.get('/user', controller.getUser)

module.exports = router

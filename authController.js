const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require('./config')

const generateAccessToken = (id, roles) => {
   const payload = {
      id,
      roles
   } 
   return   jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
   async registration (req, res) {
      try{
         const errors = validationResult(req)
         if (!errors.isEmpty()){
            return res.status(400).json({message:'Помилка при реєстрації', errors})
         }
         const {username, password} = req.body
         const candidate = await User.findOne({username})
         if (candidate) {
            return res.status(400).json({message:'Користувач з таким імінем вже існує!'})
         }
         const hashPassword = bcrypt.hashSync(password, 5);
         const userRole = await Role.findOne({value: 'USER'})
         const user = new User({username, password: hashPassword, roles:[userRole.value]});
         await user.save()
         return res.json({message: 'Користувач був зареєстрований!'})

      }catch(e){
         console.log(e)
         res.status(400).json({message: 'Registration ERROR!'})

      }

   } 
   async login (req, res) {
      try{
         const {username, password} = req.body
         const user = await User.findOne({username})
         // console.log('PASS--->',password)
         // console.log('USER ROLE', user.roles)
         // console.log('USER PASSWORD --', user.password)
         if (!user) {
            return res.status(400).json({message: `Користувач з іменем ${user} не знайдено!`})
         }
         const validPassword = bcrypt.compareSync(password, user.password)
         if (!validPassword) {
            res.status(400).json({message: 'Введений невірний пароль!'})
         }
         const token = generateAccessToken(user._id, user.roles);
         return res.json({token})


      }catch(e){
         console.log(e)
         res.status(400).json({message: 'Login ERROR!'})
      }
   } 
   async getUser (req, res) {
      try{
         // const userRole = new Role()
         // const adminRole = new Role({value: 'ADMIN'})
         // await userRole.save();
         // await adminRole.save();
         // const moderRole = new Role({value: 'MODER'})
         // await moderRole.save();
         res.json('server work!!!')

      }catch(e){

      }
   } 
}
module.exports = new authController()
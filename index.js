const express = require('express')
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async() => {
   try{
      await mongoose.connect(`mongodb+srv://alex:simpleauth@cluster0.lkwuheo.mongodb.net/simple_auth?retryWrites=true&w=majority`)
      app.listen(PORT, () =>console.log(`Server started on port ${PORT}`))
   }catch(err){
      console.log(err)
   }
}

start();
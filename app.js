const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

app.use('/upload',require('./routes/upload'))
app.use('/users',require('./routes/user'))

mongoose.connect('mongodb://remah:remah654312@ds223760.mlab.com:23760/upload',{useNewUrlParser:true,useUnifiedTopology:true},()=>console.log('mongodb connected'))

app.listen(3000,() => {
    console.log('server started successfully !')
})



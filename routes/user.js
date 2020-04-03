const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/',async(req,res)=>{
    const newUser = {
        name : req.body.name
    }
    const result = await new User(newUser).save()
    res.json({result})
})

module.exports = router


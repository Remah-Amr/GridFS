const Grid = require('gridfs-stream')
const express = require('express')
const router = express.Router()
const upload = require('../multer')
const mongoose = require('mongoose')
Grid.mongo = mongoose.mongo

const conn = mongoose.createConnection('mongodb://remah:remah654312@ds223760.mlab.com:23760/upload',{useUnifiedTopology:true,useNewUrlParser:true})
// conn return object , while connection returns promise

// to get files from database 
var gfs

conn.once('open', async () => {
     gfs = Grid(conn.db)
    // console.log('Grid connected!')
    // console.log('conn',conn.db)
})

// here we need only multer & grid-multer
router.post('/', upload , (req,res,next)=> {
    res.json({
        data : req.files[0]
    })
})
// here we need gfs to get images from database
router.get('/',async (req,res)=>{
    const files = await gfs.files.find().toArray()
    res.json({files})
})


// display single file object
router.get('/:filename',async (req,res)=> {
    const file = await gfs.files.findOne({filename : req.params.filename})
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    // res.json({file})
})

// delete file
router.delete('/:filename',async (req,res)=>{
    const result = await gfs.remove({filename: req.params.filename})
    res.json({result})
})

module.exports = router



// const connection = mongoose.connect('mongodb://remah:remah654312@ds223760.mlab.com:23760/upload',{useNewUrlParser: true,useUnifiedTopology:true},()=>{
//     console.log('mongodb connected !')
// }) // return promise , so I can use it only in storage below , but in gfs "NO"


// const conn = mongoose.createConnection('mongodb://remah:remah654312@ds223760.mlab.com:23760/upload',{useUnifiedTopology:true,useNewUrlParser:true})
// // conn return object , while connection returns promise
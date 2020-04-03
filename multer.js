const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose')


const conn = mongoose.createConnection('mongodb://remah:remah654312@ds223760.mlab.com:23760/upload',{useUnifiedTopology:true,useNewUrlParser:true})
// conn return object , while connection returns promise
const storage = new GridFsStorage({ 
    db: conn,
    file: (req, file) => {
        // instead of an object a string is returned
        return 'file_' + file.originalname
    }
});

module.exports = multer({ storage }).any()
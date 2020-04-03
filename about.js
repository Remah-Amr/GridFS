var gfs

conn.once('open', async () => {
     gfs = Grid(conn.db)
})


// here I use Grid which require from ('gridfs-stream') to get image from database
// by default it go and search in fs.files and retreive specific data which I need 
// in fs.file if file bigger than 255 kB  it will divide to 2 chuncks in fs.chuncks
// if I want to go to specific collection I will write :
/*
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
which uploads is the name
*/

// if you want to retrieve many in hbs write :  <img src="upload/<%= file.filename %>" alt="">
// check to ensure : https://github.com/bradtraversy/mongo_file_uploads/blob/master/views/index.ejs
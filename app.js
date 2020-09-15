const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors =  require('cors');
const config = require('./config');
const multer = require('multer');
const methodOverride = require('method-override');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');


mongoose.connect('mongodb://localhost:27017/Webshop', {useNewUrlParser : true , useUnifiedTopology: true, useCreateIndex: true }, ()=>{
    console.log('succesfully connected to database');
});


app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));


const storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });


const userRouter = require('./routes/userRoutes.js');
app.use('/user', userRouter);

const shoeRouter = require('./routes/shoeRoutes.js');
app.use('/shoe', shoeRouter);

const slideshowRouter = require('./routes/slideshowRoutes.js');
app.use('/slideshow', slideshowRouter(upload));

app.listen(5000, () => {
    console.log('express server started');
});
const path = require('path')
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const route = require('./routes');
const methodOverride = require('method-override');
const morgan = require('morgan');
const express = require('express');
require('dotenv').config()


// Initialize the Express application
const app = express()
const PORT = 4000;

// Database connection
const db = require('./config/db/index')
db.connect()

// Allow https://localhost:3000 from front-end
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins
}));

// Encoded for POST, PUT, PATCH, DELETE methods
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())

// Method override
app.use(methodOverride('_method'))
app.use(morgan('combined'));

// Configuration of Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, '/upload/images'),
  filename: (req,file,cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage: storage})

app.use(express.static(path.join(__dirname,'upload')))

app.post('/book/upload',upload.fields([{
  name: "bookCover", maxCount: 1
}, {
  name: "bookContent", maxCount: 1
}
]),(req,res)=> {

  const objectList = req.files;
  const image_url = {};
  
  for (const key in objectList) {
    if (Object.hasOwnProperty.call(objectList, key)) {
      const file = objectList[key][0];
      const name = `${key}_url`;
      image_url[name] = `http://localhost:4000/images/${file.filename}`;
    }
  }

    return res.json(
      {
        success: 1,
        image_url
      }
    )
})


route(app)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
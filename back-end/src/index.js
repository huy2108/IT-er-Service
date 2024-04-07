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

const jwtSecret = process.env.JWT_SECRET
module.exports = jwtSecret
console.log(jwtSecret)

// Initialize the Express application
const app = express()
const PORT = 4000;

// Database connection
const db = require('./config/db/index')
db.connect()

// Allow https://localhost:3000 from front-end
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Encoded for POST, PUT, PATCH, DELETE methods
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())

// Method override
app.use(methodOverride('_method'))
app.use(morgan('combined'));

route(app)



app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
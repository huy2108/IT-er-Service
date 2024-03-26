const path = require('path')
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

// Initialize the Express application
const app = express();
const PORT = 4000;

// Database connection
const db = require('./config/db/index')
db.connect()

// Encoded for POST, PUT, PATCH, DELETE methods
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())

// Scrapping data
async function fetchData(url) {
    const response = await axios.get(url);
    return response.data;
}

async function scrapeData() {
    const html = await fetchData('https://tiki.vn/');
    const $ = cheerio.load(html);

    // Example: Scraping the titles of all links on the page
    const titles = [];
    $('a').each((index, element) => {
        titles.push($(element).text());
    });
    console.log(titles)
    return titles;
}


app.get('/', (req,res) => {
    return res.json("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
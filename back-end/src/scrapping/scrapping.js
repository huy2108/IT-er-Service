// scraping/scraping.js

const axios = require('axios');
const cheerio = require('cheerio');

async function fetchData(url) {
    const response = await axios.get(url);
    return response.data;
}

async function scrapePage(url) {
    const html = await fetchData(url);
    const $ = cheerio.load(html);

    const titles = [];
    $('a').each((index, element) => {
        titles.push($(element).text());
    });
    return titles;
}

async function scrapeMultiplePages(baseUrl, pageCount) {
    const allTitles = [];

    for (let i = 1; i <= pageCount; i++) {
        const url = `${baseUrl}?page=${i}`;
        const titles = await scrapePage(url);
        allTitles.push(...titles);
    }

    return allTitles;
}

module.exports = scrapePage;

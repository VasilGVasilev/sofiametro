// this is your backend:
// thus, the express to link it with the frontend
// and for now puppeteer to scrape, but it may migrate to Python

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const scrapingFunc = require('./scraper')


app.use(express.static('../public'))
app.use(cors());
app.use(express.json());

// __dirname returns the directory you are currently in so due to the express.static -> you are in /public 
// ../ makes you go out one directory so just add what you want, note that after index.html config you have to config
// to /public in express.static too due to being in /views
// for future for better directory handling => MVC structure! 
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
    // const lemon = await scrapingFunc.scrapingF();
    // res.json(lemon);
})

//                M3
//    Gorna Bania -> Hadji Dimitar



app.get('/3336', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3336';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3334', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3334';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3332', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3332';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3330', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3330';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3328', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3328';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3324', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3324';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3322', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3322';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3320', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3320';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3318', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3318';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3316', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3316';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3312', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3312';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3310', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3310';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.listen(5500, () => console.log('Listening...'))
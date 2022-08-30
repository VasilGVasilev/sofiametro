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

app.get('/3320', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3320';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

app.get('/3322', async (req, res) => {
    // res.sendFile(path.join(__dirname, '../views/index.html'));
    let dataNum = '3322';
    const lemon = await scrapingFunc.scrapingF(dataNum);
    res.json(lemon);
})

// app.get('/trains', async (req, res) => {
//     // res.sendFile(path.join(__dirname, '../views/index.html'));
//     let dataNum = '3322';
//     const lemon = await scrapingFunc.scrapingF(dataNum);
//     res.json(lemon);
// })

// app.post('/trains', async (req, res) => {
//     //console.log(req.body.jobName) //Object.values to exract key:value<-- only
//     // const jobDB = await scrapers.scrapeJob(req.body.jobName);//dont stringify, but use the value this way
//     console.log(req.body); //but extract the value key:value in this was
//     //todo: Add to DB
//     // res.send(jobDB)
//     res.send(req.body);
    
// })


app.listen(5500, () => console.log('Listening...'))
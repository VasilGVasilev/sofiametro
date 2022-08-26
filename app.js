const express = require('express');
const app = express();

const scrapingFunc = require('./scraping')
// const m = scrapingFunc.scrapingF();
// console.log(m);
app.get('/app', async (req, res) => {
    const lemon = await scrapingFunc.scrapingF();
    res.json(lemon);
})

app.listen(5500, () => console.log('Listening'))

// exporting a module as an object necessitates that you target the value by object.key dot notation scrapingFunc.scrapingF
// you also need to invoke the function scrapingFunc.scrapingF()
// you also need to await for the promise because it is essenatially a promise
// so await/async
// you may need to further develop the a Promise structure down the road
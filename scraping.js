// it first opens the relevant station page

// it either puts all numbers into an array and checks for closest number
// or
// it checks table based on current time -> hour; then look for minutes in subtable

// maybe change request in future because it is compromised 
const request = require('request');
const cheerio = require('cheerio');

request('https://www.youtube.com/watch?v=LoziivfAAjE', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        // const $ like jQuery
        const $ = cheerio.load(html);
        const firstTime = $('#text')
        // !!!
        // the problem is that the table doesnt update with the link and it scrapes the defualt first station table
        // also move to another lib other than request
        // !!!
        let s = firstTime.text();
        console.log(s.trim());

    }
})
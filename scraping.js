// it first opens the relevant station page

// it either puts all numbers into an array and checks for closest number
// or
// it checks table based on current time -> hour; then look for minutes in subtable

// maybe change request in future because it is compromised 
const request = require('request');
const cheerio = require('cheerio');

//  WE WILL CHANGE TO EXPRESS AND USE ASYNC/AWAIT TO WAIT FOR LOAD PAGE AND THEN SCRAPE


request('https://schedules.sofiatraffic.bg/metro/M3#sign/4424/3320', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        // const $ like jQuery
        const $ = cheerio.load(html);
        const firstTime = $('/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[1]/div[2]/div/div[2]/table/tbody/tr/td[2]/div/a[1]')
        // !!!
        // the problem is that the table doesnt update with the link and it scrapes the defualt first station table
        // also move to another lib other than request
        // !!!
        
        let s = firstTime.text();
        console.log(s.trim());

    }
})
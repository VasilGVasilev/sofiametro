
//dependencies

const puppeteer = require('puppeteer');


//main function for our scraper

module.exports =  (async () => {

  //launching and opening our page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  //the waitUntil CRUCIAL FOR HAVING FINAL STATE OF RENDERING OF DYNAMIC DIV
  await page.goto('https://schedules.sofiatraffic.bg/metro/M3#sign/4424/3320', {waitUntil: 'networkidle0'});
  
  //extract info from all table rows and map them onto a new array
  const hours = await page.evaluate(() => {
    const result = Array.from(document.querySelectorAll('#schedule_direction_10757_4424_container > div > div.schedule_times > table > tbody > tr > td > div > a'));
    // if .innerText is put on Array.from, the execution context of puppeteer is destroyed
    // to avoid that => return a new array that traverses the above by extrating innerText
    // innerText instead of textContext because the former is aware of rendered appearance of text
    return result.map(el => el.innerText);
  });

  // Tried arr.push and arrow function but .replace() TypeError due to hours[i] undefined in for loop
  //  => seamless .map() solution
  const hourNums = hours.map(el => parseInt(el.replace(":", "")));

  
  // current time
  var current = new Date();
  var h = current.getHours();
  var m = current.getMinutes();
  let currentTime = Number('' + h + m);
  console.log(currentTime);

  // next two trains
  let firstN = 0;
  let secondN = 0;

  let i = 0;
  while (hourNums[i] < currentTime) {
    i++
    firstN = hourNums[i];
    let l = i + 1;
    secondN = hourNums[l];
  }
  
  // metro offtime disclaimer
  if (typeof firstN === 'undefined' && typeof secondN === 'undefined' || firstN === 0 && secondN === 0) {
    console.log("Metro Not working")
  } else {
    console.log(firstN);
    console.log(secondN);
  }

  
  
  await browser.close();
})();

// send data to be visualised on p.class="input"




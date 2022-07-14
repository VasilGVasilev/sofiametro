
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
  let hours = await page.evaluate(() => {
    // select selector
    // wrap it the nodes in an array with Array.form()
    // make each node list element an array element with .map();
    let result = Array.from(document.querySelectorAll('div.schedule_times > table > tbody > tr > td > div > a')).map(el => el.innerHTML);
    return result;
    // NB: innerText() returns the VISIBLE text contained in a node, 
    // while textContent() returns the FULL text. 
    // Example => HTML     <span>Hello <span style="display: none;">World</span></span>; 
    // innerText() will return 'Hello', while textContent() will return 'Hello World'. 
    
  });

  // Tried arr.push and arrow function but .replace() TypeError due to hours[i] undefined in for loop
  //  => seamless .map() solution
  console.log(hours);
  // const hourNums = hours.map(el => parseInt(el.replace(":", "")));


  
  // current time
  var current = new Date();
  var h = current.getHours();
  var m = current.getMinutes();
  let currentTime = Number('' + h + m);
  

  // // next two trains
  // let firstN = 0;
  // let secondN = 0;

  // let i = 0;
  // while (hourNums[i] < currentTime) {
  //   i++
  //   firstN = hourNums[i];
  //   let l = i + 1;
  //   secondN = hourNums[l];
  // }
  
  // metro offtime disclaimer
  // if (typeof firstN === 'undefined' && typeof secondN === 'undefined' || firstN === 0 && secondN === 0) {
  //   return "Metro Not working"
  // } else {
  //   console.log(firstN);
  //   console.log(secondN);
  // }

  
  
  await browser.close();
})();

// send data to be visualised on p.class="input"




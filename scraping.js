
//dependencies

const { first } = require('cheerio/lib/api/traversing');
const puppeteer = require('puppeteer');


//main function for our scraper

module.exports =  (async () => {

  //launching and opening our page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // {waituntil + timeout} are crucial for navigating up to the precise moment of final state of rendering of a dynamic div
  // SUBJECT TO OPTIMISATION when in production -> when front is attached to back, try to catch error of exceeding max timeout by prompting a restart
  await page.goto('https://schedules.sofiatraffic.bg/metro/M3#sign/4424/3320', {waitUntil: 'load', timeout: 3000});
  
  //extract info from all table rows and map them onto a new array
  let hours = await page.evaluate(() => {
    // 1) select selector
    // 2) wrap it the nodes in an array with Array.form()
    // 3) make each node list element an array element with .map();
    return result = Array.from(document.querySelectorAll('div.schedule_times > table > tbody > tr > td > div > a')).map(el => el.innerHTML);
  });

  // Tried arr.push and arrow function but .replace() TypeError due to hours[i] undefined in for loop
  //  => seamless .map() solution
  
  const hourNums = hours.map(el => Number(el.replace(":", "")));
  

  
  // current time
  var current = new Date();
  var h = current.getHours();
  var m = current.getMinutes();
  let currentTime = Number('' + h + m);
  
  // next two trains
  let firstTrain = 0;
  let secondTrain = 0;
  for (let i = 0; i < hourNums.length; i++){
    if (currentTime < hourNums[i]){
      firstTrain = hourNums[i];
      secondTrain = hourNums[i+1];
      break;
    }
  }
  console.log(currentTime);
  console.log(firstTrain);
  console.log(secondTrain);

  // format train arrival in minutes to pass
  let firstTrainComesIn = firstTrain - currentTime;
  let secondTrainComesIn = secondTrain - currentTime;

  // check for metro not working
  let startWorking = hourNums[0];
  let stopWorking = hourNums[hourNums.length - 1];
  console.log(startWorking);
  console.log(stopWorking); 

  console.log(`First Train comes in: ${firstTrainComesIn} mins...`);
  console.log(`Second Train comes in: ${secondTrainComesIn} mins...`);

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




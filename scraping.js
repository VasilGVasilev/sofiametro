
//dependencies

const puppeteer = require('puppeteer');


//main function for our scraper

module.exports =  (async () => {

  //launching and opening our page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // {waituntil + timeout} are crucial for navigating up to the precise moment of final state of rendering of a dynamic div
  // SUBJECT TO OPTIMISATION when in production -> when front is attached to back, try to catch error of exceeding max timeout by prompting a restart
  await page.goto('https://schedules.sofiatraffic.bg/metro/M3#sign/4424/3320', {waitUntil: 'networkidle2'});
  
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
  let current = new Date();
  let h = current.getHours();
  let m = current.getMinutes();
  m = addZero(m);
  let currentTime = Number('' + h + m);

  // to not lose minutes 18:09 be 189
  function addZero(time){
    if (time < 10){
      time = '0' + time;
    }
    return time;
  }
  
  // next two trains
  let firstTrain = 0;
  let secondTrain = 0;
  for (let i = 0; i < hourNums.length; i++){
    if (currentTime <= hourNums[i]){
      // bug fix of 100 to 60 min format -> from 7:59 to 8:00 is 1 min not 41 mins
      if ((hourNums[i] - currentTime) > 40){
        firstTrain = hourNums[i] - 40;
      } else {
        firstTrain = hourNums[i];
        secondTrain = hourNums[i+1];
      }
      if (hourNums[i+1] - currentTime > 40){
        secondTrain = hourNums[i+1] - 40;
      } 
      break;
    }
  }

  // format train arrival in minutes to pass
  let firstTrainComesIn = firstTrain - currentTime;
  let secondTrainComesIn = secondTrain - currentTime;


  // check for metro not working
  let startWorking = hourNums[0];
  let stopWorking = hourNums[hourNums.length - 1];


  // FIX BUG - you dismiss the last train if it is after 0:00
  if (currentTime > startWorking || currentTime < stopWorking) {
    console.log(`First Train comes in: ${firstTrainComesIn} mins...`);
    if (secondTrainComesIn > 0){
      console.log(`Second Train comes in: ${secondTrainComesIn} mins...`);
    }

  } else {
    console.log(`Metro is not working.`);
  }
  
  await browser.close();
})();

// send data to be visualised on p.class="input"




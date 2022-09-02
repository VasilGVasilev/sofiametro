
//dependencies

const puppeteer = require('puppeteer');


//main function for our scraper

async function scrapingF(urlData) {

  //launching and opening our page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // {waituntil + timeout} are crucial for navigating up to the precise moment of final state of rendering of a dynamic div
  // SUBJECT TO OPTIMISATION when in production -> when front is attached to back, try to catch error of exceeding max timeout by prompting a restart
  await page.goto('https://schedules.sofiatraffic.bg/metro/M3#sign/' + urlData, {waitUntil: 'networkidle2'});
  
  //extract info from all table rows and map them onto a new array
  let hours = await page.evaluate(() => {
    // 1) select selector
    // 2) wrap it the nodes in an array with Array.form()
    // 3) make each node list element an array element with .map();

  

    return result = Array.from(document.querySelectorAll('table > tbody > tr > td > div > a')).map(el => el.innerHTML);
    
  });

  // Tried arr.push and arrow function but .replace() TypeError due to hours[i] undefined in for loop
  //  => seamless .map() solution
  const hourNums = hours.map(el => Number(el.replace(":", "")));
  
  
  let filteredHourNums = [];
  
  function timeSchedule(){
    for (let i = 0; i < 150; i++){
      if (hourNums[i] < hourNums[i+1]){
        filteredHourNums.push(hourNums[i])
      } else {
        break
      }
    }
  }
  timeSchedule();
  
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
  for (let i = 0; i < filteredHourNums.length; i++){
    if (currentTime <= filteredHourNums[i]){
      // bug fix of 100 to 60 min format -> from 7:59 to 8:00 is 1 min not 41 mins
      if ((filteredHourNums[i] - currentTime) > 40){
        firstTrain = filteredHourNums[i] - 40;
      } else {
        firstTrain = filteredHourNums[i];
        secondTrain = filteredHourNums[i+1];
      }
      if (filteredHourNums[i+1] - currentTime > 40){
        secondTrain = filteredHourNums[i+1] - 40;
      } 
      break;
    }
  }

  // format train arrival in minutes to pass
  let firstTrainComesIn = firstTrain - currentTime;
  let secondTrainComesIn = secondTrain - currentTime;


  // check for metro not working
  let startWorking = filteredHourNums[0];
  let stopWorking = filteredHourNums[filteredHourNums.length - 1];

  let resultString = '';
  // FIX BUG - you dismiss the last train if it is after 0:00
  if (currentTime > startWorking || currentTime < stopWorking) {
    // console.log(`First Train comes in: ${firstTrainComesIn} mins...`);
    resultString+= 'First Train comes in: ' +firstTrainComesIn + ' mins...';
    if (secondTrainComesIn > 0){
      // console.log(`Second Train comes in: ${secondTrainComesIn} mins...`);
      resultString+= '    ';
      resultString+= 'Second Train comes in: ' + secondTrainComesIn +' mins...';
    }

  } else {
    resultString += 'Metro is not working';
    // console.log(`Metro is not working.`);
  }
  await browser.close();
  return resultString;
};
module.exports = {
  scrapingF
}
// send data to be visualised on p.class="input"




// this will be the central point of the app
// NEW CODE


// Express 

//import 
const bodyParser = require('body-parser');
const scrapeJob = require('./scrapers');
const express = require('express')
const app = express()
const port = 5500

//create middleware to extract json from the body of our req
app.use(bodyParser.json())

//disable sec rule for local dev
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get('/scrapers', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// OLD CODE

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the link, open the modal 
btn.onclick = function() {
  // animation is set in motion
  document.getElementById('modal-box').style.animation = 'bounce 0.6s'
  // modal content is set to new fetures
  document.getElementById('modal-box').style.transform = 'translate(-50%)';
  document.getElementById('modal-box').style.top = '40%';
  document.getElementById('modal-box').style.left = '50%';
  document.getElementById('modal-box').style.zIndex = '20';
  // modal is displayed
  modal.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
document.getElementById('close-btn').onclick = function() {
  // animation is set in motion
  document.getElementById('modal-box').style.animation = 'bounce-off 0.5s';
  // modal conent is revert to inital state
  document.getElementById('modal-box').style.transform = 'none';
  document.getElementById('modal-box').style.top = 'none';
  document.getElementById('modal-box').style.left = 'none';
  document.getElementById('modal-box').style.zIndex = '0';
  // setTimeout used to await the ending of the animation/faster than animation duration
  setTimeout(() => {modal.style.display = "none"}, 300);
  // even {modal...} is a function in JS
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    // animation is set in motion
    document.getElementById('modal-box').style.animation = 'bounce-off 0.5s';
    // modal is reverted to original state
    document.getElementById('modal-box').style.transform = 'none';
    document.getElementById('modal-box').style.top = 'none';
    document.getElementById('modal-box').style.left = 'none';
    document.getElementById('modal-box').style.zIndex = '0';
    // await animation
    setTimeout(() => {modal.style.display = "none"}, 300);
  }
}
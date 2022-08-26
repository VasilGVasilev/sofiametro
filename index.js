// Express logic

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

// MAIN LOGIC OF APP

const stations = document.querySelectorAll('.station')
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];



// selecting a station
for (let i = 0; i < stations.length; i++){
  stations[i].addEventListener('click', () => {
      modal.style.display = 'block';
      document.getElementById('modal-box').style.display = 'block'
      
      // animation is set in motion
      document.getElementById('modal-box').style.animation = 'bounce 0.6s'
      // modal content is set to new fetures
      document.getElementById('modal-box').style.transform = 'translate(-50%)';
      document.getElementById('modal-box').style.top = '40%';
      document.getElementById('modal-box').style.left = '50%';
      document.getElementById('modal-box').style.zIndex = '20';

      let selectedStation = stations[i].getAttribute('data-num');
      document.getElementById('modal-body').innerHTML+=selectedStation;
  })
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
  // clear modal-body
  document.getElementById('modal-body').innerHTML='';
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
    // clear modal-body
    document.getElementById('modal-body').innerHTML='';
    // await animation
    setTimeout(() => {modal.style.display = "none"}, 300);
  }
}

// delete unstaged commits with git reset --hard but then reaatch HEAD with new branch
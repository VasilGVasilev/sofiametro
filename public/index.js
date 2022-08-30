// THIS IS FRONT END  -> it may render simiraly to the backend because the backend has a res.SendFile(index.html)
// but it is hosted on entirely different platform, the backend is on Node.js env and it does not understand browser.document/window object


// you will manipualte the browser through this code
// and you will fetch info from the server which at the time of writing is hosting:
// '/' and '/trains'
// in reality you need the info hosted on /trains, it is the scraped info
// you take it and populate your front end
// do it with fetch


// you send info on the '/' that is the index.html
// client interacts with it and it is the JS you write here that is a script extention of index.html
// that will trigger an action that will be sent through forExample a fetch req to the
// server hosted on '/trains/ and it will send back info
// which will be used to update the script of the index.html


const stations = document.querySelectorAll('.station')
const span = document.getElementsByClassName("close")[0];
const trainBtn = document.getElementById('train-btn');
const modalBody = document.getElementById('modal-body');


// selecting a station
for (let i = 0; i < stations.length; i++){
    let currentStation = stations[i];
    currentStation.addEventListener('click', () => {

      document.getElementById("myModal").style.display = 'block';
      document.getElementById('modal-box').style.display = 'block'
      
      // animation is set in motion
      document.getElementById('modal-box').style.animation = 'bounce 0.6s'
      // modal content is set to new fetures
      document.getElementById('modal-box').style.transform = 'translate(-50%)';
      document.getElementById('modal-box').style.top = '40%';
      document.getElementById('modal-box').style.left = '50%';
      document.getElementById('modal-box').style.zIndex = '20';
      
      trainBtn.addEventListener('click', async () => {
        // clear modal-body
        modalBody.replaceChildren();
        
        //   logic to push button to show trains 
        let selectedStation = currentStation.getAttribute('data-num');
        let fetchURL = 'http://localhost:5500/' + selectedStation;

        await fetch(fetchURL)
        .then((response) => response.json())
        .then((data) => {
          modalBody.replaceChildren();
          modalBody.innerHTML+=data;

        })
      })
  })
    //   trainBtn.addEventListener('click', (selectedStation)=>{
    //     fetch('http://localhost:trains/', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({selectedStation})})
    //     })
    // })
}





// When the user clicks on <span> (x), close the modal
document.getElementById('close-btn').onclick = function() {
    
    // clear modal-body
    modalBody.replaceChildren();
    // animation is set in motion
    document.getElementById('modal-box').style.animation = 'bounce-off 0.5s';
    // modal conent is revert to inital state
    document.getElementById('modal-box').style.transform = 'none';
    document.getElementById('modal-box').style.top = 'none';
    document.getElementById('modal-box').style.left = 'none';
    document.getElementById('modal-box').style.zIndex = '0';
    // setTimeout used to await the ending of the animation/faster than animation duration
    setTimeout(() => {document.getElementById("myModal").style.display = "none"}, 300);
    // even {modal...} is a function in JS
    setTimeout(() => {location.reload()}, 200);
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
   
    if (event.target == document.getElementById("myModal")) {
      
      // clear modal-body
      modalBody.replaceChildren();
      // animation is set in motion
      document.getElementById('modal-box').style.animation = 'bounce-off 0.5s';
      // modal is reverted to original state
      document.getElementById('modal-box').style.transform = 'none';
      document.getElementById('modal-box').style.top = 'none';
      document.getElementById('modal-box').style.left = 'none';
      document.getElementById('modal-box').style.zIndex = '0';
      
      // await animation
      setTimeout(() => {document.getElementById("myModal").style.display = "none"}, 300);
      // reload page as a layman's solution to not being able to clear the data from the previous scraping session
      // must improve in future -> Problem may be callback chain with unresolved promise
      setTimeout(() => {location.reload()}, 200);
    }
}



// this will be the central point of the app
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
span.onclick = function() {
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
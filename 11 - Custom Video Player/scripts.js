// Select elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip');
const ranges = player.querySelectorAll('.player__slider');

// Build functions

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // alternative way of doing this by calling string as result of ternary operator:
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


// Connect events listener

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// listen for any pause and play event to update the button (not just from inside the togglePlay function)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach((button) =>　button.addEventListener('click', skip));
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
  // uses the values in the dataset [data-skip] to add or take away from property currentTime
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  // the name corresponds to the property of the video object so we can use it to update to new value
}

function handleProgress() {
  // currentTime and duration are properties of the video
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
  
}

// Connect events listener

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// listen for any pause and play event to update the button (not just from inside the togglePlay function)
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// listen to this time update to trigger the function that changes the style of progress bar
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button =>　button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
// checks the mousedown variable and if true moves after the && to call the scrub function. We need to pass the event to pass it to scrub
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
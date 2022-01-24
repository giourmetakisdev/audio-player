const container = document.querySelector('.container');
const description = document.querySelector('.description');
const playButton = document.querySelector('#play-button');
const startButton = document.querySelector('#start-button');
const backwardButton = document.querySelector('#backward-button');
const forwardButton = document.querySelector('#forward-button');
const muteButton = document.querySelector('#mute-button');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const currentTimeDiv = document.querySelector('#current-time');
const totalTimeDiv = document.querySelector('#total-time');

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
      .filter(a => a)
      .join(':')
}

audio.onloadedmetadata = function() {
  currentTimeDiv.innerHTML = formatTime(Math.round(audio.currentTime));
  totalTimeDiv.innerHTML = formatTime(Math.round(audio.duration));
};

function playSong() {
    container.classList.add('play');
    playButton.querySelector('i.fa-solid').classList.remove('fa-play');
    playButton.querySelector('i.fa-solid').classList.add('fa-pause');
  
    audio.play();
  }
  
function pauseSong() {
    container.classList.remove('play');
    playButton.querySelector('i.fa-solid').classList.add('fa-play');
    playButton.querySelector('i.fa-solid').classList.remove('fa-pause');

    audio.pause();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeDiv.innerHTML = formatTime(Math.round(currentTime));
  }
  
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
}

playButton.addEventListener('click', () => {
    const isPlaying = container.classList.contains('play');

    if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
});

forwardButton.addEventListener('click', () => {
  audio.currentTime += 20;
});

backwardButton.addEventListener('click', () => {
  audio.currentTime -= 20;
});

muteButton.addEventListener('click', () => {
  const isMuted = audio.muted;

  if (isMuted) {
    audio.muted = false;
    muteButton.querySelector('i.fa-solid').classList.remove('fa-volume-high');
    muteButton.querySelector('i.fa-solid').classList.add('fa-volume-xmark');
    } else {
      audio.muted = true;
      muteButton.querySelector('i.fa-solid').classList.remove('fa-volume-xmark');
      muteButton.querySelector('i.fa-solid').classList.add('fa-volume-high');
    }
});

startButton.addEventListener('click', () => {
  audio.currentTime = 0;
});

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', () => {
    container.classList.remove('play');
    playButton.querySelector('i.fa-solid').classList.add('fa-play');
    playButton.querySelector('i.fa-solid').classList.remove('fa-pause');
});
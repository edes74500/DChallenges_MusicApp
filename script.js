// bar progression width = medi.duration current x 100 / totale

const audioApp = document.querySelector(".app-container");
const playBtn = audioApp.querySelector(".play-btn img");
const nextBtn = audioApp.querySelector("#nextBtn");
const prvBtn = audioApp.querySelector("#previousBtn");
let songAudio = document.querySelector("#songAudio");
let progressBar = audioApp.querySelector(".bar-progress");
let totalBar = audioApp.querySelector(".bar-container");
const progressContainer = audioApp.querySelector(".progress-container");
let isOn = false;
let currentIndex = 0;
let x = 0;
let mouseDown = false;

let musicDisplay = (musicIndex) => {
  songAudio.src = `\/assets\/${allSongs[musicIndex].src}.mp3`;
  audioApp.querySelector(".img-container img").src = `\/assets/${allSongs[musicIndex].img}.png`;
  audioApp.querySelector(".title-container h3").innerHTML = `${allSongs[musicIndex].name}`;
  audioApp.querySelector(".title-container p").innerHTML = `${allSongs[musicIndex].artist}`;
};

let playPauseMusic = () => {
  if (isOn == false) {
    songAudio.play();
    playBtn.src = `/assets/pause_icon.svg`;
    isOn = true;
  } else {
    songAudio.pause();
    isOn = false;
    playBtn.src = `/assets/Play_fill.svg`;
  }
};

let resetDisplay = () => {
  musicDisplay(currentIndex);
  progressBar.style.width = 0;
  isOn = false;
  playPauseMusic();
};

// display minutes and second on span, first is timer, second is span ID
let timeSet = (timer, target) => {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor(timer % 60) >= 10 ? Math.floor(timer % 60) : "0" + Math.floor(timer % 60);
  audioApp.querySelector(`#${target}-timer`).innerHTML = `${minutes}:${seconds}`;
};

songAudio.addEventListener("loadeddata", (e) => {
  timeSet(e.target.duration, "total");
});

songAudio.addEventListener("timeupdate", (e) => {
  if (mouseDown === false) timeSet(e.target.currentTime, "current");
  if (mouseDown === false) progressBar.style.width = `${(e.target.currentTime * 100) / e.target.duration}%`;
  if (e.target.currentTime == e.target.duration) {
    if (currentIndex < allSongs.length - 1) currentIndex++;
    else currentIndex = 0;
    resetDisplay();
  }
});

window.addEventListener("load", () => {
  musicDisplay(currentIndex);
});

playBtn.addEventListener("click", () => {
  playPauseMusic();
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < allSongs.length - 1) currentIndex++;
  else currentIndex = 0;
  resetDisplay();
});

prvBtn.addEventListener("click", () => {
  if (currentIndex > 0) currentIndex--;
  else currentIndex = allSongs.length - 1;
  resetDisplay();
});

// set mousedown on the progress bar
totalBar.addEventListener("mousedown", () => (mouseDown = true));

// change the bar progress when mouse is down
document.addEventListener("mousemove", (e) => {
  if (mouseDown === true) {
    console.log((((e.clientX - totalBar.offsetLeft) / totalBar.offsetWidth) * 100 * songAudio.duration) / 100);
    // check if mouse X is after the bar
    if (((e.clientX - totalBar.offsetLeft) / totalBar.offsetWidth) * 100 > 100) {
      progressBar.style.width = "100%";
      timeSet(`${songAudio.duration}`, "current");
      // check if mouse X is before the bar
    } else if (((e.clientX - totalBar.offsetLeft) / totalBar.offsetWidth) * 100 < 0) {
      progressBar.style.width = "0%";
      timeSet(`0`, "current");
    } else {
      progressBar.style.width = `${((e.clientX - totalBar.offsetLeft) / totalBar.offsetWidth) * 100}%`;
      timeSet(
        `${Math.floor((((e.clientX - totalBar.offsetLeft) / totalBar.offsetWidth) * 100 * songAudio.duration) / 100)}`,
        "current"
      );
    }
  }
});

window.addEventListener("mouseup", (e) => {
  if (mouseDown === true) {
    mouseDown = false;
    songAudio.currentTime = (songAudio.duration * (e.offsetX * 100)) / totalBar.clientWidth / 100;
  }
});

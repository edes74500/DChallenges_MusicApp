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
let mouseState;

let musicDisplay = (musicIndex) => {
  songAudio.src = `\/music-player/assets\/${allSongs[musicIndex].src}.mp3`;
  audioApp.querySelector(".img-container img").src = `\/music-player/assets/${allSongs[musicIndex].img}.png`;
  audioApp.querySelector(".title-container h3").innerHTML = `${allSongs[musicIndex].name}`;
  audioApp.querySelector(".title-container p").innerHTML = `${allSongs[musicIndex].artist}`;
};

let playPauseMusic = () => {
  if (isOn == false) {
    songAudio.play();
    playBtn.src = `/music-player/assets/pause_icon.svg`;
    isOn = true;
  } else {
    songAudio.pause();
    isOn = false;
    playBtn.src = `/music-player/assets/Play_fill.svg`;
  }
};

let resetDisplay = () => {
  musicDisplay(currentIndex);
  progressBar.style.width = 0;
  isOn = false;
  playPauseMusic();
};

let timeSet = (timer, target) => {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor(timer % 60) >= 10 ? Math.floor(timer % 60) : "0" + Math.floor(timer % 60);
  audioApp.querySelector(`#${target}-timer`).innerHTML = `${minutes}:${seconds}`;
};

songAudio.addEventListener("loadeddata", (e) => {
  timeSet(e.target.duration, "total");
});

songAudio.addEventListener("timeupdate", (e) => {
  timeSet(e.target.currentTime, "current");
  progressBar.style.width = `${(e.target.currentTime * 100) / e.target.duration}%`;
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

let moveBar;
//     = () => {
//     totalBar.onmousemove = (e) => {
//       console.log(e);
//         progressBar.width = (e.offsetX * 100) / totalBar.clientWidth / 100;
//         setTimeout("callEvent()", 1);
// }

// totalBar.addEventListener("mousedown", (e) => {
//   mouseState = "on";
//   if (mouseState) {
//     totalBar.onmousemove = (e) => {
//       let data = e;
//       console.log(data);
//       console.log(totalBar.clientWidth);
//       progressBar.style.width = `${(e.offsetX * 100) / totalBar.clientWidth}%`;
//     };
//   } else {
//   }
// });
// Window.onmouseup = () => {
//   clearInterval(moveBar);
// };

totalBar.addEventListener("mouseup", (e) => {
  songAudio.currentTime = (songAudio.duration * (e.offsetX * 100)) / totalBar.clientWidth / 100;
  mouseState = null;
  clearInterval(moveBar);
});

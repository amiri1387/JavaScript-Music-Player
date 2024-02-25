const playerButton = document.querySelector(".player-button");
const audio = document.querySelector("audio");
const timeline = document.querySelector(".timeline");
const soundButton = document.querySelector(".sound-button");
const nextButton = document.querySelector(".next-button");
const perButton = document.querySelector(".per-button");
const volumeline = document.querySelector(".volumeline");
const favButton = document.querySelector(".fav-button");

const playIcon = `
<i class="fa-solid fa-play"></i>
`;

const pauseIcon = `
<i class="fa-solid fa-pause"></i>
`;

const soundIcon = `
<i class="fa-solid fa-volume-high"></i>
`;

const muteIcon = `
<i class="fa-solid fa-volume-xmark"></i>
`;

const favIcon = `<i class="fa-solid fa-heart"></i>`;

const nonFavIcon = `<i class="fa-regular fa-heart"></i>`;

//all musics
const musics = [
  { src: "./assets/music/@dlsakastha.mp3", fav: false },
  {
    src: "./assets/music/@MUSIC_GANGSTERI Faceless 1-7(Static Grey is the Light).mp3",
    fav: false,
  },
  { src: "./assets/music/@Nalepale.mp3", fav: false },
  { src: "./assets/music/@UFO_MUZIC Eminem (Ass Like That).mp3", fav: false },
];
//index
let i = 0;
//change src
audio.src = musics[i + 3].src;

let volume = audio.volume * 100;
volumeline.style.backgroundSize = `50% 100%`;

//change volume
volumeline.addEventListener("change", changeVolume);

//change src to next index
nextButton.addEventListener("click", () => {
  changeAudio("next");
});
//change src to per index
perButton.addEventListener("click", () => {
  changeAudio("per");
});

//play & stop
playerButton.addEventListener("click", toggleAudio);

//timeline
audio.ontimeupdate = changeTimelinePosition;

//show the play button when the audio end
audio.onended = audioEnded;

//make the audio time change with timeline
timeline.addEventListener("change", changeSeek);

//mute & un-mute
soundButton.addEventListener("click", toggleSound);

favButton.addEventListener("click", handleFav);

function handleFav() {
  musics[i].fav = !musics[i].fav;
  favButton.innerHTML = musics[i].fav ? favIcon : nonFavIcon;
}

//handle play & stop
function toggleAudio() {
  if (audio.paused) {
    audio.play();
    playerButton.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playerButton.innerHTML = playIcon;
  }
}

//handle timeline
function changeTimelinePosition() {
  let percentagePosition = (100 * audio.currentTime) / audio.duration;
  timeline.style.backgroundSize = `${percentagePosition}% 100%`;
  timeline.value = percentagePosition;
}

//handle show the play button when the audio end
function audioEnded() {
  playerButton.innerHTML = playIcon;
  changeAudio("next");
}

//handle current time
function changeSeek() {
  const time = (timeline.value * audio.duration) / 100;
  audio.currentTime = time;
}

//handle mute & mute button
function toggleSound(type) {
  if (type == "mute") {
    return true;
  } else {
    audio.muted = !audio.muted;
    soundButton.innerHTML = audio.muted ? muteIcon : soundIcon;
    if (audio.muted) {
      volumeline.value = 0;
    } else {
      volumeline.value = 10;
      volumeline.style.backgroundSize = `10% 100%`;
      audio.volume = 0.1;
    }
  }
}

//handle change audio
function changeAudio(type) {
  if (type == "next") {
    i++;
    i = i == musics.length ? 0 : i;
  } else if (type == "per") {
    i--;
    i = i == -1 ? musics.length - 1 : i;
  }
  //play-stop music
  toggleAudio();
  //change src
  audio.src = musics[i].src;
  //play music
  toggleAudio();
  if (musics[i].fav) {
    favButton.innerHTML = favIcon;
  } else {
    favButton.innerHTML = nonFavIcon;
  }
}

//handle change volume
function changeVolume() {
  volume = volumeline.value / 100;
  audio.volume = volume;
  volumeline.style.backgroundSize = `${volumeline.value}% 100%`;
  if (volume == 0 && toggleSound("mute")) {
    audio.muted = true;
    soundButton.innerHTML = muteIcon;
  } else {
    audio.muted = false;
    soundButton.innerHTML = soundIcon;
  }
}

const playerButton = document.querySelector(".player-button");
const audio = document.querySelector("audio");
const timeline = document.querySelector(".timeline");
const soundButton = document.querySelector(".sound-button");
const nextButton = document.querySelector(".next-button");
const perButton = document.querySelector(".per-button");
const volumeline = document.querySelector(".volumeline");

const playIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/>
</svg>
`;

const pauseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
<path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/>
</svg>
`;

const soundIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
<path d="M215 71.1L126.1 160H24c-13.3 0-24 10.7-24 24v144c0 13.3 10.7 24 24 24h102.1l89 89c15 15 41 4.5 41-17V88c0-21.5-26-32-41-17zm233.3-51.1c-11.2-7.3-26.2-4.2-33.5 7-7.3 11.2-4.2 26.2 7 33.5 66.3 43.5 105.8 116.6 105.8 195.6 0 79-39.6 152.1-105.8 195.6-11.2 7.3-14.3 22.3-7 33.5 7 10.7 21.9 14.6 33.5 7C528.3 439.6 576 351.3 576 256S528.3 72.4 448.4 20zM480 256c0-63.5-32.1-121.9-85.8-156.2-11.2-7.1-26-3.8-33.1 7.5s-3.8 26.2 7.4 33.4C408.3 166 432 209.1 432 256s-23.7 90-63.5 115.4c-11.2 7.1-14.5 22.1-7.4 33.4 6.5 10.4 21.1 15.1 33.1 7.5C447.9 377.9 480 319.5 480 256zm-141.8-76.9c-11.6-6.3-26.2-2.2-32.6 9.5-6.4 11.6-2.2 26.2 9.5 32.6C328 228.3 336 241.6 336 256c0 14.4-8 27.7-20.9 34.8-11.6 6.4-15.8 21-9.5 32.6 6.4 11.7 21.1 15.8 32.6 9.5 28.2-15.6 45.8-45 45.8-76.9s-17.5-61.3-45.8-76.9z"/>
</svg>
`;

const muteIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
<path d="M215 71.1L126.1 160H24c-13.3 0-24 10.7-24 24v144c0 13.3 10.7 24 24 24h102.1l89 89c15 15 41 4.5 41-17V88c0-21.5-26-32-41-17zM461.6 256l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L416 210.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8L370.4 256l-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0L416 301.6l45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L461.6 256z"/>
</svg>
`;

//all musics
const musics = [
  "./assets/music/@dlsakastha.mp3",
  "./assets/music/@MUSIC_GANGSTERI Faceless 1-7(Static Grey is the Light).mp3",
  "./assets/music/@Nalepale.mp3",
  "./assets/music/@UFO_MUZIC Eminem (Ass Like That).mp3",
];
//index
let i = 0;
//change src
audio.src = musics[i];

let volume = audio.volume * 100;

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
  audio.src = musics[i];
  //play music
  toggleAudio();
}

//handle change volume
function changeVolume() {
  volume = volumeline.value / 100;
  audio.volume = volume;
  if (volume == 0 && toggleSound("mute")) {
    audio.muted = true;
    soundButton.innerHTML = muteIcon;
  } else {
    audio.muted = false;
    soundButton.innerHTML = soundIcon;
  }
}

const audio = document.querySelector("#audio");
const audioTemp = document.querySelector("#audioTemp");
const songsSegment = document.querySelector("#songsSegment");
const songList = document.querySelector(".SongList");
const showSongs = document.querySelector("#showSongs");
const playlistSegment = document.querySelector("#playlistSegment");
const songProgress = document.querySelector("#songProgress");
const songTitle = document.querySelector("#songTitle");
const minutesTime = document.querySelector("#minutesTime");
const secondsTime = document.querySelector("#secondsTime");
const progressBar = document.querySelector("#progressBar");
const listTitle = document.querySelector(".title");
const nextBtn = document.querySelector(".fa-fast-forward");
const prevBtn = document.querySelector(".fa-fast-backward");

let duration = 0;
let durationMinutes = 0;
let durationSeconds = 0;


let songs = [];
let songPlayingIndex = 0;

// Play Song from List

function playSong(i){

  let file = songs[i];
  songPlayingIndex = i;
  // let url = URL.createObjectURL(file);
  audio.src = file.url;
  audio.title = file.name;
  changePlayingName(file.name);
  audio.play();
  playButton.classList.add('hide');
  pauseButton.classList.remove('hide');
  let d = parseInt(audio.duration);
  duration = d;
  changeDurationDisplay(d);
}

// Change the name of currently playing song
function changePlayingName(n){
  songTitle.innerHTML = n;
}

// change duration
function changeDurationDisplay(d){
  durationMinutes = parseInt(d/60);
  durationSeconds = d - (durationMinutes * 60);
  minutesTime.innerHTML = durationMinutes;
  secondsTime.innerHTML = durationSeconds;

  // console.log('audio.duration', audio.duration);
  let progress = (100 * d) / audio.duration;
  songProgress.setAttribute("value",progress);
  // console.log('duration: ',duration);

}

// Update time
function updateTimer(track){

  let currTime = Math.floor(track.currentTime);
  changeDurationDisplay(currTime);

}

// Change Volume
progressBar.addEventListener('input', ()=>{
  let vol = (progressBar.value/100).toFixed(1);
  console.log(parseFloat(vol));
  audio.volume = parseFloat(vol);
})

// Controler UI
const playButton = document.querySelector(".fa-play");
const pauseButton = document.querySelector(".fa-pause");


// Play music
playButton.addEventListener('click', ()=>{
  playButton.classList.add('hide');
  pauseButton.classList.remove('hide');
  audio.play();
  let d = parseInt(audio.duration);
  duration = d;
  changeDurationDisplay(d);
})

// Puse Music
pauseButton.addEventListener('click', ()=>{
  playButton.classList.remove('hide');
  pauseButton.classList.add('hide');
  audio.pause();
})

// When Audio reach the end
audio.addEventListener("ended",()=>playNextSong());
// Next song
nextBtn.addEventListener('click', ()=>playNextSong())

function playNextSong(){
  if(songs.length > songPlayingIndex + 1){
    // alert('There is a next song');
    playSong(songPlayingIndex + 1);
  }else{
      // alert('No next song');
  }
}

// Previous song
prevBtn.addEventListener('click', ()=>playPreviousSong())

function playPreviousSong(){
  if(songPlayingIndex !== 0 && songs.length > 1){
    alert('There is a previous song');
    playSong(songPlayingIndex - 1);
  }else{
      alert('No previous song');
  }
}



// Display Song on Playlist
showSongs.addEventListener('click',()=>{
  playlistSegment.classList.add('hide');
  songsSegment.classList.remove('hide');
})



// Adding a song

function new_add_song(e){

  for(let file of e.files){
  let url = URL.createObjectURL(file);
  let name = file.name.replace(/\.[^/.]+$/, "");
  let temp = {name, url};
    songs.push(temp);
    refreshList()

  }

}


// Render Songs on the musicList

const songMusicListRender = ()=>{

  for(i in songs){
    let sg = songs[i];

    let template = `<div class="musicItem" onclick=(playSong(${i}))>
      <div class="musicItem1">
        <h4 class="title"><i class="fa fa-play"></i> <span>${sg.name}</span></h4>
      </div>
    </div>`;

    songList.insertAdjacentHTML('beforeend', template);

  }

}

// refresh List
const refreshList = () =>{
  // remove all children
  songList.innerHTML = '';
  // re-render the list
  songMusicListRender();
}

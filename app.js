const audio = document.querySelector("#audio");
const audioTemp = document.querySelector("#audioTemp");
const songsSegment = document.querySelector("#songsSegment");
const songList = document.querySelector(".SongList");
const showSongs = document.querySelector("#showSongs");
const playlistSegment = document.querySelector("#playlistSegment");
const showPlaylist = document.querySelector("#showPlaylist");
const songProgress = document.querySelector("#songProgress");
const songTitle = document.querySelector("#songTitle");
const minutesTime = document.querySelector("#minutesTime");
const secondsTime = document.querySelector("#secondsTime");
const progressBar = document.querySelector("#progressBar");
const listTitle = document.querySelector(".title");
const savePlaylistBtn = document.querySelector("#savePlaylistBtn");

let duration = 0;
let durationMinutes = 0;
let durationSeconds = 0;


let songs = [];

// Play Song from List

function playSong(i){

  let file = songs[i];
  // let url = URL.createObjectURL(file);
  audio.src = file.url;
  audio.title = file.name;
  changePlayingName(file.name);
  audio.play();
  playButton.classList.add('hide');
  pauseButton.classList.remove('hide');
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

  let progress = (100 * d) / duration;
  songProgress.setAttribute("value",progress);

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



// Display Song on Playlist
showSongs.addEventListener('click',()=>{
  playlistSegment.classList.add('hide');
  songsSegment.classList.remove('hide');
})
showPlaylist.addEventListener('click',()=>{
songsSegment.classList.add('hide');
  playlistSegment.classList.remove('hide');
})



// Adding a song

function new_add_song(e){

  for(let file of e.files){
  let url = URL.createObjectURL(file);
  let name = file.name.replace(/\.[^/.]+$/, "");
  let temp = {name, url};
    songs.push(temp);
    refreshList()
    // audio.src = url;
    // audio.title = file.name.replace(/\.[^/.]+$/, "");
    // changePlayingName(file.name.replace(/\.[^/.]+$/, ""));

  }

}


// Render Songs on the musicList

const songMusicListRender = ()=>{

  if(songs.length > 0){
    savePlaylistBtn.classList.remove('hide');
  }

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


// Save playost
savePlaylistBtn.addEventListener('click', ()=>{
    let data = JSON.stringify(songs);
    localStorage.setItem("black&Yellow", data);
})

const init = async()=>{

  // Check if there is data in the localstorage
 let localData = await localStorage.getItem("black&Yellow");
 console.log("localData: ",localData);

 let data = JSON.parse(localData);
 console.log("Data: ",data);

 if(data.length > 0){
   songs = data;
 }

 // Render the list on the screen
   refreshList();

}


init();

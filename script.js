console.log("Welcome to bhaktify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "सीता-राम, सीता-राम कहिये, जहि विधि राखे राम ताहि विधि रहिये", filePath: "songs\1,mp3", coverPath: "covers/1.png"},
    {songName: "Humare Saath Shri Raghunath To Kis Baat Ki Chinta", filePath: "songs/2.mp3", coverPath: "covers/2.png"},
    {songName: "Mujhe tune malik bahut kuchh diya hai, tera sukriya hai", filePath: "songs/3.mp3", coverPath: "covers/3.png"},
    {songName: "Saare Jahan Ke Malik Tera Hi Aasara Hai", filePath: "songs/4.mp3", coverPath: "covers/4.png"},
    {songName: "Sita Ram ji ki pyaari bhajana", filePath: "songs/5.mp3", coverPath: "covers/5.png"},
    {songName: "श्री राम भजन  -- इन मस्तो की बस्ती मे", filePath: "songs/6.mp3", coverPath: "covers/6.png"},
    {songName: "हम सांस ले रहे हैं, इस जान के बदौलत _और जान जिस्म में है", filePath: "songs/7.mp3", coverPath: "covers/7.png"},
    {songName: "आ ही गये रघुनंदन सजवा दो द्वार द्वार", filePath: "songs/8.mp3", coverPath: "covers/8.png"},
    {songName: "लिखा हुआ राम नाम देखा जो अंगूठी पर", filePath: "songs/9.mp3", coverPath: "covers/9.png"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
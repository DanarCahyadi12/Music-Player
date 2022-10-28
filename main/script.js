const containerPlayPauseMainContent = document.querySelector('.card-actions')
const playPauseMainContent = containerPlayPauseMainContent.querySelector('.play-pause')
const buttonNextPrevPlayPause = containerPlayPauseMainContent.querySelectorAll('.btn')
const titleSong = document.querySelector('.title-song')
const artistSong = document.querySelector('.artist')
const progressContainer = document.querySelector('.cont-range')
const progessed = document.querySelector('.progessed')
// const hoverProgress = document.querySelector('.hovered-progress')
// const currentTimeHover = document.querySelector('.current-time-hover')
const currentTime= document.querySelector('.current-time')
const duration= document.querySelector('.duration')
const controlSongLogo= document.querySelector('.control-loop')
const controlSongBtn= controlSongLogo.parentNode
const favSongBtn= document.querySelector('.favorite')
const queueSongBtn= document.querySelector('.queue')
const listSongContainer= document.querySelector('.menu-cont')
const listSong = listSongContainer.children
const searchForm = document.querySelector('.input')
const ascDescBtn = document.querySelector('.dropdown')
const ascBtn =ascDescBtn.childNodes[3].childNodes[1]
const descBtn =ascDescBtn.childNodes[3].childNodes[3]
let Datasong = [
    {
        title:"Evaluasi",
        artist: "Hindia",
        img : "",
        src : "../assets/song/Hindia - Evaluasi (_Official Lyric & Commentary Video).mp3",
        index : 0

    },
    {
        title:"Sparks",
        artist: "Coldplay",
        img : "",
        src : "../assets/song/Sparks.mp3"


    },
    {
        title:"Membasuh",
        artist: "Hindia",
        img : "",
        src : "../assets/song/Hindia - Membasuh ft. Rara Sekar (Official Music Video).mp3"

    },
    {
        title:"Secukupnya",
        artist: "Hindia",
        img : "",
        src : "../assets/song/Hindia - Secukupnya (Official Lyric & Commentary Video).mp3"

    },
    {
        title:"Mata air",
        artist: "Hindia",
        img : "",
        src : "../assets/song/Hindia ft. Natasha Udu - Mata Air Lirik.mp3"

    },
    {
        title:"I Wanna Be Yours",
        artist: "Artics Monkey",
        img : "",
        src : "../assets/song/I Wanna Be Yours.mp3"

    },
    {
        title:"Dehidrasi",
        artist: "Hindia",
        img : "",
        src : "../assets/song/Hindia ft. Petra Sihombing - Dehidrasi (Official Lyric & Commentary Video).mp3"

    }
]

let indexSong = 0
let mainAudio = new Audio()
mainAudio.src = Datasong[indexSong].src

/*Play songs and pause*/
let isPlay = true
const PlaySong = () => {
    mainAudio.play()
    isPlay = false
    playPauseMainContent.textContent = "pause_circle"
}
const PauseSong = () => {
    mainAudio.pause()
    isPlay = true
    playPauseMainContent.textContent = "play_circle"
}

const PlayPauseSong = () => {
    isPlay === false ? PauseSong() : PlaySong()
}

buttonNextPrevPlayPause[1].addEventListener('click',PlayPauseSong)
/*End of play pause song*/

/*next and prev song*/
const NextSong = () => {
    indexSong++
    if(indexSong >= Datasong.length - 1){
        indexSong = 0
    }
    mainAudio.src = Datasong[indexSong].src
    titleSong.textContent = Datasong[indexSong].title
    artistSong.textContent = Datasong[indexSong].artist
    mainAudio.load()
    PlaySong()
}

const PrevSong = () => {
    indexSong--
    if(indexSong <= 0 ){
        indexSong = Datasong.length-1
    }
    mainAudio.src = Datasong[indexSong].src
    titleSong.textContent = Datasong[indexSong].title
    artistSong.textContent = Datasong[indexSong].artist
    mainAudio.load()
    PlaySong()
}

buttonNextPrevPlayPause[0].addEventListener('click',PrevSong)
buttonNextPrevPlayPause[2].addEventListener('click',NextSong)
/*end of next and prev song*/

/*get current and duration*/
const GetCurrentTime = () => {
    let seconds =Math.floor(mainAudio.currentTime % 60) 
    let minute =Math.floor(mainAudio.currentTime  / 60) 
    if(seconds < 10){
        seconds = `0${seconds}`
    }
    if(minute < 10){
        minute = `0${minute}`
    }
    currentTime.textContent = `${minute}:${seconds}`
}

const GetDurationSong = () => {
    let seconds =Math.floor(mainAudio.duration  % 60) 
    let minute = Math.floor(mainAudio.duration  / 60) 
    if(seconds < 10){
        seconds = `0${seconds}`
    }
    if(minute < 10){
        minute = `0${minute}`
    }
    duration.textContent = `${minute}:${seconds}`
}
const GetProgressBar = () => {
progessed.style.width = Math.floor((mainAudio.currentTime / progressContainer.clientWidth )* 100)+'%'
}
mainAudio.addEventListener('timeupdate',GetCurrentTime)
mainAudio.addEventListener('loadedmetadata',GetDurationSong)
mainAudio.addEventListener('timeupdate',GetProgressBar)
/*end of current time and duration*/

/*current time*/
const GetCurrentTimeAndWidth = (e) => {
    mainAudio.currentTime = Math.floor((e.offsetX /progressContainer.clientWidth) * mainAudio.duration)
    PlaySong()
}
progressContainer.addEventListener('click',GetCurrentTimeAndWidth)
/*end of current time*/

/*Mapping*/
let listSongs = ``
let filtered 
const Mapping = () => {
    let returned = Datasong.map((val) => {
        return val
    })
    for(let i = 0; i < returned.length;i++){
        listSongs += `<li>
        <a>${returned[i].title} - ${returned[i].artist}</a>
        </li>` 
        listSongContainer.innerHTML = listSongs
    }
}
Mapping()
const GetSongaFromListed = n => {
    mainAudio.src = Datasong[n].src
    titleSong.textContent= Datasong[n].title
    artistSong.textContent = Datasong[n].artist
    PlaySong()
    indexSong = n
    console.log(n)
}
const LoadSongFromPlayList = () => {

    for(let i = 0; i <= listSong.length -1;i++){
        listSong[i].addEventListener('click',() => {
            GetSongaFromListed(i)
            console.log(n)
        })
        
    }
}

/*Sorting*/
let concatTitleAndArtis
const Ascending = () => {
    listSongs = ``
    Datasong.sort((a,b) => {
        return a.title.localeCompare(b.title)
    })
    if(filtered){
        filtered.reverse().sort()
    }
    Mapping()
    LoadSongFromPlayList()
    concatTitleAndArtis = Datasong.map((val) => {
        return `${val.title} - ${val.artist}`
    })
    
    if(filtered){
        listSongs = ``
        for(let i = 0; i < filtered.length; i++){
            listSongs += `<li>
            <a>${filtered[i]}</a>
            </li>` 
        }
    }
    listSongContainer.innerHTML = listSongs
    
}

const Descending = () => {
    listSongs = ``
    Datasong.sort((a,b) => {
        return b.title.localeCompare(a.title)
    })
    if(filtered){
        filtered.sort().reverse()
    }
    Mapping()
    LoadSongFromPlayList()
        concatTitleAndArtis = Datasong.map((val) => {
        return `${val.title} - ${val.artist}`
    })
    if(filtered){
        listSongs = ``
        for(let i = 0; i < filtered.length; i++){
            listSongs += `<li>
            <a>${filtered[i]}</a>
            </li>` 
        }
    }
    listSongContainer.innerHTML = listSongs
}
ascBtn.addEventListener('click',Ascending)
descBtn.addEventListener('click',Descending)
/*end of sorting*/
    concatTitleAndArtis = Datasong.map((val) => {
    return `${val.title} - ${val.artist}`

})
const SearchSong = (e)=> {
    let values = e.target.value.toUpperCase()
    filtered = concatTitleAndArtis.filter((val,i) => {
        let included = val.toUpperCase().includes(values) ||val.toLowerCase().includes(values)
            if(included){
                return val
            }
    })
    if(filtered){
        listSongs = ``
        for(let i = 0; i < filtered.length; i++){
            listSongs += `<li>
            <a>${filtered[i]}</a>
            </li>` 
        }
    }
    LoadSongFromPlayList()
    listSongContainer.innerHTML = listSongs
    console.log(filtered)
}
searchForm.addEventListener('input',e => {
    SearchSong(e)

})

/*Search song*/



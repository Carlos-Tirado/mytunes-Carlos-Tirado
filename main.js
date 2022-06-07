console.log('javascript connection')


let songSelection = document.querySelector('#songplaying');

let input = document.querySelector("#artistSearch"); //targetting input box
let button = document.querySelector("#searchButton"); // targetting searchbutton
let results = document.getElementById("showresults");
console.log(results)
//let album = document.querySelector(".album-section");


button.addEventListener("click", function(event){ //we're giving click event listener to button search
    console.log(input.value)
    event.preventDefault()
    let userinput = input.value


    fetch(`https://proxy-itunes-api.glitch.me/search?term=${userinput} `, {  // we called the API with Fetch request
        "method": "GET", 
        "headers": {'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.json() // converting to JS
        //response.json();
        })
        .then(data => {
            console.log(data.results)
            previewSong(data.results)
        })
        .catch(err => {
        console.error(err);
        });
        
}) 



function previewSong(searchData){
    for (let song of searchData){
    let songName = song.trackname;
    let artistName = song.artistName;
    let source = song.previewUrl;

    let previewSongSource = document.createElement('source');
    previewSongSource.src = source;
   // songPreview.appendChild(previewSongSource);

    let newSong = document.createElement('div');
    newSong.innerText = `${songName} By ${artistName}`;
    results.appendChild(newSong)

}}


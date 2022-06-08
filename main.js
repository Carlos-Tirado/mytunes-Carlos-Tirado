console.log('javascript connection')


let audio = document.querySelector('#songplaying');
let button = document.querySelector("#searchButton"); // targetting searchbutton
let input = document.querySelector("#artistSearch"); //targetting input box
let results = document.getElementById("showresults");
console.log(results)



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
            //setting conditional to zero results
            if (data.results.length === 0) {
                let noResultsElement = document.createElement("div")
                noResultsElement.classList.add("noResults")
                noResultsElement.innerText = "Sorry, no results. =("
                results.appendChild(noResultsElement)
            }
        })
        .catch(err => {
        console.error(err);
        });
        
})



function previewSong(searchData){
    results.innerHTML = ""
    for (let song of searchData){
    let songName = song.trackName;
    let artistName = song.artistName;
    let source = song.previewUrl;



    let songcontainer = document.createElement("div") //opening container
        //how to give style to the container?

    let imageAlbum = document.createElement("img")
    //how to give style to the image?
    imageAlbum.classList.add("imgAlbum")
    imageAlbum.src = song.artworkUrl100
    songcontainer.appendChild(imageAlbum)



    let newSong = document.createElement('div');
    //how to give style to the text?
    newSong.classList.add("nameSongBand")
    newSong.innerText = `${songName} By ${artistName}`;
    songcontainer.appendChild(newSong)


    // adding event click listener to the image, getting audio source to play audio after click
    imageAlbum.addEventListener("click", function(event){ 
    console.log(source)


// ------ things to achieve CLEARING results? ---------------


    //we created-built a source element and append the audiotag so we can listen the songs
    audio.innerHTML = ""
    let audiotag = document.createElement("audio")
    audiotag.controls = true //adding control to audiotag from line 82 (I used to have controlaudio on HTML)
    let sourceElement = document.createElement('source')
    sourceElement.src = source
    audiotag.appendChild(sourceElement)
    audio.appendChild(audiotag)
    console.log(audio)

    audiotag.autoplay = true

    })
    results.appendChild(songcontainer) //closing container
}}



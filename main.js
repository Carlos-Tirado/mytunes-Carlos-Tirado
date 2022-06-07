console.log('javascript connection')
//let songSelection = document.querySelector('#songplaying');

let input = document.querySelector("#artistSearch"); //targetting input box
let button = document.querySelector("#searchButton"); // targetting searchbutton
//let results = document.getElementById("results");
//let album = document.querySelector(".album-section");


button.addEventListener("click", function(){ //we're giving click event listener to button search
    console.log(input.value)
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
            console.log(data)
        })
        .catch(err => {
        console.error(err);
        });
        
}) 



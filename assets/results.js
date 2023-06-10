// First References
var movieNameRef = document.getElementById
("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");

//Fetching data from API
var getMovie = () => {
    var movieName = movieNameRef.value;
    var url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //If input field IS empty
    if (movieName.length <= 0) {
      result.innerHTML = `<h3 class="msg">Please Input A Movie Name</h3>`;
    }
    //If input field is NOT empty
    else {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            console.log(data.Poster);
            console.log(data.Title);
            console.log(data.imdbRating);
            console.log(data.Rated);
            console.log(data.Year);
            console.log(data.Runtime);
            console.log(data.Genre);
            console.log(data.Plot);
            console.log(data.Actors);

            result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                    </div>
                </div>
                
            `;
        });
    }
};

window.addEventListener("load", getMovie);
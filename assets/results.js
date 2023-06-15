// First References
var movieNameRef = document.getElementById
("movie-name");
var searchBtn = document.getElementById("search-btn");
var result = document.getElementById("result");

// Added localstorage for recent searches
function saveSearch(movieSearch) {
    var movieSearches = JSON.parse(localStorage.getItem("recent-searches")) || []; 
    movieSearches.push(movieSearch);
    localStorage.setItem("recent-searches" , JSON.stringify(movieSearches));
}

//Fetching data from API
var getMovie = () => {
    var movieName = movieNameRef.value;
    var url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    saveSearch(movieName)

    //If input field IS empty
    if (movieName.length <= 0) {
      result.innerHTML = `<h3 class="msg">Please Input A Movie Name</h3>`;
      
    }
    //If input field is NOT empty
    else {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            //If movie exists in Database
            if(data.Response == "True"){
              result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="./assets/star.png">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>  
                    </div>
                </div>
                <h3>Plot:</h3>
                <p>${data.Plot}</p>
                <h3>Cast:</h3>
                <p>${data.Actors}</p>
                
            `;
            }
            //If movie does NOT exist in Database
            else{
                result.innerHTML=`<h3 class='msg'>${data.Error}</h3>`;
            }
        })
        //If Error occurs
        .catch(() => {
            result.innerHTML=`<h3 class="msg">Error Occured</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getMovie);

window.addEventListener("load", getMovie);
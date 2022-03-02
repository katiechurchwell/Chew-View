const resultsContainer = document.querySelector("#results-container");
const movieContainer = document.querySelector("#movie-results-container");
const genreContainer = document.querySelector("#movie-genre-container");
const titleContainer = document.querySelector("#movie-title-container");
const movieApiKey = "2e30e0c5c0a8e70c539fdbad775c4919";

function displayMovies(movieData) {
  // MOVIE DETAILS MODAL
  var displayMovieDetails = function (event) {
    let movieIndex = event.target.getAttribute("data-movie-id");
    if (!movieIndex)
      movieIndex = event.target.parentNode.getAttribute("data-movie-id");

    const movie = movieData[movieIndex];

    var movieTitle = movie.title;
    var overview = movie.overview;
    var date = movie.release_date;

    var markup = `
    <p>${overview}</p>
    <p>Release Date: ${date}</p>`;
    var modal = document.getElementById("movie-modal");
    var title = modal.getElementsByClassName("modal-title")[0];
    var body = modal.getElementsByClassName("modal-body")[0];
    title.textContent = movieTitle;
    body.innerHTML = markup;

    $("#movie-modal").modal("show");
  };

  //DISPLAY MOVIE TITLES
  function displayTitles(event) {
    //find movie matches against genre selection
    var genreSelection = event.target.getAttribute("data-genre-id");
    for (i = 0; i < movieData.length; i++) {
      if (movieData[i].genre_ids[0] == genreSelection) {
        //create cards with title and image
        var title = movieData[i].title;
        var moviePoster =
          "https://image.tmdb.org/t/p/original/" + movieData[i].backdrop_path;
        var movieCard = document.createElement("div");
        movieCard.setAttribute("class", "card");
        movieCard.setAttribute("style", "width: 18rem;");
        movieCard.setAttribute("data-movie-id", i);
        movieCard.innerHTML = `
        <img class="card-img-top crop" src="${moviePoster}" alt="Movie Poster of ${title}">
        <h5 class="card-title">${title}</h5>
        </div>
        `;
        //set modal event listener
        movieCard.addEventListener("click", displayMovieDetails);
        //hide genre buttons
        genreContainer.setAttribute("class", "hide");
        //add cards to page
        titleContainer.appendChild(movieCard);
      }
    }
  }

  //DISPLAY MOVIE GENRES
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${movieApiKey}&language=en-US`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (genreData) {
        //array of all possible genre ids with names
        const allGenresIds = genreData.genres.map((genre) => genre.id);
        //array of genre Ids for popular movies
        const choiceGenres = movieData.map((movie) => movie.genre_ids[0]);
        //overlap
        const genreMatches = allGenresIds.filter((element) =>
          choiceGenres.includes(element)
        );

        //populate genre buttons to page
        for (i = 0; i < genreData.genres.length; i++) {
          if (genreMatches.includes(genreData.genres[i].id)) {
            var genreBtn = document.createElement("button");
            genreBtn.textContent = genreData.genres[i].name;
            genreBtn.setAttribute(
              "class",
              "btn btn-outline-secondary m-1 w-50 movieGenre-btn"
            );
            genreBtn.setAttribute("data-genre-id", genreData.genres[i].id);
            genreBtn.addEventListener("click", displayTitles);
            genreContainer.appendChild(genreBtn);
          }
        }
      });
    } else {
      console.log("response is not ok");
    }
  });
}

//FETCH MOVIES (Top 20 most popular)
var getMovieData = function () {
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=en-US&page=1`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayMovies(data.results);
      });
    } else {
      console.log("response is not ok");
    }
  });
};

// SUBMIT BUTTON HANDLER
clickHandler = function (event) {
  event.preventDefault();
  getMovieData();
};

var submitBtn = document.querySelector("#submit"); //search button
submitBtn.addEventListener("click", clickHandler);

var zipHistoryBtn = document.querySelector(".zip-history") //zip history button(s)
zipHistoryBtn.addEventListener("click", clickHandler);
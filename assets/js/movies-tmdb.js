var resultsContainer = document.querySelector("#results-container"); //results container
var movieContainer = document.querySelector("#movie"); //movie container
var movieSearchInputEl = document.querySelector("#movie-search-input"); //movie input
var searchBool = false;
const apiKey = "2e30e0c5c0a8e70c539fdbad775c4919";

// DISPLAYS MOVIE CARDS ON HOMEPAGE
// image = https://image.tmdb.org/t/p/original/ + backdrop_path
var displayMovies = function (movieData) {
  //DISPLAY MOVIE GENRE BUTTONS
  fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
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
            movieContainer.appendChild(genreBtn);
            //add event listener for movieTitles function
          }
        }
      });
    } else {
      console.log("response is not ok");
    }
  });
};

//FETCH MOVIES (Top 20 most popular)
var getMovieData = function () {
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  removeChildren(movieContainer);

  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
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

// MOVIE DETAILS MODAL
var displayMovieDetails = function (
  plot,
  date,
  actorlist,
  review1,
  review2,
  movieTitle
) {
  var markup = `<p>${plot}</p><p>Actors: ${actorlist}</p><p>Rotten Tomatoes: ${review1.Value}</p><p>Metacritic: ${review2.Value}</p><p>Release Date: ${date}</p>`;
  var modal = document.getElementById("movie-modal");
  var title = modal.getElementsByClassName("modal-title")[0];
  var body = modal.getElementsByClassName("modal-body")[0];
  title.textContent = movieTitle;
  body.innerHTML = markup;

  $("#movie-modal").modal("show");
};

// 'SEARCH MOVIES' BUTTON FUNCTIONS
movieClickHandler = function (event) {
  event.preventDefault();
  var target = event.target;

  getMovieData();

  //   if (target.parentNode.parentNode.parentNode === movieSectionCon) {
  //     getMovieDetails(target.attributes.imdbID.value);
  //   } else if (target === movieFormEl) {
  //     searchBool = true;
  //   }
};

movieContainer.addEventListener("click", movieClickHandler);

var submitBtn = document.querySelector("#submit"); //zipcode search button
submitBtn.addEventListener("click", movieClickHandler);

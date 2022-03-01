// GENERATING MOVIE DATA FROM OMDB API
var resultsContainer = document.querySelector("#results-container"); //results container
var movieSectionCon = document.querySelector("#movie"); //movie container
var submitBtn = document.querySelector("#submit"); //zicode button
var movieSearchInputEl = document.querySelector("#movie-search-input"); //movie input
var searchBool = false;

// DISPLAYS MOVIE CARDS ON HOMEPAGE
var displayMovie = function (movieTitle, movieYear, posterUrl, imdbID) {
  var movieContainer = document.createElement("div");
  movieContainer.className = "card card-stacked movie-cardy hoverable";

  var modalButtonEl = document.createElement("a");
  modalButtonEl.className = "modal-trigger";
  modalButtonEl.setAttribute("href", "#movie-modal");
  movieContainer.appendChild(modalButtonEl);

  var moviePosterEl = document.createElement("img");
  moviePosterEl.className = "movie-poster-img";
  moviePosterEl.setAttribute("src", posterUrl);
  moviePosterEl.setAttribute("title", movieTitle);
  moviePosterEl.setAttribute("imdbID", imdbID);
  modalButtonEl.appendChild(moviePosterEl);

  movieSectionCon.appendChild(movieContainer);
};

//API FETCH
var getMovieData = function (movieTitle) {
  function removeChildren(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  removeChildren(movieSectionCon);

  var apiKey = "403f37df";

  fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}&type=movie&r=json`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var dataArr = data.Search;
        for (var i = 0; i < 4; i++) {
          var imdbID = dataArr[i].imdbID;
          var Title = dataArr[i].Title;
          var Year = dataArr[i].Year;
          var Poster = dataArr[i].Poster;

          displayMovie(Title, Year, Poster, imdbID);
        }
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

// ACQUIRE MOVIE DETAILS
var getMovieDetails = function (imdbIDnum) {
  var apiKey = "403f37df";
  fetch(
    `https://www.omdbapi.com/?i=${imdbIDnum}&apikey=${apiKey}&type=movie&r=json`
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var plot = data.Plot;
        var releaseDate = data.Released;
        var actors = data.Actors;
        var rottenTomatoesReview = data.Ratings[1];
        var metacriticReview = data.Ratings[2];
        var title = data.Title;

        displayMovieDetails(
          plot,
          releaseDate,
          actors,
          rottenTomatoesReview,
          metacriticReview,
          title
        );
      });
    } else {
      console.log("response is not ok");
    }
  });
};

// AUTO-GENERATES RANDOM MOVIE SUGGESTIONS BASED ON KEYWORDS
var chooseMovieTitle = function () {
  var searchedMovieTitle = movieSearchInputEl.value;

  var titleArr = [
    "the",
    "movie",
    "man",
    "avengers",
    "quest",
    "air",
    "love",
    "crazy",
    "plane",
    "woman",
    "child",
    "teenage",
    "home",
    "speech",
    "king",
    "ghost",
    "easy",
    "west",
    "fun",
    "sorrow",
    "son",
    "daughter",
    "car",
    "space",
    "star",
    "watch",
    "dollar",
    "money",
    "detective",
    "crime",
    "casino",
    "gun",
    "launch",
    "pink",
    "red",
    "blue",
    "yellow",
    "dark",
    "lord",
    "american",
    "flower",
    "other",
    "walk",
    "into",
    "that",
    "animal",
  ];

  var randNum = Math.floor(Math.random() * titleArr.length);

  if (searchBool === true) {
    getMovieData(searchedMovieTitle);
  } else {
    getMovieData(titleArr[randNum]);
  }
};

// 'SEARCH MOVIES' BUTTON FUNCTIONS
movieClickHandler = function (event) {
  event.preventDefault();
  var target = event.target;

  if (target.parentNode.parentNode.parentNode === movieSectionCon) {
    getMovieDetails(target.attributes.imdbID.value);
  } else if (target === movieFormEl) {
    searchBool = true;
    chooseMovieTitle();
  }
};

movieSectionCon.addEventListener("click", movieClickHandler);
submitBtn.addEventListener("submit", movieClickHandler);
chooseMovieTitle();

setInterval(chooseMovieTitle, 30000);
